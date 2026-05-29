import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { SEOHead } from '../components/SEOHead';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activating, setActivating] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const email = searchParams.get('email');
  const status = searchParams.get('status');

  useEffect(() => {
    async function activate() {
      if (!email || status !== 'verified') {
        setActivating(false);
        setError('Invalid payment verification. Please contact support.');
        return;
      }

      try {
        // Call the edge function to activate billing
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

        const res = await fetch(`${supabaseUrl}/functions/v1/billing-activate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonKey}`,
            'apikey': anonKey,
          },
          body: JSON.stringify({ email, status }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Activation failed');
        }

        setSuccess(true);

        // If user is logged in, also update local contractor state
        if (user) {
          await supabase
            .from('contractors')
            .update({ billing_status: 'active', plan: 'pro' })
            .eq('user_id', user.id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Activation failed. Please contact support.');
      } finally {
        setActivating(false);
      }
    }
    activate();
  }, [email, status, user]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <SEOHead title="Payment Success — RepShield" description="Your RepShield Pro subscription has been activated." />

      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">RepShield</span>
        </div>

        {activating ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Activating Your Account</h1>
            <p className="text-slate-400 text-sm">Provisioning your contractor workspace...</p>
          </div>
        ) : success ? (
          <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-8">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold mb-2">Account Activated</h1>
            <p className="text-slate-400 text-sm mb-6">
              Your RepShield Pro subscription is now active. Your QR code generator and full dashboard are unlocked.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors inline-flex items-center gap-2 group"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 border border-red-500/20 rounded-2xl p-8">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-xl">!</span>
            </div>
            <h1 className="text-xl font-bold mb-2">Activation Issue</h1>
            <p className="text-slate-400 text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
