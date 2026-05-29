import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, ArrowRight, Scale, Globe, Search, Mail, Phone } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { PayPalButton } from '../components/PayPalButton';

const ContactFooter = () => (
  <div className="border-t border-slate-800/50 pt-6 mt-8">
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
);

export function FTCCompliancePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'FTC-Compliant Review Management for Local Businesses',
    description: 'How to collect customer reviews in full compliance with the FTC Consumer Review Fairness Act using RepShield.',
    author: { '@type': 'Organization', name: 'RepShield' },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead
        title="FTC-Compliant Review Tool — RepShield"
        description="Learn how RepShield ensures 100% compliance with the FTC Consumer Review Fairness Act. No star-gating, no sentiment screening, no legal risk."
        keywords="FTC compliant review tool, consumer review fairness act, legal review management, star gating illegal"
        jsonLd={jsonLd}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">RepShield</span>
            </Link>
            <PayPalButton className="px-5 py-2 rounded-lg text-sm">Subscribe — $99/mo</PayPalButton>
          </div>
        </div>
      </nav>

      <article className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <Scale className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Legal Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            FTC-Compliant Review Management for Local Businesses
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            The FTC Consumer Review Fairness Act makes it illegal to restrict customers from leaving honest reviews. RepShield is built from the ground up to be fully compliant.
          </p>
        </div>

        <div className="prose-slate space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">What Is the FTC Consumer Review Fairness Act?</h2>
            <p className="text-slate-300 leading-relaxed">
              Enacted in 2016, the Consumer Review Fairness Act protects consumers' right to post honest reviews online. It prohibits businesses from using form contracts that prevent or punish customers for leaving negative reviews. Violations can result in fines up to $50,120 per incident.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Star-Gating Is Illegal</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Star-gating—the practice of showing customers a 1-5 rating screen and then routing satisfied customers to public review sites while directing unhappy ones to private feedback—is a form of sentiment screening that violates FTC regulations.
            </p>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-300 mb-3">Illegal Practices</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2"><span className="text-red-400">&times;</span>Star-gating with sentiment-based routing</li>
                <li className="flex items-start gap-2"><span className="text-red-400">&times;</span>Filtering negative reviews before they reach public platforms</li>
                <li className="flex items-start gap-2"><span className="text-red-400">&times;</span>Using gag clauses in customer contracts</li>
                <li className="flex items-start gap-2"><span className="text-red-400">&times;</span>Retaliating against negative reviewers</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How RepShield Ensures Compliance</h2>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Simultaneous dual-action: Both paths shown with equal visual weight</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Zero sentiment screening or filtering</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">No star rating or satisfaction gate before showing options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Both paths presented identically in text size, contrast, and styling</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">The Business Advantage of Compliance</h2>
            <p className="text-slate-300 leading-relaxed">
              Compliant review collection protects you from fines and builds genuine trust. When issues arise, the private escalation path resolves them before they become negative public feedback.
            </p>
          </section>
        </div>

        <div className="mt-12 bg-blue-600/5 border border-blue-600/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Protect Your Business Today</h3>
          <p className="text-slate-400 mb-6">Start collecting reviews the legal way with RepShield.</p>
          <PayPalButton className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm group">
            Subscribe Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </PayPalButton>
        </div>

        <ContactFooter />
      </article>
    </div>
  );
}

export function GoogleCompliancePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Google-Compliant Review Collection for Local Businesses',
    description: 'How to collect Google reviews without violating Google Terms of Service.',
    author: { '@type': 'Organization', name: 'RepShield' },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead
        title="Google-Compliant Review Collection — RepShield"
        description="Learn how RepShield ensures full compliance with Google's Terms of Service for review collection."
        keywords="google compliant review collection, google business profile reviews, avoid google review ban"
        jsonLd={jsonLd}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">RepShield</span>
            </Link>
            <PayPalButton className="px-5 py-2 rounded-lg text-sm">Subscribe — $99/mo</PayPalButton>
          </div>
        </div>
      </nav>

      <article className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium">Google Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Google-Compliant Review Collection</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Google actively suspends Business Profiles that use review-gating tactics. RepShield keeps your profile safe.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Consequences of Non-Compliance</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="font-semibold text-red-300 mb-2">Profile Suspension</h3>
                <p className="text-slate-400 text-sm">Your Business Profile can be permanently removed.</p>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="font-semibold text-red-300 mb-2">Review Removal</h3>
                <p className="text-slate-400 text-sm">Google may remove all existing reviews.</p>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="font-semibold text-red-300 mb-2">Loss of Local Ranking</h3>
                <p className="text-slate-400 text-sm">Your local search results position drops dramatically.</p>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h3 className="font-semibold text-red-300 mb-2">Trust Damage</h3>
                <p className="text-slate-400 text-sm">Public exposure of manipulation tactics damages credibility.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">RepShield's Google-Safe Approach</h2>
            <p className="text-slate-300 leading-relaxed">
              RepShield presents both the Google review option and private escalation option simultaneously with identical visual weight. Complete compliance with Google's Terms of Service.
            </p>
          </section>
        </div>

        <div className="mt-12 bg-emerald-600/5 border border-emerald-600/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Keep Your Google Profile Safe</h3>
          <p className="text-slate-400 mb-6">Start using the only review tool built for full Google compliance.</p>
          <PayPalButton className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm group">
            Subscribe Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </PayPalButton>
        </div>

        <ContactFooter />
      </article>
    </div>
  );
}

export function ReputationManagementPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Get More Google Reviews Legally',
    description: 'Complete guide to legally collecting more Google reviews.',
    author: { '@type': 'Organization', name: 'RepShield' },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEOHead
        title="How to Get More Google Reviews Legally — RepShield"
        description="Complete guide to legally collecting more Google reviews for your local business."
        keywords="how to get more google reviews legally, local business reputation management software"
        jsonLd={jsonLd}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">RepShield</span>
            </Link>
            <PayPalButton className="px-5 py-2 rounded-lg text-sm">Subscribe — $99/mo</PayPalButton>
          </div>
        </div>
      </nav>

      <article className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-600/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <Search className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Reputation Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">How to Get More Google Reviews Legally</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A complete guide for local businesses on building a strong Google review profile without risking FTC fines or Google profile suspensions.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">5 Strategies for Legal Review Growth</h2>
            <div className="space-y-4">
              {[
                { title: 'Make Feedback Frictionless', desc: 'Use QR codes and short links customers can access instantly.' },
                { title: 'Present All Options Equally', desc: 'Show public and private feedback paths simultaneously with equal prominence.' },
                { title: 'Resolve Issues Privately First', desc: 'Give customers a direct private line to management.' },
                { title: 'Time Your Requests Right', desc: 'Ask for feedback right after a positive service experience.' },
                { title: 'Track and Respond', desc: 'Monitor your escalation inbox in real-time.' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800/50 rounded-xl p-5">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-400 text-sm font-bold">{i + 1}</span>
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why RepShield Is the Answer</h2>
            <p className="text-slate-300 leading-relaxed">
              RepShield implements all five strategies automatically on 100% legal autopilot.
            </p>
          </section>
        </div>

        <div className="mt-12 bg-blue-600/5 border border-blue-600/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Start Growing Your Reviews Legally</h3>
          <p className="text-slate-400 mb-6">RepShield puts your review growth on autopilot—compliantly.</p>
          <PayPalButton className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm group">
            Subscribe Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </PayPalButton>
        </div>

        <ContactFooter />
      </article>
    </div>
  );
}
