import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-24 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last Updated: January 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
            <p className="leading-relaxed">
              Bottles Up ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our vendor platform.
            </p>
            <p className="leading-relaxed mt-4">
              By using our services, you consent to the data practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium mb-2 text-white">2.1. Account Information</h3>
            <p className="mb-2">When you register as a vendor, we collect:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Full name and business name</li>
              <li>Email address and phone number</li>
              <li>Business address and location</li>
              <li>Tax identification information</li>
              <li>Banking and payment details</li>
              <li>Profile photos and business logos</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">2.2. Business Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Event listings and descriptions</li>
              <li>Inventory and product details</li>
              <li>Pricing and availability</li>
              <li>Operating hours and policies</li>
              <li>Business licenses and certifications</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">2.3. Transaction Data</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Booking details and history</li>
              <li>Payment transactions</li>
              <li>Refund and cancellation records</li>
              <li>Customer communication logs</li>
              <li>Financial reports and analytics</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">2.4. Technical Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Location data</li>
              <li>App usage patterns and analytics</li>
              <li>Crash reports and error logs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
            <p className="mb-4">We use collected information to:</p>

            <h3 className="text-xl font-medium mb-2 text-white">3.1. Provide Services</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Create and manage your account</li>
              <li>Process bookings and payments</li>
              <li>Facilitate customer communication</li>
              <li>Generate analytics and reports</li>
              <li>Provide customer support</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">3.2. Improve Our Platform</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Enhance user experience</li>
              <li>Develop new features</li>
              <li>Conduct research and analysis</li>
              <li>Fix bugs and technical issues</li>
              <li>Optimize performance</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">3.3. Communication</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Send booking notifications</li>
              <li>Provide account updates</li>
              <li>Share promotional content (with consent)</li>
              <li>Send administrative messages</li>
              <li>Request feedback and reviews</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">3.4. Security and Compliance</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Detect and prevent fraud</li>
              <li>Enforce our Terms of Service</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Protect user safety</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Information Sharing</h2>

            <h3 className="text-xl font-medium mb-2 text-white">4.1. With Customers</h3>
            <p className="mb-2">We share necessary information with customers for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Booking confirmations</li>
              <li>Event details and locations</li>
              <li>Contact information for coordination</li>
              <li>Business verification</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">4.2. With Service Providers</h3>
            <p className="mb-2">We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Cloud storage providers (AWS, Firebase)</li>
              <li>Analytics services (Google Analytics)</li>
              <li>Email service providers</li>
              <li>Customer support tools</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">4.3. For Legal Reasons</h3>
            <p className="mb-2">We may disclose information:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To comply with legal obligations</li>
              <li>In response to court orders or subpoenas</li>
              <li>To protect our rights and property</li>
              <li>To prevent fraud or illegal activities</li>
              <li>In connection with business transfers</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">4.4. With Your Consent</h3>
            <p>We may share information for purposes you explicitly approve.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Data Security</h2>

            <h3 className="text-xl font-medium mb-2 text-white">5.1. Security Measures</h3>
            <p className="mb-2">We implement industry-standard security:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Encryption of data in transit (TLS/SSL)</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Secure authentication systems</li>
              <li>Regular security audits</li>
              <li>Access controls and monitoring</li>
              <li>Secure backup systems</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">5.2. Your Responsibility</h3>
            <p className="mb-2">You must:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Keep login credentials confidential</li>
              <li>Use strong, unique passwords</li>
              <li>Enable two-factor authentication</li>
              <li>Report suspicious activity immediately</li>
              <li>Secure your devices and network</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">5.3. No Absolute Security</h3>
            <p>While we strive to protect your data, no system is completely secure. We cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Your Rights and Choices</h2>

            <h3 className="text-xl font-medium mb-2 text-white">6.1. Access and Correction</h3>
            <p className="mb-2">You can:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access your personal information</li>
              <li>Update or correct inaccuracies</li>
              <li>Download your data</li>
              <li>Request data portability</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">6.2. Deletion Rights</h3>
            <p className="mb-2">You may request deletion of your account and data, subject to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Completion of active bookings</li>
              <li>Resolution of pending issues</li>
              <li>Legal retention requirements</li>
              <li>Financial record obligations</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">6.3. Communication Preferences</h3>
            <p className="mb-2">You can:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Opt out of marketing emails</li>
              <li>Adjust notification settings</li>
              <li>Control data sharing preferences</li>
              <li>Manage cookie settings</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">6.4. Do Not Sell</h3>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Data Retention</h2>
            <p className="mb-4">We retain your information:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Account data: Duration of account plus 7 years</li>
              <li>Transaction records: 7 years for tax purposes</li>
              <li>Communication logs: 3 years</li>
              <li>Technical logs: 90 days</li>
              <li>Marketing data: Until you opt out</li>
            </ul>
            <p>Retention periods may be extended for legal compliance or dispute resolution.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. International Data Transfers</h2>
            <p className="mb-2">Your information may be transferred to and processed in:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>United States (primary servers)</li>
              <li>European Union (backup servers)</li>
              <li>Other countries where our service providers operate</li>
            </ul>
            <p>We ensure appropriate safeguards for international transfers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our services are not intended for individuals under 18. We do not knowingly collect data from minors. If we discover such collection, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Cookies and Tracking</h2>
            
            <h3 className="text-xl font-medium mb-2 text-white">10.1. Types of Cookies</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Essential cookies (required for functionality)</li>
              <li>Analytics cookies (usage tracking)</li>
              <li>Preference cookies (user settings)</li>
              <li>Marketing cookies (advertising)</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 text-white">10.2. Your Choices</h3>
            <p className="mb-2">You can control cookies through:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Browser settings</li>
              <li>Cookie consent manager</li>
              <li>Opt-out tools</li>
            </ul>
            <p>Disabling cookies may limit functionality.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">11. Third-Party Links</h2>
            <p className="leading-relaxed">
              Our platform may contain links to third-party websites. We are not responsible for their privacy practices. Please review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">12. Changes to This Policy</h2>
            <p className="mb-2">We may update this Privacy Policy periodically. Material changes will be communicated via:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Email notification</li>
              <li>In-app announcements</li>
              <li>Website banners</li>
            </ul>
            <p>Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">13. Contact Information</h2>
            <p className="mb-4">For privacy-related questions or requests:</p>
            <div className="space-y-2">
              <p><span className="text-white font-medium">Email:</span> <a href="mailto:privacy@bottlesup.com" className="text-orange-500 hover:underline">privacy@bottlesup.com</a></p>
              <p><span className="text-white font-medium">Phone:</span> +1-800-BOTTLES</p>
              <p><span className="text-white font-medium">Mail:</span> Bottles Up Privacy Team, 123 Main Street, New York, NY 10001</p>
              <p><span className="text-white font-medium">Data Protection Officer:</span> <a href="mailto:dpo@bottlesup.com" className="text-orange-500 hover:underline">dpo@bottlesup.com</a></p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
