import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  ChevronRight,
  GraduationCap,
  Heart,
  Home,
  Hotel,
  Layers,
  Leaf,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Sun,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { ProjectType } from "./backend.d";
import { useActor } from "./hooks/useActor";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Villas, bungalows, and luxury homes tailored to lifestyle.",
    duration: "8–12 months",
  },
  {
    icon: Hotel,
    title: "Hospitality Projects",
    description: "Resorts, boutique hotels, and tourism developments.",
    duration: "14–20 months",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description: "Offices, retail spaces, and showrooms with spatial clarity.",
    duration: "10–14 months",
  },
  {
    icon: GraduationCap,
    title: "Institutional Design",
    description: "Schools, campuses, and public buildings for communities.",
    duration: "12–18 months",
  },
];

const PROJECTS = [
  {
    image: "/assets/generated/project-residential.dim_800x600.jpg",
    category: "Residential",
    name: "Private Villa, Udaipur",
    location: "Udaipur, Rajasthan",
  },
  {
    image: "/assets/generated/project-hospitality.dim_800x600.jpg",
    category: "Hospitality",
    name: "Boutique Heritage Resort",
    location: "Lake Pichola, Udaipur",
  },
  {
    image: "/assets/generated/project-commercial.dim_800x600.jpg",
    category: "Commercial",
    name: "Corporate Office Complex",
    location: "New Delhi, India",
  },
  {
    image: "/assets/generated/project-institutional.dim_800x600.jpg",
    category: "Institutional",
    name: "Educational Campus",
    location: "Rajasthan, India",
  },
];

const TEAM = [
  {
    initials: "RS",
    name: "Ar. Niraj Soni",
    role: "Principal Architect",
    bio: "Leads the studio's creative direction with 18+ years of regional expertise.",
    color: "bg-terracotta",
  },
  {
    initials: "PM",
    name: "Ar. Priya Mehta",
    role: "Principal Architect",
    bio: "Drives design philosophy with a focus on climate-responsive architecture.",
    color: "bg-tan-dark",
  },
  {
    initials: "VP",
    name: "Ar. Vikram Patel",
    role: "Senior Architect",
    bio: "Leads design development with mastery of materiality and spatial detail.",
    color: "bg-brown-muted",
  },
  {
    initials: "AS",
    name: "Ar. Ananya Singh",
    role: "Senior Architect",
    bio: "Specializes in hospitality and institutional project design excellence.",
    color: "bg-terracotta-light",
  },
];

const PHILOSOPHY_BELIEFS = [
  { icon: Leaf, text: "Architecture should be rooted in place" },
  { icon: Sun, text: "Natural light must guide spatial quality" },
  { icon: Layers, text: "Materials should express honesty" },
  { icon: Heart, text: "Built form should support human comfort" },
];

