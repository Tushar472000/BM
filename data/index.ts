import { FooterMenuItem } from "@/interfaces/typeinterfaces";

const site = {
  home: {
    page: 'Compare the prices of  Gold and Silver Bullion | Bullion Mentor',
    logo_web: 'https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-logo.webp',
    logo_mobile:
      'https://res.cloudinary.com/bold-pm/image/upload/BBD/BM-logo-mob.webp',
    description:
      'Get insights for buying silver and gold bullion with one click at Bullion Mentor. Compare the price and get gold and silver spot prices at best dealers.'
  },
  silver: {
    page: 'Silver Spot Price Today | Silver Spot Price Charts | Bullion Mentor',
    description:
      'Compare all silver coins and get a best prices on every silver coins, bars and rounds from best dealers at Bullion Mentor'
  },
  silverPage: {
    page: 'Compare All Silver Bullion | Bullion Mentor',
    description:
      'Compare all silver coins and get a best prices on every silver coins, bars and rounds from best dealers at Bullion Mentor'
  },
  goldPage: {
    page: 'Compare all Gold Bullion | Bullion Mentor',
    description:
      'Compare all Gold coins and get a best prices on every gold coins and bars from best dealers at Bullion Mentor'
  },
  gold: {
    page: 'Gold Spot Price Today | Gold Spot Price Charts | Bullion Mentor',
    description:
      'Check Gold Spot Price today. Bullion Mentor offers real time Gold price charts and data with accurate spot price of Gold feeds'
  },
  about: {
    page: 'What we offer - Best gold and silver bullion prices',
    description:
      'Finds the lowest prices on popular silver and gold bullion products on Bullion Mentor by comparing prices from well-named online dealer websites.'
  },
  termsConditions: {
    page: ' Terms and Conditions | Bullion Mentor',
    description: 'Bullion Mentor - Terms and Conditions'
  },
  faq: {
    page: 'Frequently asked questions (FAQ) | Bullion Mentor',
    description:
      'Find answers to your frequently asked questions here | Bullion Mentor'
  },
  contact: {
    page: 'Contact Us | Bullion Mentor',
    description:
      'Feel free to contact us. You can suggest your favorite product. Please leave us a message for additional info, and our team will contact you.'
  },
  dealerslist: {
    page: 'Compare bullion dealers prices, products and reviews',
    description:
      'Bullion Mentor lets you compare prices and reviews of top dealers against others.'
  },
  vendorReview: {
    page: 'vendorReview page',
    description: 'this is Vendor Review page'
  },
  nearToSpot: {
    page: 'Cheapest Silver per Ounce Avaliable | Bullion Mentor',
    description:
      'BullionMentor.com tracks the lowest premium on products available over gold and silver spot price.'
  },
  newLaunched: {
    page: 'New Launched Bullion Deals | Bullion Mentor',
    description:
      'Discover the new launched bullion with one click at Bullion Mentor| Gold and Silver coins and bars'
  },
  observation: {
    page: 'Observation List | Bullion Mentor',
    description:
      'Bullion Mentor brings you the observation list where you can select bullion products. You can keep the track on comparing prices.'
  },
  productListing: {
    page: 'product listing page',
    description: 'this is Product Listing page'
  },
  blog: {
    page: 'Silver And Gold Bullion Latest Updates | Bullion Mentor',
    description: 'Stay ahead with Gold & Silver Bullion updates! Get latest blogs from Bullion Mentor.'
  }
};

const OGTags = {
  home: {
    title: 'MyTitle',
    description:
      'CoinMarketHub: The Ultimate Destination for Buying and Selling Coins in NextJS',
    type: 'website'
  }
};

const data = {
  // WEBSITEUrl: 'http://106.201.231.27:9001',
  WEBSITEUrl: 'https://www.bullionmentor.com',

  site: {
    ...site
  },

  OGTags: {
    ...OGTags
  },
  navbar: {
    category: {
      title: 'Categories'
    },
    menus: [
      {
        name: 'Observation List',
        href: '/observations',
        isPrivate: true
      },
      {
        name: 'Dealers',
        href: '/dealer-review'
      }
    ],
    btnText: {
      request: 'Request Product',
      register: 'Register',
      login: 'Login',
      logout: 'Logout'
    }
  },
  footer: {
    cta: {
      subtitle: 'Hurry Up!',
      title: 'Get Best Deals Suggestions',
      btnText: 'Subscribe Now'
    },
    title: site.home.page,
    menus: [
      {
        name: 'About Us',
        href: '/about'
      },
      {
        name: 'Contact Us',
        href: '/contact-us'
      },
      {
        name: 'Dealers',
        href: '/dealer-review'
      },
      {
        name: 'Terms & Conditions',
        href: '/terms-conditions'
      },
      {
        name: 'Privacy Policy',
        href: '/privacy-policy'
      },
      {
        name: 'FAQ',
        href: '/faq'
      },
      {
        name: 'Request a Product',
        href: '/requestProduct',
        button: 'orange'
      }
    ] satisfies FooterMenuItem[],
    copyrightText: '2023. Bullion Mentor All Rights Reserved.'
  }
};

export default data;
