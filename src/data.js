// Edit your content here. Items with an `href` become links.
// Text that changes per language uses tx("English", "Español", "Tagalog").
// Plain strings (names, years, tech lists) are shown the same in every language.

import { posts } from "./blogsData";
import { tx } from "./translations";

export const profile = {
  name: "Amiel Jake",
  role: tx("Full-Stack Developer", "Desarrollador Full-Stack", "Full-Stack Developer"),
  // The header cycles through these every 5 seconds
  roles: [
    tx("Full-Stack Developer", "Desarrollador Full-Stack", "Full-Stack Developer"),
    tx("Web Designer", "Diseñador Web", "Web Designer"),
  ],
  tagline: tx(
    "I build web apps people actually love using every day.",
    "Construyo aplicaciones web que la gente realmente disfruta usar todos los días.",
    "Gumagawa ako ng mga web app na talagang gustong gamitin ng mga tao araw-araw."
  ),
  subtitle: tx(
    "Currently engineering full-stack solutions. Open to technical advisory and consulting.",
    "Actualmente desarrollo soluciones full-stack. Disponible para asesoría técnica y consultoría.",
    "Kasalukuyang gumagawa ng mga full-stack na solusyon. Bukas sa technical advisory at consulting."
  ),
};

export const network = [
  { label: "amieljakebaril.com", href: "https://amieljakebaril.com" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "Facebook", href: "https://facebook.com/" },
  { label: "X", href: "https://x.com/" },
];

export const skills = [
  { label: tx("Web UI/UX", "UI/UX web", "Web UI/UX") },
  { label: tx("Full-Stack Developer", "Desarrollador Full-Stack", "Full-Stack Developer") },
  { label: tx("Interactive Design", "Diseño interactivo", "Disenyong Interaktibo") },
  { label: tx("Motion Design", "Diseño de movimiento", "Motion Design") },
  { label: tx("User Experience", "Experiencia de usuario", "Karanasan ng Gumagamit") },
];

export const builds = [
  { label: "Resumate", href: "#" },
  { label: "Kodet", href: "#" },
  {
    label: tx(
      "School Management System",
      "Sistema de gestión escolar",
      "Sistema sa Pamamahala ng Paaralan"
    ),
    href: "#",
  },
  {
    label: tx(
      "Barangay Management System",
      "Sistema de gestión de barangay",
      "Sistema sa Pamamahala ng Barangay"
    ),
    href: "#",
  },
  { label: "Assortment", href: "#" },
];

export const learnings = [
  { label: tx("Web Development", "Desarrollo web", "Web Development") },
  { label: tx("IT Customer Support", "Soporte al cliente de TI", "IT Customer Support") },
  { label: tx("Generative AI", "IA generativa", "Generative AI") },
  { label: tx("Prompt Engineering", "Ingeniería de prompts", "Prompt Engineering") },
  {
    label: tx(
      "Web Application Security",
      "Seguridad de aplicaciones web",
      "Seguridad ng Web Application"
    ),
  },
];

// ---- Blog posts (shown on the home page) ----
// Built from blogsData.js (latest 3), so you only edit each post in one place.
export const blogPostsLink = "/blogs"; // where "All Posts" goes; set to "" to hide it

export const blogPosts = posts
  .slice(0, 3)
  .map(({ slug, title, excerpt, date }) => ({
    title,
    excerpt,
    date,
    href: `/blogs/${slug}`,
  }));

// ---- About page ----
export const aboutBio = tx(
  "I'm a full-stack developer and web designer based in the Philippines. I design and build fast, accessible web apps from database to interface, with a focus on clean UI and smooth motion.",
  "Soy desarrollador full-stack y diseñador web radicado en Filipinas. Diseño y construyo aplicaciones web rápidas y accesibles, desde la base de datos hasta la interfaz, con un enfoque en una interfaz limpia y un movimiento fluido.",
  "Isa akong full-stack developer at web designer na nakabase sa Pilipinas. Dinidisenyo at binubuo ko ang mabilis at accessible na mga web app, mula database hanggang interface, na may pokus sa malinis na UI at maayos na galaw."
);

// Shown as "At a glance": `period` is the label, `title` is the value
export const aboutDetails = [
  {
    period: tx("Location", "Ubicación", "Lokasyon"),
    title: "Tandang Sora, Quezon City",
  },
  {
    period: tx("Availability", "Disponibilidad", "Availability"),
    title: tx(
      "Open to full-time roles and freelance work",
      "Disponible para puestos de tiempo completo y trabajo freelance",
      "Bukas sa full-time na trabaho at freelance"
    ),
  },
  {
    period: tx("Email", "Correo electrónico", "Email"),
    title: "amieljakebaril@gmail.com",
    href: "mailto:amieljakebaril@gmail.com",
  },
  {
    period: tx("Resume", "Currículum", "Resume"),
    title: tx("Download PDF", "Descargar PDF", "I-download ang PDF"),
    href: "/resume/Amiel_Jake_Baril.pdf",
    newTab: true,
  },
];

export const internship = [
  {
    period: "2025",
    title: tx(
      "Technical Support Intern",
      "Practicante de soporte técnico",
      "Technical Support Intern"
    ),
    org: tx(
      "Philippine Red Cross, Quezon City Chapter",
      "Cruz Roja Filipina, Capítulo de Quezon City",
      "Philippine Red Cross, Quezon City Chapter"
    ),
    note: tx(
      "Provided technical support to staff, including troubleshooting computers and network issues, maintaining equipment and assisting with day-to-day IT needs.",
      "Brindé soporte técnico al personal, incluyendo la resolución de problemas de computadoras y de red, el mantenimiento de equipos y la asistencia en las necesidades diarias de TI.",
      "Nagbigay ng technical support sa mga kawani, kabilang ang pag-troubleshoot ng computer at network, pagpapanatili ng mga kagamitan, at pagtulong sa pang-araw-araw na pangangailangan sa IT."
    ),
    tech: "Troubleshooting · Hardware & Network Support · IT Helpdesk",
  },
];

