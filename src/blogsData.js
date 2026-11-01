// Edit your blog posts here (newest first).
// `slug` becomes the page URL: /blogs/<slug> (same in every language)
// `image` goes in public/blogs/ (16:9 or 4:3 works best).
// `content` is the full article per language: one string per paragraph.
// Start a string with "## " to make it a subheading.

import { tx } from "./translations";

export const posts = [
  {
    slug: "how-developers-are-using-ai",
    title: tx(
      "How Developers Are Using AI to Elevate Their Craft",
      "Cómo los desarrolladores usan la IA para elevar su oficio",
      "Paano Ginagamit ng mga Developer ang AI para Pataasin ang Antas ng Kanilang Craft"
    ),
    excerpt: tx(
      "There’s a quiet shift happening in software development: the focus is moving from how fast you can type code to how effectively you can think, design, and architect.",
      "Se está produciendo un cambio silencioso en el desarrollo de software: el enfoque pasa de qué tan rápido puedes escribir código a qué tan bien puedes pensar, diseñar y planificar la arquitectura.",
      "May tahimik na pagbabagong nangyayari sa software development: ang pokus ay lumilipat mula sa bilis ng pag-type ng code patungo sa husay mo sa pag-iisip, pagdidisenyo, at pagbuo ng arkitektura."
    ),
    date: tx("Oct 14, 2026", "14 oct 2026", "Okt 14, 2026"),
    tag: tx("Tech", "Tecnología", "Teknolohiya"),
    readTime: tx("5 min read", "5 min de lectura", "5 min na basahin"),
    image: "/blogs/ai-developers.png",
    content: {
      en: [
        "There’s a quiet shift happening in software development: the focus is moving from how fast you can type code to how effectively you can think, design, and architect.",
        "## From typing to thinking",
        "AI tools take care of the repetitive parts, like boilerplate, tests and small refactors. That frees time for the questions that actually matter: what should this system do, and how should it be shaped?",
        "## What I use it for",
        "I use it to explore options before committing, to review my own code, and to learn unfamiliar libraries faster. I still read and understand everything that ships.",
        "The craft isn’t going away. It’s moving up a level.",
      ],
      es: [
        "Se está produciendo un cambio silencioso en el desarrollo de software: el enfoque pasa de qué tan rápido puedes escribir código a qué tan bien puedes pensar, diseñar y planificar la arquitectura.",
        "## De escribir a pensar",
        "Las herramientas de IA se encargan de las partes repetitivas, como el código base, las pruebas y los pequeños refactores. Eso libera tiempo para las preguntas que realmente importan: ¿qué debería hacer este sistema y cómo debería estructurarse?",
        "## Para qué lo uso",
        "Lo uso para explorar opciones antes de decidirme, para revisar mi propio código y para aprender más rápido bibliotecas que no conozco. Aun así, leo y entiendo todo lo que se publica.",
        "El oficio no va a desaparecer. Está subiendo de nivel.",
      ],
      tl: [
        "May tahimik na pagbabagong nangyayari sa software development: ang pokus ay lumilipat mula sa bilis ng pag-type ng code patungo sa husay mo sa pag-iisip, pagdidisenyo, at pagbuo ng arkitektura.",
        "## Mula sa pag-type tungo sa pag-iisip",
        "Ang mga AI tool na ang bahala sa paulit-ulit na gawain, tulad ng boilerplate, mga test, at maliliit na refactor. Nagkakaroon tuloy ng oras para sa mga tanong na talagang mahalaga: ano ang dapat gawin ng sistemang ito, at paano ito dapat hubugin?",
        "## Para saan ko ito ginagamit",
        "Ginagamit ko ito para suriin ang mga opsyon bago magdesisyon, para i-review ang sarili kong code, at para mas mabilis matutunan ang mga librerya na hindi pa pamilyar sa akin. Binabasa at naiintindihan ko pa rin ang lahat ng inilalabas.",
        "Hindi mawawala ang craft. Umaangat lang ito ng isang antas.",
      ],
    },
  },
  {
    slug: "why-living-lowkey-is-the-ultimate-flex",
    title: tx(
      "Why Living Lowkey Is the Ultimate Flex",
      "Por qué vivir en perfil bajo es el máximo flex",
      "Bakit ang Pamumuhay nang Lowkey ang Pinakamalakas na Flex"
    ),
    excerpt: tx(
      "In a world where everyone is broadcasting their daily life, posting every milestone, and maintaining a non-stop digital presence, choosing silence can feel almost radical.",
      "En un mundo donde todos transmiten su vida diaria, publican cada logro y mantienen una presencia digital constante, elegir el silencio puede parecer casi radical.",
      "Sa mundong kung saan ipinapakita ng lahat ang pang-araw-araw nilang buhay, ipino-post ang bawat milestone, at hindi humihinto sa pagiging aktibo online, maaaring maging radikal ang pagpili ng katahimikan."
    ),
    date: tx("Sep 2026", "Sep 2026", "Set 2026"),
    tag: tx("Life", "Vida", "Buhay"),
    readTime: tx("4 min read", "4 min de lectura", "4 min na basahin"),
    image: "/blogs/lowkey.jpg",
    content: {
      en: [
        "In a world where everyone is broadcasting their daily life, posting every milestone, and maintaining a non-stop digital presence, choosing silence can feel almost radical.",
        "## Quiet progress",
        "Working on things without announcing them keeps the focus on the work itself, not on how it looks from the outside.",
        "## Privacy is peace",
        "Not everything needs an audience. Keeping some wins to yourself makes them feel more yours.",
      ],
      es: [
        "En un mundo donde todos transmiten su vida diaria, publican cada logro y mantienen una presencia digital constante, elegir el silencio puede parecer casi radical.",
        "## Progreso silencioso",
        "Trabajar en las cosas sin anunciarlas mantiene el enfoque en el trabajo en sí, no en cómo se ve desde afuera.",
        "## La privacidad es paz",
        "No todo necesita público. Guardar algunos logros para ti hace que se sientan más tuyos.",
      ],
      tl: [
        "Sa mundong kung saan ipinapakita ng lahat ang pang-araw-araw nilang buhay, ipino-post ang bawat milestone, at hindi humihinto sa pagiging aktibo online, maaaring maging radikal ang pagpili ng katahimikan.",
        "## Tahimik na pag-unlad",
        "Ang pagtatrabaho nang hindi ipinapaalam sa lahat ay nagpapanatili ng pokus sa mismong gawa, hindi sa kung ano ang hitsura nito sa labas.",
        "## Ang privacy ay kapayapaan",
        "Hindi lahat ay kailangang may manonood. Kapag inilihim mo ang ilan sa mga tagumpay mo, mas nagiging iyo ang pakiramdam nito.",
      ],
    },
  },
  {
    slug: "breaking-free-from-comparison",
    title: tx(
      "Breaking Free from Comparison",
      "Libérate de la comparación",
      "Paglaya sa Pagkukumpara"
    ),
    excerpt: tx(
      "It is easy to fall into the habit of measuring your own progress against someone else’s highlight reel, leaving you feeling like you are constantly falling behind.",
      "Es fácil caer en el hábito de medir tu propio progreso contra lo mejor que muestran los demás, lo que te hace sentir que siempre vas atrasado.",
      "Madaling mahulog sa ugaling sukatin ang sarili mong progreso batay sa highlight reel ng iba, kaya pakiramdam mo ay lagi kang nahuhuli."
    ),
    date: tx("Aug 2026", "Ago 2026", "Ago 2026"),
    tag: tx("Mindset", "Mentalidad", "Pag-iisip"),
    readTime: tx("3 min read", "3 min de lectura", "3 min na basahin"),
    image: "/blogs/comparison.png",
    content: {
      en: [
        "It is easy to fall into the habit of measuring your own progress against someone else’s highlight reel, leaving you feeling like you are constantly falling behind.",
        "## You only see the highlights",
        "What you see online is the finished result, never the doubts, failed attempts or slow weeks behind it.",
        "## A better benchmark",
        "Compare yourself with who you were last year. That’s the only comparison that is fair, and the only one you can act on.",
      ],
      es: [
        "Es fácil caer en el hábito de medir tu propio progreso contra lo mejor que muestran los demás, lo que te hace sentir que siempre vas atrasado.",
        "## Solo ves lo mejor",
        "Lo que ves en línea es el resultado final, nunca las dudas, los intentos fallidos ni las semanas lentas que hay detrás.",
        "## Una mejor vara de medir",
        "Compárate con quien eras el año pasado. Esa es la única comparación justa y la única sobre la que puedes actuar.",
      ],
      tl: [
        "Madaling mahulog sa ugaling sukatin ang sarili mong progreso batay sa highlight reel ng iba, kaya pakiramdam mo ay lagi kang nahuhuli.",
        "## Highlights lang ang nakikita mo",
        "Ang nakikita mo online ay ang tapos na resulta, hindi ang mga alinlangan, nabigong pagsubok, o mabagal na linggo sa likod nito.",
        "## Mas magandang batayan",
        "Ikumpara ang sarili mo sa kung sino ka noong nakaraang taon. Iyon lang ang patas na paghahambing, at ang tanging magagawan mo ng aksyon.",
      ],
    },
  },
];