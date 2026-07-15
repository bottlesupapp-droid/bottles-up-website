import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

interface Counts {
  publishedEvents: number;
  paidOrdersThisWeek: number;
  pendingOrders: number;
  vipEmails: number;
}

const CmsDashboard = () => {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const load = async () => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const [events, paid, pending, vip] = await Promise.all([
        supabase.from('site_events').select('id', { count: 'exact', head: true }).eq('status', 'published'),
        supabase
          .from('site_orders')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'paid')
          .gte('created_at', weekAgo),
        supabase.from('site_orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('vip_emails').select('id', { count: 'exact', head: true }),
      ]);

      setCounts({
        publishedEvents: events.count ?? 0,
        paidOrdersThisWeek: paid.count ?? 0,
        pendingOrders: pending.count ?? 0,
        vipEmails: vip.count ?? 0,
      });
    };

    load();
  }, []);

  const tiles = [
    { label: 'Published Events', value: counts?.publishedEvents },
    { label: 'Paid Orders (7d)', value: counts?.paidOrdersThisWeek },
    { label: 'Pending Orders', value: counts?.pendingOrders },
    { label: 'VIP List Size', value: counts?.vipEmails },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Card key={tile.label} className="border-gray-800 bg-gray-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{tile.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {tile.value ?? <span className="text-gray-600">-</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CmsDashboard;
