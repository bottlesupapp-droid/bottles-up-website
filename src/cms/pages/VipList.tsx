import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type VipEmail = Database['public']['Tables']['vip_emails']['Row'];

const CmsVipList = () => {
  const [emails, setEmails] = useState<VipEmail[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('vip_emails')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setEmails(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return emails;
    return emails.filter(
      (e) =>
        e.email.toLowerCase().includes(q) ||
        e.first_name?.toLowerCase().includes(q) ||
        e.last_name?.toLowerCase().includes(q),
    );
  }, [emails, search]);

  const exportCsv = () => {
    const header = 'email,first_name,last_name,source,mailchimp_synced,created_at';
    const rows = filtered.map((e) =>
      [e.email, e.first_name ?? '', e.last_name ?? '', e.source, e.mailchimp_synced, e.created_at]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vip-list-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">VIP List ({emails.length})</h1>
        <Button onClick={exportCsv} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Input
        placeholder="Search by email or name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="rounded-lg border border-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Mailchimp</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{[e.first_name, e.last_name].filter(Boolean).join(' ') || '-'}</TableCell>
                  <TableCell>{e.source}</TableCell>
                  <TableCell>
                    <Badge variant={e.mailchimp_synced ? 'default' : 'secondary'}>
                      {e.mailchimp_synced ? 'Synced' : 'Not synced'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(e.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No signups yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CmsVipList;
