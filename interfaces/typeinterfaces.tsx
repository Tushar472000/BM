import { ReactNode } from "react";
import { ProductPriceHistoryDetail } from "./propsinterfaces";

export type advertisementProps = {
  dealer: DealersReview;
  code: string;
}

export type goldMenuProps = {
    hideGoldMenu: () => void;
  };
  
export type LayoutProps = {
    children: ReactNode;
  };
  
 export type SilverMenuProps = {
    hideSilverMenu: () => void;
  };


export type ToastMessageProps = {
    message: string;
    alertState: boolean;
    closeMessage: () => void;
  };

 export type tooltipStatusProps = {
    productName: string | undefined;
    view: string
}

export type FloatingFormProps = {
    closeForm: () => void;
}
export type featCardProps = {
  title: string;
  description: any;
};
export type ErrorModalProps = {
    getLogin: () => void;
    getRegistration: () => void;
    closeModal: () => void;
  };
export type FormWrapperProps = {
    title: string;
    description: any;
    children: ReactNode;
    footer: ReactNode;
  };
export  type LoginFormProps = {
    getRegisterForm: () => void;
    closeModal: () => void;
    getResetForm: () => void;
    productId?: number;
  };
export type ConfirmLogoutProps = {
    closeModal: () => void
    logout: () => void
}
export type ModalProps = {
    closeModal: () => void;
    productId?: number;
  };
export type RegisterFormProps = {
    getLoginForm: () => void;
    closeModal: () => void;
    productId?: number;
  };
export type ResetPasswordFormProps = {
  closeModal: () => void;
  getLoginForm: () => void;
  setReset: () => void;
  setError: () => void;
};

export type AddProductModalProps = {
  closeModal: () => void;
  products: any;
};

export type ResetSuccessProps = {
    getLoginForm: () => void;
    setReset: () => void;
    closeModal: () => void;
  };
  export type AlertModalProps = {
      closeModal: () => void
      alertType: string
  }
export type ConfirmModalProps = {
    closeModal: () => void;
    productId?: number;
  };
  export type ConfirmModalFormProps = {
      closeModal: () => void,
      getLoginForm: () => void
  }
  export type ObservationModalProps = {
      closeModal: () => void
      alertState: string
  }

  export type ObservationErrorModalProps = {
    closeModal: () => void;
  };

  export type SuccessModalProps = {
    closeModal: () => void;
  };

  export type ThrowErrorModalProps = {
    getRequestForm: () => void;
  };

  export type RequestFormProps = {
    getSuccess: () => void;
    getError: any;
  };
  export type DealerRatingFormProps = {
    getSuccess: () => void;
    closeModal: () => void;
  }

  export type NewSuccessModalProps = {
    setShare: () => void;
  };

  export type IconsGridProps = {
    shareUrl: string;
    product: string;
  };

  export type ShareModalProps = {
    shareUrl: string;
    productName?: any;
    closeModal: () => void;
    p1: string;
    p2: string;
  };

  export type SubscribeErrorModalProps = {
    getSubscribeForm: () => void;
  };

  export type VendorReviewModalProps = {
    closeModal: () => void;
}
export type PasswordInstructionsProps = {
    errorState: boolean;
    password: string;
    prevPassword?: string;
  };

  export type PriceHistory = {
    priceDate: string;
    productPriceHistoryDetails: ProductPriceHistoryDetail[];
  };
  
  export type PriceHistoryTableProps = {
    productPriceHistory: PriceHistory[];
    competitorList: string[];
  };

  export type ProductItem = {
    productId: number;
    imageUrl: string;
    mobileImageurl: string;
    productName?: string | any;
    shortName: string;
    competitorProductUrl: string;
    dealers: string | null | any;
    cheapestPrice: number;
    shortDescription: string;
    premium:string;
    weightCategoryParam:string;
    asLowAs: number;
    dealerId: number;
  };
  export type FooterMenuItem = {
    name: string;
    href: string;
    button?: 'white' | 'orange';
  };

  export type DashboardImage = {
    id: number;
    imageName: string;
    imageForVenderId: any;
    imagePath: string;
    mobileImageurl: string;
    isStatic: boolean;
    eventRedirectiveUrl: string;
  };
  
  export type ApiResponse<TData = unknown> = {
    success: boolean;
    data: TData;
    errorMessage: null | string;
  };

export type Observation = {
    productId: number;
    dealerId: number;
    products: string;
    names: string;
    info?: any;
    dealers: string;
    premium: number;
    asLowAs: number;
    cheapestPrice: number;
    imageUrl: string;
    competitorProductUrl: string;
    bbdProductUrl: string;
  };

  export type SpotPrices = {
    gold: number;
    silver: any;
    goldChange: number;
    silverChange: number;
  };

  export type DealerSponsor = {
    id: number;
    competitorId: number;
    rank: number;
    name: string;
    title: string;
    imageUrl: string;
    stDt: {
      year: number;
      month: number;
      day: number;
    };
    endDt: {
      year: number;
      month: number;
      day: number;
    };
    isActive: boolean;
  };

  export type GetTopProductsBy = 'Trending' | 'NearToSpot' | 'NewLaunched';
  export type Dealers = {
    id: number;
    code: string;
    name: string;
    image: string;
    aliasName: string;
    detailUrl: string;
    rating: number;
    reviewCnt: number;
    shippingDescription: string;
  };
  export type Blog = {
    id: number;
    title: string;
    description: string;
    image: string;
    publishdate: number;
    isActive: string;
    metatitle: string;
    metaDescription: string;
    code: string;
  };

  export type DealersReview = {
    metaDesc: string | undefined;
    metatitle: string;
    id: number;
    code: string;
    name: string;
    image: string;
    aliasName: string;
    detailUrl: string;
    rating: number;
    reviewCnt: number;
    shippingDescription: string;
    dealerReview: DealersReviewDetails[];
  };
  
  export type DealersReviewDetails = {
    code?: any;
    id: number;
    competitorId: number;
    rating: number;
    reviewHeader: string;
    reviewText: string;
    createTS: Date;
    fullName: string;
  };

  export type Maintainance = {
    id: number;
    isInMaintenance: boolean;
  };

  export type blogs =
  { id: number,
     code: any; 
     image: string; 
    title: string; 
    description: string; 
    publishdate: Date; 
  }
  
  export type chartData = {
    dateNTime:string;
    gold:number;
    silver:number;
    silverChange?:number;
    goldChange?:number;
    silverChangePercent?:number;
    goldChangePercent?:number;
    timeframe?:string;
  };