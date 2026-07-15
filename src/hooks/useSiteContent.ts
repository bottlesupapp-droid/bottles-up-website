import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SITE_CONTENT_DEFAULTS, type SiteContent } from '@/lib/siteContentDefaults';

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(SITE_CONTENT_DEFAULTS);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('site_content')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!cancelled && !error && data) {
          setContent(data);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
