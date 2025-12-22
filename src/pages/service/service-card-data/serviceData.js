export const serviceCardData = [
  {
    id: 1,
    plan: "ফ্রি",
    slug: "free",
    price: 0,
    period: "মাসিক",
    currency: "BDT",
    isPopular: false,
    badge: "",
    recommendedFor: "নতুন কোম্পানি",
    ctaType: "signup",
    buttonText: "ফ্রি শুরু করুন",

    limits: {
      jobPostPerMonth: 3,
      candidateView: 50,
      companyUsers: 1,
      supportResponseHours: 48
    },

    theme: {
      highlight: false,
      cardColor: "default"
    },

    billingOptions: ["monthly"],

    features: [
      {
        text: "৩টি জব পোস্ট প্রতি মাসে",
        included: true,
        category: "job"
      },
      {
        text: "বেসিক কোম্পানি প্রোফাইল",
        included: true,
        category: "profile"
      },
      {
        text: "সাধারণ সাপোর্ট (৪৮ ঘন্টার মধ্যে)",
        included: true,
        category: "support",
        tooltip: "ইমেইল সাপোর্ট"
      },
      {
        text: "বেসিক এনালিটিক্স",
        included: true,
        category: "analytics"
      },
      {
        text: "প্রিমিয়াম ব্যাজ",
        included: false,
        category: "branding"
      },
      {
        text: "ক্যান্ডিডেট ডাটাবেস এক্সেস",
        included: false,
        category: "database"
      }
    ]
  },

  {
    id: 2,
    plan: "বেসিক",
    slug: "basic",
    price: 299,
    period: "মাসিক",
    currency: "BDT",
    isPopular: true,
    badge: "সর্বাধিক জনপ্রিয়",
    recommendedFor: "স্টার্টআপ ও এসএমই",
    ctaType: "upgrade",
    buttonText: "এখনই সাবস্ক্রাইব করুন",

    limits: {
      jobPostPerMonth: 10,
      candidateView: 500,
      companyUsers: 3,
      supportResponseHours: 24
    },

    theme: {
      highlight: true,
      cardColor: "primary"
    },

    billingOptions: ["monthly", "yearly"],
    discount: {
      yearly: 20
    },

    features: [
      {
        text: "১০টি জব পোস্ট প্রতি মাসে",
        included: true,
        category: "job"
      },
      {
        text: "এডভান্সড কোম্পানি প্রোফাইল",
        included: true,
        category: "profile"
      },
      {
        text: "প্রিমিয়াম ব্যাজ",
        included: true,
        category: "branding"
      },
      {
        text: "অগ্রাধিকার সাপোর্ট (২৪ ঘন্টার মধ্যে)",
        included: true,
        category: "support"
      },
      {
        text: "এডভান্সড এনালিটিক্স",
        included: true,
        category: "analytics"
      },
      {
        text: "৫০০+ ক্যান্ডিডেট ডাটাবেস এক্সেস",
        included: true,
        category: "database"
      },
      {
        text: "কোম্পানি লোগো ও কভার ইমেজ",
        included: true,
        category: "branding"
      }
    ]
  },

  {
    id: 3,
    plan: "প্রিমিয়াম",
    slug: "premium",
    price: 599,
    period: "মাসিক",
    currency: "BDT",
    isPopular: false,
    badge: "সেরা মান",
    recommendedFor: "এজেন্সি ও বড় কোম্পানি",
    ctaType: "contact",
    buttonText: "প্রিমিয়াম নিন",

    limits: {
      jobPostPerMonth: "Unlimited",
      candidateView: "Unlimited",
      companyUsers: 10,
      supportResponseHours: 1
    },

    theme: {
      highlight: false,
      cardColor: "dark"
    },

    billingOptions: ["monthly", "yearly"],
    discount: {
      yearly: 30
    },

    features: [
      {
        text: "আনলিমিটেড জব পোস্ট",
        included: true,
        category: "job"
      },
      {
        text: "ভেরিফাইড কোম্পানি ব্যাজ",
        included: true,
        category: "branding"
      },
      {
        text: "২৪/৭ প্রিয়োরিটি সাপোর্ট",
        included: true,
        category: "support"
      },
      {
        text: "ক্যান্ডিডেট ডাটাবেসে ফুল এক্সেস",
        included: true,
        category: "database"
      },
      {
        text: "এডভান্সড রিপোর্টিং ও এনালিটিক্স",
        included: true,
        category: "analytics"
      },
      {
        text: "মাল্টি ইউজার এক্সেস (১০ জন পর্যন্ত)",
        included: true,
        category: "team"
      },
      {
        text: "কাস্টম ব্র্যান্ডিং",
        included: true,
        category: "branding"
      },
      {
        text: "অটোমেটেড জব ম্যাচিং",
        included: true,
        category: "automation"
      }
    ]
  }
];
