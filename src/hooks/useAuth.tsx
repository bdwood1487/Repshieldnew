import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Contractor } from '../types/database';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  contractor: Contractor | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: { business_name: string; trade_category: string }) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [contractor, setContractor] = useState<Contractor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) fetchContractor(s.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) fetchContractor(s.user.id);
      else setContractor(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchContractor(userId: string) {
    const { data } = await supabase
      .from('contractors')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    setContractor(data as Contractor | null);
  }

  async function signUp(email: string, password: string, metadata: { business_name: string; trade_category: string }) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    if (error) return { error: error.message };

    const { data: { user: u } } = await supabase.auth.getUser();
    if (u) {
      await supabase.from('contractors').insert({
        user_id: u.id,
        business_name: metadata.business_name,
        trade_category: metadata.trade_category,
        email,
        billing_status: 'pending',
        plan: 'free',
      });
      await fetchContractor(u.id);
    }
    return { error: null };
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setContractor(null);
  }

  return (
    <AuthContext.Provider value={{ user, session, contractor, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
