import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Code, Mail, MapPin, Phone, Send, ChevronDown, GitPullRequest, PenLine, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePalette } from "@/hooks/useTheme";
import { blogPosts, getPostsByCategory } from "@/data/blogPosts";
import LazyImage from "@/components/LazyImage";
import SEO from "@/components/SEO";

const filterCategories = [
  { label: "All", value: "All" },
  { label: "Technology", value: "Technology & Social Impact" },
  { label: "Product", value: "Product" },
  { label: "Impact", value: "Case Studies & Impact" },
  { label: "AI", value: "AI & Technology" },
  { label: "Developer", value: "Developer" },
  { label: "Governance", value: "Governance & Ethics" },
];

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
    { q: "Is OpenCHS really open source?", a: "Yes, fully open source under GPL-3.0 license on GitHub. You can view, fork, and contribute to the entire codebase." },
    { q: "How can organizations fund the project?", a: "Reach out through our contact form or email to discuss partnership and funding opportunities. We work with NGOs, governments, and private sector partners." },
  ];

  return (
    <>
      <SEO />

      {/* Hero */}
      <section
        ref={sectionRef}
        className={`relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-24 transition-opacity duration-700 lg:px-12 ${
          visible ? "motion-safe:animate-[openchs-intro_1s_cubic-bezier(.25,.9,.3,1)_forwards]" : "opacity-0"
        }`}
      >
        <header className="flex flex-col gap-8">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em]">
            <span className={`rounded-full border px-4 py-1 ${palette.border} ${palette.accent}`}>OpenCHS AI</span>
            <span className={palette.subtle}>Blog &amp; Community</span>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Protecting Children<br />Through Technology
            </h1>
            <p className={`max-w-3xl text-lg md:text-xl ${palette.subtle}`}>
              Discover insights, impact stories, and technical deep-dives from the OpenCHS community.
              Join us in revolutionizing child protection with AI-powered solutions.
            </p>
          </div>
        </header>

        {/* Featured Post */}
        <Link to={`/blog/${blogPosts[0].slug}`} className="group">
          <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl ${palette.border} ${palette.card}`}>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <LazyImage src={blogPosts[0].image} alt={blogPosts[0].title} className="h-full w-full grayscale transition-all duration-500 group-hover:grayscale-0" />
              </div>
              <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className={palette.accent}>Featured</Badge>
                  <Badge variant="outline">{blogPosts[0].category}</Badge>
                </div>
                <h2 className="text-3xl font-semibold leading-tight group-hover:underline md:text-4xl">{blogPosts[0].title}</h2>
                <p className={`text-base ${palette.subtle}`}>{blogPosts[0].summary}</p>
                <div className="flex items-center gap-4 text-sm">
                  <Avatar className="h-8 w-8"><AvatarFallback>{blogPosts[0].author[0]}</AvatarFallback></Avatar>
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
            {filterCategories.map((cat) => (
              <Button
                key={cat.value}
                variant="outline"
                size="sm"
                className={`${activeCategory === cat.value ? "ring-2 ring-neutral-400" : ""} ${palette.accent}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(activeCategory === "All" ? blogPosts.slice(1) : filteredPosts).map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group">
              <Card className={`grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden border transition-transform duration-300 group-hover:scale-[1.02] ${palette.border} ${palette.card}`}>
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <LazyImage src={post.image} alt={post.title} className="grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105" />
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
                    <Avatar className="h-6 w-6"><AvatarFallback>{post.author[0]}</AvatarFallback></Avatar>
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
          <Link to="/blog"><Button variant="outline">View All Articles <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </section>

      {/* How You Can Contribute */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">How You Can Contribute</h2>
        <p className={`mb-12 max-w-3xl text-lg ${palette.subtle}`}>
          OpenCHS is open source and community-driven. Here are three ways you can make a difference.
        </p>
        <div className="space-y-6">
          {/* 1. Contribute Code */}
          <div className={`rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border ${palette.border} ${palette.accent}`}>
                <Code className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-semibold">1. Contribute Code</h3>
                <p className={`mb-4 ${palette.subtle}`}>Help build and improve the platform. Follow these steps to submit your first pull request:</p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">1</span>
                    <div>
                      <div className="font-medium">Fork and clone the repository</div>
                      <div className="relative mt-1">
                        <pre className={`overflow-x-auto rounded-lg border p-3 text-sm ${palette.border} ${palette.highlight}`}><code>git clone https://github.com/YOUR_USERNAME/OpenCHS-platform.git{"\n"}cd OpenCHS-platform{"\n"}npm install</code></pre>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">2</span>
                    <div>
                      <div className="font-medium">Create a feature branch</div>
                      <pre className={`mt-1 overflow-x-auto rounded-lg border p-3 text-sm ${palette.border} ${palette.highlight}`}><code>git checkout -b feat/your-feature-name</code></pre>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">3</span>
                    <div>
                      <div className="font-medium">Make your changes, commit, and push</div>
                      <pre className={`mt-1 overflow-x-auto rounded-lg border p-3 text-sm ${palette.border} ${palette.highlight}`}><code>git add .{"\n"}git commit -m "feat: add multilingual support for Swahili"{"\n"}git push origin feat/your-feature-name</code></pre>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">4</span>
                    <div>
                      <div className="font-medium">Open a Pull Request</div>
                      <p className={`mt-1 text-sm ${palette.subtle}`}>
                        Use a clear title — e.g. <span className="font-medium">"feat: add Swahili language support for AI transcription"</span>. Include a summary of what changed and why, screenshots if relevant, and link related issues.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <GitPullRequest className={`h-4 w-4 ${palette.subtle}`} />
                  <span className={`text-sm ${palette.subtle}`}>PR naming: <code className="rounded bg-neutral-200 px-1.5 py-0.5 text-xs dark:bg-neutral-800">type: short description</code> — types: feat, fix, docs, refactor, test</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Write a Blog Post */}
          <div className={`rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border ${palette.border} ${palette.accent}`}>
                <PenLine className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-semibold">2. Write a Blog Post</h3>
                <p className={`mb-4 ${palette.subtle}`}>Share your experience, insights, or case studies with the OpenCHS community.</p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">1</span>
                    <div><div className="font-medium">Choose a topic</div><p className={`mt-1 text-sm ${palette.subtle}`}>Deployment stories, technical deep-dives, AI/ML insights, policy and governance, or impact reports.</p></div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">2</span>
                    <div><div className="font-medium">Draft your article</div><p className={`mt-1 text-sm ${palette.subtle}`}>Write in Markdown, 800–2000 words. Include code snippets, data, or screenshots where they add value.</p></div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">3</span>
                    <div><div className="font-medium">Submit for review</div><p className={`mt-1 text-sm ${palette.subtle}`}>Email your draft to <a href="mailto:blog@openchs.org" className="font-medium underline underline-offset-2">blog@openchs.org</a> or open a PR to the <code className="rounded bg-neutral-200 px-1.5 py-0.5 text-xs dark:bg-neutral-800">content/blog</code> directory.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Fund the Mission */}
          <div className={`rounded-2xl border p-8 ${palette.border} ${palette.card}`}>
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border ${palette.border} ${palette.accent}`}>
                <Heart className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="mb-3 text-xl font-semibold">3. Fund the Mission</h3>
                <p className={`mb-4 ${palette.subtle}`}>Your financial support directly enables child protection in underserved regions.</p>
                <div className="space-y-3">
                  <div className="flex gap-3"><DollarSign className={`mt-0.5 h-5 w-5 flex-shrink-0 ${palette.subtle}`} /><div><div className="font-medium">Sponsor development</div><p className={`mt-1 text-sm ${palette.subtle}`}>Fund specific features like multilingual AI models, offline-first capabilities, or mobile apps.</p></div></div>
                  <div className="flex gap-3"><DollarSign className={`mt-0.5 h-5 w-5 flex-shrink-0 ${palette.subtle}`} /><div><div className="font-medium">Support deployments</div><p className={`mt-1 text-sm ${palette.subtle}`}>Help cover infrastructure, training, and onboarding costs. Each deployment costs ~$15,000–$30,000 to launch.</p></div></div>
                  <div className="flex gap-3"><DollarSign className={`mt-0.5 h-5 w-5 flex-shrink-0 ${palette.subtle}`} /><div><div className="font-medium">Partner with us</div><p className={`mt-1 text-sm ${palette.subtle}`}>We work with NGOs, governments, and private sector partners. <Link to="/contact" className="font-medium underline underline-offset-2">Reach out</Link> to discuss.</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12">
        <div className={`rounded-3xl border p-8 md:p-12 ${palette.border} ${palette.card}`}>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Get in Touch</h2>
              <p className={`mb-6 ${palette.subtle}`}>Interested in collaborating, funding, or learning more about OpenCHS? Reach out to us.</p>
              <div className="space-y-4">
                <a href="mailto:contact@openchs.org" className="flex items-center gap-3 hover:underline"><Mail className="h-5 w-5" /><span>contact@openchs.org</span></a>
                <div className="flex items-center gap-3"><MapPin className="h-5 w-5" /><span>Nairobi, Kenya</span></div>
                <a href="tel:+254700000000" className="flex items-center gap-3 hover:underline"><Phone className="h-5 w-5" /><span>+254 700 000 000</span></a>
              </div>
            </div>
            <form onSubmit={handleContact} className="space-y-4">
              {contactSubmitted && (
                <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-center text-sm text-green-600 dark:text-green-400">
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
                <textarea id="c-message" rows={4} placeholder="Tell us about your interest..." value={contactForm.message} onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))} className={`w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${palette.border}`} required />
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
              aria-expanded={openFaq === idx}
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
            <div className="mx-auto mb-4 max-w-md rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
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
