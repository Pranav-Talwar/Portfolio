import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiYoutube } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiSpring } from "react-icons/si";
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

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

// Expanded Skills Array
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

const projects = [
  {
    title: "CoSounds - Adaptive Collective Personalized Soundscapes",
    subtitle: "NATHacks 2025 | Piloting at UofA Cameron Library in January 2026",
    description:
      "Students won't fill out surveys while studying, so we made feedback frictionless. One NFC tap connects you to the room's adaptive soundscape. Vote with green/red NFC tags while listening. ML learns your preferences and balances them with everyone else's in real-time, creating collective harmony that improves with each session.",
    tech: ['React', 'TypeScript', 'Python', 'Supabase', 'NFC'],
  },  
  {
    title: "Para-Athlete Equipment Testing Platform",
    subtitle: "Built for CIM-TAC | Capstone",
    description:
      "Para-athletes experience 2x the injury rate of able-bodied athletes, partly because equipment is fitted by feel, not data. This platform helps Paralympic coaches test various configurations by combining motion sensor analysis with athlete feedback ratings—replacing subjective fitting with measurable evidence to reduce injuries and optimize performance.",
    tech: ['React.js', 'TypeScript', 'D3.js', 'Express.js', 'PostgreSQL', 'TanStack Query'],
    icon: SiReact,
    iconColor: "text-scn-lime-green",
    link: "https://github.com/Pranav-Talwar/cim-tac-dashboard"
},
  {
    title: "CampusUnify",
    subtitle: "Campus Social Platform",
    description:
      "A campus social platform for students of Red Deer Polytechnic focused on seamless posting and community engagement. Prioritize sharing updates and ideas in a clean, safe space designed to foster community while keeping interactions intuitive and protected.",
    tech: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind', 'NextAuth'],
    icon: SiNextdotjs,
    iconColor: "text-blue-400",
    link: "https://github.com/Pranav-Talwar/CampusUnify"
  },
  {
    title: "Cover To Cover",
    subtitle: "Book-Tracking Platform",
    description:
      "A full-stack book review platform for discovering, rating, and organizing books. Combines community-driven reviews, personalized recommendations, and secure user profiles to simplify literary exploration.",
    tech: ['Spring Boot', 'React.js', 'MySQL', 'Google Books API'],
    icon: SiSpring,
    iconColor: "text-green-400",
    link: "https://github.com/Pranav-Talwar/BookTrackingAndReview"
  },
  {
    title: "Mr.ReadME",
    subtitle: "Markdown Editor for GitHub",
    description:
      "A markdown editor built with React that lets users create and convert ReadME files using drag-and-drop icons, pre-built templates, and custom formatting. Features include live Markdown conversion, user authentication, and responsive UI.",
    tech: ['React.js', 'Node.js', 'MongoDB', 'TipTap', 'DnD-Kit'],
    iconColor: "text-yellow-400",
    link: "https://github.com/Pranav-Talwar/Markdown-Editor"
  },
  {
    title: "Calmy Focus App",
    subtitle: "Productivity & Wellness Platform",
    description:
      "A productivity and wellness platform with sticky notes, Pomodoro timer, drag-and-drop calendar, meditation hub, and habit tracking to reduce burnout and boost daily focus in a calming browser-based experience.",
    tech: ['.NET', 'C#', 'Bootstrap', 'MongoDB'],
    iconColor: "text-indigo-400",
    link: "https://github.com/Pranav-Talwar/Calmy-Focus-App"
  },
  {
    title: "MapleMigrant",
    subtitle: "Blog Platform",
    description:
      "A blog platform where newcomers share experiences, guides, and resources. Clean design, secure auth, simple writing flow, and scalable content management suitable for personal blogs and community publishing.",
    tech: ['React', 'TypeScript', 'Hono', 'Cloudflare', 'Prisma', 'Postgres', 'Zod'],
    icon: SiReact,
    iconColor: "text-cyan-400",
    link: "https://maple-migrant.pranavtalwar.ca"
  },
  {
    title: "NewsJam",
    subtitle: "React News Aggregator",
    description:
      "A real-time news aggregation platform with seamless pagination and category-based navigation. Delivers breaking updates in a clean, responsive interface designed for quick browsing and effortless discovery.",
    tech: ['React.js', 'Bootstrap', 'News API'],
    iconColor: "text-blue-400",
    link: "https://github.com/Pranav-Talwar/NewsJam"
  },
  {
    title: "Fitness Companion",
    subtitle: "Fitness Tracker",
    description:
      "Your all-in-one fitness companion featuring workout timers, set counters, BMI analysis, and an exercise library. Streamline your routine by tracking progress, managing workouts, and accessing fitness resources in one intuitive platform.",
    tech: ['jQuery', 'Bootstrap', 'DOM'],
    iconColor: "text-purple-400",
    link: "https://github.com/Pranav-Talwar/Fitness-Companion"
  },

];

