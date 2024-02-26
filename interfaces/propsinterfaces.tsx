import { search } from "@/services/dashboard";
import { DashboardImage,Observation } from "./typeinterfaces";
import { HTMLMotionProps } from "framer-motion";
import { User } from "next-auth";
import { HTMLAttributes } from "react";

export interface AccordionProps {
    title: string;
    children?: React.ReactNode;
  }

export interface DashboardCarouselProps {
    images: DashboardImage[];
  }

  export interface BreadcrumbsProps {
    items: { label: string; href?: string; active?: boolean }[];
  }

  export interface MegaMenuProps {
    children?: React.ReactNode;
  }
  export interface MegaMenuProps extends HTMLMotionProps<"div"> { }

  export interface MobileGoldMenuProps {
    onHide: () => void;
  }

  export interface MobileMenuProps {
    onHide: () => void;
  }

  export interface MobileSilverMenuProps {
    onHide: () => void;
  }

  export interface SearchResultsProps {
    data: Awaited<ReturnType<typeof search>>;
    closeSearchResult: any;
    handleClose: () => void;
  }

  export interface TextClamperProps extends React.HTMLAttributes<HTMLDivElement> {
    showButton?: boolean;
    children?: React.ReactNode;
    initialHeight?: number;
    desc?: string;
  }

  export interface ToggleSwitchProps {
    checked?: boolean;
    onChange: () => void;
    label?: string;
  }
  export interface IconAddProps extends HTMLAttributes<SVGElement> {}
  export interface IconMenuProps extends HTMLAttributes<SVGElement> {}
  export interface ObservationProductProps extends Observation {}
  export interface CompetitorProductPricesProps {
    competitors: CompetitorProductPrice[];
    premiumParameter: any;
    productName: string;
  }

  export  interface ProductSpecificationsProps {
    specifications: CompetitorProductAttributes;
  }

  export interface SearchResult {
    searchProducts: [
      {
        productId: number;
        dealerId: number;
        productName: string;
        info?: any;
        shortDescription: string;
        dealers: string;
        premium: number;
        asLowAs: number;
        cheapestPrice: number;
        imageUrl: any;
        competitorProductUrl: any;
        bbdProductUrl: any;
        shortName: any;
        metaTitle: string;
        metaDesc: string;
        sku: string;
        weight: number;
        depth: number;
        width: number;
      }
    ];
    content: {
      title: string;
      seoContent: string;
      seoContentBottom: string;
      metaTitle: string;
      metaDesc: string;
    };
    inputfields: {
      searchFrom: string;
      searchKW: string;
      metal: string;
      productType: string;
      series: string;
    };
    countOfProducts: {
      noOfItems: number;
    };
  }

  export interface ProductPriceHistoryDetail {
    minPremiumPerDay: number;
    avgPremiumPerDay: number;
    maxPremiumPerDay: number;
    minPricePerDay: number;
    avgPricePerDay: number;
    maxPricePerDay: number;
    competitorName: string;
    priceDate: PriceDate;
    isMinPrice: string
  }
export interface PriceDate {
    year: number;
    month: number;
    day: number;
  }
  export interface PriceHistory {
    productId: number;
    name: string;
    image: string;
    metal: string;
    ounces: number;
    shortName: string;
    description: string;
    shortDescription: string;
    competitorList: [];
    pricePulledDate: [
      {
        priceDate: any;
        productPriceHistoryDetails: [];
      }
    ];
  }

  export interface CompetitorProductPrice {
    detailUrl: string;
    code: string;
    name: string;
    aliasName: string;
    productUrl: string;
    goldSpotPrice: number;
    silverSpotPrice: number;
    platinumSpotPrice: number;
    palladiumSpotPrice: number;
    premium: number;
    asLowAs: number;
    priceTier1: number;
    ask1: number;
    timestamp: Date;
    priceNotScrapedAlert?: any;
    rating: number;
    shippingDescription: string;
    reviewCnt: number;
    vendorId: number
  }
  
  export interface CompetitorProductAttributes {
    id: number;
    productId: number;
    unitMeasures: string;
    purity: string;
    thickness: string;
    diameter: string;
    yearReleased: string;
    metalComposition: string;
    faceWeight: number;
    standardizedWeight: number;
    denomination?: any;
    ounces: number;
    mintMark?: any;
    mintage?: any;
    createTS: Date;
  }
  
  export interface Pulldate {
    pricePulledHours: string;
  }
  
  export interface OutOfStock {
    outOfStockCount: number;
  }
  
  export interface Product {
    productId: number;
    name: string;
    image: string;
    metal: string;
    ounces: number;
    shortName?: any;
    description: string;
    shortDescription: string;
    competitorProductPrices: CompetitorProductPrice[];
    competitorProductAttributes: CompetitorProductAttributes;
    pulldate: Pulldate;
    countOfoutOfStock: OutOfStock;
    metaTitle: string;
    metaDesc: string;
    sku: number;
    permiumParameter: {
      premiumWeightParameter: string;
    };
  }

  export interface BlogData {
    id: number;
    title: string;
    description: string;
    image: string;
    publishdate: string;
    isActive: string;
    metatitle: string;
    metaDescription: string;
    code: string;
  }

  export interface LoginUser extends User {
    userName: string;
    token: string;
    customerId: number;
  }