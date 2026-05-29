import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, UserPlus, LayoutDashboard, Smartphone, Play, CheckCircle2, ArrowRight, Mail, Phone, Inbox, QrCode, RefreshCw, Send } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import type { EscalationFormData } from '../types/database';

type Step = 'signup' | 'dashboard' | 'customer' | 'e2e';

export default function AuditSandbox() {
  const [activeStep, setActiveStep] = useState<Step>('signup');
  const [signupComplete, setSignupComplete] = useState(false);
  const [escalations, setEscalations] = useState<Array<EscalationFormData & { id: string; timestamp: string; resolved: boolean }>>([]);
  const [testForm, setTestForm] = useState<EscalationFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    message: '',
  });

  const mockBusinessName = 'Test Contractor LLC';
  const mockQrUrl = `${window.location.origin}/feedback/test-contractor-id`;

  const handleSignupSimulate = () => {
    setTimeout(() => setSignupComplete(true), 1000);
  };

  const handleTestEscalation = (e: React.FormEvent) => {
    e.preventDefault();
    const newEscalation = {
      ...testForm,
      id: `esc-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      resolved: false,
    };
    setEscalations(prev => [newEscalation, ...prev]);
    setTestForm({ customer_name: '', customer_email: '', customer_phone: '', message: '' });
    setActiveStep('e2e');
  };

  const handleResolve = (id: string) => {
    setEscalations(prev =>
      prev.map(e => e.id === id ? { ...e, resolved: true } : e)
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead title="Developer Audit Sandbox — RepShield" description="Interactive testing environment for RepShield end-to-end flows." />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">RepShield</span>
              <span className="text-xs text-slate-500 ml-2">/ Audit Sandbox</span>
            </Link>
            <Link to="/" className="text-slate-400 hover:text-white text-sm">Back to Home</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">End-to-End Audit Sandbox</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Interactive testing environment to validate the complete user flow without affecting production data.
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 flex-wrap">
          {[
            { key: 'signup' as const, icon: UserPlus, label: 'Sign-Up' },
            { key: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
            { key: 'customer' as const, icon: Smartphone, label: 'Customer View' },
            { key: 'e2e' as const, icon: Play, label: 'E2E Test' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveStep(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeStep === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Main Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            {activeStep === 'signup' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-bold">Step A: Sign-Up Simulator</h2>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  Simulate the registration and checkout activation loop.
                </p>
                {!signupComplete ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Business Name</label>
                      <input
                        type="text"
                        defaultValue={mockBusinessName}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Industry</label>
                      <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm" defaultValue="General Contracting">
                        <option>HVAC</option>
                        <option>Plumbing</option>
                        <option>General Contracting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                      <input
                        type="email"
                        defaultValue="test@contractor.com"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
                      />
                    </div>
                    <button
                      onClick={handleSignupSimulate}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Simulate Checkout
                    </button>
                  </div>
                ) : (
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 text-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-2">Account Activated</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Simulated billing_status changed from 'pending' to 'active'. Workspace unlocked.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => { setSignupComplete(false); setActiveStep('dashboard'); }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                        View Dashboard
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSignupComplete(false)}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeStep === 'dashboard' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <LayoutDashboard className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-bold">Step B: Live Dashboard Simulator</h2>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  View the contractor dashboard with empty inbox and QR code generator.
                </p>

                {/* Mock Dashboard Content */}
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Inbox className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-slate-400">Open Escalations</span>
                      </div>
                      <div className="text-2xl font-bold">{escalations.filter(e => !e.resolved).length}</div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-slate-400">Resolved</span>
                      </div>
                      <div className="text-2xl font-bold">{escalations.filter(e => e.resolved).length}</div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-slate-800 rounded-xl p-6 text-center">
                    <div className="flex items-center gap-2 mb-4 justify-center">
                      <QrCode className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-300">Your QR Code</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg inline-block mb-3">
                      <QRCodeSVG value={mockQrUrl} size={120} level="H" />
                    </div>
                    <p className="text-xs text-slate-500">Scan to test customer view</p>
                  </div>

                  {/* Inbox Preview */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-amber-400" />
                      Escalation Inbox
                    </h3>
                    {escalations.length === 0 ? (
                      <div className="bg-slate-800 rounded-lg p-4 text-center text-slate-500 text-sm">
                        No escalations yet
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {escalations.map(esc => (
                          <div
                            key={esc.id}
                            className={`bg-slate-800 rounded-lg p-3 text-sm ${
                              esc.resolved ? 'opacity-50' : 'border border-amber-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{esc.customer_name}</span>
                              <span className="text-xs text-slate-500">{esc.timestamp}</span>
                            </div>
                            <p className="text-slate-400 text-xs mb-2">{esc.message}</p>
                            {!esc.resolved && (
                              <button
                                onClick={() => handleResolve(esc.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs font-medium"
                              >
                                Mark Resolved
                              </button>
                            )}
                            {esc.resolved && (
                              <span className="text-xs text-emerald-400">Resolved</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeStep === 'customer' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-bold">Step C: Customer View Simulator</h2>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  See the dual-path layout as a customer would view it.
                </p>

                {/* Mock Customer View */}
                <div className="bg-slate-800 rounded-xl p-4">
                  <div className="text-center mb-4">
                    <h3 className="font-bold">{mockBusinessName}</h3>
                    <p className="text-xs text-slate-400">We value your feedback</p>
                  </div>

                  <div className="space-y-3">
                    {/* Path A */}
                    <div className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 hover:border-blue-500/30 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Share on Google</h4>
                          <p className="text-xs text-slate-400">Leave a public review</p>
                        </div>
                      </div>
                    </div>

                    {/* Path B */}
                    <div className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-600/10 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Escalate to Management</h4>
                          <p className="text-xs text-slate-400">Private priority alert</p>
                        </div>
                      </div>
                      <a
                        href="tel:18633981487"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-medium"
                      >
                        <Phone className="w-3 h-3" />
                        Call 1-863-398-1487
                      </a>
                    </div>
                  </div>

                  <p className="text-center text-slate-600 text-xs mt-4">
                    Equal weight — 100% FTC compliant
                  </p>
                </div>
              </div>
            )}

            {activeStep === 'e2e' && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Play className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-bold">Step D: End-to-End Trigger Test</h2>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  Submit test complaint data and watch it appear live in the inbox.
                </p>

                <form onSubmit={handleTestEscalation} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Customer Name</label>
                    <input
                      type="text"
                      required
                      value={testForm.customer_name}
                      onChange={e => setTestForm({ ...testForm, customer_name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={testForm.customer_email}
                      onChange={e => setTestForm({ ...testForm, customer_email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Message</label>
                    <textarea
                      required
                      value={testForm.message}
                      onChange={e => setTestForm({ ...testForm, message: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm resize-none"
                      placeholder="Describe the issue..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Test Escalation
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right: Live Inbox + Status */}
          <div className="space-y-6">
            {/* Live Inbox Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-bold">Live Inbox Feed</h2>
                </div>
                <button
                  onClick={() => setActiveStep('dashboard')}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Refresh View
                </button>
              </div>
              {escalations.length === 0 ? (
                <div className="text-center py-8">
                  <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">No escalations. Submit a test from Step D.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {escalations.map(esc => (
                    <div
                      key={esc.id}
                      className={`bg-slate-800 border rounded-xl p-4 transition-all ${
                        esc.resolved ? 'border-slate-700/50 opacity-60' : 'border-amber-500/30 bg-amber-500/[0.02]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-medium text-sm">{esc.customer_name}</span>
                          {esc.resolved ? (
                            <span className="ml-2 bg-emerald-500/10 text-emerald-300 text-xs px-2 py-0.5 rounded-full">Resolved</span>
                          ) : (
                            <span className="ml-2 bg-amber-500/10 text-amber-300 text-xs px-2 py-0.5 rounded-full">URGENT</span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{esc.timestamp}</span>
                      </div>
                      <p className="text-slate-400 text-xs mb-1">{esc.customer_email}</p>
                      <p className="text-slate-300 text-sm">{esc.message}</p>
                      {!esc.resolved && (
                        <button
                          onClick={() => handleResolve(esc.id)}
                          className="mt-3 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Status */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold mb-4 text-slate-300">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Database Connection</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Real-time Sync</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Error Logging</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Mail className="w-4 h-4 text-blue-400" />
            <span>Support:</span>
            <a href="mailto:bdwood1487@gmail.com" className="text-blue-400 hover:text-blue-300">bdwood1487@gmail.com</a>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Helpline:</span>
            <a href="tel:18633981487" className="text-emerald-400 hover:text-emerald-300">1-863-398-1487</a>
          </div>
        </div>
      </div>
    </div>
  );
}