// ProjectCard
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="group p-6 bg-neutral-800/50 rounded-2xl hover:bg-neutral-700/30 transition-all duration-300 transform hover:scale-[1.02] shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-4 mb-4">
        {project.icon && <project.icon className={`text-3xl ${project.iconColor}`} />}
        <div>
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <p className="text-neutral-400">{project.subtitle}</p>
        </div>
      </div>

      <p className="text-neutral-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech?.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm bg-neutral-700/30 rounded-full backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={project.link}
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
      >
        View Project <FiArrowUpRight className="group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [heroSrc, setHeroSrc] = useState(HERO_REMOTE);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formspree.io/f/xvgkkdee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError(error.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-neutral-100 font-sans">
      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 bg-neutral-900 bg-opacity-80 backdrop-blur-sm z-50 shadow-md"
      >
        <div className="max-w-6xl mx-auto flex justify-center items-center p-4">
          <div className="space-x-7">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl mx-auto pt-24 px-8"
      >
        {/* HERO: text left, image right */}
        <section id="home" className="mt-8 flex flex-col md:flex-row items-center gap-10">
          {/* Left: Text & Social Icons */}
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              Pranav Talwar
            </motion.h1>

            <motion.div className="text-xl text-neutral-400 mt-4">
              <div className="font-bold px-1">
                Full-Stack Developer

                <br />
                Computer Science Student @ Red Deer Polytechnic
              </div>
              <br />
              <div className="px-1">
                I build end-to-end web solutions that are scalable, secure, and user-centric.
              </div>
            </motion.div>

            <motion.div className="flex justify-center md:justify-start gap-4 mt-8">
              <motion.a
                href="https://github.com/Pranav-Talwar"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-neutral-700/30 hover:bg-blue-500/20 transition-colors"
              >
                <FiGithub className="text-2xl text-neutral-300" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/pranav-talwar1/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-neutral-700/30 hover:bg-blue-500/20 transition-colors"
              >
                <FiLinkedin className="text-2xl text-neutral-300" />
              </motion.a>
              <motion.a
                href="mailto:talwarpranav929@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-neutral-700/30 hover:bg-blue-500/20 transition-colors"
              >
                <FiMail className="text-2xl text-neutral-300" />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/channel/UC3Me05JnNPi6ZSDG8wan-5Q"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-neutral-700/30 hover:bg-blue-500/20 transition-colors"
              >
                <FiYoutube className="text-2xl text-neutral-300" />
              </motion.a>
            </motion.div>

        
          </div>

          {/* Right: Portfolio image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <motion.img
              src={heroSrc}
              alt="Hero"
              onError={() => setHeroSrc(HERO_LOCAL)}
              className="w-full max-w-md rounded-full shadow-lg object-cover"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 10 }}
              transition={{ duration: 0.9 }}
            />
          </div>
        </section>

        <div id="about"></div>

        {/* About & Skills Section */}
        <motion.section {...fadeIn} className="my-20 flex flex-col md:flex-row gap-8">
          {/* About Me (Left) */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">About Me</h2>
            <p className="text-neutral-300 leading-relaxed">
              I am a passionate web developer currently pursuing a diploma in <b>Computer Programming at Red Deer Polytechnic</b>.
              I have expertise in <b>React.js, Node.js, Next.js</b>, and various databases like <b>MySQL, PostgreSQL, and MongoDB.</b>
              My journey in software development involves crafting seamless user experiences, optimizing backend logic, and ensuring
              smooth real-time interactions. Whether it's enhancing frontend performance or building scalable backend architectures,
              I thrive on solving complex problems with innovative solutions.
            </p>
          </div>

          {/* Skills (Right) */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center md:text-left">Skills</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {skillsBadges.map((skill) => (
                <div
                  key={skill.name}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-700/30 rounded-full text-sm transition-colors hover:bg-neutral-700/50"
                >
                  {skill.iconClass && <i className={`${skill.iconClass} text-xl`}></i>}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeIn} id="projects" className="my-20">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section {...fadeIn} id="contact" className="my-20">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">Let's Connect</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 bg-neutral-700/30 rounded-xl placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 bg-neutral-700/30 rounded-xl placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Your Message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-4 bg-neutral-700/30 rounded-xl placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {submitError && <div className="text-red-400 text-sm">{submitError}</div>}
              {submitSuccess && <div className="text-green-400 text-sm">Message sent successfully!</div>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-blue-400 text-neutral-900 font-semibold rounded-xl hover:bg-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </motion.section>

        {/* Footer */}
        <footer className="py-12 bg-neutral-900/50 mt-20 border-t border-neutral-800">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-center">
              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-6">
                <a
                  href="https://github.com/Pranav-Talwar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-blue-400/20 transition-colors"
                >
                  <FiGithub className="text-2xl text-neutral-300 hover:text-blue-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pranav-talwar1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-blue-400/20 transition-colors"
                >
                  <FiLinkedin className="text-2xl text-neutral-300 hover:text-blue-400" />
                </a>
                <a
                  href="mailto:talwarpranav929@gmail.com"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-blue-400/20 transition-colors"
                >
                  <FiMail className="text-2xl text-neutral-300 hover:text-blue-400" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC3Me05JnNPi6ZSDG8wan-5Q"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-blue-400/20 transition-colors"
                >
                  <FiYoutube className="text-2xl text-neutral-300 hover:text-blue-400" />
                </a>
              </div>

              <div className="flex items-center justify-center gap-3">
                <FiMail className="text-neutral-400" />
                <a
                  href="mailto:talwarpranav929@gmail.com"
                  className="text-neutral-300 hover:text-blue-400 transition-colors text-sm"
                >
                  talwarpranav929@gmail.com
                </a>
              </div>

              {/* Copyright */}
              <div className="text-center text-neutral-400">
                <p className="text-sm">© {new Date().getFullYear()} Pranav Talwar</p>
                <p className="text-xs mt-1">All rights reserved</p>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
