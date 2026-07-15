import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface CmsAuthState {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
}

export function useCmsAuth() {
  const [state, setState] = useState<CmsAuthState>({
    session: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    const resolve = async (session: Session | null) => {
      if (!session) {
        if (!cancelled) setState({ session: null, isAdmin: false, loading: false });
        return;
      }

      const { data, error } = await supabase
        .from('cms_admins')
        .select('id')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!cancelled) {
        setState({ session, isAdmin: !error && !!data, loading: false });
      }
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({ ...prev, loading: true }));
      resolve(session);
    });

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return state;
}

export async function cmsSignIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function cmsSignOut() {
  await supabase.auth.signOut();
}
