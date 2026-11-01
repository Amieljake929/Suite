// Online courses data — edit this file to add, remove or reorder courses.
// Text that changes per language uses tx("English", "Español", "Tagalog").
// Plain strings (platform names, years) are shown the same in every language.
// `href` is optional (link to the course or certificate); leave it "" for no link.

import { tx } from "./translations";

export const onlineCoursesLink = "#"; // where "Details" goes; set to "" to hide it

export const onlineCourses = [
  {
    year: "2026",
    title: tx(
      "Your Current Course",
      "Tu curso actual",
      "Ang Iyong Kasalukuyang Kurso"
    ),
    platform: "Coursera",
    status: tx("In progress", "En curso", "Isinasagawa"),
    href: "",
  },
  {
    year: "2025",
    title: tx(
      "Another Course Title",
      "Otro título de curso",
      "Isa Pang Pamagat ng Kurso"
    ),
    platform: "Udemy",
    status: tx("Completed", "Completado", "Natapos"),
    href: "",
  },
  {
    year: "2025",
    title: tx(
      "Your Current Course",
      "Tu curso actual",
      "Ang Iyong Kasalukuyang Kurso"
    ),
    
    platform: "freeCodeCamp",
    status: tx("Completed", "Completado", "Natapos"),
    href: "",
  },
];