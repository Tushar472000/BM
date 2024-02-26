/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      //----------------------------------Spot-Page-urls--------------------------------------
      {
        destination:'/charts/silverChart',
        source:'/silver-spot-price'
      },
      {
        destination:'/charts/goldChart',
        source:'/gold-spot-price'
      },
      // ----------------------------------- Product Type -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&metal=silver&productType=silver-coins&size=50&pageNumber=1',
        source: '/silver/silver-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=silver&productType=silver-bars&size=50&pageNumber=1',
        source: '/silver/silver-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=silver&productType=silver-rounds&size=50&pageNumber=1',
        source: '/silver/silver-rounds'
      },
      // -----------------------------------  Silver series -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=american-silver-eagle-coins&size=50&pageNumber=1',
        source: '/silver/american-silver-eagle-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=candian-maple-leaf-silver-coins&size=50&pageNumber=1',
        source: '/silver/candian-maple-leaf-silver-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=austrian-philiharmonic-silver-coin&size=50&pageNumber=1',
        source: '/silver/austrian-philiharmonic-silver-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=australian-kangaroo-silver-coin&size=50&pageNumber=1',
        source: '/silver/australian-kangaroo-silver-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=australian-lunar-series-3&size=50&pageNumber=1',
        source: '/silver/australian-lunar-series-3'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=australian-kookaburra-silver-coin&size=50&pageNumber=1',
        source: '/silver/australian-kookaburra-silver-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=silver-britannia-coin&size=50&pageNumber=1',
        source: '/silver/silver-britannia-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=noahs-ark-silver-coin&size=50&pageNumber=1',
        source: '/silver/noahs-ark-silver-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&series=silver-krugerrand-coin&size=50&pageNumber=1',
        source: '/silver/silver-krugerrand-coin'
      },

      // -----------------------------------  Silver Weight Coins -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&itemWeight=1-oz-silver-coins&size=50&pageNumber=1',
        source: '/silver/1-oz-silver-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&itemWeight=2-oz-silver-coins&size=50&pageNumber=1',
        source: '/silver/2-oz-silver-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&itemWeight=5-oz-silver-coins&size=50&pageNumber=1',
        source: '/silver/5-oz-silver-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Coins&itemWeight=10-oz-silver-coins&size=50&pageNumber=1',
        source: '/silver/10-oz-silver-coins'
      },

      // -----------------------------------  Silver Weight Bars -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=1-oz-silver-bars&size=50&pageNumber=1',
        source: '/silver/1-oz-silver-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=5-oz-silver-bars&size=50&pageNumber=1',
        source: '/silver/5-oz-silver-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=10-oz-silver-bars&size=50&pageNumber=1',
        source: '/silver/10-oz-silver-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=100-oz-silver-bars&size=50&pageNumber=1',
        source: '/silver/100-oz-silver-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=100-gram-silver-bars&size=50&pageNumber=1',
        source: '/silver/100-gram-silver-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=250-gram-silver-bars&size=50&pageNumber=1',
        source: '/silver/250-gram-silver-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=500-gram-silver-bars&size=50&pageNumber=1',
        source: '/silver/500-gram-silver-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=Bars&itemWeight=1-kilo-silver-bars&size=50&pageNumber=1',
        source: '/silver/1-kilo-silver-bars'
      },
      // -----------------------------------  Silver Weight Rounds -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=rounds&itemWeight=1-oz-silver-rounds&size=50&pageNumber=1',
        source: '/silver/1-oz-silver-rounds'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=rounds&itemWeight=1-2-oz-silver-rounds&size=50&pageNumber=1',
        source: '/silver/1-2-oz-silver-rounds'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=rounds&itemWeight=1-4-oz-silver-rounds&size=50&pageNumber=1',
        source: '/silver/1-4-oz-silver-rounds'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=rounds&itemWeight=1-10-oz-silver-rounds&size=50&pageNumber=1',
        source: '/silver/1-10-oz-silver-rounds'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=rounds&itemWeight=2-oz-silver-rounds&size=50&pageNumber=1',
        source: '/silver/2-oz-silver-rounds'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Silver&productType=rounds&itemWeight=5-oz-silver-rounds&size=50&pageNumber=1',
        source: '/silver/5-oz-silver-rounds'
      },
      // ----------------------------------- Gold Product Type -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&metal=gold&productType=gold-coins&size=50&pageNumber=1',
        source: '/gold/gold-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=gold&productType=gold-bars&size=50&pageNumber=1',
        source: '/gold/gold-bars'
      },

      // -----------------------------------  Gold series -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=american-gold-eagle-coin&size=50&pageNumber=1',
        source: '/gold/american-gold-eagle-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=canadian-gold-maple-leaf-coin&size=50&pageNumber=1',
        source: '/gold/canadian-gold-maple-leaf-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=austrian-philharmonic-gold-coin&size=50&pageNumber=1',
        source: '/gold/austrian-philharmonic-gold-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=australian-kangaroo-gold-coin&size=50&pageNumber=1',
        source: '/gold/australian-kangaroo-gold-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=perth-gold-lunar-coins&size=50&pageNumber=1',
        source: '/gold/perth-gold-lunar-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=american-buffalo-gold-coin&size=50&pageNumber=1',
        source: '/gold/american-buffalo-gold-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=britannia-gold-coin&size=50&pageNumber=1',
        source: '/gold/britannia-gold-coin'
      },
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=mexican-gold-libertad-coins&size=50&pageNumber=1',
        source: '/gold/mexican-gold-libertad-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&productType=Coins&metal=Gold&series=krugerrand-gold-coin&size=50&pageNumber=1',
        source: '/gold/krugerrand-gold-coin'
      },

      // -----------------------------------  Gold Weight Coins -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Coins&itemWeight=1-oz-gold-coins&size=50&pageNumber=1',
        source: '/gold/1-oz-gold-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Coins&itemWeight=1-2-oz-gold-coins&size=50&pageNumber=1',
        source: '/gold/1-2-oz-gold-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Coins&itemWeight=1-4-oz-gold-coins&size=50&pageNumber=1',
        source: '/gold/1-4-oz-gold-coins'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Coins&itemWeight=1-10-oz-gold-coins&size=50&pageNumber=1',
        source: '/gold/1-10-oz-gold-coins'
      },

      // -----------------------------------  Gold Weight Bars -------------------------------------
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=1-oz-gold-bars&size=50&pageNumber=1',
        source: '/gold/1-oz-gold-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=10-oz-gold-bars&size=50&pageNumber=1',
        source: '/gold/10-oz-gold-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=1-gram-gold-bars&size=50&pageNumber=1',
        source: '/gold/1-gram-gold-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=5-gram-gold-bars&size=50&pageNumber=1',
        source: '/gold/5-gram-gold-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=10-gram-gold-bars&size=50&pageNumber=1',
        source: '/gold/10-gram-gold-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=50-gram-gold-bars&size=50&pageNumber=1',
        source: '/gold/50-gram-gold-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=100-gram-gold-bars&size=50&pageNumber=1',
        source: '/gold/100-gram-gold-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=250-gram-gold-bars&size=50&pageNumber=1',
        source: '/gold/250-gram-gold-bars'
      },
      {
        destination:
          '/search?searchFrom=advanced&metal=Gold&productType=Bars&itemWeight=500-gram-gold-bars&size=50&pageNumber=1',
        source: '/gold/500-gram-gold-bars'
      },
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml'
      }
    ];
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'pbs.twimg.com',
      'encrypted-tbn0.gstatic.com',
      'online.kitco.com',
      'lh3.googleusercontent.com'
    ],
    unoptimized: false
  },
  env: {
    BASE_URL: 'http://106.201.231.27:8082',
    WEBSITE_URL: 'https://www.bullionmentor.com',
    NEXTAUTH_URL: 'https://www.bullionmentor.com'
  }
};

module.exports = nextConfig;