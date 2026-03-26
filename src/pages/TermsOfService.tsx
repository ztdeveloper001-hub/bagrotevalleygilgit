import { motion } from 'motion/react';
import { FileText, ShieldCheck, UserCheck, HelpCircle, AlertTriangle, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">
            <Scale size={14} />
            Legal & Compliance
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary mb-6">Terms of <span className="text-brand-accent italic">Service</span></h1>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">Last updated: March 25, 2026</p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <FileText size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Acceptance of Terms</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <UserCheck size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">User Accounts</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Prohibited Conduct</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              You agree not to use our services for any unlawful purpose or in any way that violates these Terms of Service. Prohibited conduct includes, but is not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Interfering with the security or integrity of our services</li>
              <li>Using our services to transmit any malicious code or content</li>
              <li>Engaging in any fraudulent or deceptive activity</li>
              <li>Violating the intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Disclaimer of Warranties</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted or error-free.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Limitation of Liability</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
            </p>
          </section>

          <div className="pt-12 border-t border-gray-100">
            <p className="text-sm text-gray-400 text-center">
              If you have any questions about these Terms of Service, please contact us at <span className="text-brand-accent font-bold">legal@bagrotevalley.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
