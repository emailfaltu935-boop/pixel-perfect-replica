import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import dressage from "@/assets/dressage.jpg";
import ponyHug from "@/assets/pony-hug.jpg";
import lesson from "@/assets/lesson.jpg";
import paddock from "@/assets/splash-paddock.jpg";

export const CLUB_NAME = "West End Riding Club";

export const images = { hero1, hero2, hero3, hero4, dressage, ponyHug, lesson, paddock };

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/membership", label: "Membership" },
  { to: "/results", label: "Results" },
  { to: "/lessons", label: "Lessons" },
  { to: "/merchandise", label: "Merchandise" },
  { to: "/gallery", label: "Gallery" },
  { to: "/history", label: "History" },
  { to: "/contact", label: "Contact" },
] as const;

export const EVENTS = [
  { day: "11", month: "Oct", year: "2026", title: "One-Day Training Camp", text: "Fantastic trainers & sessions to boost your skills and confidence! Choose the training sessions to suit you." },
  { day: "22", month: "Nov", year: "2026", title: "Dressage with DTM Class", text: "Friendly competition, great for all levels. Warm up and test both indoor arenas." },
];

export const pageMeta = (title: string, description: string) => ({
  meta: [
    { title: `${title} | ${CLUB_NAME}` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | ${CLUB_NAME}` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
