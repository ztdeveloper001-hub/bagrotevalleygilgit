import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, FileText, UserCheck, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            Legal & Privacy
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary mb-6">Privacy <span className="text-brand-accent italic">Policy</span></h1>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">Last updated: March 25, 2026</p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Information We Collect</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us when you use our services, including your name, email address, phone number, and any other information you choose to provide.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Personal identifiers (name, email, phone number)</li>
              <li>Booking and transaction details</li>
              <li>User-generated content (reviews, comments)</li>
              <li>Technical data (IP address, browser type, device info)</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">How We Use Your Information</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to provide, maintain, and improve our services, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Processing your bookings and orders</li>
              <li>Communicating with you about our services</li>
              <li>Personalizing your experience on our platform</li>
              <li>Ensuring the security and integrity of our services</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <Globe size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Information Sharing</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We do not share your personal information with third parties except as described in this policy, such as with service providers who perform services on our behalf or as required by law.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                <UserCheck size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary">Your Choices</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, update, or delete your personal information. You can also opt-out of receiving promotional communications from us at any time.
            </p>
          </section>

          <div className="pt-12 border-t border-gray-100">
            <p className="text-sm text-gray-400 text-center">
              If you have any questions about this Privacy Policy, please contact us at <span className="text-brand-accent font-bold">privacy@bagrotevalley.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
