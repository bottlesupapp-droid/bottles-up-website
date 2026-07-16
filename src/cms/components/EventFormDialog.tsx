import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { uploadEventMedia } from '@/lib/uploadEventMedia';
import type { Database, EventStatus } from '@/types/database';

type EventRow = Database['public']['Tables']['site_events']['Row'];
type TierRow = Database['public']['Tables']['site_ticket_tiers']['Row'];

interface TierDraft {
  id?: string;
  name: string;
  priceDollars: string;
  capacity: string;
}

interface EventFormDialogProps {
  event: EventRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

const emptyForm = {
  title: '',
  description: '',
  venue_name: '',
  address: '',
  start_date: '',
  end_date: '',
  category: '',
  status: 'draft' as EventStatus,
  cover_image_url: '' as string | null,
  gallery: [] as string[],
  slug: '' as string | null,
};

const toDatetimeLocal = (iso: string | null) => (iso ? iso.slice(0, 16) : '');

const EventFormDialog = ({ event, open, onOpenChange, onSaved }: EventFormDialogProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [tiers, setTiers] = useState<TierDraft[]>([]);
  const [originalTierIds, setOriginalTierIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (event) {
      setForm({
        title: event.title,
        description: event.description,
        venue_name: event.venue_name,
        address: event.address ?? '',
        start_date: toDatetimeLocal(event.start_date),
        end_date: toDatetimeLocal(event.end_date),
        category: event.category ?? '',
        status: event.status,
        cover_image_url: event.cover_image_url,
        gallery: event.gallery ?? [],
        slug: (event as any).slug ?? '',
      });
      setSlugManual(!!(event as any).slug);

      supabase
        .from('site_ticket_tiers')
        .select('*')
        .eq('event_id', event.id)
        .then(({ data }) => {
          const rows = (data ?? []) as TierRow[];
          setTiers(
            rows.map((t) => ({
              id: t.id,
              name: t.name,
              priceDollars: (t.price_cents / 100).toString(),
              capacity: t.capacity.toString(),
            })),
          );
          setOriginalTierIds(rows.map((t) => t.id));
        });
    } else {
      setForm(emptyForm);
      setTiers([{ name: 'General Admission', priceDollars: '', capacity: '' }]);
      setOriginalTierIds([]);
      setSlugManual(false);
    }
  }, [event, open]);

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-generate slug if title changes and user hasn't manually edited slug
      if (key === 'title' && !slugManual && value) {
        next.slug = generateSlug(value);
      }
      return next;
    });

  const handleCoverUpload = async (file: File) => {
    setUploadingCover(true);
    try {
      const url = await uploadEventMedia(file);
      updateField('cover_image_url', url);
    } catch (error) {
      toast({ title: 'Upload failed', description: String(error), variant: 'destructive' });
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (files: FileList) => {
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadEventMedia));
      setForm((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
    } catch (error) {
      toast({ title: 'Upload failed', description: String(error), variant: 'destructive' });
    } finally {
      setUploadingGallery(false);
    }
  };

  const addTier = () => setTiers((prev) => [...prev, { name: '', priceDollars: '', capacity: '' }]);
  const removeTier = (index: number) => setTiers((prev) => prev.filter((_, i) => i !== index));
  const updateTier = (index: number, patch: Partial<TierDraft>) =>
    setTiers((prev) => prev.map((t, i) => (i === index ? { ...t, ...patch } : t)));

  const handleSave = async () => {
    if (!form.title || !form.description || !form.venue_name || !form.start_date) {
      toast({ title: 'Missing required fields', description: 'Title, description, venue, and start date are required.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const totalCapacity = tiers.reduce((sum, t) => sum + (parseInt(t.capacity, 10) || 0), 0);
      const payload = {
        title: form.title,
        description: form.description,
        venue_name: form.venue_name,
        address: form.address || null,
        start_date: new Date(form.start_date).toISOString(),
        end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
        category: form.category || null,
        status: form.status,
        cover_image_url: form.cover_image_url,
        gallery: form.gallery,
        capacity: totalCapacity || null,
        slug: form.slug || null,
      };

      let eventId = event?.id;
      if (event) {
        const { error } = await supabase.from('site_events').update(payload).eq('id', event.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('site_events').insert(payload).select('id').single();
        if (error) throw error;
        eventId = data.id;
      }

      const keptIds = new Set(tiers.filter((t) => t.id).map((t) => t.id!));
      const removedIds = originalTierIds.filter((id) => !keptIds.has(id));
      if (removedIds.length > 0) {
        const { error } = await supabase.from('site_ticket_tiers').delete().in('id', removedIds);
        if (error) throw error;
      }

      for (const tier of tiers) {
        if (!tier.name || !tier.priceDollars || !tier.capacity) continue;
        const tierPayload = {
          event_id: eventId!,
          name: tier.name,
          price_cents: Math.round(parseFloat(tier.priceDollars) * 100),
          capacity: parseInt(tier.capacity, 10),
        };
        if (tier.id) {
          const { error } = await supabase.from('site_ticket_tiers').update(tierPayload).eq('id', tier.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('site_ticket_tiers').insert(tierPayload);
          if (error) throw error;
        }
      }

      toast({ title: event ? 'Event updated' : 'Event created' });
      onSaved();
      onOpenChange(false);
    } catch (error) {
      toast({ title: 'Failed to save event', description: String(error), variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-gray-800 bg-gray-950">
        <DialogHeader>
          <DialogTitle className="text-white">{event ? 'Edit Event' : 'New Event'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => updateField('title', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              value={form.slug ?? ''}
              onChange={(e) => {
                updateField('slug', e.target.value);
                setSlugManual(true);
              }}
              placeholder="event-url-slug"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Venue Name</Label>
              <Input value={form.venue_name} onChange={(e) => updateField('venue_name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => updateField('address', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date/Time</Label>
              <Input
                type="datetime-local"
                value={form.start_date}
                onChange={(e) => updateField('start_date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date/Time (optional)</Label>
              <Input
                type="datetime-local"
                value={form.end_date}
                onChange={(e) => updateField('end_date', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => updateField('category', e.target.value)} placeholder="e.g. Rooftop, Club, VIP" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => updateField('status', v as EventStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex items-center gap-4">
              {form.cover_image_url && (
                <img src={form.cover_image_url} alt="Cover" className="h-16 w-16 rounded object-cover" />
              )}
              <Input
                type="file"
                accept="image/*"
                disabled={uploadingCover}
                onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gallery</Label>
            <div className="flex flex-wrap gap-2">
              {form.gallery.map((url) => (
                <div key={url} className="relative">
                  <img src={url} alt="Gallery" className="h-16 w-16 rounded object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((g) => g !== url) }))}
                    className="absolute -right-1 -top-1 rounded-full bg-black p-0.5 text-white"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              disabled={uploadingGallery}
              onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Ticket Tiers</Label>
              <Button type="button" size="sm" variant="outline" onClick={addTier}>
                <Plus className="mr-1 h-3 w-3" />
                Add Tier
              </Button>
            </div>
            {tiers.map((tier, i) => (
              <div key={i} className="grid grid-cols-[1fr_100px_100px_auto] gap-2">
                <Input
                  placeholder="Name (e.g. GA, VIP)"
                  value={tier.name}
                  onChange={(e) => updateTier(i, { name: e.target.value })}
                />
                <Input
                  placeholder="Price $"
                  type="number"
                  min="0"
                  step="0.01"
                  value={tier.priceDollars}
                  onChange={(e) => updateTier(i, { priceDollars: e.target.value })}
                />
                <Input
                  placeholder="Capacity"
                  type="number"
                  min="0"
                  value={tier.capacity}
                  onChange={(e) => updateTier(i, { capacity: e.target.value })}
                />
                <Button type="button" size="icon" variant="ghost" onClick={() => removeTier(i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || uploadingCover || uploadingGallery}
            className="bg-gradient-orange text-black font-bold hover:opacity-90"
          >
            {saving ? 'Saving...' : 'Save Event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
