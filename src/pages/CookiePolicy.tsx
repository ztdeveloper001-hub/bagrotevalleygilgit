import { motion } from 'motion/react';
import { Cookie, ShieldCheck, Info, Settings, Eye, HelpCircle } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">
            <Cookie size={14} />
            Cookie Settings
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary mb-6">Cookie <span className="text-brand-accent italic">Policy</span></h1>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">Last updated: March 25, 2026</p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <Info size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">What Are Cookies?</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">How We Use Cookies</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies for several reasons, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>To provide essential services and features</li>
              <li>To personalize your experience on our platform</li>
              <li>To analyze how our services are used and to improve them</li>
              <li>To deliver relevant advertising and marketing content</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <Settings size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Types of Cookies We Use</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-brand-primary mb-2">Essential Cookies</h3>
                <p className="text-sm text-gray-500">Necessary for the website to function properly. They cannot be disabled.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-brand-primary mb-2">Performance & Analytics</h3>
                <p className="text-sm text-gray-500">Help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-brand-primary mb-2">Marketing Cookies</h3>
                <p className="text-sm text-gray-500">Used to track visitors across websites to display relevant and engaging ads.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Managing Cookies</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              You can control and manage cookies in your browser settings. Please note that disabling cookies may affect the functionality of our website and other services.
            </p>
          </section>

          <div className="pt-12 border-t border-gray-100">
            <p className="text-sm text-gray-400 text-center">
              If you have any questions about our Cookie Policy, please contact us at <span className="text-brand-accent font-bold">cookies@bagrotevalley.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
