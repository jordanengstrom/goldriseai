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
          <p className="text-lg text-foreground font-medium border-b border-white/10 pb-4">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">1. Acceptance of Terms</h3>
          <p>
            Phasellus pellentesque blandit arcu, eget pharetra sapien commodo vel. Vivamus dictum dictum commodo. Vestibulum aliquet urna aliquet condimentum laoreet. Aliquam in magna non odio egestas suscipit.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">2. Service Description</h3>
          <p>
            Curabitur vulputate arcu velit, id pellentesque elit porta at. Nulla bibendum libero eu mattis scelerisque. Donec venenatis odio sed scelerisque egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          
          <h3 className="text-2xl font-display font-bold text-white pt-6">3. User Obligations</h3>
          <p>
            Maecenas id diam feugiat, molestie justo vitae, imperdiet ex. Sed in tempor magna. Vestibulum interdum ex nunc, id tempus nisl eleifend ac. Duis vitae sapien condimentum, efficitur nisi vel, egestas risus.
          </p>

          <h3 className="text-2xl font-display font-bold text-white pt-6">4. Limitation of Liability</h3>
          <p>
            Aenean vehicula eros vel lectus convallis accumsan. Integer non eros magna. Suspendisse pulvinar, est sed commodo pretium, massa mauris convallis ex, sed maximus quam metus id turpis.
          </p>
        </div>
      </div>
    </Layout>
  );
}
