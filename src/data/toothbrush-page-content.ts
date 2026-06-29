export interface ProductReview {
  title: string;
  description: string;
  quote: string;
  author: string;
  rating: number;
}

export interface ProductHighlight {
  title: string;
  description: string;
}

export interface ProductMaterialRow {
  component: string;
  material: string;
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

export const toothbrushPageContent = {
  title: "10 Pack Bamboo Toothbrushes | Biodegradable, Soft BPA-Free Bristles",
  shortDescription:
    "A 10-pack of sustainable bamboo toothbrushes with soft, BPA-free, charcoal-infused bristles. Plastic-free packaging, ergonomic grip, and gentle on gums, an easy switch for eco-conscious families.",
  longDescription:
    "This Bamboo Toothbrush 10 Pack is crafted from sustainably harvested bamboo handles paired with ultra-soft, BPA-free nylon bristles infused with charcoal for a deeper, gentler clean. Each brush features a smooth, ergonomic grip designed for comfortable control during everyday brushing.\n\nPackaged 100% plastic-free and fully recyclable/compostable, this set is ideal for families, travelers, or anyone looking to cut down on plastic waste without sacrificing brushing performance. Lightweight and travel-friendly, it's a simple, sustainable upgrade to your daily oral care routine, backed by a 30-day money-back guarantee.",
  whatYouGet: {
    title: "What You'll Get",
    items: [
      "10 Bamboo-handle toothbrushes",
      "Soft, BPA-free nylon bristles (charcoal-infused)",
      "100% plastic-free, recyclable/compostable packaging",
      "Ergonomic, travel-friendly design",
    ],
  },
  benefits: {
    title: "Benefits",
    items: [
      { title: "Planet-Friendly", description: "Bamboo naturally decomposes" },
      { title: "Family Pack", description: "10 brushes per pack" },
      { title: "Gentle Clean", description: "Soft, BPA-free bristles" },
      { title: "Whitening Boost", description: "Charcoal-infused bristles" },
      { title: "Comfy Grip", description: "Ergonomic handle" },
      { title: "Zero-Plastic Packaging", description: "Fully recyclable" },
      { title: "Travel-Ready", description: "Lightweight design" },
    ],
  },
  instructions: {
    title: "Instructions",
    steps: [
      "Unbox plastic-free packaging",
      "Rinse bristles before first use",
      "Apply pea-sized toothpaste",
      "Brush 2 mins, twice daily",
      "Rinse & store upright to dry",
      "Replace every 3 months",
      "Compost handle after removing bristles",
    ],
  },
  materials: {
    title: "Ingredients / Materials",
    rows: [
      { component: "Handle", material: "Bamboo (wood)" },
      { component: "Bristles", material: "Nylon, BPA-free, charcoal" },
      { component: "Firmness", material: "Soft" },
      { component: "Packaging", material: "Plastic-free, recyclable" },
      { component: "Pack Size", material: "10 count" },
    ],
  },
  highlights: [
    {
      title: "Planet-Friendly",
      description: "Made from sustainable bamboo that naturally decomposes",
    },
    {
      title: "Family Pack of 10",
      description: "Perfect for families or extended personal use",
    },
    {
      title: "Soft BPA-Free Bristles",
      description: "Gentle on gums while providing effective cleaning.",
    },
    {
      title: "Plastic-Free Packaging",
      description: "100% recyclable and compostable packaging",
    },
  ],
  brushBetter: {
    title: "Brush Better, Live Greener",
    image: "/images/Toothbrush Featured image.png",
    imageAlt: "Bamboo toothbrush 10 pack",
    left: [
      {
        title: "Eco-Friendly",
        description: "Made from biodegradable bamboo, not plastic",
      },
      {
        title: "Gentle Care",
        description: "Soft BPA-free bristles protect sensitive gums",
      },
    ],
    right: [
      {
        title: "Deep Clean",
        description: "Charcoal-infused bristles lift stains naturally",
      },
      {
        title: "Zero Waste",
        description: "100% plastic-free, compostable packaging",
      },
    ],
  },
  reviews: {
    title:
      "Customer Believes Our Product Works,\nDon't Take Our Word For It.",
    description:
      "Real stories from customers who switched to bamboo — softer bristles, less plastic, and smiles all around.",
    items: [
      {
        title: "Smooth Switch",
        description:
          "The bristles feel just as soft, and I love that I'm not adding more plastic to the planet every few months.",
        quote:
          "I was nervous about giving up my plastic brush, but this made it so easy. The bristles feel just as soft, and I love that I'm not adding more plastic to the planet every few months.",
        author: "JESSICA R.",
        rating: 5,
      },
      {
        title: "Surprisingly Gentle",
        description:
          "These bristles are way softer than I expected. The charcoal gives my teeth a noticeably brighter look after a few weeks.",
        quote:
          "My gums used to get irritated with my old toothbrush, but these bristles are way softer than I expected. Plus the charcoal gives my teeth a noticeably brighter look after a few weeks.",
        author: "DANIEL P.",
        rating: 5,
      },
      {
        title: "Perfect for Travel",
        description:
          "Lightweight, compact, and no plastic guilt. The 10-pack means I always have a backup ready to go.",
        quote:
          "I bring one of these on every trip now — lightweight, compact, and no plastic guilt. The 10-pack means I always have a backup ready to go.",
        author: "AMARA K.",
        rating: 5,
      },
      {
        title: "Family Approved",
        description:
          "My kids like the bamboo handles better than plastic, and I love that it's better for the environment.",
        quote:
          "Got the 10-pack so the whole family could switch at once. My kids actually like the bamboo handles better than their old plastic ones, and I like that it's better for the environment.",
        author: "TOM W.",
        rating: 5,
      },
    ],
  },
  faq: {
    title: "FAQs",
    description:
      "Everything you need to know about our bamboo toothbrushes.",
    items: [
      {
        question:
          "Bamboo toothbrushes VS plastic toothbrushes: Which is better?",
        answer:
          "Bamboo toothbrushes are just as effective as plastic toothbrushes. The only major difference between the two products is the type of material used for the handle. Our bristles (made with BPA-free, charcoal-infused nylon) have similar cleaning power to nylon, and are also gentle on your gums.",
      },
      {
        question: "Is your packaging plastic free?",
        answer:
          "We are 100% plastic free! All of our toothbrushes are shipped in completely recyclable and compostable packaging, so you will not find anything from the box to the toothbrush (after removing the bristles) in the landfill!",
      },
      {
        question: "How often do I need to replace my toothbrush?",
        answer:
          "We recommend that you replace your toothbrush every 3 months (or sooner if the bristles start to fray). Our 10-pack will last for over 2 years of regular usage.",
      },
      {
        question: "Will my bamboo toothbrush get moldy if it gets wet?",
        answer:
          "The bamboo has been treated to be water resistant during normal use, but to extend the life of your toothbrush, be sure to keep it upright in a dry area, and air dry it between each use.",
      },
      {
        question: "Can I compost my toothbrush?",
        answer:
          "Yes! Once you remove the bristles (which are nylon and biodegradable), you can put the bamboo handle directly into your compost pile or your garden.",
      },
      {
        question: "How long will it take for my order to arrive?",
        answer:
          "Most orders are delivered within 4-7 business days, and you will receive a confirmation email with the tracking information when your order ships.",
      },
    ],
  },
};
