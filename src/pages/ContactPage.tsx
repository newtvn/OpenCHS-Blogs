import { useState } from "react";
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePalette } from "@/hooks/useTheme";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactPage() {
  const { palette } = usePalette();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
      <SEO title="Contact" description="Get in touch with the OpenCHS team for questions, partnerships, or deployment support." />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <h1 className="mb-2 text-4xl font-semibold md:text-5xl">Contact Us</h1>
      <p className={`mb-12 max-w-2xl text-lg ${palette.subtle}`}>
        Have questions, want to collaborate, or interested in deploying OpenCHS? We'd love to hear from you.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Info */}
        <div className="space-y-8">
          <div className={`rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
            <h2 className="mb-6 text-2xl font-semibold">Reach Out</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Email</div>
                  <a href="mailto:contact@openchs.org" className={`hover:underline ${palette.subtle}`}>contact@openchs.org</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className={palette.subtle}>Nairobi, Kenya</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Phone</div>
                  <a href="tel:+254700000000" className={`hover:underline ${palette.subtle}`}>+254 700 000 000</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Response Time</div>
                  <div className={palette.subtle}>Usually within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
            <h2 className="mb-4 text-xl font-semibold">What can we help with?</h2>
            <div className="space-y-3">
              {[
                "Deploying OpenCHS for your organization",
                "Partnership and funding opportunities",
                "Technical support and consulting",
                "Contributing to the open source project",
                "Media inquiries and press",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <MessageSquare className={`h-4 w-4 flex-shrink-0 ${palette.subtle}`} />
                  <span className={`text-sm ${palette.subtle}`}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className={`rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
          <h2 className="mb-6 text-2xl font-semibold">Send a Message</h2>
          {submitted && (
            <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center text-green-600 dark:text-green-400">
              Message sent successfully! We'll get back to you within 24 hours.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">Name *</label>
              <Input id="name" placeholder="Your full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={palette.border} required />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email *</label>
              <Input id="email" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={palette.border} required />
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium">Subject</label>
              <Input id="subject" placeholder="What is this about?" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className={palette.border} />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">Message *</label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell us about your interest or question..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 dark:focus:border-neutral-400 dark:focus:ring-neutral-400 ${palette.border}`}
                required
              />
            </div>
            <Button type="submit" className="w-full">Send Message <Send className="ml-2 h-4 w-4" /></Button>
          </form>
        </div>
      </div>
    </div>
  );
}
