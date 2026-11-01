// Edit your projects here.
// Put screenshots in public/images/projects/ (16:10 works best, e.g. 1600x1000).
// `live` and `code` are optional: leave them out (or "") to hide that link.
// Text that changes per language uses tx("English", "Español", "Tagalog").

import { tx } from "./translations";

export const projects = [
  {
    title: "Resumate",
    year: "2026",
    description: tx(
      "A resume builder that turns your details into a clean, recruiter-friendly resume you can export as a PDF.",
      "Un creador de currículums que convierte tus datos en un currículum limpio y atractivo para reclutadores, que puedes exportar como PDF.",
      "Isang resume builder na ginagawang malinis at recruiter-friendly na resume ang iyong mga detalye, na maaari mong i-export bilang PDF."
    ),
    tech: "React · Tailwind CSS · Node.js",
    image: "/projects/resumate/resumate.png",
    live: "https://resumate-six-wheat.vercel.app/",
    code: "https://github.com/Amieljake929/ResuMate.git",
  },
  {
    title: "Kodet",
    year: "2026",
    description: tx(
      "A code snippet manager for saving, organizing and sharing the snippets you reuse every day.",
      "Un gestor de fragmentos de código para guardar, organizar y compartir los fragmentos que reutilizas a diario.",
      "Isang code snippet manager para sa pag-save, pag-organisa, at pagbabahagi ng mga snippet na ginagamit mo araw-araw."
    ),
    tech: "React · Express · MongoDB",
    image: "/images/projects/kodet.png",
    live: "https://example.com",
    code: "https://github.com/",
  },
  {
    title: tx(
      "School Management System",
      "Sistema de gestión escolar",
      "Sistema sa Pamamahala ng Paaralan"
    ),
    year: "2024",
    description: tx(
      "Manages students, grades and schedules, with separate access for admins, teachers and students.",
      "Gestiona estudiantes, calificaciones y horarios, con acceso separado para administradores, docentes y estudiantes.",
      "Pinamamahalaan ang mga estudyante, grado, at iskedyul, na may hiwalay na access para sa admin, guro, at estudyante."
    ),
    tech: "React · Laravel · MySQL",
    image: "/images/projects/sms.png",
    live: "https://example.com",
    code: "https://github.com/",
  },
  {
    title: tx(
      "Barangay Management System",
      "Sistema de gestión de barangay",
      "Sistema sa Pamamahala ng Barangay"
    ),
    year: "2023",
    description: tx(
      "Handles resident records and certificate requests for a local barangay office.",
      "Gestiona los registros de residentes y las solicitudes de certificados de una oficina local de barangay.",
      "Humahawak ng mga talaan ng residente at mga kahilingan sa sertipiko para sa isang lokal na opisina ng barangay."
    ),
    tech: "PHP · MySQL · Bootstrap",
    image: "/images/projects/bms.png",
    live: "https://example.com",
    code: "https://github.com/",
  },
  {
    title: "Assortment",
    year: "2025",
    description: tx(
      "A curated collection of small web experiments, UI components and interactions.",
      "Una colección curada de pequeños experimentos web, componentes de UI e interacciones.",
      "Isang piling koleksyon ng maliliit na web experiment, UI component, at interaksyon."
    ),
    tech: "React · Framer Motion",
    image: "/images/projects/assortment.png",
    live: "https://example.com",
  },
  {
    title: tx("Project Six", "Proyecto seis", "Ikaanim na Proyekto"),
    year: "2025",
    description: tx(
      "A short line on what it does and the problem it solves.",
      "Una línea breve sobre lo que hace y el problema que resuelve.",
      "Maikling linya tungkol sa ginagawa nito at sa problemang nilulutas nito."
    ),
    tech: "Tech · Tech · Tech",
    image: "/images/projects/project-six.png",
    code: "https://github.com/",
  },
  {
    title: tx("Project Seven", "Proyecto siete", "Ikapitong Proyekto"),
    year: "2024",
    description: tx(
      "A short line on what it does and the problem it solves.",
      "Una línea breve sobre lo que hace y el problema que resuelve.",
      "Maikling linya tungkol sa ginagawa nito at sa problemang nilulutas nito."
    ),
    tech: "Tech · Tech · Tech",
    image: "/images/projects/project-seven.png",
    live: "https://example.com",
  },
];