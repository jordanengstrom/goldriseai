import { useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateContact,
  useSendInternalEmail,
  useSendExternalEmail,
} from "@/hooks/use-contacts";
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

type ContactFormDialogProps = {
  trigger?: ReactNode;
};

export function ContactFormDialog({ trigger }: ContactFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isFlowSubmitting, setIsFlowSubmitting] = useState(false);
  const submitLockRef = useRef(false);
  const { toast } = useToast();
  const createContact = useCreateContact();
  const sendInternalEmail = useSendInternalEmail();
  const sendExternalEmail = useSendExternalEmail();
  const isSubmitting =
    isFlowSubmitting ||
    createContact.isPending ||
    sendInternalEmail.isPending ||
    sendExternalEmail.isPending;
  const directContactEmail = "info@goldrise.ai";

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

  async function onSubmit(data: ContactInput) {
    if (submitLockRef.current) {
      return;
    }

    submitLockRef.current = true;
    setIsFlowSubmitting(true);

    try {
      await createContact.mutateAsync(data);

      toast({
        title: "Contact Info Saved",
        description: "Thanks, we saved your details successfully.",
        variant: "default",
      });

      setOpen(false);
      form.reset();

      const [internalResult, externalResult] = await Promise.allSettled([
        sendInternalEmail.mutateAsync(data),
        sendExternalEmail.mutateAsync(data),
      ]);

      if (internalResult.status === "fulfilled") {
        toast({
          title: "Team Notified",
          description: "Our team has been notified directly and will reach out shortly.",
          variant: "default",
        });
      } else {
        const message =
          internalResult.reason instanceof Error
            ? internalResult.reason.message
            : "Your message was saved but we couldn't send the notification. Please try again or contact us directly.";

        toast({
          title: "Notification Email Failed",
          description: `${message} You can reach us directly at ${directContactEmail}.`,
          variant: "destructive",
        });
      }

      if (externalResult.status === "fulfilled") {
        toast({
          title: "Confirmation Email Sent",
          description: "Please check your inbox for a confirmation email from us.",
          variant: "default",
        });
      } else {
        const message =
          externalResult.reason instanceof Error
            ? externalResult.reason.message
            : "Your request was saved but we couldn't send the confirmation email.";

        toast({
          title: "Confirmation Email Failed",
          description: `${message} You can reach us directly at ${directContactEmail}.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Please try again later.";

      toast({
        title: "Submission Failed",
        description: `${message} You can reach us directly at ${directContactEmail}.`,
        variant: "destructive",
      });
    } finally {
      submitLockRef.current = false;
      setIsFlowSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isSubmitting) {
          return;
        }
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger asChild>
        {trigger ?? (
          <button className="relative group overflow-hidden rounded-md px-6 py-2.5 font-display font-bold uppercase tracking-wider text-sm bg-primary/10 text-primary border border-primary/30 hover:border-primary/80 transition-all duration-300 dark:shadow-[0_12px_30px_-18px_rgba(59,130,246,0.75)] hover:-translate-y-0.5">
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent id="initiate-contact" className="sm:max-w-[600px] glass-panel border-primary/40 bg-[#fff9ec] dark:bg-slate-950/90">
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
                      <Input id="firstName" autoComplete="given-name" placeholder="First Name *" className="bg-white dark:bg-zinc-800/55 border-transparent focus-visible:border-primary/60 focus-visible:ring-primary/40 focus-visible:ring-offset-0" {...field} />
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
                      <Input id="lastName" autoComplete="family-name" placeholder="Last Name *" className="bg-white dark:bg-zinc-800/55 border-transparent focus-visible:border-primary/60 focus-visible:ring-primary/40 focus-visible:ring-offset-0" {...field} />
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
                      <Input id="email" autoComplete="email" type="email" placeholder="Email *" className="bg-white dark:bg-zinc-800/55 border-transparent focus-visible:border-primary/60 focus-visible:ring-primary/40 focus-visible:ring-offset-0" {...field} />
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
                      <Input id="phone" autoComplete="tel" type="tel" placeholder="Phone Number *" className="bg-white dark:bg-zinc-800/55 border-transparent focus-visible:border-primary/60 focus-visible:ring-primary/40 focus-visible:ring-offset-0" {...field} />
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
                      <Input id="company" autoComplete="organization" placeholder="Company" className="bg-white dark:bg-zinc-800/55 border-transparent focus-visible:border-primary/60 focus-visible:ring-primary/40 focus-visible:ring-offset-0" {...field} value={field.value || ''} />
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
                      <Input id="role" autoComplete="organization-title" placeholder="Role" className="bg-white dark:bg-zinc-800/55 border-transparent focus-visible:border-primary/60 focus-visible:ring-primary/40 focus-visible:ring-offset-0" {...field} value={field.value || ''} />
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
                    <Input id="companyWebsite" autoComplete="url" type="url" placeholder="Company Website" className="bg-white dark:bg-zinc-800/55 border-transparent focus-visible:border-primary/60 focus-visible:ring-primary/40 focus-visible:ring-offset-0" {...field} value={field.value || ''} />
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
                  <Select name={field.name} value={field.value || ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger id="service" name={field.name} className="bg-white dark:bg-zinc-800/55 border-transparent focus:border-primary/60 focus:ring-primary/40 focus:ring-offset-0">
                        <SelectValue placeholder="What services are you interested in?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-primary/30">
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
                      id="additionalInfo"
                      placeholder="Additional Info (Current challenges...)" 
                      className="resize-none min-h-[100px] bg-white dark:bg-zinc-800/55 border-transparent focus-visible:border-primary/60 focus-visible:ring-primary/40 focus-visible:ring-offset-0" 
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
              className="w-full font-display font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/60 hover:border-primary dark:shadow-[0_16px_36px_-18px_rgba(37,99,235,0.85)] transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
