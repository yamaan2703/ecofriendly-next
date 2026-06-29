export interface BenefitItem {
  title: string;
  description: string;
}

export interface CategoryItem {
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const homePageContent = {
  hero: {
    subheading: "Get plastic out of your routine.",
    description:
      "Science backed & sustainably made. Planet-positive. From your toothbrush to your dish brush, it's time for an eco upgrade.",
    bannerImage: "/images/Home banner_.jpg",
    ctas: [
      {
        label: "Shop Bamboo Toothbrush",
        href: "/product/bamboo-toothbrush-10-pack",
      },
      {
        label: "Shop Bamboo Dish Brush",
        href: "/product/bamboo-dish-brush-with-2-replaceable-head",
      },
    ],
  },
  categories: {
    title: "Shop By Category",
    description:
      "Discover sustainably made bamboo essentials for your daily routine — from oral care to kitchen cleaning, every product is designed to cut plastic waste without compromising on quality.",
    items: [
      {
        title: "Bamboo Toothbrush",
        description:
          "Soft BPA-free bristles with a sustainable bamboo handle for a cleaner smile and a cleaner planet.",
        href: "/product/bamboo-toothbrush-10-pack",
        image: "/images/Toothbrush Featured image.png",
      },
      {
        title: "Bamboo Dish Brush",
        description:
          "Tough on grease, gentle on cookware, and designed with replaceable heads for less waste.",
        href: "/product/bamboo-dish-brush-with-2-replaceable-head",
        image: "/images/DIsh Brush Featured Image.png",
      },
    ] satisfies CategoryItem[],
  },
  toothbrushBenefits: {
    title: "Why Our Bamboo Toothbrush is Better",
    description:
      "A smarter everyday brush built for comfort, cleaner teeth, and less plastic — with soft bristles, natural materials, and packaging designed to be kinder to the planet.",
    left: [
      {
        title: "SOFT FOR GUMS",
        description:
          "Sensitive gums will not be irritated by the soft, BPA-free bristles used in this toothbrush to remove plaque from teeth.",
      },
      {
        title: "NATURAL WHITENING",
        description:
          "The charcoal-infused bristles will help to remove surface stains from teeth over time with regular brushing.",
      },
      {
        title: "COMFORTABLE GRIP",
        description:
          "Toothbrush is designed with an ergonomic handle for ease of use and control during brushing.",
      },
    ] satisfies BenefitItem[],
    right: [
      {
        title: "TRAVEL-SAFE",
        description:
          "Lightweight and compact, the toothbrush fits easily into a suitcase or carry-on bag and is great for travel.",
      },
      {
        title: "NATURAL MATERIALS",
        description:
          "Bamboo handles will naturally decompose in soil, while plastic tools may take hundreds of years to break down.",
      },
      {
        title: "MINIMAL PACKAGING MATERIAL",
        description:
          "Packaged in fully recyclable and compostable materials. No waste!",
      },
    ] satisfies BenefitItem[],
  },
  dishBrushBenefits: {
    title: "Why Our Bamboo Dish Brush is Better",
    description:
      "Clean your kitchen the sustainable way with a durable bamboo handle, replaceable heads, and bristles tough on grease but gentle on your cookware and the environment.",
    left: [
      {
        title: "A LOT LESS WASTE",
        description:
          "With two replacement heads, you only have to keep one handle around for much longer!",
      },
      {
        title: "SAFE FOR COOKWARE",
        description:
          "The sisal bristles are tough enough to remove grease but will not scratch the surface of your non-stick pans.",
      },
      {
        title: "QUICK-DRYING",
        description:
          "The fast-drying nature of the brush head means that it will not start growing bacteria and will stay odor-free while stored in between uses.",
      },
    ] satisfies BenefitItem[],
    right: [
      {
        title: "ROBUST HANDLE",
        description:
          "The bamboo handle is made from FSC certified material; it will last even with daily exposure to water.",
      },
      {
        title: "GOOD FOR THE PLANET",
        description:
          "The handle is compostable at the end of its usable life.",
      },
      {
        title: "EASY TO HANG",
        description:
          "The built-in hanging hole allows you to keep your sink area clean and dry.",
      },
    ] satisfies BenefitItem[],
  },
  faqSection: {
    title: "Frequently Asked Questions",
    description:
      "Quick answers about our bamboo products, what is included with your order, materials, composting, and delivery timelines.",
    items: [
    {
      question:
        "Do these products work for people who have sensitive teeth and gums?",
      answer:
        "Absolutely! The bamboo toothbrushes have soft, BPA-free bristles that can clean teeth thoroughly without causing irritation to sensitive gums.",
    },
    {
      question: "What comes with this purchase?",
      answer:
        "The toothbrush will come in a 10 pack, while the dish brush will come with the bamboo handle and 2 replacement heads, giving you months of use right out of the box.",
    },
    {
      question: "Are the bristles made of plastic?",
      answer:
        "The bristles of the toothbrush are made of nylon, while the dish brush bristles are made of sisal, the only portion of the product made from bamboo is the handle. Both products will come packaged with 100% plastic-free and compostable materials.",
    },
    {
      question:
        "How long should I expect to wait before needing to replace my toothbrush/dish brush?",
      answer:
        "The recommended timeframe to replace the toothbrush is every 3 months and the dish brush over every 2 to 3 months, or depending on use.",
    },
    {
      question:
        "Can I put the products in my compost bin when I am done using them?",
      answer:
        "Yes! Once the bristles are removed, the bamboo handles will be compostable.",
    },
    {
      question: "How long should I expect to wait for my order to arrive?",
      answer:
        "Orders typically take 4 to 7 business days to arrive and tracking will be emailed to you as soon as the order has shipped.",
    },
    ] satisfies FaqItem[],
  },
};