export default function App() {
  const { actor } = useActor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Unable to connect to server. Please try again.");
      return;
    }
    setSubmitting(true);
    try {
      await actor.submitInquiry(
        formData.name,
        formData.email,
        formData.projectType as ProjectType,
        formData.message,
      );
      toast.success("Your inquiry has been received! We'll be in touch soon.");
      setFormData({ name: "", email: "", projectType: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster richColors />

      {/* ===== STICKY HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.965_0.015_78/0.96)] backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 shrink-0"
            data-ocid="header.link"
          >
            <img
              src="/assets/generated/vastukrit-logo-transparent.dim_400x120.png"
              alt="Vastukrit Architects"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span
              className="font-serif text-foreground text-lg font-semibold tracking-wide leading-tight"
              style={{ display: "none" }}
            >
              VASTUKRIT
              <br />
              <span className="text-xs font-sans tracking-widest text-brown-muted">
                ARCHITECTS
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-terracotta transition-colors rounded-md hover:bg-accent"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("#contact")}
              className="ml-3 bg-terracotta hover:bg-terracotta-dark text-sand-light text-sm font-medium"
              data-ocid="nav.primary_button"
            >
              Get in Touch
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((o) => !o)}
            data-ocid="nav.toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="py-3 text-left text-base font-medium text-foreground hover:text-terracotta transition-colors border-b border-border last:border-0"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-architecture.dim_1600x900.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,20,15,0.55)] via-[rgba(30,20,15,0.4)] to-[rgba(30,20,15,0.6)]" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <p className="text-[oklch(0.97_0.005_72)] text-xs md:text-sm font-sans uppercase tracking-[0.25em] mb-5 opacity-90">
            VASTUKRIT ARCHITECTS
          </p>
          <h1 className="font-serif text-[oklch(0.97_0.005_72)] text-5xl md:text-7xl font-bold leading-[1.08] mb-6">
            Crafting Legacy,
            <br />
            Designing Future.
          </h1>
          <p className="text-[oklch(0.92_0.015_72)] text-lg md:text-xl font-sans font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Sustainable, culturally-rich architecture rooted in Udaipur,
            Rajasthan.
          </p>
          <Button
            onClick={() => scrollTo("#projects")}
            size="lg"
            className="bg-[oklch(0.78_0.08_70)] hover:bg-[oklch(0.68_0.09_67)] text-[oklch(0.18_0.04_47)] border border-[oklch(0.62_0.09_65)] font-semibold px-8 py-3 text-base shadow-warm"
            data-ocid="hero.primary_button"
          >
            Explore Our Work
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-[oklch(0.97_0.005_72/0.5)] animate-bounce" />
        </motion.div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-terracotta text-xs font-sans uppercase tracking-[0.2em] mb-3">
              What We Do
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold">
              Our Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="bg-card rounded-xl p-8 border border-border shadow-card hover:shadow-warm transition-shadow group"
                  data-ocid={`services.item.${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-terracotta/10 flex items-center justify-center mb-5 group-hover:bg-terracotta/20 transition-colors">
                    <Icon className="text-terracotta" size={22} />
                  </div>
                  <h3 className="font-serif text-xl text-foreground font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta-light bg-terracotta/10 px-3 py-1 rounded-full">
                    {service.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section
        id="philosophy"
        className="py-20 md:py-28 bg-[oklch(0.94_0.022_76)]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-terracotta text-xs font-sans uppercase tracking-[0.2em] mb-3">
                Our Approach
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-3 leading-tight">
                Our Philosophy
              </h2>
              <p className="font-serif text-xl text-brown-muted italic mb-6">
                Culturally Grounded. Modern Innovation.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Architecture must respond directly to its context. Climate,
                local materials, regional identity, and user requirements form
                the foundation of our design decisions. Rather than imposing
                fixed stylistic solutions, each project evolves from its own
                environmental and social conditions.
              </p>

              <ul className="space-y-4">
                {PHILOSOPHY_BELIEFS.map((belief, i) => {
                  const Icon = belief.icon;
                  return (
                    <motion.li
                      key={belief.text}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={14} className="text-terracotta" />
                      </div>
                      <span className="text-foreground text-sm font-medium">
                        {belief.text}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-warm aspect-[4/3]">
                <img
                  src="/assets/generated/project-hospitality.dim_800x600.jpg"
                  alt="Architecture philosophy"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -left-6 bg-terracotta rounded-xl p-5 shadow-warm hidden lg:block">
                <p className="text-sand-light font-serif text-2xl font-bold leading-none">
                  14+
                </p>
                <p className="text-[oklch(0.85_0.04_72)] text-xs font-sans mt-1">
                  Years of Excellence
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="py-20 md:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-terracotta text-xs font-sans uppercase tracking-[0.2em] mb-3">
              Portfolio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group rounded-xl overflow-hidden bg-card border border-border shadow-card hover:shadow-warm transition-all"
                data-ocid={`projects.item.${i + 1}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta bg-terracotta/10 px-3 py-1 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-lg text-foreground font-semibold mb-1">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-1.5">
                    <MapPin size={12} />
                    {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section id="team" className="py-20 md:py-28 bg-[oklch(0.94_0.022_76)]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-terracotta text-xs font-sans uppercase tracking-[0.2em] mb-3">
              The People
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold">
              Meet the Team
            </h2>
            <p className="text-muted-foreground mt-3 text-base">
              A studio of 14 professionals — architects, visualizers, and site
              specialists.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 text-center border border-border shadow-card hover:shadow-warm transition-shadow"
                data-ocid={`team.item.${i + 1}`}
              >
                <div
                  className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-warm`}
                >
                  <span className="text-sand-light font-serif font-bold text-xl">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-serif text-base text-foreground font-semibold mb-0.5">
                  {member.name}
                </h3>
                <p className="text-xs font-sans uppercase tracking-widest text-terracotta font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Team stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { count: "2", label: "Principal Architects" },
              { count: "4", label: "Junior Architects" },
              { count: "2", label: "Site Architects" },
              { count: "3", label: "Interns & Visualizers" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-card rounded-lg p-4 text-center border border-border"
                data-ocid={`team.card.${i + 1}`}
              >
                <p className="font-serif text-3xl font-bold text-terracotta">
                  {stat.count}
                </p>
                <p className="text-xs text-muted-foreground mt-1 font-sans">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-20 md:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-terracotta text-xs font-sans uppercase tracking-[0.2em] mb-3">
              Get In Touch
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold">
              Connect With Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  Ready to start your project? Let's talk.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We work with clients across Rajasthan and India, developing
                  architecture that is contextually sensitive and technically
                  precise.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-terracotta/10 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-terracotta" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      Studio
                    </p>
                    <p className="text-foreground text-sm font-medium">
                      Udaipur, Rajasthan, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-terracotta/10 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-terracotta" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:vastukritarchitects@gmail.com"
                      className="text-foreground text-sm font-medium hover:text-terracotta transition-colors"
                    >
                      vastukritarchitects@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="font-serif text-lg font-semibold text-foreground mb-2">
                  Studio Hours
                </p>
                <p className="text-muted-foreground text-sm">
                  Monday – Saturday
                  <br />
                  9:00 AM – 6:00 PM IST
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl p-8 border border-border shadow-card space-y-5"
                data-ocid="contact.modal"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-xs uppercase tracking-widest text-muted-foreground font-semibold"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      className="bg-background border-border"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-xs uppercase tracking-widest text-muted-foreground font-semibold"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="bg-background border-border"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    Project Type
                  </Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(v) =>
                      setFormData((p) => ({ ...p, projectType: v }))
                    }
                    required
                  >
                    <SelectTrigger
                      className="bg-background border-border"
                      data-ocid="contact.select"
                    >
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="institutional">
                        Institutional
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="text-xs uppercase tracking-widest text-muted-foreground font-semibold"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your project vision, location, and timeline..."
                    className="bg-background border-border resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-terracotta hover:bg-terracotta-dark text-sand-light font-semibold py-3"
                  data-ocid="contact.submit_button"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-terracotta text-sand">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-[oklch(0.96_0.02_72)] mb-2">
                VASTUKRIT
              </h3>
              <p className="text-[oklch(0.85_0.04_72)] text-sm tracking-widest uppercase font-sans mb-4">
                Architecture | Planning | Interiors
              </p>
              <p className="text-[oklch(0.82_0.04_72)] text-sm leading-relaxed max-w-xs">
                Multidisciplinary design studio committed to context-sensitive,
                climate-responsive architecture rooted in Udaipur, Rajasthan.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-[oklch(0.96_0.02_72)] font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-[oklch(0.85_0.04_72)] hover:text-[oklch(0.96_0.02_72)] transition-colors text-sm"
                      data-ocid="footer.link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[oklch(0.96_0.02_72)] font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-5">
                Contact
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={14}
                    className="text-[oklch(0.78_0.06_55)] mt-0.5 shrink-0"
                  />
                  <p className="text-[oklch(0.85_0.04_72)] text-sm">
                    Udaipur, Rajasthan, India
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail
                    size={14}
                    className="text-[oklch(0.78_0.06_55)] mt-0.5 shrink-0"
                  />
                  <a
                    href="mailto:vastukritarchitects@gmail.com"
                    className="text-[oklch(0.85_0.04_72)] hover:text-[oklch(0.96_0.02_72)] transition-colors text-sm"
                  >
                    vastukritarchitects@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[oklch(0.55_0.1_34)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[oklch(0.78_0.06_55)] text-sm">
              © {new Date().getFullYear()} Vastukrit Architects. All rights
              reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.78_0.06_55)] hover:text-[oklch(0.9_0.03_72)] text-xs transition-colors flex items-center gap-1"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
