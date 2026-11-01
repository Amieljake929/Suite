// Online courses data — edit this file to add, remove or reorder courses.
// Text that changes per language uses tx("English", "Español", "Tagalog").
// Plain strings (platform names, years) are shown the same in every language.
// `href` is optional (link to the course or certificate); leave it "" for no link.
//
// Extra fields used by the /courses details page (all optional):
//   slug         unique id for the course
//   duration     e.g. "Approx. 6 months" (use tx(...) if it should be translated)
//   description  tx("English", "Español", "Tagalog")
//   skills       tx([...English], [...Español], [...Tagalog])  (an array per language)

import { tx } from "./translations";

// "Details" goes to the courses page; set to "" to hide the link
export const onlineCoursesLink = "/courses";

export const onlineCourses = [
  {
    slug: "google-data-analytics",
    year: "2026",
    image: "/courses/google-data-analytics.jpg",
    title: tx(
      "Google Data Analytics Professional",
      "Google Data Analytics Professional",
      "Google Data Analytics Professional"
    ),
    platform: "Coursera",
    status: tx("In progress", "En curso", "Isinasagawa"),
    duration: tx("Approx. 6 months", "Aprox. 6 meses", "Humigit-kumulang 6 na buwan"),
    description: tx(
      "A professional certificate that covers the full data analysis process: asking the right questions, preparing and cleaning data, analyzing it, and sharing findings through visualizations. It ends with a hands-on capstone project.",
      "Un certificado profesional que cubre todo el proceso de análisis de datos: hacer las preguntas correctas, preparar y limpiar datos, analizarlos y compartir los hallazgos mediante visualizaciones. Termina con un proyecto final práctico.",
      "Isang propesyonal na sertipiko na sumasaklaw sa buong proseso ng pagsusuri ng datos: pagtatanong ng tamang mga tanong, paghahanda at paglilinis ng datos, pagsusuri nito, at pagbabahagi ng mga natuklasan gamit ang visualization. Nagtatapos ito sa isang hands-on na capstone project."
    ),
    skills: tx(
      ["Spreadsheets", "SQL", "Tableau", "R programming", "Data cleaning", "Data visualization"],
      ["Hojas de cálculo", "SQL", "Tableau", "Programación en R", "Limpieza de datos", "Visualización de datos"],
      ["Spreadsheets", "SQL", "Tableau", "R programming", "Paglilinis ng datos", "Data visualization"]
    ),
    href: "",
  },
  {
    slug: "it-customer-support-basics",
    year: "2025",
    image: "/courses/it-customer-support-basics.jpg",
    title: tx(
      "IT Customer Support Basics",
      "Fundamentos de soporte al cliente de TI",
      "Mga Batayan ng IT Customer Support"
    ),
    platform: "Cisco Networking Academy",
    status: tx("Completed", "Completado", "Natapos"),
    duration: "",
    description: tx(
      "An introduction to supporting users in an IT environment, including how to communicate clearly, troubleshoot common problems, and handle support requests professionally.",
      "Una introducción al soporte de usuarios en un entorno de TI, incluyendo cómo comunicarse con claridad, resolver problemas comunes y atender solicitudes de soporte de forma profesional.",
      "Isang panimula sa pagsuporta sa mga user sa isang IT environment, kasama ang malinaw na komunikasyon, pag-troubleshoot ng mga karaniwang problema, at propesyonal na pag-asikaso ng mga support request."
    ),
    skills: tx(
      ["Customer support", "Troubleshooting", "Communication", "Ticket handling"],
      ["Soporte al cliente", "Resolución de problemas", "Comunicación", "Gestión de tickets"],
      ["Customer support", "Pag-troubleshoot", "Komunikasyon", "Pag-asikaso ng ticket"]
    ),
    href: "",
  },
  {
    slug: "information-management-digital-age",
    year: "2025",
     image: "/courses/information-management-digital-age.jpg",
    title: tx(
      "Information Management in the Digital Age Course",
      "Curso de gestión de la información en la era digital",
      "Kurso sa Pamamahala ng Impormasyon sa Digital Age"
    ),
    platform: "Singapore Institute of Multidisciplinary Professions",
    status: tx("Completed", "Completado", "Natapos"),
    duration: "",
    description: tx(
      "A course on how information is organized, stored, secured and used in digital environments, and why good information management matters for modern organizations.",
      "Un curso sobre cómo se organiza, almacena, protege y utiliza la información en entornos digitales, y por qué una buena gestión de la información es importante para las organizaciones modernas.",
      "Isang kurso kung paano inaayos, iniimbak, pinoprotektahan, at ginagamit ang impormasyon sa mga digital na kapaligiran, at kung bakit mahalaga ang mahusay na pamamahala ng impormasyon sa mga makabagong organisasyon."
    ),
    skills: tx(
      ["Information management", "Data organization", "Digital literacy"],
      ["Gestión de la información", "Organización de datos", "Alfabetización digital"],
      ["Pamamahala ng impormasyon", "Pag-aayos ng datos", "Digital literacy"]
    ),
    href: "",
  },
];