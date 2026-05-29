import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Star, MessageSquare, Phone, ArrowRight, CheckCircle2, Lock, QrCode, Bell, Mail } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { PayPalButton } from '../components/PayPalButton';

const TRADES = [
  'HVAC Technicians', 'Plumbers', 'Auto Repair Shops', 'Hair Salons', 'Dentists',
  'Roofers', 'Electricians', 'Law Firms', 'Veterinarians', 'Gyms & Fitness',
  'Bakeries', 'Moving Companies', 'Landscapers', 'Painters', 'General Contractors',
  'Chiropractors', 'Real Estate Agents', 'Insurance Agents', 'Pest Control', 'Pool Service',
  'Towing Companies', 'Locksmiths', 'Carpet Cleaners', 'Window Washers', 'Handyman Services',
  'Appliance Repair', 'Flooring Contractors', 'Remodelers', 'Tree Service', 'Solar Installers',
  'Massage Therapists', 'Optometrists', 'Pet Groomers', 'Dry Cleaners', 'Tailors',
  'Photographers', 'Caterers', 'Event Planners', 'Interior Designers', 'Accountants',
];

export default function HomePage() {
  const [roiReviews, setRoiReviews] = useState(10);
  const [roiAvgValue, setRoiAvgValue] = useState(150);

  const monthlyNewReviews = roiReviews;
  const annualNewReviews = monthlyNewReviews * 12;
  const additionalRevenue = annualNewReviews * roiAvgValue;
  const annualCost = 99 * 12;
  const roiMultiplier = Math.max(1, Math.round(additionalRevenue / annualCost));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'RepShield',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'FTC-compliant reputation management software for local contractors.',
    offers: { '@type': 'Offer', price: '99', priceCurrency: 'USD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '312' },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <SEOHead
        title="RepShield — FTC-Compliant Reputation & Support Hub for Local Contractors"
        description="RepShield accelerates 5-star Google reviews while routing customer service issues to an instant private manager hotline—100% compliant with FTC & Google rules."
        keywords="how to get more google reviews legally, local business reputation management software, FTC compliant review tool, google maps support hotline software"
        jsonLd={jsonLd}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">RepShield</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#legal" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Legal Advantage</a>
              <a href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Pricing</a>
              <a href="#industries" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Industries</a>
              <Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Sign In</Link>
            </div>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-600/20"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">100% FTC & Google Compliant</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            The Legally Sound Reputation
            <br />
            <span className="text-blue-400">& Support Hub for Local Contractors</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            RepShield accelerates 5-star Google reviews while routing customer service issues to an instant private manager hotline—100% compliant with FTC & Google rules.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PayPalButton className="px-8 py-3.5 rounded-xl text-base flex items-center gap-2">
              Subscribe Now — $99/mo
              <ArrowRight className="w-4 h-4" />
            </PayPalButton>
            <a
              href="#legal"
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-xl font-semibold text-base transition-all border border-slate-700"
            >
              See Legal Advantage
            </a>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 justify-center sm:justify-start p-4 bg-slate-900/50 rounded-xl border border-slate-800/50 hover:border-slate-700/50 transition-colors">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="text-slate-300 text-sm font-medium">Accelerate 5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start p-4 bg-slate-900/50 rounded-xl border border-slate-800/50 hover:border-slate-700/50 transition-colors">
              <Phone className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300 text-sm font-medium">Instant Private Hotline</span>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start p-4 bg-slate-900/50 rounded-xl border border-slate-800/50 hover:border-slate-700/50 transition-colors">
              <Lock className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 text-sm font-medium">Zero Legal Risk</span>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Advantage */}
      <section id="legal" className="py-20 sm:py-28 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">The Compliant Growth Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Legal Advantage</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Standard review tools illegally gate reviews by filtering angry users, risking catastrophic Google bans and FTC fines.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-300">The Illegal Approach</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1">&times;</span><span>Star-gating: Shows a 1-5 rating screen first</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1">&times;</span><span>Routes negative users privately, positive ones publicly</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1">&times;</span><span>Violates FTC Consumer Review Fairness Act</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1">&times;</span><span>Risk of Google Business Profile suspension</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-1">&times;</span><span>Potential FTC fines up to $50,120 per violation</span></li>
              </ul>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-emerald-300">The RepShield Approach</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /><span>Simultaneous dual-action: Both paths shown with equal weight</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /><span>Zero screening, zero sentiment filtering</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /><span>Full FTC Consumer Review Fairness Act compliance</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /><span>Full Google Terms of Service compliance</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /><span>Customers naturally choose private fix for faster resolution</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center max-w-3xl mx-auto bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              By giving users an instant, direct private resolution path right next to the Google link, customers naturally choose the faster private fix to get their issues solved instantly, keeping your public map rating flawless and 100% legal.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How RepShield Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Three steps to legally accelerate reviews and resolve issues fast.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 text-center hover:border-slate-700/50 transition-colors">
              <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <QrCode className="w-7 h-7 text-blue-400" />
              </div>
              <div className="text-blue-400 font-bold text-sm mb-2">Step 1</div>
              <h3 className="text-lg font-bold mb-2">Generate Your QR Code</h3>
              <p className="text-slate-400 text-sm">Create a custom QR code for your business. Place it on receipts, windows, and invoices.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 text-center hover:border-slate-700/50 transition-colors">
              <div className="w-14 h-14 bg-emerald-600/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <MessageSquare className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="text-emerald-400 font-bold text-sm mb-2">Step 2</div>
              <h3 className="text-lg font-bold mb-2">Customer Scans & Chooses</h3>
              <p className="text-slate-400 text-sm">They see two equal options: leave a Google review or escalate privately to management.</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 text-center hover:border-slate-700/50 transition-colors">
              <div className="w-14 h-14 bg-amber-600/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Bell className="w-7 h-7 text-amber-400" />
              </div>
              <div className="text-amber-400 font-bold text-sm mb-2">Step 3</div>
              <h3 className="text-lg font-bold mb-2">Instant Resolution</h3>
              <p className="text-slate-400 text-sm">Escalations hit your inbox instantly. Resolve issues before they become bad reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Marquee */}
      <section id="industries" className="py-16 bg-slate-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Built for Every Local Trade</h2>
            <p className="text-slate-400">RepShield works across 40+ industries.</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          <div className="flex gap-4 animate-marquee">
            {[...TRADES, ...TRADES].map((trade, i) => (
              <div
                key={`${trade}-${i}`}
                className="flex-shrink-0 bg-slate-800/50 border border-slate-700/50 rounded-lg px-5 py-3 text-slate-300 text-sm font-medium hover:border-slate-600/50 transition-colors"
              >
                {trade}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Honest Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">No hidden fees. No contracts. Cancel anytime.</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 sm:p-10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-1">RepShield Pro</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">$99</span>
                  <span className="text-slate-400">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Dynamic QR Code Generator',
                  'Simultaneous Escalation Dashboard',
                  'Unlimited Feedback Requests',
                  'Live Analytics Dashboard',
                  'Automated Internal Inbox Alerts',
                  'Instant Priority Notifications',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <PayPalButton className="w-full py-3.5 rounded-xl text-base flex items-center justify-center gap-2 group">
                Subscribe Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </PayPalButton>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">ROI Calculator</h3>
              <p className="text-slate-400">See how RepShield pays for itself—many times over.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800/50 rounded-2xl p-8 sm:p-10">
              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">New Reviews per Month</label>
                  <input type="range" min="5" max="50" step="1" value={roiReviews} onChange={(e) => setRoiReviews(Number(e.target.value))} className="w-full accent-blue-500" />
                  <div className="text-2xl font-bold text-blue-400 mt-2">{roiReviews}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Avg. Customer Value ($)</label>
                  <input type="range" min="50" max="500" step="10" value={roiAvgValue} onChange={(e) => setRoiAvgValue(Number(e.target.value))} className="w-full accent-blue-500" />
                  <div className="text-2xl font-bold text-blue-400 mt-2">${roiAvgValue}</div>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><div className="text-sm text-slate-400 mb-1">Annual New Reviews</div><div className="text-2xl font-bold">{annualNewReviews}</div></div>
                  <div><div className="text-sm text-slate-400 mb-1">Additional Revenue</div><div className="text-2xl font-bold text-emerald-400">${additionalRevenue.toLocaleString()}</div></div>
                  <div><div className="text-sm text-slate-400 mb-1">Your ROI</div><div className="text-2xl font-bold text-amber-400">{roiMultiplier}x</div></div>
                </div>
                <div className="mt-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <p className="text-emerald-300 text-sm font-medium">For ${annualCost}/year, RepShield can generate ${additionalRevenue.toLocaleString()} in additional revenue — a {roiMultiplier}x return on investment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-blue-600/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Protect Your Reputation?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">Join hundreds of contractors who grow their Google reviews the right way.</p>
          <PayPalButton className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg group">
            Subscribe Now — $99/mo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </PayPalButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-10 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">RepShield</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <Link to="/legal/ftc-compliance" className="hover:text-slate-300 transition-colors">FTC Compliance</Link>
              <Link to="/legal/google-compliance" className="hover:text-slate-300 transition-colors">Google Compliance</Link>
              <Link to="/legal/reputation-management" className="hover:text-slate-300 transition-colors">Reputation Management</Link>
              <Link to="/audit-sandbox" className="hover:text-slate-300 transition-colors">Developer Sandbox</Link>
            </div>
            <div className="text-sm text-slate-500 text-right">&copy; {new Date().getFullYear()} RepShield</div>
          </div>
          <div className="border-t border-slate-800/50 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Platform Support:</span>
                <a href="mailto:bdwood1487@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">bdwood1487@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Helpline:</span>
                <a href="tel:18633981487" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">1-863-398-1487</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
