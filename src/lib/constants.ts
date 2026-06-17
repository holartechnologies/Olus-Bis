export const BRAND = {
  name: "OLUS-BIS Immigration Services",
  tagline: "Your Trusted Immigration Partner for America",
  phone: "+1 (234) 567-890",
  email: "info@olus-bis.com",
  address: "United States",
  whatsapp: "+1234567890",
  founded: "2024",
  founder: "Barrister Oluseyi Bisiriyu",
} as const;

export const COLORS = {
  primary: "#0B3AA8",
  primaryDark: "#082A78",
  secondary: "#F5B300",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  darkNavy: "#082A78",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Resources", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    slug: "family-immigration",
    title: "Family Immigration",
    description: "Reunite with your loved ones in America. We handle family-based visa petitions, green cards for immediate relatives, and family preference categories.",
    icon: "Users",
  },
  {
    slug: "marriage-visas",
    title: "Marriage Visas",
    description: "Navigate the complexities of marriage-based immigration including fiancé(e) visas (K-1) and spouse green cards with expert legal guidance.",
    icon: "Heart",
  },
  {
    slug: "student-visas",
    title: "Student Visas",
    description: "Pursue your educational dreams in the US. We assist with F-1, M-1, and J-1 visa applications and maintenance of status.",
    icon: "GraduationCap",
  },
  {
    slug: "employment-visas",
    title: "Employment Visas",
    description: "Work legally in the United States. We handle H-1B, L-1, O-1, E-2, TN visas, and employment-based green cards.",
    icon: "Briefcase",
  },
  {
    slug: "investor-visas",
    title: "Investor Visas",
    description: "Invest in your American future. We guide you through EB-5 investor visa program and E-2 treaty investor visas.",
    icon: "TrendingUp",
  },
  {
    slug: "green-cards",
    title: "Green Cards",
    description: "Obtain lawful permanent residence through family, employment, diversity lottery, or humanitarian programs.",
    icon: "FileCheck",
  },
  {
    slug: "citizenship",
    title: "Citizenship & Naturalization",
    description: "Take the final step to becoming a US citizen. We assist with naturalization applications and citizenship interviews.",
    icon: "Award",
  },
  {
    slug: "asylum",
    title: "Asylum Services",
    description: "Seek protection in the United States. We provide compassionate representation for asylum seekers and refugees.",
    icon: "Shield",
  },
  {
    slug: "deportation-defense",
    title: "Deportation Defense",
    description: "Fight for your right to stay in America. Our experienced attorneys provide aggressive deportation defense representation.",
    icon: "Scale",
  },
] as const;

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const ALLOWED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB


