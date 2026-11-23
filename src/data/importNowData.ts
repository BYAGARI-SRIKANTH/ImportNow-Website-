export interface ServiceItem {
  num: string;
  title: string;
  description: string;
  icon: 'search' | 'factory' | 'shield' | 'ship' | 'file' | 'truck';
}

export interface JourneyStep {
  number: number;
  title: string;
  description: string;
  dayLabel: string;
  progress: number;
  statusText: string;
}

export interface ProductHub {
  id: string;
  hub: string;
  title: string;
  bullets: string[];
  highlight: string;
  quoteCategory: string;
  icon: 'sofa' | 'smartphone' | 'bike' | 'lightbulb' | 'cart' | 'cog';
}

export interface CompletedProject {
  id: string;
  route: string;
  title: string;
  description: string;
  meta: [string, string];
  image: string;
  imageAlt: string;
}

export interface TestimonialItem {
  initials: string;
  name: string;
  role: string;
  quote: string;
}

export interface BlogArticle {
  slug: string;
  category: string;
  shortTitle: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverTone: string;
  coverImage?: string;
  icon: 'route' | 'market' | 'sofa' | 'ev' | 'plane';
  featured: boolean;
  sections: { heading: string; body: string }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CONTACT_INFO = {
  phoneDisplay: '+91 99897 24320',
  phoneHref: 'tel:+919989724320',
  whatsappNumber: '919989724320',
  whatsappHref: 'https://wa.me/919989724320',
  instagramHandle: '@importnow.in',
  instagramHref: 'https://www.instagram.com/importnow.in/',
  officesSummary: 'Hyderabad, India · Shanghai, China',
  indiaOffice: 'Hyderabad, Telangana',
  chinaCompany: 'Shanghai Shengqiao Chain Trading Co., Ltd.',
  chinaOffice: 'Shanghai Shengqiao Chain Trading Co., Ltd., Shanghai',
};

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#journey' },
  { label: 'What we import', href: '#products' },
  { label: 'China trips', href: '#trips' },
  { label: 'Blog', href: '#guides' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_STATS = [
  { value: '500+', label: 'Businesses served' },
  { value: '83K+', label: 'Community on Instagram' },
  { value: '1 pc', label: 'MOQ on many products' },
  { value: 'Shanghai', label: 'Own registered company' },
];

export const ROUTE_MARQUEE = [
  { from: 'Yiwu', to: 'Adilabad' },
  { from: 'Foshan', to: 'Hyderabad' },
  { from: 'Shenzhen', to: 'Siddipet' },
  { from: 'Guangzhou', to: 'Chennai' },
  { from: 'Shanghai', to: 'Nhava Sheva' },
  { from: 'Guzhen', to: 'Vizag' },
  { from: 'Ningbo', to: 'Mumbai' },
];

export const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Product sourcing',
    description:
      'We find verified manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, and negotiate prices on your behalf.',
    icon: 'search',
  },
  {
    num: '02',
    title: 'Factory inspection',
    description:
      'Our team visits the factory in person. We check licences, samples and production capacity before you pay.',
    icon: 'factory',
  },
  {
    num: '03',
    title: 'Quality control',
    description:
      'Pre-shipment checks with photo and video reports, done before the container is sealed.',
    icon: 'shield',
  },
  {
    num: '04',
    title: 'Shipping & logistics',
    description:
      'Full-container and shared-container sea freight from Chinese ports, plus air cargo for urgent orders.',
    icon: 'ship',
  },
  {
    num: '05',
    title: 'Customs clearance',
    description:
      'Documentation, duties, GST and clearance at Indian ports. No surprises when the ship lands.',
    icon: 'file',
  },
  {
    num: '06',
    title: 'Doorstep delivery',
    description:
      'From the port straight to your shop, warehouse, villa or site, with the container unloaded on location.',
    icon: 'truck',
  },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: 1,
    title: 'Product sourcing in China',
    description:
      'Tell us the product. We shortlist verified manufacturers and get you real prices, not middleman quotes.',
    dayLabel: 'Day 1',
    progress: 0,
    statusText: 'Factory shortlisting · Shanghai & hubs',
  },
  {
    number: 2,
    title: 'Factory inspection',
    description:
      'Our team visits the factory in person and checks samples. You approve over video call.',
    dayLabel: 'Day 6',
    progress: 20,
    statusText: 'On-site inspection & live video approval',
  },
  {
    number: 3,
    title: 'Quality control and loading',
    description:
      'Every carton is checked and counted. Then the cranes load your container onto the ship.',
    dayLabel: 'Day 12',
    progress: 40,
    statusText: 'Pre-shipment QC · Port of Shanghai',
  },
  {
    number: 4,
    title: 'Ocean freight',
    description:
      'Your container sails from Shanghai to India, and we track it the whole way.',
    dayLabel: 'Day 22',
    progress: 65,
    statusText: 'At sea · South China Sea to Bay of Bengal',
  },
  {
    number: 5,
    title: 'Customs clearance in India',
    description:
      'Duties, GST and paperwork are handled at the Indian port, so the container is released quickly.',
    dayLabel: 'Day 30',
    progress: 85,
    statusText: 'Customs & GST clearance · Chennai Port',
  },
  {
    number: 6,
    title: 'Doorstep delivery',
    description:
      'The container is unloaded and trucked straight to your shop, warehouse or site.',
    dayLabel: 'Day 34',
    progress: 100,
    statusText: 'Unloaded & delivered to destination',
  },
];

export const PRODUCT_HUBS: ProductHub[] = [
  {
    id: 'furniture',
    hub: 'Foshan hub',
    title: 'Furniture & interiors',
    bullets: [
      'Complete home and villa furniture',
      'Office desks and executive chairs',
      'Banquet hall and hotel fit-outs',
    ],
    highlight: 'Height-adjustable desk from ₹45,000 · MOQ 1',
    quoteCategory: 'Furniture & interiors',
    icon: 'sofa',
  },
  {
    id: 'electronics',
    hub: 'Shenzhen hub',
    title: 'Electronics & tech',
    bullets: [
      'LED screens and digital signage',
      'Mobile accessories in bulk',
      'Power bank rental kiosks',
    ],
    highlight: "Business ideas India doesn't have yet",
    quoteCategory: 'Electronics & tech',
    icon: 'smartphone',
  },
  {
    id: 'ev',
    hub: 'Guangzhou hub',
    title: 'EV & automotive',
    bullets: [
      'Electric scooters as kits for assembly in India',
      'Battery cells sourced separately',
      'Car LED lights with your own brand',
    ],
    highlight: 'Car LED private label · MOQ 500',
    quoteCategory: 'EV & automotive',
    icon: 'bike',
  },
  {
    id: 'lighting',
    hub: 'Guzhen hub',
    title: 'Lighting',
    bullets: [
      'Decorative and architectural lighting',
      'Commercial LED fixtures',
      'Custom designs for projects',
    ],
    highlight: 'Direct from the lighting capital of China',
    quoteCategory: 'Lighting',
    icon: 'lightbulb',
  },
  {
    id: 'supermarket',
    hub: 'Yiwu hub',
    title: 'Supermarket & general goods',
    bullets: [
      'Complete store stock in one container',
      'Home, kitchen, toys and gifts',
      'Choose products over video call',
    ],
    highlight: "World's largest small-goods market",
    quoteCategory: 'Supermarket & general goods',
    icon: 'cart',
  },
  {
    id: 'machinery',
    hub: 'Pan-China',
    title: 'Machinery & automation',
    bullets: [
      'Production and packaging machines',
      'Smart vending and robotic kiosks',
      'Spares and after-sales support',
    ],
    highlight: 'Tell us the machine, we find the factory',
    quoteCategory: 'Machinery',
    icon: 'cog',
  },
];

export const SHANGHAI_CHECKS = [
  {
    lead: 'Registered business licence',
    detail: 'issued in Shanghai, China',
  },
  {
    lead: 'Chinese company bank account',
    detail: 'so payments to factories are safe and traceable',
  },
  {
    lead: 'Team on the ground',
    detail: 'for factory visits, quality checks and market trips',
  },
  {
    lead: 'Indian founder on both sides',
    detail: 'talk to us in Telugu, Hindi or English',
  },
];

