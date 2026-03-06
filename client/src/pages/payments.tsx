import { Layout } from "@/components/layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Payments() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12 text-sm uppercase tracking-widest font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
          Payments & <span className="text-primary">Billing</span>
        </h1>
        
        <div className="glass-panel p-8 md:p-12 rounded-2xl space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground font-medium border-b border-white/10 pb-4">
            Secure, transparent transaction processing for GoldRise AI services.
          </p>
          
          <h3 className="text-xl font-display font-bold text-white pt-4">1. Payment Terms</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h3 className="text-xl font-display font-bold text-white pt-4">2. Accepted Methods</h3>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <h3 className="text-xl font-display font-bold text-white pt-4">3. Refund Policy</h3>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          
          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="text-white font-medium mb-2">Need billing support?</p>
            <a href="mailto:billing@goldrise.ai" className="text-primary hover:underline">billing@goldrise.ai</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
