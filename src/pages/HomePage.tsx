import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, TrendingUp, BookOpen, Code, Mail, MapPin, Phone, Send, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePalette } from "@/hooks/useTheme";
import { blogPosts, categories, getPostsByCategory } from "@/data/blogPosts";

export default function HomePage() {
  const { palette } = usePalette();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) { setVisible(true); return; }
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } }); },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const filteredPosts = getPostsByCategory(activeCategory);
  const displayCategories = categories.map((c) =>
    c === "Technology & Social Impact" ? "Technology" :
    c === "Case Studies & Impact" ? "Impact" :
    c === "AI & Technology" ? "Technology" :
    c === "Governance & Ethics" ? "Governance" : c
  ).filter((v, i, a) => a.indexOf(v) === i);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  const faqs = [
    { q: "How can I contribute a blog post?", a: "Contact us via email with your article proposal and draft. We welcome contributions from anyone passionate about child protection technology." },
    { q: "Is openCHS really open source?", a: "Yes, fully open source under GPL-3.0 license on GitHub. You can view, fork, and contribute to the entire codebase." },
    { q: "How can organizations fund the project?", a: "Reach out through our contact form or email to discuss partnership and funding opportunities. We work with NGOs, governments, and private sector partners." },
  ];

  return (
    <>
      {/* Hero */}
      <section
        ref={sectionRef}
        className={`relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-24 transition-opacity duration-700 lg:px-12 ${
          visible ? "motion-safe:animate-[openchs-intro_1s_cubic-bezier(.25,.9,.3,1)_forwards]" : "opacity-0"
        }`}
      >
        <header className="flex flex-col gap-8">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em]">
            <span className={`rounded-full border px-4 py-1 ${palette.border} ${palette.accent}`}>openCHS AI</span>
            <span className={palette.subtle}>Blog &amp; Community</span>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Protecting Children<br />Through Technology
            </h1>
            <p className={`max-w-3xl text-lg md:text-xl ${palette.subtle}`}>
              Discover insights, impact stories, and technical deep-dives from the openCHS community.
              Join us in revolutionizing child protection with AI-powered solutions.
            </p>
          </div>
        </header>

        {/* Featured Post */}
        <Link to={`/blog/${blogPosts[0].slug}`} className="group">
          <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl ${palette.border} ${palette.card}`}>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <img src={blogPosts[0].image} alt={blogPosts[0].title} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
              </div>
              <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className={palette.accent}>Featured</Badge>
                  <Badge variant="outline">{blogPosts[0].category}</Badge>
                </div>
                <h2 className="text-3xl font-semibold leading-tight group-hover:underline md:text-4xl">{blogPosts[0].title}</h2>
                <p className={`text-base ${palette.subtle}`}>{blogPosts[0].summary}</p>
                <div className="flex items-center gap-4 text-sm">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{blogPosts[0].author[0]}</AvatarFallback>
                  </Avatar>
                  <span>{blogPosts[0].author}</span>
                  <span className={palette.subtle}>&bull;</span>
                  <span className={palette.subtle}>{blogPosts[0].published}</span>
                  <span className={palette.subtle}>&bull;</span>
                  <span className={palette.subtle}>{blogPosts[0].readTime} min read</span>
                </div>
                <Button variant="outline" className="w-fit">Read Article <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-semibold md:text-4xl">Latest Articles</h2>
          <div className="flex flex-wrap gap-2">
            {displayCategories.map((cat) => (
              <Button
                key={cat}
                variant="outline"
                size="sm"
                className={`${activeCategory === cat || (cat === "All" && activeCategory === "All") ? "ring-2 ring-neutral-400" : ""} ${palette.accent}`}
                onClick={() => {
                  if (cat === "Technology") setActiveCategory(activeCategory === "Technology & Social Impact" ? "AI & Technology" : "Technology & Social Impact");
                  else setActiveCategory(cat === "Impact" ? "Case Studies & Impact" : cat === "Governance" ? "Governance & Ethics" : cat);
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(activeCategory === "All" ? blogPosts.slice(1) : filteredPosts).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <Card className={`grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden border transition-transform duration-300 group-hover:scale-[1.02] ${palette.border} ${palette.card}`}>
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105" />
                </div>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:underline">{post.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className={palette.subtle}>{post.summary}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <div className="flex w-full items-center gap-3 text-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{post.author}</span>
                    <span className={`text-xs ${palette.subtle}`}>&bull;</span>
                    <span className={`text-xs ${palette.subtle}`}>{post.readTime} min</span>
                  </div>
                  <span className="flex w-full items-center justify-start p-0 text-sm hover:underline">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/blog">
            <Button variant="outline">View All Articles <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <div className={`rounded-3xl border p-8 md:p-12 ${palette.border} ${palette.card}`}>
          <h2 className="mb-8 text-center text-3xl font-semibold md:text-4xl">Impact by the Numbers</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Users, value: "250,000+", label: "Children Reached" },
              { icon: TrendingUp, value: "93%", label: "Faster Response Times" },
              { icon: Heart, value: "4 Countries", label: "Active Deployments" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 text-center">
                <stat.icon className="h-12 w-12" />
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className={palette.subtle}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How You Can Contribute */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <h2 className="mb-12 text-center text-3xl font-semibold md:text-4xl">How You Can Contribute</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Write a Blog Post", desc: "Share your insights and experiences with the community", to: "/contact" },
            { icon: Code, title: "Contribute Code", desc: "Help build the platform on GitHub", to: "/contributors" },
            { icon: Heart, title: "Fund the Mission", desc: "Support child protection initiatives", to: "/contact" },
          ].map((feature, idx) => (
            <Link key={idx} to={feature.to}>
              <div className={`group relative overflow-hidden rounded-2xl border p-6 transition duration-300 hover:scale-[1.02] ${palette.border} ${palette.card}`}>
                <feature.icon className="mb-4 h-10 w-10" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className={palette.subtle}>{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <div className={`rounded-3xl border p-8 md:p-12 ${palette.border} ${palette.card}`}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Get in Touch</h2>
              <p className={`mb-6 ${palette.subtle}`}>Interested in collaborating, funding, or learning more about openCHS? Reach out to us.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3"><Mail className="h-5 w-5" /><span>contact@openchs.org</span></div>
                <div className="flex items-center gap-3"><MapPin className="h-5 w-5" /><span>Nairobi, Kenya</span></div>
                <div className="flex items-center gap-3"><Phone className="h-5 w-5" /><span>+254 700 000 000</span></div>
              </div>
            </div>
            <form onSubmit={handleContact} className="space-y-4">
              {contactSubmitted && (
                <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-400">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              <div>
                <label htmlFor="c-name" className="mb-2 block text-sm font-medium">Name</label>
                <Input id="c-name" placeholder="Your name" value={contactForm.name} onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))} className={palette.border} required />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block text-sm font-medium">Email</label>
                <Input id="c-email" type="email" placeholder="your@email.com" value={contactForm.email} onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))} className={palette.border} required />
              </div>
              <div>
                <label htmlFor="c-message" className="mb-2 block text-sm font-medium">Message</label>
                <textarea id="c-message" rows={4} placeholder="Tell us about your interest..." value={contactForm.message} onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))} className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm ${palette.border}`} required />
              </div>
              <Button type="submit" className="w-full">Send Message <Send className="ml-2 h-4 w-4" /></Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <h2 className="mb-12 text-center text-3xl font-semibold md:text-4xl">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className={`w-full rounded-xl border p-6 text-left transition-all duration-300 ${palette.border} ${palette.card}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className={palette.subtle}>{faq.a}</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <div className={`rounded-3xl border p-8 text-center md:p-12 ${palette.border} ${palette.card}`}>
          <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Stay Updated</h2>
          <p className={`mb-8 ${palette.subtle}`}>Subscribe to our newsletter for the latest updates, articles, and impact stories.</p>
          {subscribed && (
            <div className="mx-auto mb-4 max-w-md rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
              Thank you for subscribing!
            </div>
          )}
          <form onSubmit={handleSubscribe} className="mx-auto flex max-w-md gap-2">
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className={`flex-1 ${palette.border}`} required />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </>
  );
}
