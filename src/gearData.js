// Edit your gears here.
// Put product images in public/gears/ (transparent PNG or a plain background works best).
// `href` is optional: add a product or store link to show the arrow and make the card clickable.
// Text that changes per language uses tx("English", "Español", "Tagalog").

import { tx } from "./translations";

export const gearSections = [
  {
    title: tx("Desk Setup", "Escritorio", "Setup sa Mesa"),
    items: [
      {
        name: "Huawei Matebook D15",
        description: tx(
          "10th Gen Intel Core i3.",
          "Intel Core i3 de 10.ª generación.",
          "10th Gen Intel Core i3."
        ),
        image: "/gears/matebook-d15.png",
      },
      {
        name: "Macbook Neo",
        description: tx(
          "2408-by-1506 resolution.",
          "Resolución de 2408 x 1506.",
          "Resolusyon na 2408 x 1506."
        ),
        image: "/gears/macbook-neo.png",
      },
      {
        name: tx("Wireless Keyboard", "Teclado inalámbrico", "Wireless Keyboard"),
        description: tx(
          "Keychron B1 Pro is an ultra-slim wireless keyboard",
          "El Keychron B1 Pro es un teclado inalámbrico ultradelgado",
          "Ang Keychron B1 Pro ay isang ultra-slim na wireless keyboard"
        ),
        image: "/gears/keyboard.png",
      },
      {
        name: tx("Wireless Mouse", "Ratón inalámbrico", "Wireless Mouse"),
        description: tx(
          "Black wireless mouse.",
          "Ratón inalámbrico negro.",
          "Itim na wireless mouse."
        ),
        image: "/gears/mouse.png",
      },
      {
        name: tx("Laptop Desk", "Escritorio para laptop", "Desk para sa Laptop"),
        description: tx(
          "Mini wooden desk study table with cup holder & card slot",
          "Mini escritorio de madera para estudiar, con portavasos y ranura para tarjetas",
          "Maliit na kahoy na study table na may lalagyan ng tasa at slot para sa card"
        ),
        image: "/gears/laptop-desk.png",
      },
      {
        name: tx("Laptop Stand", "Soporte para laptop", "Stand para sa Laptop"),
        description: tx(
          "11-17 inch laptops (black/silver)",
          "Para laptops de 11-17 pulgadas (negro/plata)",
          "Para sa 11-17 pulgadang laptop (itim/silver)"
        ),
        image: "/gears/laptop-stand.png",
      },
    ],
  },
  {
    title: tx("Everyday Carry", "Lo que llevo a diario", "Dala Araw-araw"),
    items: [
      {
        name: "Samsung Galaxy A13",
        description: tx(
          "Black — 6 GB RAM + 128 GB storage.",
          "Negro — 6 GB de RAM + 128 GB de almacenamiento.",
          "Itim — 6 GB RAM + 128 GB na storage."
        ),
        image: "/gears/galaxy-a13.png",
      },
      {
        name: "Samsung Galaxy A20",
        description: tx(
          "Announced 2019, March 19. Released 2019, April 05.",
          "Anunciado el 19 de marzo de 2019. Lanzado el 5 de abril de 2019.",
          "Inanunsyo noong Marso 19, 2019. Inilabas noong Abril 5, 2019."
        ),
        image: "/gears/galaxy-a20.png",
      },
      {
        name: tx("Wireless Earbuds", "Audífonos inalámbricos", "Wireless Earbuds"), // replace with the exact model
        description: tx(
          "Black true wireless earbuds with charging case.",
          "Audífonos inalámbricos negros con estuche de carga.",
          "Itim na true wireless earbuds na may charging case."
        ),
        image: "/gears/earbuds.png",
      },
      {
        name: tx("Smartwatch", "Reloj inteligente", "Smartwatch"), // replace with the exact model
        description: tx(
          "Black smartwatch with a square display.",
          "Reloj inteligente negro con pantalla cuadrada.",
          "Itim na smartwatch na may parisukat na display."
        ),
        image: "/gears/smartwatch.png",
      },
      {
        name: tx("Coffee Tumbler", "Termo para café", "Coffee Tumbler"),
        description: tx(
          "Ceramic liner stainless steel",
          "Acero inoxidable con interior de cerámica",
          "Stainless steel na may ceramic liner"
        ),
        image: "/gears/tumbler.png",
      },
    ],
  },
  {
    title: tx("Daily Essentials", "Esenciales diarios", "Pang-araw-araw na Kailangan"),
    items: [
      {
        name: tx("Belo Sunscreen", "Protector solar Belo", "Belo Sunscreen"),
        description: tx(
          "UV protection and skin defense.",
          "Protección UV y defensa para la piel.",
          "Proteksyon laban sa UV at pananggalang ng balat."
        ),
        image: "/gears/belo-sunscreen.png",
      },
      {
        name: tx("Premium Cologne", "Colonia premium", "Premium Cologne"),
        description: tx(
          "Signature scent for daily freshness.",
          "Aroma característico para sentirte fresco cada día.",
          "Signature na amoy para sa araw-araw na kasariwaan."
        ),
        image: "/gears/cologne.png",
      },
      {
        name: "NIVEA Original Care Lip Balm",
        description: tx(
          "Sea butter & natural oils",
          "Manteca de mar y aceites naturales",
          "Sea butter at natural na mga langis"
        ),
        image: "/gears/nivea-lip-balm.png",
      },
    ],
  },
];