import { Layout } from "@/components/layout";
import { ArrowLeft, Loader2, Search, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export default function Payments() {
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [searchNumber, setSearchNumber] = useState<string>("");
  const { toast } = useToast();

  const { data: invoice, isLoading, isError, error } = useQuery({
    queryKey: ['invoice', searchNumber],
    queryFn: async () => {
      if (!searchNumber) return null;
      const res = await fetch(buildUrl(api.invoices.getByNumber.path, { number: searchNumber }));
      if (!res.ok) {
        throw new Error("Invoice not found or could not be loaded");
      }
      return res.json();
    },
    enabled: !!searchNumber,
    retry: false
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNumber.trim()) return;
    setSearchNumber(invoiceNumber.trim());
  };

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
          
          {!invoice ? (
            <div className="space-y-8">
              <div className="text-center">
                <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold text-white mb-2">Secure Payment Portal</h3>
                <p>Enter your invoice number below to view details and make a secure, PCI-compliant payment.</p>
              </div>

              <form onSubmit={handleSearch} className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-search" className="text-white">Invoice Number</Label>
                  <div className="relative">
                    <Input 
                      id="invoice-search" 
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      placeholder="e.g. INV-TEST-001" 
                      className="bg-white/5 border-white/10 text-white pl-10 h-12" 
                    />
                    <Search className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                  </div>
                </div>
                
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Next"}
                </Button>

                {isError && (
                  <p className="text-red-400 text-sm text-center mt-2">
                    {error instanceof Error ? error.message : "Invoice not found. Please check the number and try again."}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-3xl font-display font-bold text-white">Invoice {invoice.invoiceNumber}</h3>
                  <p className="text-white/70 mt-1">Billed to: {invoice.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/50 uppercase tracking-wider mb-1">Total Due</p>
                  <p className="text-4xl font-display font-bold text-primary">
                    ${(invoice.amount / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              {invoice.status === 'paid' ? (
                <div className="p-6 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-center">
                  <ShieldCheck className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="text-lg font-bold mb-1">Invoice Paid</h4>
                  <p>Thank you for your business. This invoice has been settled.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-center text-white/80">
                    To maintain strict PCI compliance, we do not process credit cards directly on our server. 
                    Please select your preferred secure payment processor below:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-16 text-lg border-white/20 hover:bg-white/5"
                      onClick={() => toast({ title: "Coming soon", description: "Stripe integration is pending." })}
                    >
                      Pay with Stripe
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 text-lg border-white/20 hover:bg-white/5"
                      onClick={() => toast({ title: "Coming soon", description: "PayPal integration is pending." })}
                    >
                      Pay with PayPal
                    </Button>
                  </div>
                </div>
              )}

              <div className="pt-6 text-center">
                <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => {
                  setSearchNumber("");
                  setInvoiceNumber("");
                }}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Search Another Invoice
                </Button>
              </div>
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
