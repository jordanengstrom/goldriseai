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
        
        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-8">
          Terms & <span className="text-primary">Conditions</span>
        </h1>
        
        <div className="glass-panel p-8 md:p-12 rounded-2xl space-y-6 text-muted-foreground leading-relaxed prose prose-invert max-w-none">
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">1. Introduction</h3>
          <p>
            Welcome to GoldRise AI. These Terms of Service ("Terms") govern your access to and use of our website and services. By accessing or using the service, you agree to be bound by these Terms.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">2. Services Provided</h3>
          <p>
            GoldRise AI provides AI strategy, Autonomous Agent Development, AI consulting services, Chatbot Development, and these services are subject to the terms and conditions outlined in this document.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">3. Fees and Payment Terms</h3>
          <p>
            Fees for our services are specified in the applicable Statement of Work (SOW) or invoice. Unless otherwise agreed in writing, all payments are due within thirty (30) days of the invoice date. Late payments may be subject to interest charges. GoldRise AI reserves the right to suspend services for non-payment.
          </p>

          <h3 className="text-2xl font-display font-bold text-foreground pt-6">4. Intellectual Property Rights</h3>
          <p>
            Pre-existing Materials: GoldRise AI retains all rights, title, and interest in and to any tools, methodologies, software, and intellectual property developed prior to or independently of the services provided to you.
            <br /><br />
            Deliverables: Upon full payment of all applicable fees, GoldRise AI grants you a non-exclusive, worldwide, royalty-free license to use the specific deliverables created for you as outlined in the SOW, solely for your internal business purposes.
          </p>

          <h3 className="text-2xl font-display font-bold text-foreground pt-6">5. Confidentiality</h3>
          <p>
            Both parties agree to maintain the confidentiality of any proprietary information disclosed during the course of the engagement. Confidential Information shall not include information that is publicly known, already known to the receiving party, or independently developed without reference to the disclosing party's confidential information.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">6. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any changes by posting the new Terms on this site. Your continued use of the service after such changes constitutes your agreement to the new Terms.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">7. Account Registration and Use</h3>
          <p>
            To access certain features of our service, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to maintain the security of your account credentials. You are responsible for all activities that occur under your account.
          </p>

          <h3 className="text-2xl font-display font-bold text-foreground pt-6">8. Privacy Policy</h3>
          <p>
            Our Privacy Policy, which describes how we handle personal data, is available on our website and forms part of these Terms. By using the service, you agree to the collection and use of information in accordance with our Privacy Policy.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">9. Acceptable Use Policy</h3>
          <p>
            You agree not to: a) use the services for any illegal purpose or in violation of any local, state, national, or international law; b) violate, or encourage others to violate, any right of a third party, including by infringing or misappropriating any third-party intellectual property right; c) attempt to bypass or break any security or rate-limiting mechanism on the services.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">10. Third-Party Services</h3>
          <p>
            Our service may rely upon or contain links to third-party services, APIs, or websites not owned or controlled by GoldRise AI. We assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">11. Termination</h3>
          <p>
            We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease. Sections relating to intellectual property, confidentiality, limitations of liability, and dispute resolution shall survive termination.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">12. Disclaimer of Warranties</h3>
          <p>
            The services are provided "as is" and "as available" without warranties of any kind, either express or implied. To the fullest extent permissible pursuant to applicable law, GoldRise AI disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">13. Limitation of Liability</h3>
          <p>
            In no event shall GoldRise AI, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; or (iii) unauthorized access, use or alteration of your transmissions or content. In no event shall the total liability of GoldRise AI exceed the amount paid by you for the services in the twelve (12) months preceding the claim.
          </p>

          <h3 className="text-2xl font-display font-bold text-foreground pt-6">14. Indemnification</h3>
          <p>
            You agree to defend, indemnify, and hold harmless GoldRise AI and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password, or b) a breach of these Terms.
          </p>

          <h3 className="text-2xl font-display font-bold text-foreground pt-6">15. Dispute Resolution and Arbitration</h3>
          <p>
            Any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof, including the determination of the scope or applicability of this agreement to arbitrate, shall be determined by binding arbitration in Seattle, Washington, before one arbitrator. The arbitration shall be administered by JAMS pursuant to its Comprehensive Arbitration Rules and Procedures. Judgment on the Award may be entered in any court having jurisdiction. Class Action Waiver: The parties agree that any arbitration shall be conducted in their individual capacities only and not as a class action or other representative action.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">16. Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Washington, United States, without regard to its conflict of law provisions.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">17. Severability</h3>
          <p>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-foreground pt-6">18. Contact Us</h3>
          <p>
            For any questions about these Terms, please contact us using the following information:<br />
            Email address:               <a 
                href="mailto:info@goldrise.ai" 
                className="text-primary"
              >
                info@goldrise.ai
              </a>
          </p>

          <p className="text-lg text-foreground font-medium border-t border-foreground/10 pt-4 mt-8" style={{ paddingTop: '2em' }}>
            Last Updated: March 7, 2026
          </p>
        </div>
      </div>
    </Layout>
  );
}
