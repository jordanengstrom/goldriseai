import { Layout } from "@/components/layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Payments() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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
          
          {showPaymentForm ? (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-2xl font-display font-bold text-white mb-6">Payment Details</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-number" className="text-white">Invoice Number *</Label>
                  <Input id="invoice-number" required placeholder="INV-0000" className="bg-white/5 border-white/10 text-white" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-amount" className="text-white">Payment Amount *</Label>
                  <Input id="payment-amount" type="number" min="0" step="0.01" required placeholder="$0.00" className="bg-white/5 border-white/10 text-white" />
                </div>
                
                <div className="pt-4 space-y-4 border-t border-white/10">
                  <h4 className="text-lg font-medium text-white mb-2">Card Information</h4>
                  <div className="space-y-2">
                    <Label htmlFor="name-on-card" className="text-white">Name on Card *</Label>
                    <Input id="name-on-card" required placeholder="John Doe" className="bg-white/5 border-white/10 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="card-number" className="text-white">Card Number *</Label>
                    <Input id="card-number" required placeholder="0000 0000 0000 0000" className="bg-white/5 border-white/10 text-white" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date" className="text-white">Expiration Date *</Label>
                      <Input id="expiry-date" required placeholder="MM/YY" className="bg-white/5 border-white/10 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvc" className="text-white">CVC *</Label>
                      <Input id="cvc" required placeholder="123" className="bg-white/5 border-white/10 text-white" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postal-code" className="text-white">ZIP Code *</Label>
                      <Input id="postal-code" required placeholder="12345" className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" size="lg" className="w-full">Submit Payment</Button>
                <Button type="button" variant="outline" size="lg" onClick={() => setShowPaymentForm(false)} className="w-full">Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6">
              <Button size="lg" className="w-full max-w-sm font-semibold" onClick={() => setShowPaymentForm(true)}>
                Pay an Invoice
              </Button>
            </div>
          )}

          <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="text-white font-medium mb-2">Need billing support?</p>
            <a href="mailto:billing@goldrise.ai" className="text-primary hover:underline">billing@goldrise.ai</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