export const academicProjects = [
  {
    period: "2024",
    title: tx(
      "School Management System",
      "Sistema de gestión escolar",
      "Sistema sa Pamamahala ng Paaralan"
    ),
    org: tx("Capstone Project", "Proyecto final de carrera", "Capstone Project"),
    note: tx(
      "Web app for managing students, grades and schedules, with separate admin and teacher access.",
      "Aplicación web para gestionar estudiantes, calificaciones y horarios, con acceso separado para administradores y docentes.",
      "Web app para sa pamamahala ng mga estudyante, grado, at iskedyul, na may hiwalay na access para sa admin at guro."
    ),
    tech: "React · Laravel · MySQL",
    href: "#",
  },
  {
    period: "2023",
    title: tx(
      "Barangay Management System",
      "Sistema de gestión de barangay",
      "Sistema sa Pamamahala ng Barangay"
    ),
    org: tx("Course Project", "Proyecto de curso", "Proyekto sa Kurso"),
    note: tx(
      "Records and certificate request system for a local barangay office.",
      "Sistema de registros y solicitud de certificados para una oficina local de barangay.",
      "Sistema ng mga talaan at paghiling ng sertipiko para sa isang lokal na opisina ng barangay."
    ),
    tech: "PHP · MySQL",
    href: "#",
  },
  {
    period: "2023",
    title: tx("Your Third Project", "Tu tercer proyecto", "Ang Iyong Ikatlong Proyekto"),
    org: tx("Course Name", "Nombre del curso", "Pangalan ng Kurso"),
    note: tx(
      "A short line on what it does and what you built.",
      "Una línea breve sobre lo que hace y lo que construiste.",
      "Maikling linya tungkol sa ginagawa nito at sa binuo mo."
    ),
    tech: "Tech · Tech · Tech",
  },
];

export const education = [
  {
    period: "2020 — 2024",
    title: tx(
      "Bachelor of Science in Information Technology",
      "Licenciatura en Tecnologías de la Información",
      "Bachelor of Science in Information Technology"
    ),
    org: "Bestlink College of the Philippines",
    note: tx(
      "GWA: 1.65, Web Systems and Technologies (Frontend/Backend), System Analysis and Design, Data Structure and Algorithms, Application Programming Interfaces (API)",
      "Promedio general ponderado (GWA): 1.65. Sistemas y tecnologías web (frontend/backend), análisis y diseño de sistemas, estructuras de datos y algoritmos, interfaces de programación de aplicaciones (API)",
      "GWA: 1.65, Web Systems and Technologies (Frontend/Backend), System Analysis and Design, Data Structure and Algorithms, Application Programming Interfaces (API)"
    ),
  },
];

export const certifications = [
  {
    period: "2025",
    title: tx("Certification Name", "Nombre de la certificación", "Pangalan ng Sertipikasyon"),
    org: tx("Issuing Organization", "Organización emisora", "Nag-isyu na Organisasyon"),
  },
  {
    period: "2024",
    title: tx("Another Certification", "Otra certificación", "Isa Pang Sertipikasyon"),
    org: tx("Issuing Organization", "Organización emisora", "Nag-isyu na Organisasyon"),
  },
];

// ---- Seminars (shown on the home page) ----
export const seminarsLink = "#"; // where "All Seminars" goes; set to "" to hide it

export const seminars = [
  {
    year: "2025",
    title: tx(
      "Empowering the Future through Research",
      "Empoderando el futuro a través de la investigación",
      "Pagpapalakas sa Hinaharap sa Pamamagitan ng Pananaliksik"
    ),
    topic: tx("Research & Development", "Investigación y desarrollo", "Pananaliksik at Pagpapaunlad"),
  },
  {
    year: "2024",
    title: tx("Quantum Computing", "Computación cuántica", "Quantum Computing"),
    topic: tx(
      "Generative AI & its Application",
      "IA generativa y sus aplicaciones",
      "Generative AI at ang mga Gamit Nito"
    ),
  },
  {
    year: "2023",
    title: "Beachside Code Camp",
    topic: tx(
      "Developer Bootcamps & Workshops",
      "Bootcamps y talleres para desarrolladores",
      "Mga Bootcamp at Workshop para sa mga Developer"
    ),
  },
  {
    year: "2023",
    title: "BITZ 2023",
    topic: tx(
      "Accelerating the Innovators Role in Digital Transformation",
      "Acelerando el papel de los innovadores en la transformación digital",
      "Pagpapabilis sa Papel ng mga Innovator sa Digital Transformation"
    ),
  },
];

// ---- Sub pages (edit freely) ----
export const gear = [
  { label: "Laptop" },
  { label: "Monitor" },
  { label: tx("Keyboard", "Teclado") },
  { label: tx("Mouse", "Ratón") },
  { label: tx("Headphones", "Audífonos") },
];

export const software = [
  { label: "VS Code" },
  { label: "Figma" },
  { label: "React & Vite" },
  { label: "Tailwind CSS" },
  { label: "Framer Motion" },
];

export const blogs = [
  { label: tx("Coming soon", "Próximamente", "Malapit na"), href: "#" },
];