import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiYoutube, FiMenu, FiX, FiChevronUp, FiDownload, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiSpring, SiTypescript, SiPython, SiMongodb, SiPostgresql, SiDocker } from "react-icons/si";
import './App.css';

// Hero image source + local fallback
const HERO_REMOTE = 'https://raw.githubusercontent.com/Pranav-Talwar/CookBook/refs/heads/main/IMG_20250603_153933.jpg';
const HERO_LOCAL = '/pranav-hero.jpg';

// Animation Configurations
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Skills Array
const skillsBadges = [
  { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
  { name: "TypeScript", iconClass: "devicon-typescript-plain colored" },
  { name: "Python", iconClass: "devicon-python-plain colored" },
  { name: "Java", iconClass: "devicon-java-plain colored" },
  { name: "C#", iconClass: "devicon-csharp-plain colored" },
  { name: "React.js", iconClass: "devicon-react-original colored" },
  { name: "Next.js", iconClass: "devicon-nextjs-plain" },
  { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original colored" },
  { name: "Prisma ORM", iconClass: "devicon-prisma-original" },
  { name: "Docker", iconClass: "devicon-docker-plain colored" },
  { name: "Firebase", iconClass: "devicon-firebase-plain colored" },
  { name: "AWS", iconClass: "devicon-amazonwebservices-plain-wordmark" },
  { name: "Cloudflare", iconClass: "devicon-cloudflare-plain colored" },
  { name: "jQuery", iconClass: "devicon-jquery-plain colored" },
  { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
  { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
  { name: "Express.js", iconClass: "devicon-express-original" },
  { name: "Spring Boot", iconClass: "devicon-spring-plain colored" },
  { name: "PostgreSQL", iconClass: "devicon-postgresql-plain colored" },
  { name: "MySQL", iconClass: "devicon-mysql-plain colored" },
  { name: "Oracle DB", iconClass: "devicon-oracle-plain colored" },
  { name: "Supabase", iconClass: "devicon-supabase-plain" },
  { name: "HTML5", iconClass: "devicon-html5-plain colored" },
  { name: "CSS3", iconClass: "devicon-css3-plain colored" },
  { name: "Hono", iconClass: "devicon-hugo-plain" },
  { name: "Bootstrap", iconClass: "devicon-bootstrap-plain colored" },
  { name: "NextAuth", iconClass: "devicon-nextjs-line" },
];

// Featured Projects (top 2)
const featuredProjects = [
  {
    title: "CoSounds",
    subtitle: "NATHacks 2025 | Piloting at UofA Cameron Library in January 2026",
    description:
      "Students won't fill out surveys while studying, so we made feedback frictionless. One NFC tap connects you to the room's adaptive soundscapes. Vote with green/red NFC tags while listening. ML model learns your preferences and balances them with everyone else's in real-time, creating collective harmony that improves with each session.",
    tech: ['React', 'TypeScript', 'Python', 'Supabase', 'NFC'],
    icon: SiTypescript,
    iconColor: "text-blue-400",
    gradient: "from-blue-600/20 to-purple-600/20",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Para-Athlete Equipment Testing Platform",
    subtitle: "Built for CIM-TAC | Capstone",
    description:
      "Para-athletes experience 2x the injury rate of able-bodied athletes—partly because equipment is fitted by feel, not data. Built a platform for Paralympic coaches to test configurations using motion sensors and athlete feedback, replacing guesswork with measurable evidence.",
    tech: ['React.js', 'TypeScript', 'D3.js', 'Express.js', 'PostgreSQL'],
    icon: SiPostgresql,
    iconColor: "text-cyan-400",
    gradient: "from-cyan-600/20 to-teal-600/20",
    borderColor: "border-cyan-500/30",
    link: "https://github.com/Pranav-Talwar/cim-tac-dashboard"
  },
];

// Other Projects
const projects = [
  {
    title: "CampusUnify",
    subtitle: "Campus Social Platform",
    description:
      "A campus social platform for students of Red Deer Polytechnic focused on seamless posting and community engagement.",
    tech: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind', 'NextAuth'],
    icon: SiNextdotjs,
    iconColor: "text-white",
    link: "https://github.com/Pranav-Talwar/CampusUnify"
  },
  {
    title: "Cover To Cover",
    subtitle: "Book-Tracking Platform",
    description:
      "A full-stack book review platform for discovering, rating, and organizing books with community-driven reviews.",
    tech: ['Spring Boot', 'React.js', 'MySQL', 'Google Books API'],
    icon: SiSpring,
    iconColor: "text-green-400",
    link: "https://github.com/Pranav-Talwar/BookTrackingAndReview"
  },
  {
    title: "Mr.ReadME",
    subtitle: "Markdown Editor for GitHub",
    description:
      "A markdown editor with drag-and-drop icons, pre-built templates, and live Markdown conversion.",
    tech: ['React.js', 'Node.js', 'MongoDB', 'TipTap', 'DnD-Kit'],
    icon: SiReact,
    iconColor: "text-cyan-400",
    link: "https://github.com/Pranav-Talwar/Markdown-Editor"
  },
  {
    title: "MapleMigrant",
    subtitle: "Blog Platform",
    description:
      "A blog platform where newcomers share experiences, guides, and resources with secure auth and scalable CMS.",
    tech: ['React', 'TypeScript', 'Hono', 'Cloudflare', 'Prisma'],
    icon: SiReact,
    iconColor: "text-cyan-400",
    link: "https://maple-migrant.pranavtalwar.ca"
  },
  {
    title: "Calmy Focus App",
    subtitle: "Productivity & Wellness Platform",
    description:
      "Productivity platform with sticky notes, Pomodoro timer, meditation hub, and habit tracking.",
    tech: ['.NET', 'C#', 'Bootstrap', 'MongoDB'],
    icon: SiMongodb,
    iconColor: "text-green-500",
    link: "https://github.com/Pranav-Talwar/Calmy-Focus-App"
  },
  {
    title: "NewsJam",
    subtitle: "React News Aggregator",
    description:
      "Real-time news aggregation with seamless pagination and category-based navigation.",
    tech: ['React.js', 'Bootstrap', 'News API'],
    icon: SiReact,
    iconColor: "text-blue-400",
    link: "https://github.com/Pranav-Talwar/NewsJam"
  },
];

// Navigation Links
const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

// Featured Project Card
const FeaturedProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`group relative p-8 rounded-3xl bg-gradient-to-br ${project.gradient} border ${project.borderColor} backdrop-blur-xl overflow-hidden`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-neutral-800/50 backdrop-blur-sm`}>
              {project.icon && <project.icon className={`text-3xl ${project.iconColor}`} />}
            </div>
            <div>
              <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                Featured
              </span>
            </div>
          </div>
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors"
            >
              <FiArrowUpRight className="text-xl" />
            </motion.a>
          )}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-blue-300/80 mb-4">{project.subtitle}</p>
        <p className="text-neutral-300 leading-relaxed mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tech?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm bg-neutral-800/60 rounded-lg backdrop-blur-sm border border-neutral-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Regular Project Card
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group p-6 bg-neutral-800/40 rounded-2xl hover:bg-neutral-800/60 transition-all duration-300 border border-neutral-700/30 hover:border-neutral-600/50"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2.5 rounded-xl bg-neutral-700/50">
          {project.icon && <project.icon className={`text-2xl ${project.iconColor}`} />}
        </div>
        <div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-sm text-neutral-500">{project.subtitle}</p>
        </div>
      </div>

      <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech?.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs bg-neutral-700/40 rounded-md"
          >
            {tech}
          </span>
        ))}
        {project.tech?.length > 4 && (
          <span className="px-2 py-0.5 text-xs bg-neutral-700/40 rounded-md">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        View Project <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </motion.div>
  );
};


// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
        type === 'success' 
          ? 'bg-green-500/20 border-green-500/30 text-green-300' 
          : 'bg-red-500/20 border-red-500/30 text-red-300'
      }`}
    >
      {type === 'success' ? <FiCheckCircle className="text-xl" /> : <FiAlertCircle className="text-xl" />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
        <FiX />
      </button>
    </motion.div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [heroSrc, setHeroSrc] = useState(HERO_REMOTE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track active section & scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xvgkkdee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setToast({ message: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setToast({ message: error.message || 'Failed to send message', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-xl z-50 border-b border-neutral-800/50"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <motion.a 
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            PT
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href.substring(1) 
                    ? 'text-blue-400' 
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-800/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800/50"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                      activeSection === link.href.substring(1)
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-100'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="relative max-w-6xl mx-auto pt-24 px-6">
        {/* HERO Section */}
        <section id="home" className="min-h-[90vh] flex items-center py-12">
          <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Text & CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for opportunities
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-neutral-100">Hi, I'm </span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Pranav
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-neutral-400 font-medium mb-4">
                Full-Stack Developer
              </p>

              <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Computer Science Student @ Red Deer Polytechnic. I build end-to-end web solutions that are scalable, secure, and user-centric.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <motion.a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-neutral-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-neutral-800 text-neutral-100 font-semibold rounded-xl border border-neutral-700 hover:bg-neutral-700 transition-colors"
                >
                  Get In Touch
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {[
                  { href: "https://github.com/Pranav-Talwar", icon: FiGithub, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/pranav-talwar1/", icon: FiLinkedin, label: "LinkedIn" },
                  { href: "mailto:talwarpranav929@gmail.com", icon: FiMail, label: "Email" },
                  { href: "https://www.youtube.com/channel/UC3Me05JnNPi6ZSDG8wan-5Q", icon: FiYoutube, label: "YouTube" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50 hover:border-neutral-600 hover:bg-neutral-800 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="text-xl text-neutral-400 hover:text-neutral-100 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl scale-110" />
                <motion.img
                  src={heroSrc}
                  alt="Pranav Talwar - Full-Stack Developer"
                  onError={() => setHeroSrc(HERO_LOCAL)}
                  className="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-4 border-neutral-800 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About & Skills Section */}
        <section id="about" className="py-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12"
          >
            {/* About Me (Left) */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">About Me</span>
              </h2>
              <p className="text-neutral-400 leading-relaxed">
                I am a passionate web developer currently pursuing a diploma in <span className="text-neutral-200 font-medium">Computer Programming at Red Deer Polytechnic</span>.
                I have expertise in <span className="text-neutral-200 font-medium">React.js, Node.js, Next.js</span>, and various databases like <span className="text-neutral-200 font-medium">MySQL, PostgreSQL, and MongoDB.</span>
                My journey in software development involves crafting seamless user experiences, optimizing backend logic, and ensuring
                smooth real-time interactions. Whether it's enhancing frontend performance or building scalable backend architectures,
                I thrive on solving complex problems with innovative solutions.
              </p>
            </div>

            {/* Skills (Right) */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {skillsBadges.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800/50 rounded-full text-sm border border-neutral-700/30 hover:border-neutral-600/50 hover:bg-neutral-800 transition-colors cursor-default"
                  >
                    {skill.iconClass && <i className={`${skill.iconClass} text-lg`}></i>}
                    <span className="text-neutral-300">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Featured Projects</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              A selection of projects I've worked on, from hackathon wins to real-world applications.
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* Other Projects */}
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-neutral-300 mb-6"
          >
            More Projects
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Let's Connect</span>
              </h2>
              <p className="text-neutral-500">
                Have a project in mind or just want to chat? Send me a message!
              </p>
            </div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-neutral-400 font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-xl placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-neutral-400 font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-xl placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-neutral-400 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-xl placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-neutral-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-neutral-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                PT
              </span>
              <span className="text-neutral-500 text-sm">
                © {new Date().getFullYear()} Pranav Talwar
              </span>
            </div>

            <div className="flex items-center gap-4">
              {[
                { href: "https://github.com/Pranav-Talwar", icon: FiGithub },
                { href: "https://www.linkedin.com/in/pranav-talwar1/", icon: FiLinkedin },
                { href: "mailto:talwarpranav929@gmail.com", icon: FiMail },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="p-2 text-neutral-500 hover:text-neutral-100 transition-colors"
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-blue-500 text-neutral-900 rounded-full shadow-lg shadow-blue-500/25 hover:bg-blue-400 transition-colors z-40"
            aria-label="Scroll to top"
          >
            <FiChevronUp className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
