import { supabase } from '@/lib/supabase';

export async function uploadEventMedia(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from('event-media').upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from('event-media').getPublicUrl(path);
  return data.publicUrl;
}
