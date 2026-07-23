import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Phone, MapPin, Mail,
  Briefcase, GraduationCap, Award, FolderGit2,
  ArrowDown, Sparkles, ExternalLink,
  Download, Sun, Moon, Menu, X, ArrowRight, Github, Linkedin, Rocket, Zap,
  Trophy, Star, Building2, Calendar, BookOpen, Brain, TrendingUp, CheckCircle2,
} from "lucide-react";
import avatar from "@/assets/yash-photo.png";
import newsflashImg from "@/assets/newsflash.png";
import apexChessImg from "@/assets/apex-chess.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash Dabhi — BCA Graduate & Aspiring Developer" },
      { name: "description", content: "Portfolio of Yash Dabhi — Bachelor of Computer Applications graduate skilled in Python, Java, web technologies and SQL." },
      { property: "og:title", content: "Yash Dabhi — Portfolio" },
      { property: "og:description", content: "BCA graduate passionate about building elegant software." },
    ],
  }),
  component: Portfolio,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      className={`relative py-24 px-6 md:px-12 max-w-6xl mx-auto ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.18, margin: "0px 0px -80px 0px" }}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({ eyebrow, title, center = false }: { icon?: React.ElementType; eyebrow: string; title: string; center?: boolean }) {
  return (
    <motion.div variants={fadeUp} className={`mb-12 ${center ? "text-center" : ""}`}>
      <div className="text-accent text-sm font-medium uppercase tracking-widest mb-3">
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
      <div className={`mt-4 h-1 w-20 bg-gradient-primary rounded-full ${center ? "mx-auto" : ""}`} />
    </motion.div>
  );
}

function Counter({ to, suffix = "", decimals = 0, duration = 1.6 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

function TypeLine({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = phrases[idx];
    const speed = del ? 45 : 80;
    const t = setTimeout(() => {
      if (!del && txt === cur) { setTimeout(() => setDel(true), 1600); return; }
      if (del && txt === "") { setDel(false); setIdx((i) => (i + 1) % phrases.length); return; }
      setTxt(del ? cur.slice(0, txt.length - 1) : cur.slice(0, txt.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, idx, phrases]);
  return (
       <span className={className}>
         <span className="text-gradient bg-gradient-primary animate-gradient">{txt}</span>
         <span className="inline-block w-0.5 h-5 bg-accent ml-1 align-middle animate-pulse" />
    </span>
  );
}

function HoverWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="group relative inline-block cursor-default font-semibold text-foreground transition-[letter-spacing,color] duration-300 hover:tracking-wide hover:text-accent">
      <span className="relative z-10 rounded-sm bg-transparent text-foreground transition-colors duration-300 group-hover:text-accent">{children}</span>
         <span className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gradient-primary transition-[width] duration-500 ease-out group-hover:w-full" />
    </span>
  );
}


function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { icon: "🎓", title: "SSC Education", desc: "Foundation of curiosity — discovered a love for computers and problem-solving.", tag: "Foundation" },
    { icon: "📚", title: "Higher Secondary Education (HSC)", desc: "Built strong fundamentals in mathematics, science and analytical thinking.", tag: "Growth" },
    { icon: "💻", title: "Bachelor of Computer Applications (BCA)", desc: "Dove deep into programming, databases, web technologies and software engineering.", tag: "Specialization" },
    { icon: "🚀", title: "Python with AI Internship", desc: "Hands-on experience building intelligent solutions with Python and modern AI tools.", tag: "Internship" },
    { icon: "⚡", title: "Real-World Projects Development", desc: "Shipped projects across web, AI and full-stack — turning ideas into working products.", tag: "Building" },
    { icon: "🌟", title: "Career Growth in Information Technology", desc: "Continuously learning, contributing, and aiming to build impactful digital solutions.", tag: "Future" },
  ];

  return (
    <div ref={ref} className="relative pl-0 md:pl-0">
      {/* Static rail */}
         <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border" />
      {/* Animated glowing progress line */}
      <motion.div
        style={{ height: lineHeight }}
           className="absolute left-8 md:left-1/2 top-0 w-0.75 -translate-x-1/2 rounded-full bg-linear-to-b from-[#0EA5E9] via-[#2563EB] to-[#0EA5E9] shadow-[0_0_20px_oklch(0.6_0.18_245/0.7)]"
      />

      <ul className="space-y-10 md:space-y-16">
        {steps.map((s, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative md:grid md:grid-cols-2 md:gap-12 md:items-center"
            >
              {/* Node */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full text-lg md:text-xl bg-background border-2 border-primary/60 shadow-[0_0_25px_oklch(0.6_0.18_245/0.5)]"
              >
                <span>{s.icon}</span>
                <span className="absolute inset-0 rounded-full bg-primary/30 blur-md animate-pulse-glow -z-10" />
              </motion.div>

              {/* Card */}
              <div className={`ml-16 md:ml-0 min-w-0 ${isLeft ? "md:col-start-1 md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative inline-block w-full p-5 sm:p-6 rounded-2xl glass border border-primary/20 shadow-card hover:border-accent/60 hover:shadow-glow transition-all overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-[#0EA5E9] to-[#2563EB] opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent">{s.tag}</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold leading-tight">{s.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fallbackHref, setFallbackHref] = useState("mailto:yashdabhi95@gmail.com");
  const formRef = useRef<HTMLFormElement>(null);

  const buildMailto = (formData: FormData) => {
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "Portfolio message");
    const message = String(formData.get("message") || "");
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    return `mailto:yashdabhi95@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const formData = new FormData(formRef.current);
      formData.set("_replyto", String(formData.get("email") || ""));
      const mailtoHref = buildMailto(formData);
      setFallbackHref(mailtoHref);
      const res = await fetch("https://formsubmit.co/ajax/yashdabhi95@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setErrorMsg("Automatic email delivery is not responding. Use the direct email button below to send it from your device.");
    }
  };

  return (
    <motion.form
      ref={formRef}
      variants={fadeUp}
      onSubmit={onSubmit}
      action="https://formsubmit.co/yashdabhi95@gmail.com"
      method="POST"
      className="lg:col-span-3 relative p-6 md:p-8 rounded-[20px] glass border border-border shadow-card space-y-4"
    >
      <input type="hidden" name="_subject" value="New message from portfolio" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <h3 className="text-lg font-bold mb-4">Send a Message</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">Full Name</label>
          <input type="text" name="name" required maxLength={100} placeholder="Your name"
            className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-accent focus:shadow-glow outline-none text-sm transition-all" />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">Email</label>
          <input type="email" name="email" required maxLength={255} placeholder="you@example.com"
            className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-accent focus:shadow-glow outline-none text-sm transition-all" />
        </div>
      </div>
      <div>
        <label className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">Subject</label>
        <input type="text" name="subject" required maxLength={150} placeholder="What's this about?"
          className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-accent focus:shadow-glow outline-none text-sm transition-all" />
      </div>
      <div>
        <label className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">Message</label>
        <textarea name="message" required rows={5} maxLength={1000} placeholder="Tell me about your project or opportunity..."
          className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background/60 border border-border focus:border-accent focus:shadow-glow outline-none text-sm transition-all resize-none" />
      </div>

      <motion.button
        whileHover={{ scale: status === "sending" ? 1 : 1.02, y: status === "sending" ? 0 : -2 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "sending"}
        className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow transition-shadow disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      {status === "sent" && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative flex items-start gap-3 p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="relative shrink-0 w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </motion.div>
          <div className="relative">
            <p className="font-semibold text-emerald-300 text-sm">Message sent successfully!</p>
            <p className="text-xs text-emerald-200/80 mt-0.5">Thanks for reaching out — your message was submitted to my email.</p>
            <a href={fallbackHref} className="mt-2 inline-flex text-xs font-semibold text-emerald-200 underline underline-offset-4">
              Open email app backup
            </a>
          </div>
        </motion.div>
      )}
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl border border-destructive/40 bg-destructive/10 text-sm text-destructive"
        >
          <X className="w-4 h-4 mt-0.5" />
          <span className="space-y-2">
            <span className="block">{errorMsg}</span>
            <a href={fallbackHref} className="inline-flex font-semibold underline underline-offset-4">Open email app</a>
          </span>
        </motion.div>
      )}
    </motion.form>
  );
}

  function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const resumeUrl = "/Yash-Dabhi-Resume.pdf";
  const resumeFileName = "Yash-Dabhi-Resume.pdf";

  const downloadResume = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    try {
      const a = document.createElement("a");
      a.href = resumeUrl;
      a.download = resumeFileName;
      a.rel = "noopener";
      a.target = "_self";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      window.open(resumeUrl, "_blank");
    }
  };


  // Typewriter
  const ROLES = ["Python Developer", "AI Enthusiast", "BCA Graduate", "Web Developer", "Problem Solver", "Digital Marketing", "Graphic Designing"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = deleting ? 60 : 110;
    const t = setTimeout(() => {
      if (!deleting && typed === current) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (deleting && typed === "") {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
        return;
      }
      setTyped(deleting ? current.slice(0, typed.length - 1) : current.slice(0, typed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);


  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark" | null) ?? "dark";
    setTheme(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen, mounted]);

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.32, ease: [0.4, 0, 1, 1] as const },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.36,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.045,
        delayChildren: 0.05,
      },
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -12, filter: "blur(4px)" },
    open: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.28 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Welcome loader removed per user request */}
      {/* Nav */}
      <motion.nav
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 inset-x-0 z-50 glass"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 lg:gap-5">
          <a href="#top" className="inline-flex min-w-0 items-center gap-2.5 shrink group">
            <motion.span
              whileHover={{ rotate: [0, -8, 8, -6, 0], scale: 1.08 }}
              transition={{ duration: 0.6 }}
              className="relative inline-flex w-9 h-9 shrink-0 rounded-xl bg-gradient-primary text-primary-foreground items-center justify-center text-[11px] font-black shadow-glow tracking-wider"
            >
              YD
              <span className="absolute -inset-0.5 rounded-xl bg-gradient-primary opacity-40 blur-md -z-10 animate-pulse-glow" />
            </motion.span>
            <span className="inline-flex min-w-0 items-baseline gap-1.5 leading-none tracking-tight font-['Space_Grotesk',ui-sans-serif]">
              <span className="truncate text-[16px] sm:text-[18px] font-black text-foreground">Yash</span>
              <span className="text-[16px] sm:text-[18px] font-black text-gradient bg-gradient-primary animate-gradient">Dabhi</span>
            </span>
          </a>
          <div className="hidden lg:flex min-w-0 items-center justify-center gap-1 text-sm">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative px-3 py-1.5 rounded-full text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-15 transition-opacity" />
                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gradient-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </div>
          <div className="flex shrink-0 items-center justify-end gap-2 justify-self-end">
            <a
              href={resumeUrl}
              download={resumeFileName} onClick={downloadResume}
              className="hidden sm:inline-flex shrink-0 items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-glow hover:scale-[1.04] transition-transform"
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg glass border border-border hover:bg-card transition-colors"
            >
              {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg glass border border-border overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex"
                >
                  {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
        {/* Mobile menu attached to header, expands downward from the header bottom edge */}
        <AnimatePresence initial={false} mode="wait">
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden"
            >
              <motion.div
                className="border-t border-border/40 bg-card/95 backdrop-blur-2xl shadow-card rounded-b-3xl overflow-hidden"
              >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-6 pt-4">
                  <div className="grid gap-4">
                    {navLinks.map((l) => (
                      <motion.a
                        key={l.label}
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        variants={mobileItemVariants}
                        whileHover={{ x: 8, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex min-h-12 items-center justify-between rounded-3xl border border-border/70 bg-background/90 px-4 py-3 text-sm font-semibold text-foreground/90 shadow-sm transition-all hover:bg-accent/5 hover:text-foreground"
                      >
                        <span className="absolute inset-0 rounded-3xl bg-linear-to-r from-primary/15 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative flex items-center gap-3 z-10">
                          <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary shadow-glow" />
                          {l.label}
                        </span>
                        <ArrowRight className="relative z-10 w-4 h-4 opacity-70 transition-transform group-hover:translate-x-1 text-accent" />
                      </motion.a>
                    ))}
                  </div>

                  <motion.a
                    variants={mobileItemVariants}
                    href={resumeUrl}
                    download={resumeFileName}
                    onClick={downloadResume}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-3xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow transition-transform hover:scale-[1.02]"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Resume
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


      {/* Hero */}
      <header ref={heroRef} id="top" className="relative md:min-h-screen flex items-center px-6 pt-28 pb-20 md:py-0 bg-gradient-hero overflow-hidden">
        {/* Grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground)/.4) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)/.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* bubbles removed per request */}

        <motion.div style={{ opacity }} className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-center md:pt-20 gap-10">
          {/* Intro block (name, typing, tagline) */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="order-1 md:order-0">
            {/* Status pill */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm mb-6 border border-primary/20">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-foreground/80">Available for opportunities</span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p variants={fadeUp} className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Hello, I'm
            </motion.p>

            {/* Big name */}
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-3">
              <span className="block text-foreground">Yash</span>
              <span className="block text-gradient bg-gradient-primary animate-gradient">Dabhi</span>
            </motion.h1>

            {/* MCA Aspirant label */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-accent/30 text-xs font-semibold tracking-[0.25em] uppercase text-accent mt-2 mb-4"
            >
              MCA Aspirant
            </motion.div>

            {/* Typewriter role */}
            <motion.div variants={fadeUp} className="text-lg md:text-2xl font-semibold mt-1 mb-5 h-8 flex items-center">
              <span className="text-gradient bg-gradient-primary">{typed}</span>
              <span className="inline-block w-0.5 h-6 bg-accent ml-1 align-middle animate-pulse" />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={fadeUp} className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              Bachelor of Computer Applications (BCA) graduate. Turning{" "}
              <span className="relative inline-block font-semibold text-gradient bg-gradient-primary animate-gradient animate-blink">ideas</span>{" "}
              into{" "}
              <span className="relative inline-block font-semibold text-gradient bg-gradient-primary animate-gradient animate-blink" style={{ animationDelay: "0.6s" }}>clean code</span>,{" "}
              shipped with <span className="text-accent font-semibold animate-blink" style={{ animationDelay: "1.2s" }}>curiosity</span>.
            </motion.p>
          </motion.div>

          {/* Right: photo (appears second on mobile, right column on desktop spanning both rows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative flex justify-center items-center order-2 md:order-0 md:row-span-2"
          >
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 md:w-104 md:h-104 rounded-full bg-gradient-primary blur-3xl opacity-40 animate-pulse-glow" />
            </div>
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-88 h-88 md:w-md md:h-112 rounded-full border border-dashed border-accent/30 hidden sm:block"
            />
            {/* Mobile-friendly ring: visible only on small screens, subtler animation */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="sm:hidden absolute w-44 h-44 rounded-full border border-dashed border-accent/20"
            />

            <div className="relative">
              {/* Ring around photo */}
              <div className="relative rounded-full p-0.75 bg-linear-to-br from-accent via-primary to-accent shadow-glow">
                <div className="relative rounded-full overflow-hidden bg-background w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88">
                  <img
                    src={avatar}
                    alt="Yash Dabhi"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions block (CTAs, socials, stats) — appears after photo on mobile */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="order-3 md:order-0">
            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:scale-[1.04] transition-transform"
              >
                <Rocket className="w-4 h-4" /> Explore Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href={resumeUrl}
                download={resumeFileName} onClick={downloadResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-border font-medium hover:bg-card hover:border-accent/60 transition-all"
              >
                <Download className="w-4 h-4" /> Resume
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-border font-medium hover:bg-card hover:border-accent/60 transition-all">
                <Mail className="w-4 h-4" /> Contact
              </a>
            </motion.div>

            {/* Socials + stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex items-center gap-3">
                {[
                  { Icon: Github, href: "https://github.com/yashdabhi-2155", label: "GitHub" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/yash-dabhi-14178437b", label: "LinkedIn" },
                  { Icon: Mail, href: "#contact", label: "Email" },
                ].map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-full border border-border glass inline-flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { to: 2, dec: 0, suffix: "+", l: "Projects" },
                  { to: 5, dec: 0, suffix: "+", l: "Tech Stacks" },
                  { to: 8.71, dec: 2, suffix: "", l: "CGPA" },
                  { to: 2, dec: 0, suffix: "+", l: "Internship" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-bold text-gradient leading-none">
                      <Counter to={s.to} decimals={s.dec} suffix={s.suffix} />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>


        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground text-xs flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </header>


      {/* About */}
      <Section id="about" className="max-w-300!">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            aria-hidden
            className="absolute top-0 left-1/4 w-160 h-160 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.55 0.18 245 / 0.18), transparent 70%)" }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 right-1/4 w-xl h-144 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.6 0.16 200 / 0.18), transparent 70%)" }}
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute w-1.5 h-1.5 rounded-full bg-accent/50"
              style={{ top: `${(i * 37) % 95}%`, left: `${(i * 53) % 95}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Standard section header — matches Education / Experience / Projects */}
        <motion.div variants={fadeUp} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-widest mb-3">
            <span>&nbsp;ABOUT ME</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Building My Future Through Technology &amp; Innovation
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A quick introduction to who I am, what I love building and where I&rsquo;m headed next.
          </p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }} className="mt-4 mx-auto h-1 w-24 bg-gradient-primary rounded-full origin-left" />
        </motion.div>

        {/* Glass intro card */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
              aria-hidden
              className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.6 0.18 245 / 0.18), transparent 70%)" }}
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.65 0.16 200 / 0.18), transparent 70%)" }}
              animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="relative p-7 md:p-10 rounded-[30px] overflow-hidden"
            style={{
              background: "color-mix(in oklab, var(--color-card) 65%, transparent)",
              backdropFilter: "blur(22px)",
              border: "1px solid color-mix(in oklab, var(--color-border) 60%, transparent)",
              boxShadow: "0 20px 60px -20px oklch(0.2 0.05 250 / 0.35)",
            }}
          >
            <motion.span
              aria-hidden
              className="absolute -bottom-10 right-2 font-serif text-foreground/4 pointer-events-none leading-none"
              style={{ fontSize: "180px" }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              &rdquo;
            </motion.span>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-0.75 h-6 bg-accent animate-pulse rounded-full" />
              <div className="text-[11px] uppercase tracking-[0.3em] text-accent font-semibold min-h-4.5">
                <TypeLine phrases={["Passionate Developer", "Curious Learner", "Problem Solver", "AI Explorer", "Graphic Designer", "Digital Marketer"]} />
              </div>
            </div>

            <div className="relative space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground"
              >
                Hello,
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-2xl leading-snug text-foreground/90"
              >
                I&rsquo;m{" "}
                <span className="font-bold text-gradient bg-gradient-primary animate-gradient">
                  Dabhi Yash Yogeshbhai
                </span>
                .
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                A Bachelor of Computer Applications (BCA) graduate from Shree Swaminarayan College of Computer Science, passionate about transforming ideas into clean, modern, and meaningful digital experiences.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                My focus lives at the intersection of{" "}
                <HoverWord>Software Development</HoverWord>,{" "}
                <HoverWord>Artificial Intelligence</HoverWord>,{" "}
                <HoverWord>Graphic Design</HoverWord>, and{" "}
                <HoverWord>Digital Marketing</HoverWord> — building thoughtful products that feel effortless to use.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* What defines me — animated value grid (replaces duplicate timeline) */}
        <div className="mt-24 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              <span>What Defines Me</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">
              The values that <span className="text-gradient bg-gradient-primary animate-gradient">drive</span> my craft
            </h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              A quick look at the mindset, focus areas and principles I bring to every project.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🎨", tag: "Design", title: "Graphic Designing", desc: "Crafting sharp visuals, posters, thumbnails and social creatives in Figma & CapCut that make brands stand out." },
              { emoji: "📈", tag: "Marketing", title: "Digital Marketing", desc: "Understanding SEO, content strategy and social growth — building products people actually discover." },
              { emoji: "💻", tag: "Development", title: "Web & AI Development", desc: "Building modern, responsive web apps with a strong pull toward AI-powered features and automation." },
              { emoji: "🧠", tag: "Mindset", title: "Curious Learner", desc: "Constantly exploring AI, new frameworks and better patterns to sharpen my craft." },
              { emoji: "⚡", tag: "Execution", title: "Ship Fast, Ship Clean", desc: "Balancing speed with quality — clean architecture, readable code, thoughtful UX." },
              { emoji: "🚀", tag: "Ambition", title: "Future-Ready", desc: "Building the foundation today for a long-term career in modern software, design & AI." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative p-6 rounded-2xl glass border border-border shadow-card overflow-hidden"
              >
                <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-primary/50 via-transparent to-accent/50 opacity-0 group-hover:opacity-70 blur-md transition-opacity -z-10" />
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/20 blur-3xl opacity-40 group-hover:opacity-90 transition-opacity" />
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                  className="relative inline-flex w-12 h-12 items-center justify-center rounded-xl bg-gradient-primary text-2xl shadow-glow"
                >
                  {v.emoji}
                </motion.div>
                <div className="relative mt-4">
                  <div className="text-[10px] font-semibold tracking-[0.25em] uppercase text-accent mb-1">{v.tag}</div>
                  <h4 className="text-lg font-bold leading-tight">{v.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* My Journey */}
      <Section id="journey" className="overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div aria-hidden className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        <motion.div variants={fadeUp} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-widest mb-3">
            <span>&nbsp;MY JOURNEY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            From Curiosity to Craft
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            The milestones that shaped who I am today — as a developer, learner and creator.
          </p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }} className="mt-4 mx-auto h-1 w-24 bg-gradient-primary rounded-full origin-left" />
        </motion.div>

        <JourneyTimeline />
      </Section>


      {/* Education (responsive simplified version) */}
      <Section id="education" className="overflow-hidden relative">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            aria-hidden
            className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl"
            animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          {[GraduationCap, BookOpen, Building2].map((Ic, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute text-accent/20"
              style={{ top: `${18 + i * 18}%`, left: `${(i * 24) % 88}%` }}
              animate={{ y: [0, -18, 0], rotate: [0, 8, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.4 }}
            >
              <Ic className="w-7 h-7" />
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-widest mb-3">
            <span>&nbsp;EDUCATION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            My Academic Journey
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A strong academic foundation driving my passion for technology and innovation.
          </p>
          <div className="mt-4 mx-auto h-1 w-24 bg-gradient-primary rounded-full" />
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-0">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/40" />
          <div className="space-y-10">
            {[
              {
                icon: GraduationCap,
                title: "Bachelor of Computer Applications",
                school: "SSCCS · Maharaja Krishnakumarsinhji Bhavnagar University",
                year: "2023–26",
                metric: { label: "CGPA", value: 8.71, dec: 2, suffix: "" },
                ribbon: "⭐ 8.71 CGPA",
              },
              {
                icon: BookOpen,
                title: "Higher Secondary (HSC-12th)",
                school: "GSHSEB",
                year: "2022–23",
                metric: { label: "Percentile", value: 94.39, dec: 2, suffix: "" },
                ribbon: "🎯 94.39 Percentile",
              },
              {
                icon: Building2,
                title: "Secondary (SSC-10th)",
                school: "GSEB",
                year: "2020–21",
                metric: { label: "Percentile", value: 86.31, dec: 2, suffix: "" },
                ribbon: "🏆 First Class",
              },
            ].map((e, i) => {
              const Icon = e.icon;
              const left = i % 2 === 0;
              const card = (
                <div className="group relative rounded-[28px] glass border border-border shadow-card p-6 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary via-accent to-primary opacity-60" />
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-3xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-xl leading-tight text-foreground">{e.title}</h3>
                        <p className="text-sm text-muted-foreground">{e.school}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-glow whitespace-nowrap">
                      {e.ribbon}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5" /> {e.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" /> <Counter to={e.metric.value} decimals={e.metric.dec} suffix={e.metric.suffix} />
                    </span>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={e.title}
                  variants={fadeUp}
                  className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start"
                >
                  <div className={left ? "md:text-right md:pr-8" : ""}>
                    {left && <div className="md:ml-auto md:max-w-md">{card}</div>}
                  </div>

                  <div className="hidden md:flex relative items-center justify-center">
                    <div className="h-5 w-5 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow flex">
                      <span className="absolute inset-0 rounded-full bg-gradient-primary opacity-20" />
                      <span className="h-7 w-7 rounded-full bg-background shadow-glow" />
                    </div>
                  </div>

                  <div className={left ? "" : "md:pl-8"}>
                    {!left && <div className="md:mr-auto md:max-w-md">{card}</div>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills">
        <SectionTitle eyebrow="Skills" title="Building with Modern Technologies." center />
        <SkillsShowcase />
      </Section>

      {/* Experience */}
      <Section id="experience" className="overflow-hidden">
        {/* floating particles */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            aria-hidden
            className="absolute top-20 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute w-1.5 h-1.5 rounded-full bg-accent/50"
              style={{ top: `${(i * 37) % 95}%`, left: `${(i * 53) % 95}%` }}
              animate={{ y: [0, -25, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </div>

        <motion.div variants={fadeUp} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-widest mb-3">
            <span>&nbsp;WORK EXPERIENCE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Professional Experience & Career Growth
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            My journey of learning, contributing and building real-world skills.
          </p>
          <div className="mt-4 mx-auto h-1 w-24 bg-gradient-primary rounded-full" />
        </motion.div>

        <div className="relative pl-14 md:pl-16">
          {/* glowing connector */}
          <div className="absolute left-5 md:left-6 top-2 bottom-2 w-px overflow-hidden">
            <div className="w-full h-full bg-linear-to-b from-primary via-accent to-primary opacity-70" />
            <motion.div
              aria-hidden
              className="absolute inset-0 w-full bg-linear-to-b from-transparent via-white/80 to-transparent blur-sm"
              animate={{ y: ["-30%", "120%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {[
            {
              icon: Rocket,
              role: "🚀 Python Development Intern",
              org: "Apex Software House",
              orgIcon: Building2,
              date: "Jan–Feb 2026",
              duration: "120 Hours Internship",
              bullets: [
                "Hands-on internship building Python applications with AI integration",
                "Contributed to real-time projects and client-level tasks",
                "Gained experience in software development and problem-solving",
              ],
              highlights: ["Python Development", "AI Integration", "Real-Time Projects", "Client-Level Tasks"],
              skills: ["Python", "AI", "Problem Solving"],
              badges: ["🏆 Internship Experience", "⭐ Real-World Project Exposure"],
            },
            {
              icon: Brain,
              role: "💻 Computer Operator (Part-Time)",
              org: "Ashapura Medical Store",
              orgIcon: Building2,
              date: "2023 — Present",
              duration: "3+ Year Experience",
              bullets: [
                "Performed data entry and billing operations",
                "Managed memo entry, stock records and inventory tracking",
                "Operated medical store management software efficiently",
              ],
              highlights: ["Data Entry & Billing", "Stock Management", "Inventory Tracking", "Memo Management", "Medical Software Operations"],
              skills: ["Data Entry", "Inventory Management", "Communication"],
              badges: ["📈 Professional Growth", "⭐ Reliability"],
            },
          ].map((j, i) => (
            <motion.div key={j.role} variants={fadeUp} className="relative mb-12 last:mb-0">
              {/* glowing node */}
              <div className="absolute -left-11.5 md:-left-12.5 top-4 z-10">
                <motion.div
                  className="w-5 h-5 rounded-full bg-gradient-primary shadow-glow ring-4 ring-background"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-accent/40"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
                />
              </div>

              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="group relative p-6 md:p-7 rounded-2xl glass border border-border shadow-card overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-primary/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.08 }}
                      className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow shrink-0"
                    >
                      <j.icon className="w-6 h-6" />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-bold leading-snug">{j.role}</h3>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                        <j.orgIcon className="w-3.5 h-3.5" /> {j.org}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5" /> {j.date}
                  </span>
                </div>

                <div className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> {j.duration}
                </div>

                <ul className="relative space-y-2 mb-4">
                  {j.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative flex flex-wrap gap-2 mb-3">
                  {j.highlights.map((h) => (
                    <span key={h} className="px-2.5 py-1 rounded-md bg-secondary text-[11px] font-medium">
                      {h}
                    </span>
                  ))}
                </div>

                <div className="relative flex flex-wrap gap-2 pt-3 border-t border-border">
                  {j.skills.map((s, si) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + si * 0.08 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-glow"
                    >
                      <Zap className="w-3 h-3" /> {s}
                    </motion.span>
                  ))}
                  {j.badges.map((b) => (
                    <span key={b} className="px-3 py-1 rounded-full glass text-xs font-semibold">
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* Projects */}
      <Section id="projects" className="overflow-hidden">
        {/* floating bg */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div aria-hidden className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        <motion.div variants={fadeUp} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-widest mb-3">
            <span>Projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Real-world applications built with modern technologies.
          </p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }} className="mt-4 mx-auto h-1 w-24 bg-gradient-primary rounded-full origin-left" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              emoji: "📰",
              image: newsflashImg,
              icon: Brain,
              title: "NewsFlash",
              subtitle: "Modern AI-Powered News App",
              category: "Full-Stack · AI",
              status: "Featured",
              statusColor: "from-amber-500 to-orange-500",
              tech: ["Next.js", "TypeScript", "SQLite", "AI"],
              bullets: [
                "Full-stack news web app with secure admin panel",
                "AI-based article generation system integrated",
                "PDF export and dynamic homepage",
              ],
              metrics: { features: "8+", tech: "4", type: "Web App" },
              featured: true,
            },
            {
              emoji: "♟️",
              image: apexChessImg,
              icon: Trophy,
              title: "Apex Chess",
              subtitle: "Python AI Chess Engine",
              category: "Desktop · AI",
              status: "Completed",
              statusColor: "from-emerald-500 to-teal-500",
              tech: ["Python", "Game Logic", "AI Opponent"],
              bullets: [
                "Python-based chess game with AI opponent",
                "Move validation, checkmate detection, undo/reset",
                "Interactive UI with full move history",
              ],
              features: ["Checkmate Detection", "Move History", "Undo / Reset", "AI Opponent"],
              metrics: { features: "6+", tech: "3", type: "Desktop" },
            },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative rounded-[20px] glass border border-border shadow-card overflow-hidden flex flex-col ${p.featured ? "md:row-span-1" : ""}`}
            >
              {/* animated gradient border */}
              <div className="absolute -inset-px rounded-[20px] bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-60 blur-sm transition-opacity -z-10" />

              {/* Featured ribbon */}
              {p.featured && (
                <div className="absolute top-4 left-0 z-20">
                  <div className="px-4 py-1.5 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-glow rounded-r-full flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" /> Featured Project
                  </div>
                </div>
              )}

              {/* Banner — real project screenshot */}
              <div className="relative h-52 md:h-56 overflow-hidden bg-linear-to-br from-primary/20 via-accent/10 to-primary/5">
                <motion.img
                  src={p.image}
                  alt={`${p.title} preview`}
                  loading="lazy"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.06 }}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/20 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-linear-to-r ${p.statusColor} shadow-glow`}>
                    ● {p.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[11px] font-semibold text-foreground/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{p.title}</span>
                </div>
              </div>

              <div className="relative p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-widest text-accent font-semibold mb-1">{p.category}</div>
                    <h3 className="text-2xl font-bold leading-tight">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{p.subtitle}</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow shrink-0"
                  >
                    <p.icon className="w-5 h-5" />
                  </motion.div>
                </div>

                <ul className="space-y-2 mt-4 mb-5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {p.features && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.features.map((f) => (
                      <span key={f} className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-semibold border border-accent/30">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-secondary/40 border border-border mb-4">
                  <div className="text-center">
                    <div className="text-base font-bold text-gradient">{p.metrics.features}</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">Features</div>
                  </div>
                  <div className="text-center border-x border-border">
                    <div className="text-base font-bold text-gradient">{p.metrics.tech}</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">Tech</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-bold text-gradient">{p.metrics.type}</div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">Type</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-[11px] font-medium text-foreground/90">
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section id="certifications" className="overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div aria-hidden className="absolute top-10 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute bottom-10 left-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
            animate={{ x: [0, 20, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span key={i} aria-hidden className="absolute w-1.5 h-1.5 rounded-full bg-accent/40"
              style={{ top: `${(i * 41) % 95}%`, left: `${(i * 59) % 95}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.3 }} />
          ))}
        </div>

        <motion.div variants={fadeUp} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-widest mb-3">
            <span>Achievements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Achievements & Certifications
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A collection of certifications, competitions, conferences, and professional accomplishments that reflect my continuous learning journey.
          </p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }} className="mt-4 mx-auto h-1 w-24 bg-gradient-primary rounded-full origin-left" />
        </motion.div>

        {/* Stats cards removed per request */}


        {/* Featured achievements */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: "🏆", title: "FLASH@SSCCS-2025", sub: "Computer & IT Exhibition", grad: "from-amber-500/30 to-orange-500/20" },
            { icon: "🚀", title: "Ignite-2026 Ideathon", sub: "Charusat University", grad: "from-violet-500/30 to-fuchsia-500/20" },
            { icon: "🎓", title: "International Conference", sub: "Education & Knowledge Creation", grad: "from-sky-500/30 to-cyan-500/20" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`group relative p-6 rounded-2xl glass border border-border shadow-card overflow-hidden bg-linear-to-br ${f.grad}`}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-primary text-primary-foreground text-[9px] font-bold uppercase tracking-wider shadow-glow">
                Featured
              </div>
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="text-5xl mb-3"
                >
                  {f.icon}
                </motion.div>
                <h3 className="font-bold text-lg leading-tight">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{f.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cert cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {[
            { title: "FLASH@SSCCS-2025", desc: "Participant in Computer & IT Exhibition (23–26 Dec 2025), representing 'News Flash'.", cat: "🏆 Competition" },
            { title: "Ignite-2026 Ideathon", desc: "Participated on 23rd January 2026 at Charusat University of Science and Technology.", cat: "🚀 Achievement" },
            { title: "International Conference", desc: "Multidisciplinary conference on Education and Knowledge Creation (28–29 Dec 2025) at SSCCS.", cat: "🎓 Conference" },
            { title: "Computer Hardware & Peripherals", desc: "IT Experts Academy (organized by GSDM) — completed 15 Feb to 04 Apr 2025.", cat: "💡 Workshop" },
            { title: "CCC — Course on Computer Concepts", desc: "Devmani Computer Institute, completed in 2022.", cat: "📜 Certification" },
            { title: "SSCCS Sports Day 2026", desc: "Participated in Tug of War and secured Runner-up in College Sports Day on 22-02-2026. Won the medal.", cat: "🥈 Sports" },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-5 rounded-[20px] glass border border-border shadow-card overflow-hidden"
            >
              <div className="absolute -inset-px rounded-[20px] bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-50 blur-sm transition-opacity -z-10" />
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-3 mb-3">
                <motion.div
                  animate={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="relative w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow"
                >
                  <Award className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <div className="inline-block px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold mb-1">{c.cat}</div>
                  <h3 className="font-semibold leading-tight group-hover:text-accent transition-colors">{c.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>

      </Section>

      {/* Contact */}
      <Section id="contact" className="overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div aria-hidden className="absolute top-10 -left-20 w-80 h-80 rounded-full bg-primary/15 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-accent/15 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        <motion.div variants={fadeUp} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-widest mb-3">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Open to internships, freelance projects, collaborations, and exciting opportunities.
          </p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }} className="mt-4 mx-auto h-1 w-24 bg-gradient-primary rounded-full origin-left" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-12">
          {/* Contact info */}
          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-5">
            <div className="p-8 md:p-10 rounded-3xl glass border border-border shadow-card">
              <h3 className="text-lg font-bold mb-2">Contact Information</h3>
              <p className="text-xs text-muted-foreground mb-6">Usually responds within 24 hours</p>
              <div className="space-y-4">
                {[
                  { Icon: Mail, label: "Email", value: "yashdabhi95@gmail.com", href: "mailto:yashdabhi95@gmail.com" },
                  { Icon: Phone, label: "Phone", value: "+91 9173763080", href: "tel:+919173763080" },
                  { Icon: MapPin, label: "Location", value: "Bhavnagar, Gujarat, India", href: "#" },
                  { Icon: Linkedin, label: "LinkedIn", value: "yash-dabhi", href: "https://www.linkedin.com/in/yash-dabhi-14178437b" },
                  { Icon: Github, label: "GitHub", value: "github.com/yashdabhi-2155", href: "https://github.com/yashdabhi-2155" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 p-4 rounded-3xl border border-border hover:border-accent/60 hover:bg-card/60 transition-all"
                  >
                    <div className="w-12 h-12 rounded-3xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <c.Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                      <div className="text-sm font-medium truncate group-hover:text-accent transition-colors">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Follow Me section removed */}
          </motion.div>

          {/* Contact form */}
          <ContactForm />

        </div>

        {/* Footer CTA */}
        <motion.div
          variants={fadeUp}
          className="mt-12 relative p-8 md:p-10 rounded-[20px] bg-gradient-card border border-border shadow-card text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Have a project or opportunity in mind?
            </h3>
            <p className="text-muted-foreground mb-6">Let's create something amazing together.</p>
            <a
              href="mailto:yashdabhi95@gmail.com"
              className="inline-flex w-full justify-center items-center gap-2 px-6 py-4 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform"
            >
              <Mail className="w-4 h-4" /> Start a Conversation
            </a>
          </div>
        </motion.div>
      </Section>

      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Yash Dabhi. Crafted with passion.
      </footer>

      {/* Floating WhatsApp CTA (smaller, tidy) */}
      <motion.a
        href={`https://wa.me/919173763080?text=${encodeURIComponent("Hi Yash! I visited your portfolio and would love to connect with you.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
        className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2"
      >
        <span className="hidden md:inline-flex items-center px-3 py-1.5 rounded-full bg-card border border-border text-[11px] font-semibold shadow-card opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300">
          Chat on WhatsApp
        </span>
        <span
          className="relative inline-flex w-11 h-11 items-center justify-center rounded-full text-white transition-transform group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 55%, #15803d 100%)",
            boxShadow: "0 8px 24px -6px rgba(22, 163, 74, 0.55)",
          }}
        >
          <span className="absolute inset-0 rounded-full opacity-50 animate-ping"
            style={{ background: "radial-gradient(circle, #22c55e, transparent 70%)" }} />
          <svg viewBox="0 0 24 24" className="w-5 h-5 relative" fill="currentColor" aria-hidden>
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.38-1.67a11.83 11.83 0 0 0 5.67 1.44h.01c6.55 0 11.85-5.3 11.85-11.86 0-3.17-1.23-6.15-3.39-8.43ZM12.06 21.4h-.01a9.5 9.5 0 0 1-4.85-1.33l-.35-.21-3.79 1 1.01-3.69-.23-.38a9.5 9.5 0 0 1-1.45-5.05c0-5.25 4.27-9.52 9.53-9.52 2.54 0 4.93 1 6.72 2.79a9.44 9.44 0 0 1 2.79 6.72c0 5.25-4.27 9.52-9.52 9.52Zm5.24-7.14c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.29-.14-1.21-.44-2.31-1.42-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.44.13-.58.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.13-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39s1.02 2.77 1.17 2.96c.14.19 2.02 3.08 4.89 4.32.68.29 1.22.47 1.63.6.68.22 1.3.19 1.79.11.55-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.11-.26-.19-.55-.33Z"/>
          </svg>
        </span>
      </motion.a>


    </div>
  );
}

import {
  SiC, SiCplusplus, SiPython, SiHtml5, SiCss, SiJavascript,
  SiPhp, SiDotnet, SiMysql, SiSqlite, SiGit, SiGithub, SiFigma,
} from "react-icons/si";
import { FaJava, FaCode, FaVideo } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import type { IconType } from "react-icons";

type Skill = { name: string; category: string; color: string; Icon: IconType };

const SKILLS: Skill[] = [
  { name: "C", category: "Languages", color: "#A8B9CC", Icon: SiC },
  { name: "C++", category: "Languages", color: "#00599C", Icon: SiCplusplus },
  { name: "Java", category: "Languages", color: "#f89820", Icon: FaJava },
  { name: "Advanced Java", category: "Languages", color: "#EA2D2E", Icon: FaJava },
  { name: "Python", category: "Languages", color: "#3776AB", Icon: SiPython },
  { name: "HTML", category: "Web", color: "#E34F26", Icon: SiHtml5 },
  { name: "CSS", category: "Web", color: "#1572B6", Icon: SiCss },
  { name: "JavaScript", category: "Web", color: "#F7DF1E", Icon: SiJavascript },
  { name: "PHP", category: "Web", color: "#777BB4", Icon: SiPhp },
  { name: "ASP.NET", category: "Web", color: "#512BD4", Icon: SiDotnet },
  { name: "SQL", category: "Database", color: "#00758F", Icon: SiMysql },
  { name: "PL/SQL", category: "Database", color: "#F80000", Icon: SiSqlite },
  { name: "Git", category: "Tools", color: "#F05032", Icon: SiGit },
  { name: "GitHub", category: "Tools", color: "#e5e7eb", Icon: SiGithub },
  { name: "VS Code", category: "Tools", color: "#007ACC", Icon: VscVscode },
  { name: "Figma", category: "Tools", color: "#F24E1E", Icon: SiFigma },
  { name: "CapCut", category: "Tools", color: "#00D4FF", Icon: FaVideo },
  { name: "Problem Solving", category: "Tools", color: "#22d3ee", Icon: FaCode },
];

function SkillsShowcase() {
  const categories = ["All", "Languages", "Web", "Database", "Tools"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active);

  return (
    <motion.div variants={fadeUp}>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
        I work across the stack from language fundamentals to web technologies, databases and tooling that ship real products.
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              active === c
                ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                : "glass border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {filtered.map((s, i) => {
          const Icon = s.Icon;
          return (
            <motion.div
              key={s.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="group relative p-5 rounded-2xl bg-gradient-card border border-border shadow-card flex flex-col items-center justify-center gap-3 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity"
                style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}, transparent 70%)` }}
              />
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center shadow-glow"
                style={{
                  background: `linear-gradient(135deg, ${s.color}22, ${s.color}08)`,
                  border: `1px solid ${s.color}55`,
                }}
              >
                <Icon size={30} color={s.color} />
              </div>
              <span className="relative text-sm font-medium text-center">{s.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
