import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Inbox, CheckCircle2, Clock, QrCode, Download, Settings, Bell, AlertTriangle, LogOut, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import type { Escalation } from '../types/database';
import { SEOHead } from '../components/SEOHead';

export default function ContractorDashboard() {
  const { user, contractor, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [escalations, setEscalations] = useState<Escalation[]>([]);
  const [loadingEscalations, setLoadingEscalations] = useState(true);
  const [activeTab, setActiveTab] = useState<'inbox' | 'qrcode' | 'settings'>('inbox');
  const [profileForm, setProfileForm] = useState({
    business_name: '',
    google_review_url: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (contractor) {
      setProfileForm({
        business_name: contractor.business_name,
        google_review_url: contractor.google_review_url,
        phone: contractor.phone,
      });
    }
  }, [contractor]);

  const fetchEscalations = useCallback(async () => {
    if (!contractor) return;
    const { data } = await supabase
      .from('escalations')
      .select('*')
      .eq('contractor_id', contractor.id)
      .order('created_at', { ascending: false });
    setEscalations((data as Escalation[]) || []);
    setLoadingEscalations(false);
  }, [contractor]);

  useEffect(() => {
    fetchEscalations();
    const interval = setInterval(fetchEscalations, 10000);
    return () => clearInterval(interval);
  }, [fetchEscalations]);

  async function handleResolve(id: string) {
    await supabase
      .from('escalations')
      .update({ status: 'resolved', resolved_at: new Date().toISOString() })
      .eq('id', id);
    fetchEscalations();
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!contractor) return;
    setSaving(true);
    setSaveSuccess(false);
    await supabase
      .from('contractors')
      .update({
        business_name: profileForm.business_name,
        google_review_url: profileForm.google_review_url,
        phone: profileForm.phone,
      })
      .eq('id', contractor.id);
    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }

  function downloadQR() {
    const svg = document.querySelector('#contractor-qr svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      const a = document.createElement('a');
      a.download = `repshield-qr-${contractor?.business_name?.replace(/\s+/g, '-').toLowerCase() || 'code'}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const openCount = escalations.filter((e) => e.status === 'open').length;
  const resolvedCount = escalations.filter((e) => e.status === 'resolved').length;
  const qrUrl = contractor ? `${window.location.origin}/feedback/${contractor.id}` : '';
  const isActive = contractor?.billing_status === 'active';

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead title="Contractor Dashboard — RepShield" description="Manage your RepShield reputation dashboard, escalation inbox, and QR codes." />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">RepShield</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm text-slate-400">{contractor?.business_name}</span>
              <button
                onClick={signOut}
                className="text-slate-400 hover:text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Billing Status Banner */}
        {!isActive && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-amber-200 text-sm font-medium">Your account is on the free plan</p>
                <p className="text-amber-300/70 text-xs">Upgrade to Pro to unlock full features and unlimited feedback requests.</p>
              </div>
            </div>
            <Link
              to="/register"
              className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0"
            >
              Upgrade to Pro
            </Link>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Inbox className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400 font-medium">Open Escalations</span>
            </div>
            <div className="text-2xl font-bold">{openCount}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400 font-medium">Resolved</span>
            </div>
            <div className="text-2xl font-bold">{resolvedCount}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <QrCode className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Total Feedback</span>
            </div>
            <div className="text-2xl font-bold">{escalations.length}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400 font-medium">Plan</span>
            </div>
            <div className="text-lg font-bold capitalize">{contractor?.plan || 'Free'}</div>
          </div>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 bg-slate-900 rounded-xl p-1 mb-8 max-w-md">
          {[
            { key: 'inbox' as const, icon: Inbox, label: 'Inbox' },
            { key: 'qrcode' as const, icon: QrCode, label: 'QR Code' },
            { key: 'settings' as const, icon: Settings, label: 'Settings' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'inbox' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              Urgent Escalation Inbox
            </h2>
            {loadingEscalations ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : escalations.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800/50 rounded-xl p-8 text-center">
                <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No escalations yet. Share your QR code to start receiving feedback.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {escalations.map((esc) => (
                  <div
                    key={esc.id}
                    className={`bg-slate-900 border rounded-xl p-5 transition-colors ${
                      esc.status === 'open'
                        ? 'border-amber-500/30 bg-amber-500/[0.02]'
                        : 'border-slate-800/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{esc.customer_name}</span>
                          {esc.status === 'open' && (
                            <span className="bg-amber-500/10 text-amber-300 text-xs px-2 py-0.5 rounded-full font-medium">
                              URGENT
                            </span>
                          )}
                          {esc.status === 'resolved' && (
                            <span className="bg-emerald-500/10 text-emerald-300 text-xs px-2 py-0.5 rounded-full font-medium">
                              RESOLVED
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs mb-2">{esc.customer_email}</p>
                        <p className="text-slate-300 text-sm">{esc.message}</p>
                        <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(esc.created_at).toLocaleString()}
                          </span>
                          {esc.customer_phone && <span>Phone: {esc.customer_phone}</span>}
                        </div>
                      </div>
                      {esc.status === 'open' && (
                        <button
                          onClick={() => handleResolve(esc.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'qrcode' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-400" />
              Your Feedback QR Code
            </h2>
            <div className="bg-slate-900 border border-slate-800/50 rounded-2xl p-8 max-w-md mx-auto text-center">
              <div id="contractor-qr" className="inline-block bg-white p-4 rounded-xl mb-6">
                <QRCodeSVG
                  value={qrUrl}
                  size={200}
                  level="H"
                  includeMargin={false}
                  fgColor="#0f172a"
                  bgColor="#ffffff"
                />
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Customers scan this code to access your feedback dashboard.
              </p>
              <div className="bg-slate-800 rounded-lg p-3 mb-6">
                <p className="text-slate-300 text-xs font-mono break-all">{qrUrl}</p>
              </div>
              <button
                onClick={downloadQR}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 mx-auto"
              >
                <Download className="w-4 h-4" />
                Download QR Code
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-400" />
              Business Settings
            </h2>
            <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800/50 rounded-2xl p-6 sm:p-8 max-w-lg space-y-5">
              {saveSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-emerald-300 text-sm">
                  Settings saved successfully.
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Business Name</label>
                <input
                  type="text"
                  value={profileForm.business_name}
                  onChange={(e) => setProfileForm({ ...profileForm, business_name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Google Review URL</label>
                <input
                  type="url"
                  value={profileForm.google_review_url}
                  onChange={(e) => setProfileForm({ ...profileForm, google_review_url: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                  placeholder="https://search.google.com/local/writereview?placeid=..."
                />
                <p className="text-xs text-slate-500 mt-1">Your Google Business Profile review link. Customers will be directed here for public reviews.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Business Phone</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
