import { Layout } from "@/components/layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 text-sm uppercase tracking-widest font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
          Terms & <span className="text-primary">Conditions</span>
        </h1>
        
        <div className="glass-panel p-8 md:p-12 rounded-2xl space-y-6 text-muted-foreground leading-relaxed prose prose-invert max-w-none">
          <h3 className="text-2xl font-display font-bold text-white pt-6">1. Introduction</h3>
          <p>
            Welcome to GoldRise AI. These Terms of Service ("Terms") govern your access to and use of our website and services. By accessing or using the service, you agree to be bound by these Terms.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">2. Services Provided</h3>
          <p>
            GoldRise AI provides AI strategy, Autonomous Agent Development, AI consulting services, Chatbot Development, and these services are subject to the terms and conditions outlined in this document.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">3. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any changes by posting the new Terms on this site. Your continued use of the service after such changes constitutes your agreement to the new Terms.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">4. Account Registration and Use</h3>
          <p>
            To access certain features of our service, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">5. Privacy Policy</h3>
          <p>
            Our Privacy Policy, which describes how we handle personal data, is available on our website and forms part of these Terms.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">6. User Conduct</h3>
          <p>
            You agree to use the service only for lawful purposes and not to use the service for any illegal or unauthorized purpose.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">7. Intellectual Property</h3>
          <p>
            All intellectual property rights in the service and its content are the exclusive property of GoldRise AI or its licensors.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">8. Third-Party Services</h3>
          <p>
            Our service may contain links to third-party websites or services that are not owned or controlled by GoldRise AI. We have no control over, and assume no responsibility for, the content or practices of any third-party websites or services.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">9. Termination</h3>
          <p>
            We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">10. Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the city of Seattle, WA, the state government of Washington, and the United States federal government.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">11. Changes to Service</h3>
          <p>
            We reserve the right to withdraw or amend our service, and any service or material we provide via the service, in our sole discretion without notice.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">12. Disclaimer and Limitation of Liability</h3>
          <p>
            The service and its content are provided "as is" without warranty of any kind. In no event will GoldRise AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">13. Contact Us</h3>
          <p>
            For any questions about these Terms, please contact us using the following information:<br />
            Email address:               <a 
                href="mailto:info@goldrise.ai" 
                className="text-primary"
              >
                info@goldrise.ai
              </a>
          </p>

          <p className="text-lg text-foreground font-medium border-t border-white/10 pt-4 mt-8" style={{ paddingTop: '2em' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </Layout>
  );
}
