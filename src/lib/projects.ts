import electionCover from "@/assets/election/cover.png";
import electionCaseStudy from "@/assets/election/election-casestudy.svg";
import funzaCover from "@/assets/funza/cover.png";
import funza01 from "@/assets/funza/01.png";
import funza02 from "@/assets/funza/02.png";
import funza03 from "@/assets/funza/03.png";
import funza04 from "@/assets/funza/04.png";
import funza05 from "@/assets/funza/05.png";
import funza06 from "@/assets/funza/06.png";
import funza07 from "@/assets/funza/07.png";
import funza08 from "@/assets/funza/08.png";
import funza09 from "@/assets/funza/09.png";
import funza10 from "@/assets/funza/10.png";
import funza11 from "@/assets/funza/11.png";
import funza12 from "@/assets/funza/12.png";
import funza13 from "@/assets/funza/13.png";
import funza14 from "@/assets/funza/14.png";
import funza15 from "@/assets/funza/15.png";
import funza16 from "@/assets/funza/16.png";
import funza17 from "@/assets/funza/17.png";
import funza18 from "@/assets/funza/18.png";
import funza19 from "@/assets/funza/19.png";
import funza20 from "@/assets/funza/20.png";
import funza21 from "@/assets/funza/21.png";
import funza22 from "@/assets/funza/22.png";
import funza23 from "@/assets/funza/23.png";
import kiqapu01 from "@/assets/kiqapu/1.svg";
import kiqapu02 from "@/assets/kiqapu/2.svg";
import kiqapu03 from "@/assets/kiqapu/3.svg";
import kiqapu04 from "@/assets/kiqapu/4.svg";
import kiqapu05 from "@/assets/kiqapu/5.svg";
import kiqapu06 from "@/assets/kiqapu/6.svg";
import kiqapu07 from "@/assets/kiqapu/7.png";
import kiqapu08 from "@/assets/kiqapu/8.svg";
import kiqapu09 from "@/assets/kiqapu/9.svg";
import kiqapuCover from "@/assets/kiqapu/cover.svg";
import baseCover from "@/assets/base/cover.svg";
import baseCaseStudy from "@/assets/base/base.svg";
import cargoCover from "@/assets/cargo/cover.svg";
import cargoCaseStudy from "@/assets/cargo/cargo.svg";
import fleetCover from "@/assets/fleet/cover.svg";
import fleetCaseStudy from "@/assets/fleet/fleet.svg";
import limsCover from "@/assets/lims/cover.svg";
import limsCaseStudy from "@/assets/lims/lims.svg";
import chloroxCover from "@/assets/chlorox/cover.svg";
import chloroxCaseStudy from "@/assets/chlorox/chlorox.svg";
import complyCover from "@/assets/comply/cover.svg";
import complyCaseStudy from "@/assets/comply/comply.svg";
import totemCover from "@/assets/totem/cover.png";
import origoldCover from "@/assets/origold/cover.png";
import origoldCaseStudy from "@/assets/origold/origold.svg";
import mcarfixCover from "@/assets/mcarfix/cover.svg";
import mcarfix01 from "@/assets/mcarfix/01.png";
import mcarfix02 from "@/assets/mcarfix/02.png";
import mcarfix03 from "@/assets/mcarfix/03.png";

export type Section = {
  heading: string;
  body?: string;
  bullets?: string[];
  image?: string;
  images?: string[];
  imageFit?: "cover" | "natural";
  imageAlt?: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  client: string;
  externalLinks?: { label: string; url: string }[];
  cover?: string;
  images?: string[];
  bg: string;
  toc?: string[];
  singleImage?: boolean;
  sections: Section[];
};

// Unified palette: shades of black for visual consistency.
const SHADE_1 = "from-[#0a0a0a] to-[#000000]";
const SHADE_2 = "from-[#141414] to-[#050505]";
const SHADE_3 = "from-[#1a1a1a] to-[#0a0a0a]";
const SHADE_4 = "from-[#0f0f10] to-[#000000]";

