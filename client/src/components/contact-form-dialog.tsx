import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateContact } from "@/hooks/use-contacts";
import { api, type ContactInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ContactFormDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createContact = useCreateContact();

  const form = useForm<ContactInput>({
    resolver: zodResolver(api.contacts.create.input),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      companyWebsite: "",
      role: "",
      service: "",
      additionalInfo: "",
    },
  });

  function onSubmit(data: ContactInput) {
    createContact.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent Successfully",
          description: "We'll be in touch with you shortly to discuss your AI journey.",
          variant: "default",
        });
        setOpen(false);
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="relative group overflow-hidden rounded-md px-6 py-2.5 font-display font-bold uppercase tracking-wider text-sm bg-primary/10 text-primary border border-primary/30 hover:border-primary/80 transition-all duration-300 glow-gold-hover hover:-translate-y-0.5">
          <span className="relative z-10 flex items-center gap-2">
            Get in Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] glass-panel border-primary/50 bg-background/95 max-h-[90vh] overflow-y-auto shadow-[0_0_20px_rgba(234,179,8,0.2)]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl tracking-wide text-foreground">
            Initiate <span className="text-primary">Contact</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Enter your details below. Our team will review your information and reach out.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name *" className="bg-black/5 dark:bg-black/20 border-foreground/10 focus-visible:ring-primary/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name *" className="bg-black/5 dark:bg-black/20 border-foreground/10 focus-visible:ring-primary/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email *" className="bg-black/5 dark:bg-black/20 border-foreground/10 focus-visible:ring-primary/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="tel" placeholder="Phone Number *" className="bg-black/5 dark:bg-black/20 border-foreground/10 focus-visible:ring-primary/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Company" className="bg-black/5 dark:bg-black/20 border-foreground/10 focus-visible:ring-primary/50" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Role" className="bg-black/5 dark:bg-black/20 border-foreground/10 focus-visible:ring-primary/50" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="url" placeholder="Company Website" className="bg-black/5 dark:bg-black/20 border-foreground/10 focus-visible:ring-primary/50" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger className="bg-black/5 dark:bg-black/20 border-foreground/10 focus:ring-primary/50">
                        <SelectValue placeholder="What services are you interested in?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background border-foreground/10">
                      <SelectItem value="Identifying AI Opportunities">Identifying AI Opportunities</SelectItem>
                      <SelectItem value="Educating your team on AI">Educating your team on AI</SelectItem>
                      <SelectItem value="Developing custom AI solutions">Developing custom AI solutions</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional Info (Current challenges...)" 
                      className="resize-none min-h-[100px] bg-black/5 dark:bg-black/20 border-foreground/10 focus-visible:ring-primary/50" 
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full font-display font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground glow-gold transition-all duration-300"
              disabled={createContact.isPending}
            >
              {createContact.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Transmitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