export const TRIP_CITIES = [
  'Guangzhou',
  'Shenzhen',
  'Yiwu',
  'Foshan',
  'Macau',
  'Glass bridge',
];

export const TRIP_INCLUSIONS = [
  { label: 'Visa guidance & invitation letter', icon: 'file' as const },
  { label: 'Hotels close to the fair', icon: 'building' as const },
  { label: 'Indian food daily, veg & non-veg', icon: 'utensils' as const },
  { label: 'Guides & translators', icon: 'languages' as const },
  { label: 'Factory visits you choose', icon: 'factory' as const },
  { label: 'Sightseeing between markets', icon: 'mappin' as const },
];

export const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: 'villa-furniture',
    route: 'Foshan → Villa',
    title: 'Complete villa furniture',
    description:
      'Sofas, dining sets, office furniture and pergolas, all in one container delivered to a luxury villa.',
    meta: ['Full container', 'Door delivery'],
    image: '/src/assets/images/villa_furniture_foshan_1795436335807.jpg',
    imageAlt: 'Modern luxury villa living and dining room furnished with custom Foshan sofas and dining sets',
  },
  {
    id: 'sagar-supermarket',
    route: 'Yiwu → Adilabad',
    title: 'Sagar Supermarket',
    description:
      "Complete supermarket stock sourced from Yiwu over video calls and delivered to the client's warehouse.",
    meta: ['Retail', 'Video sourcing'],
    image: '/src/assets/images/yiwu_supermarket_goods_1795436350959.jpg',
    imageAlt: 'Organized supermarket merchandise and wholesale warehouse stock sourced from Yiwu',
  },
  {
    id: 'sreeman-convention',
    route: 'China → Convention',
    title: 'Sreeman Convention Centre',
    description:
      'Cots, beds, dining sets and office furniture for a convention venue, with better finish for the same budget.',
    meta: ['Hospitality', 'Bulk order'],
    image: '/src/assets/images/convention_centre_interiors_1795436343372.jpg',
    imageAlt: 'Grand modern convention centre hall with custom hospitality banquet dining sets and lounge seating',
  },
  {
    id: 'smart-office-desks',
    route: 'China → Hyderabad',
    title: 'Smart office desks',
    description:
      'Motorised height-adjustable L-shaped desks, imported even as a single piece.',
    meta: ['MOQ 1', '~30 days'],
    image: '/src/assets/images/smart_office_desk_1795436349664.jpg',
    imageAlt: 'Motorized height-adjustable L-shaped walnut executive desk in a modern office',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    initials: 'S',
    name: 'Sai',
    role: 'Ad-tech startup · Siddipet',
    quote:
      'I came to source LED screens and electronics. The Guangzhou and Shenzhen markets were easy to navigate, and hotels, food and travel were all taken care of.',
  },
  {
    initials: 'M',
    name: 'Mahender Reddy',
    role: 'Canton Fair trip client',
    quote:
      'Twelve days covering the Canton Fair and factories of my choice. Visa, guidance, Indian food every day. It felt like a personal trip, not a business tour.',
  },
  {
    initials: 'SS',
    name: 'Sagar Supermarket',
    role: 'Retail · Adilabad',
    quote:
      'We picked our products on video calls, and the container came straight from Yiwu to our warehouse. The whole process was hassle-free.',
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'how-to-import-from-china-to-india',
    category: 'Import guides',
    shortTitle: 'How to Import from China to India in 2026',
    title: 'How to Import from China to India in 2026: A Step-by-Step Guide',
    date: '18 November 2026',
    readTime: '7 min read',
    excerpt:
      'From getting your IEC to receiving the container at your door, here is the full import process explained in plain language for first-time importers.',
    coverTone: 'from-[#0B132B] via-[#162244] to-[#1E3A5F]',
    coverImage: '/src/assets/images/shanghai_port_logistics_1795436343096.jpg',
    icon: 'route',
    featured: true,
    sections: [
      {
        heading: '1. Start with product clarity and your IEC',
        body: 'Before contacting factories, finalize your product specifications, target landed budget in INR, and commercial Import Export Code (IEC). If you are importing commercially for the first time, obtaining an IEC via the DGFT portal takes only a few days with your PAN, GST registration, and business bank details.',
      },
      {
        heading: '2. Source from verified manufacturing hubs—not online resellers',
        body: 'Listing websites often mix trading companies with actual factories. Working with a registered on-ground entity in Shanghai allows direct factory audits, real ex-works pricing, and local RMB contracts that protect your deposit.',
      },
      {
        heading: '3. Pre-shipment inspection, ocean freight, and customs clearance',
        body: 'Once production finishes, every carton should be counted and verified with photo and video proof before the container seal is locked. Most sea shipments from Shanghai, Ningbo, or Guangzhou to Chennai or Nhava Sheva take 30 to 40 days door-to-door including Indian customs duties, IGST, and inland trucking.',
      },
    ],
  },
  {
    slug: 'yiwu-vs-guangzhou-vs-foshan',
    category: 'Wholesale markets',
    shortTitle: 'Yiwu, Guangzhou or Foshan? Choosing the Right Chinese Market',
    title: 'Yiwu, Guangzhou or Foshan? Choosing the Right Chinese Market for Your Product',
    date: '12 November 2026',
    readTime: '6 min read',
    excerpt:
      'China has a different manufacturing hub for almost every industry. Going to the right one can cut your costs and save days of searching.',
    coverTone: 'from-[#162244] via-[#1E293B] to-[#9A3412]',
    icon: 'market',
    featured: true,
    sections: [
      {
        heading: 'Yiwu: The small-goods and supermarket capital',
        body: 'Yiwu International Trade City spans over 75,000 wholesale booths covering kitchenware, toys, gifts, hardware, and everyday retail goods. It is ideal when you want to mix dozens of SKUs into a single shared or full container—even choosing items over live video calls.',
      },
      {
        heading: 'Foshan: Direct factory pricing for furniture and interiors',
        body: 'Located right beside Guangzhou, Foshan (Shunde & Lecong) is China’s furniture manufacturing powerhouse. Whether you are furnishing a single luxury villa or outfitting an entire convention hall, Foshan factories deliver custom dimensions and materials at a fraction of local retail markups.',
      },
      {
        heading: 'Guangzhou, Shenzhen & Guzhen: Trade fairs, tech, EVs and lighting',
        body: 'Guangzhou hosts the Canton Fair twice a year alongside huge automotive and EV parts markets. Nearby Shenzhen leads in LED screens, electronics, and smart kiosks, while Guzhen is dedicated almost entirely to decorative and architectural lighting.',
      },
    ],
  },
  {
    slug: 'importing-furniture-from-china',
    category: 'Product guides',
    shortTitle: 'Importing Furniture from China',
    title: 'Importing Furniture from China: Costs, MOQ and What to Check',
    date: '5 November 2026',
    readTime: '6 min read',
    excerpt:
      'Premium designs at a better price. Here is what villa owners, offices and hotels should know before importing furniture from Foshan.',
    coverTone: 'from-[#0F172A] via-[#23335D] to-[#C2410C]',
    coverImage: '/src/assets/images/villa_furniture_foshan_1795436335807.jpg',
    icon: 'sofa',
    featured: true,
    sections: [
      {
        heading: 'Can you import furniture with low MOQ?',
        body: 'Yes. While large hospitality projects benefit from full 40ft High Cube containers, specialty items like motorized height-adjustable L-shaped office desks can be imported with an MOQ of just 1 piece via consolidated LCL shipping.',
      },
      {
        heading: 'Understanding landed cost vs factory price',
        body: 'Your total landed cost includes factory ex-works price, protective export crating (wooden frames for marble or glass), ocean freight based on cubic meters (CBM), customs duty, GST, and last-mile unloading at your villa or site.',
      },
      {
        heading: 'What our inspection team checks before loading',
        body: 'We verify fabric shade consistency, solid wood vs veneer framing, foam density, hardware finishes, and corner protection so every piece arrives intact without transit damage.',
      },
    ],
  },
  {
    slug: 'ev-scooter-business-ckd-kits',
    category: 'Product guides',
    shortTitle: 'Starting an EV Scooter Business with CKD Kits',
    title: 'Starting an EV Scooter Business with CKD Kits from China',
    date: '28 October 2026',
    readTime: '6 min read',
    excerpt:
      'How Indian EV brands source electric scooter CKD kits from Guangzhou and pair them with separately sourced battery cells for assembly in India.',
    coverTone: 'from-[#0B132B] via-[#132A4A] to-[#EA580C]',
    icon: 'ev',
    featured: false,
    sections: [
      {
        heading: 'Why CKD kits work for Indian assembly',
        body: 'Importing Completely Knocked Down (CKD) electric scooter kits—chassis, body panels, motors, controllers, and wiring harnesses—allows Indian entrepreneurs to assemble under their own brand while keeping freight density efficient.',
      },
      {
        heading: 'Battery sourcing and compliance',
        body: 'Because lithium battery cells follow strict shipping and domestic certification standards, experienced importers source chassis kits and battery cells through separate compliant channels.',
      },
    ],
  },
  {
    slug: 'canton-fair-guide-for-indian-businesses',
    category: 'Business trips',
    shortTitle: 'Canton Fair Guide for Indian Businesses',
    title: 'Canton Fair Guide for Indian Businesses: Dates, Visa and What to Expect',
    date: '20 October 2026',
    readTime: '5 min read',
    excerpt:
      'Everything you need to plan a productive Spring (April–May) or Autumn (October–November) Canton Fair trip to Guangzhou.',
    coverTone: 'from-[#0B132B] via-[#1E293B] to-[#D97706]',
    coverImage: '/src/assets/images/canton_fair_guangzhou_1795436335952.jpg',
    icon: 'plane',
    featured: false,
    sections: [
      {
        heading: 'Spring and Autumn phases in Guangzhou',
        body: 'The Canton Fair runs twice annually—April to May (Spring) and October to November (Autumn)—split across three phases covering electronics & machinery, home & furniture, and lifestyle goods.',
      },
      {
        heading: 'Travel smoothly with visa, translators, and Indian meals handled',
        body: 'Navigating China’s business visa invitation letter, hotel proximity to Pazhou Complex, factory follow-up visits in Foshan or Shenzhen, and daily vegetarian or non-vegetarian Indian meals is effortless when handled by an on-ground bilingual team.',
      },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'Can I import just one piece?',
    answer:
      'Yes, for many products. Furniture like height-adjustable desks can be imported with a minimum order of one piece. Private-label products, such as car LED lights, usually start from around 500 units.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      "Most sea shipments reach your door in about 30 to 40 days, depending on the product, the factory's production time and the destination port. Air cargo is faster for urgent orders.",
  },
  {
    question: 'Do you handle customs and GST?',
    answer:
      'Yes. We prepare the documentation and manage duties, GST and clearance at the Indian port, then deliver to your address.',
  },
  {
    question: 'Do I need an Import Export Code (IEC)?',
    answer:
      "For commercial imports, yes. If you don't have one yet, we'll guide you through getting it.",
  },
  {
    question: 'Can I visit the factories myself?',
    answer:
      "Absolutely. Join one of our guided China business trips, or we can arrange visits to the factories you've shortlisted.",
  },
  {
    question: "What's the best business to start by importing from China?",
    answer:
      "It depends on your interests and budget. Popular choices with our clients include furniture, EV scooters, car accessories, lighting and supermarket goods. Talk to us and we'll suggest options that fit your market.",
  },
];

export const QUOTE_CATEGORIES = [
  'Furniture & interiors',
  'Electronics & tech',
  'EV & automotive',
  'Lighting',
  'Supermarket & general goods',
  'Machinery',
  'China business trip / Canton Fair',
  'Something else',
];

export const QUOTE_BUDGETS = [
  'Under ₹1 lakh',
  '₹1–5 lakh',
  '₹5–25 lakh',
  '₹25 lakh+',
];

export const CANTON_FAIR_IMAGE = '/src/assets/images/canton_fair_guangzhou_1795436335952.jpg';
export const SHANGHAI_PORT_IMAGE = '/src/assets/images/shanghai_port_logistics_1795436343096.jpg';
