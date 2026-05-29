import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Phone, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { EscalationFormData } from '../types/database';
import { SEOHead } from '../components/SEOHead';
import type { Contractor } from '../types/database';

export default function CustomerDashboard() {
  const { contractorId } = useParams<{ contractorId: string }>();
  const [contractor, setContractor] = useState<Contractor | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<EscalationFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      if (!contractorId) return;
      const { data } = await supabase
        .from('contractors')
        .select('*')
        .eq('id', contractorId)
        .maybeSingle();
      setContractor(data as Contractor | null);
      setLoading(false);
    }
    load();
  }, [contractorId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contractorId) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('escalations').insert({
        contractor_id: contractorId,
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        message: form.message,
        status: 'open',
        priority: 'high',
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Escalation submission failed:', err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!contractor) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Business Not Found</h2>
          <p className="text-slate-400">This feedback link may be invalid or expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead
        title={`Share Your Experience — ${contractor.business_name}`}
        description={`Leave feedback for ${contractor.business_name}. Choose to share publicly on Google or escalate privately to management.`}
      />

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{contractor.business_name}</h1>
          <p className="text-slate-400 text-sm sm:text-base">We value your feedback. Choose how you'd like to share your experience.</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Escalation Submitted</h2>
            <p className="text-slate-400">Your message has been sent directly to management as a priority alert. Expect a rapid response.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {/* Path A: Public Google Review */}
            <a
              href={contractor.google_review_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-600/10 transition-all duration-300 block"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
                  <Star className="w-7 h-7 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold mb-1">Share Your Experience on Google</h2>
                  <p className="text-slate-400 text-sm mb-4">Leave a public review on our Google Business Profile. Your feedback helps our business grow.</p>
                  <span className="inline-flex items-center gap-2 bg-blue-600 group-hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                    Review on Google
                  </span>
                </div>
              </div>
            </a>

            {/* Path B: Private Escalation */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-600/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-600/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold mb-1">Direct Escalation to Management</h2>
                  <p className="text-slate-400 text-sm mb-4">
                    This form triggers an immediate priority alert on the owner's phone.
                  </p>

                  {/* Hotline Call Button */}
                  <a
                    href="tel:18633981487"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors mb-4 w-full sm:w-auto justify-center"
                  >
                    <Phone className="w-4 h-4" />
                    Call 1-863-398-1487 Now
                  </a>

                  <p className="text-slate-500 text-xs mb-4">
                    Click above to call 1-863-398-1487 or fill out the form below to request a rapid fix, resolution, or billing adjustment within minutes.
                  </p>

                  {!showForm ? (
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Open Escalation Form
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4 border-t border-slate-700 pt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          value={form.customer_name}
                          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          required
                          value={form.customer_email}
                          onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone (Optional)</label>
                        <input
                          type="tel"
                          value={form.customer_phone}
                          onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Describe Your Issue</label>
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm resize-none"
                          placeholder="Tell us what happened and how we can make it right..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        {submitting ? 'Sending...' : 'Send Priority Alert'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-slate-600 text-xs mt-8">
          Both options are presented with equal weight in compliance with the FTC Consumer Review Fairness Act.
        </p>
      </div>
    </div>
  );
}