export const projects: Project[] = [
  {
    slug: "funza-ai",
    name: "Funza AI",
    tagline:
      "Designing an AI-Powered Learning Platform for the Next Generation of African Learners",
    description:
      "Funza AI is an AI-powered educational platform designed to transform screen time into productive learning time.",
    role: "Senior Product Designer",
    year: "2025",
    client: "Funza AI",
    cover: funzaCover,
    images: [
      funza01,
      funza02,
      funza03,
      funza04,
      funza05,
      funza06,
      funza07,
      funza08,
      funza09,
      funza10,
      funza11,
      funza12,
      funza13,
      funza14,
      funza15,
      funza16,
      funza17,
      funza18,
      funza19,
      funza20,
      funza21,
      funza22,
      funza23,
    ],
    bg: SHADE_2,
    toc: [],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
      },
    ],
  },
  {
    slug: "election-management-system",
    name: "Election Management System",
    tagline:
      "An intuitive election management experience for voter registration, setup, and real-time results.",
    description:
      "An intuitive election management experience for voter registration, election setup, and real-time results tracking.",
    role: "Lead Product Designer",
    year: "2025",
    client: "Electora",
    externalLinks: [{ label: "Visit website", url: "https://app.uda.ke/" }],
    cover: electionCover,
    bg: SHADE_2,
    toc: [],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
        body: "",
        image: electionCaseStudy,
        imageAlt: "Election management system case study visual",
      },
      {
        heading: "Challenge",
        body: "Election teams were juggling multiple disconnected tools, which made coordination slower and created a lot of avoidable risk during high-stakes moments.",
      },
      {
        heading: "Approach",
        body: "I redesigned the experience around clear permissions, status visibility, and low-stress workflows for time-sensitive operations. The result was a calmer, more trustworthy process for all stakeholders.",
      },
      {
        heading: "Outcome",
        body: "The experience improved transparency across the election lifecycle and made it easier for teams to act quickly with greater confidence.",
      },
    ],
  },
  {
    slug: "base-point",
    name: "Base Point",
    tagline: "Coming soon",
    description: "A new product case study is coming soon for Base Point.",
    role: "Product Designer",
    year: "2025",
    client: "Base Point",
    externalLinks: [{ label: "Visit website", url: "https://basepoint.co.ke/" }],
    cover: baseCover,
    bg: SHADE_3,
    toc: ["Overview"],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
        body: "Case study coming soon.",
        image: baseCaseStudy,
        imageAlt: "Base Point case study preview",
      },
    ],
  },
  {
    slug: "fleet-management-dashboard",
    name: "Fleet Management Dashboard",
    tagline: "Operational clarity for vehicle fleets at scale.",
    description:
      "A fleet management platform focused on vehicle monitoring, operational oversight, and performance tracking.",
    role: "UX Designer",
    year: "2024",
    client: "Mobility",
    externalLinks: [{ label: "Visit website", url: "https://imsza-poscl.fairpay.co.za/" }],
    cover: fleetCover,
    bg: SHADE_3,
    toc: ["Overview"],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
        image: fleetCaseStudy,
        imageAlt: "Fleet management dashboard interface",
      },
    ],
  },
  {
    slug: "dafrics-cargo-flow",
    name: "Dafrics Cargo Flow",
    tagline: "Sharper logistics and cargo operations for drivers and teams.",
    description:
      "Enhanced the logistics and cargo management experience for drivers and operations teams.",
    role: "Product Designer",
    year: "2024",
    client: "Dafrics",
    externalLinks: [
      {
        label: "View prototype",
        url: "https://www.figma.com/proto/NZ0p16jrMkyKliG2baSsJF/Dafric-Case-study---Portfolio?node-id=1-3376&node-type=canvas&t=MHXBkLDBvK3wiyJc-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3384",
      },
    ],
    cover: cargoCover,
    bg: SHADE_4,
    toc: ["Overview"],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
        image: cargoCaseStudy,
        imageAlt: "Cargo flow interface",
      },
    ],
  },
  {
    slug: "kiqapu-io",
    name: "Kiqapu.io",
    tagline: "End-to-end product design for a group contribution platform.",
    description:
      "End-to-end product design for a platform that helps groups manage social contributions.",
    role: "UX Designer",
    year: "2023",
    client: "Kiqapu",
    externalLinks: [{ label: "Visit website", url: "https://www.contribute.kiqapu.io" }],
    cover: kiqapuCover,
    images: [
      kiqapu01,
      kiqapu02,
      kiqapu03,
      kiqapu04,
      kiqapu05,
      kiqapu06,
      kiqapu07,
      kiqapu08,
      kiqapu09,
    ],
    bg: SHADE_2,
    toc: ["Overview", "Challenge", "Approach", "Outcome"],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
        body: "The platform needed to make group fundraising and contribution tracking feel transparent, motivating, and easy to trust.",
        image: kiqapuCover,
        imageAlt: "Kiqapu.io interface preview",
      },
      {
        heading: "Challenge",
        body: "Users were hesitant to contribute because they could not easily see how progress and accountability were being handled.",
      },
      {
        heading: "Approach",
        body: "I focused on trust-building signals, clear contribution states, and feedback loops that kept users informed throughout the journey.",
      },
      {
        heading: "Outcome",
        body: "The redesign helped create a more confident experience that encouraged repeat engagement and stronger contribution habits.",
      },
    ],
  },
  {
    slug: "clorox-mobile-app-revamp",
    name: "Clorox Mobile App Revamp",
    tagline: "A more efficient mobile workflow for merchandisers and field teams.",
    description:
      "Redesigned the mobile app used by merchandisers to streamline workflows and task management.",
    role: "Product Designer",
    year: "2023",
    client: "Clorox",
    cover: chloroxCover,
    images: [chloroxCaseStudy],
    bg: SHADE_1,
    toc: ["Overview", "Challenge", "Approach", "Outcome"],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
        body: "The app needed to support fast-moving field teams with clear task management, scheduling, and reporting.",
        image: chloroxCover,
        imageAlt: "Clorox app interface preview",
      },
      {
        heading: "Challenge",
        body: "Merchandisers were spending too much time navigating manual workflows and unclear information architecture.",
      },
      {
        heading: "Approach",
        body: "I reduced steps, clarified priorities, and folded key actions into a more direct mobile experience.",
      },
      {
        heading: "Outcome",
        body: "The updated workflow improved usability and made day-to-day execution much smoother for field teams.",
      },
    ],
  },
  {
    slug: "comply-dq",
    name: "ComplyDQ",
    tagline: "A clearer experience for compliance and data quality workflows.",
    description: "ComplyDQ product case study.",
    role: "Product Designer",
    year: "2025",
    client: "ComplyDQ",
    externalLinks: [
      {
        label: "View prototype",
        url: "https://www.figma.com/proto/Lw5PzwclNX2ZJhZOz5pZwS/CompyDQ---Portfolio?t=cWbZWsqVTDQbFoii-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=1-620",
      },
      { label: "Visit website", url: "https://www.complydq.com/" },
    ],
    cover: complyCover,
    images: [complyCaseStudy],
    bg: SHADE_2,
    toc: [],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
        image: complyCaseStudy,
        imageAlt: "ComplyDQ case study",
      },
    ],
  },
  {
    slug: "mcarfix-design-system",
    name: "Mcarfix Design System",
    tagline: "Design foundation for a multi-product ecosystem.",
    description:
      "A design system for SkyTOP Technologies LTD to create consistency across mCarFix, DemosCAD, and the wider product portfolio.",
    role: "UX Designer",
    year: "2024",
    client: "SkyTOP Technologies LTD",
    externalLinks: [{ label: "Visit website", url: "https://www.mcarfix.com/" }],
    cover: mcarfixCover,
    bg: SHADE_3,
    toc: ["Overview", "Challenge", "Approach", "Outcome"],
    sections: [
      {
        heading: "Overview",
        body: "From Feb to Apr 2024, I worked part-time and remotely with SkyTOP Technologies LTD to help establish a shared design foundation across multiple digital products, including mCarFix, DemosCAD, and other internal experiences. The focus was product consistency, stronger collaboration, and a reusable system that could scale as the portfolio grew.",
        image: mcarfix01,
        imageFit: "natural",
        imageAlt: "mCarFix design-system foundations and styles",
      },
      {
        heading: "Challenge",
        body: "SkyTOP was building across multiple products with different interfaces and interaction patterns. As the portfolio expanded, teams were making design decisions independently, which created inconsistent UI patterns, repeated design work, and growing friction during implementation. The challenge was not only visual consistency, but creating a shared foundation that designers and engineers could rely on across products.",
      },
      {
        heading: "Approach",
        body: "I led the UX effort to audit each product, identify recurring UI patterns, and compare experiences across typography, spacing, color, navigation, forms, and states. I reviewed existing interfaces, spoke with product and engineering teams, and mapped which patterns were truly shared versus product-specific. From that, I established the core foundations and translated them into reusable components, usage guidance, and clearer handoff standards for implementation.",
        image: mcarfix02,
        imageFit: "natural",
        imageAlt: "mCarFix component states and interaction patterns",
      },
      {
        heading: "Outcome",
        body: "The result was a scalable design foundation that reduced duplicated design work, improved consistency across products, and made design-to-engineering handoff smoother. The system created a clearer language for the portfolio while still allowing each product to maintain its own identity within a common framework.",
        image: mcarfix03,
        imageFit: "natural",
        imageAlt: "mCarFix component library and design-system examples",
      },
    ],
  },
  {
    slug: "nakuru-land-information-management-system",
    name: "Nakuru Land Information Management System",
    tagline: "Improving access and efficiency for land records workflows.",
    description:
      "UX for a land information system improving accessibility and efficiency of land records management.",
    role: "UX Designer",
    year: "2022",
    client: "Nakuru County",
    externalLinks: [
      {
        label: "Visit website",
        url: "https://www.nakuru.go.ke/nakuru-to-develop-a-land-information-management-sytem-lims/",
      },
    ],
    cover: limsCover,
    images: [limsCaseStudy],
    bg: SHADE_4,
    singleImage: true,
    sections: [],
  },
  {
    slug: "ori-gold-ecommerce-experience",
    name: "ORI Gold Ecommerce Experience",
    tagline: "A modern, premium digital experience for a sustainability-driven brand.",
    description:
      "A modern, premium digital experience for a globally aligned, sustainability-driven gold brand.",
    role: "Product Designer",
    year: "2022",
    client: "ORI Gold",
    cover: origoldCover,
    images: [origoldCaseStudy],
    bg: SHADE_2,
    toc: ["Overview", "Challenge", "Approach", "Outcome"],
    singleImage: true,
    sections: [
      {
        heading: "Overview",
        body: "The ecommerce experience needed to feel premium, trustworthy, and clear while supporting product discovery and purchase confidence.",
        image: origoldCaseStudy,
        imageAlt: "ORI Gold ecommerce preview",
      },
      {
        heading: "Challenge",
        body: "The brand needed a digital experience that matched its premium positioning without overwhelming users with too much complexity.",
      },
      {
        heading: "Approach",
        body: "I designed a refined browsing and purchasing flow that balanced storytelling, product clarity, and visual elegance.",
      },
      {
        heading: "Outcome",
        body: "The experience better reflected the brand and made it easier for customers to trust and explore the product offering.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
