import fetcher from '@/utils/fetcher';
import axios from 'axios';
import { BlogData } from '@/interfaces/propsinterfaces';
import {
  ApiResponse,
  DealerSponsor,
  GetTopProductsBy,
  Dealers,
  Blog,
  DealersReview
} from '@/interfaces/typeinterfaces';
import { spotPriceInterface } from '@/types/types';

export const getSpotPrice = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/BestBullionDeals/GetSpotPrices`).then((res) => {
    return res.json()
  })
  return response.data[0] as spotPriceInterface
};

export interface Product {
  homePageProductDetails: [];
}

export const searchProducts = async (searchKeyword: string) => {
  const url = new URL(
    `${process.env.BASE_URL}/api/BestBullionDeals/SearchProducts`
  );
  url.searchParams.set('searchKW', searchKeyword);
  const res = await fetcher.get<ApiResponse<any>>(url.toString());
  return res.data.data;
};

export const getTopProductsBySpesifictFilter = async (
  getBy: GetTopProductsBy
) => {
  const url = new URL(
    `${process.env.BASE_URL}/api/BestBullionDeals/GetHomePageProductsByLocation`
  );
  url.searchParams.set('GetBy', getBy ?? 'Trending');
  const res = await fetcher.get<ApiResponse<Product[]>>(url.toString());
  return res.data.data;
};

export const getTopProducts = async (
  getBy?: GetTopProductsBy,
  searchKeyword?: string
) => {
  if (searchKeyword) return searchProducts(searchKeyword);
  return getTopProductsBySpesifictFilter(getBy ?? 'Trending');
};

export const getDealerSponsors = async () => {
  const res = await fetcher.get<ApiResponse<DealerSponsor[]>>(
    `${process.env.BASE_URL}/api/BestBullionDeals/GetDealerSponsorImages`
  );
  return res.data.data;
};

export const getDealers = async () => {
  const res = await fetcher.get<ApiResponse<Dealers[]>>(
    `${process.env.BASE_URL}/api/BestBullionDeals/GetDealers`
  );
  return res.data.data;
};

// Blog

export const getBlogData = async () => {
  const res = await fetcher.get<ApiResponse<Blog[]>>(
    `${process.env.BASE_URL}/api/BestBullionDeals/GetBlogs`
  );
  return res.data.data;
};

export const getBlogDetails = async (code: string) => {
  const url = new URL(
    `${process.env.BASE_URL}/api/BestBullionDeals/GetBlogDetails`
  );
  url.searchParams.set('Title', code);
  const res = await fetcher.get<ApiResponse<BlogData>>(url.toString());
  return res.data.data;
};

export const getDealersReviews = async (code: string) => {
  const url = new URL(
    `${process.env.BASE_URL}/api/BestBullionDeals/GetDealerReviews`
  );
  url.searchParams.set('DealerCode', code);
  const res = await fetcher.get<ApiResponse<DealersReview>>(url.toString());
  return res.data.data;
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  isGoogleUser: boolean
) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/api/Customer/RegisterCustomer`,
      {
        emailId: email,
        password: password,
        firstName: name,
        isGoogleUser: isGoogleUser
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.log('Something went wrong', error.message);
  }
};

export const login = async (
  emailId: string,
  password: string,
  isGoogleUser: boolean
) => {
  try {
    const res = await axios.post(
      `${process.env.BASE_URL}/api/Customer/CustomerLogin`,
      {
        emailId: emailId,
        password: password,
        isGoogleUser: isGoogleUser
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data;
  } catch ({ error }: any) {
    return null;
  }
};

export const loginGoogleUser = async (email: string) => {
  try {
    const res = await axios.post(
      `${process.env.BASE_URL}/api/Customer/CustomerLogin`,
      {
        emailId: email,
        password: '',
        isGoogleUser: true
      }
    );
    return res.data;
  } catch (error) {
    return null;
  }
};

export const forgotpassword = async (email: string) => {
  const url = new URL(`${process.env.BASE_URL}/api/Customer/ForgotPassword`);
  url.searchParams.set('EmailId', email);
  const res = await axios.post(url.toString());
  try {
    return res.data;
  } catch ({ error }: any) {
    return false;
  }
};

export const signIn = async (emailId: string, password: string) => {
  const url = new URL(`${process.env.BASE_URL}/api/Customer/CustomerLogin`);
  url.searchParams.set('EmailId', emailId);
  url.searchParams.set('Password', password);
  const res = await fetcher.post<ApiResponse<0 | 1>>(url.toString());
  return res.data.data === 1;
};

export const ContactUs = (
  firstName: string,
  emailId: string,
  message: string,
  createTS: any
) => {
  return fetcher.post(
    '/api/contact',
    JSON.stringify({ firstName, emailId, message, createTS })
  );
};

export const contact = async (
  firstName: string,
  emailId: string,
  message: string
) => {
  try {
    const createTS = new Date().toISOString();
    const url = new URL(`${process.env.BASE_URL}/api/Customer/ContactUS`);
    let data = {
      contactUs: '',
      firstName: firstName,
      lastName: '',
      emailId: emailId,
      message: message,
      createTS: createTS
    };
    const res = await fetcher.post<ApiResponse<0 | 1>>(url.toString(), data);
    return res.data.success;
  } catch (error) {
    const err = error as { data: ApiResponse };
    return false;
  }
};

export const subscribeUser = async (name: string, emailId: string) => {
  try {
    const url = new URL(
      `${process.env.BASE_URL}/api/Customer/SubscribeToEmails`
    );
    url.searchParams.set('Name', name);
    url.searchParams.set('EmailId', emailId);
    const res = await fetcher.post<ApiResponse>(url.toString());
    return res.data.success;
  } catch (error) {
    const err = error as { data: ApiResponse };
    return err.data.success;
  }
};

export const rateADealer = async (
  fullName: string,
  emailId: string,
  competitorId: number,
  rating: number,
  reviewHeader: string,
  reviewText: string
) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/api/BestBullionDeals/RateADealer?FullName=${fullName}&EmailId=${emailId}&CompetitorId=${competitorId}&Rating=${rating}&ReviewHeader=${reviewHeader}&ReviewText=${reviewText}`
    );
    return response.data;
  } catch (error) {
    const err = error as { data: ApiResponse };
    console.log(`Unable to rate! ${err.data}`);
  }
};

export const register = async (
  firstName: string,
  lastName: string,
  emailId: string,
  password: string
) => {
  try {
    const url = new URL(
      `${process.env.BASE_URL}/api/Customer/RegisterCustomer`
    );
    url.searchParams.set('FirstName', firstName);
    url.searchParams.set('LastName', lastName);
    url.searchParams.set('EmailId', emailId);
    url.searchParams.set('Password', password);
    const res = await fetcher.post<ApiResponse>(url.toString());
    return await res.data.success;
  } catch (error) {
    const err = (await error) as { data: ApiResponse };
    console.log(err.data);
  }
};

export const requestProduct = async (
  email: string,
  productName: string,
  metal: string,
  weight: string,
  customerId: number
) => {
  try {
    const url = new URL(
      `${process.env.BASE_URL}/api/BestBullionDeals/AddProductRequest`
    );
    const headers = {
      'Content-Type': 'application/json'
    };
    const user = {
      customerId: customerId,
      emailId: email,
      productName: productName,
      metal: metal,
      weight: weight
    };
    const res = await axios.post(url.toString(), user, { headers: headers });
    return res.data.success;
  } catch (error) {
    const err = error as { data: ApiResponse };
    return err.data.success;
  }
};

export const updatePassword = async (
  mail: string,
  currentPassword: string,
  newPassword: string
) => {
  const response = await axios.post(
    `${process.env.BASE_URL}/api/Customer/UpdateCustmerPassword`,
    {
      emailId: mail,
      currentPassword: currentPassword,
      newPassword: newPassword
    }
  );
  return response.data;
};

export const changePersonalDetail = async (
  emailId: string,
  name: string,
  streetAddress: string,
  state: string,
  city: string,
  pincode: string
) => {
  const response = await axios.post(
    `${process.env.BASE_URL}/api/Customer/UpdateCustmerInfo`,
    {
      emailId: emailId,
      name: name,
      streetAddress: streetAddress,
      state: state,
      city: city,
      pincode: pincode
    }
  );
  return response.data;
};

export const addProdBuyClicksLog = async (
  productName: string,
  vendorName: string,
  customerId: number,
  vendorId: number
) => {
  const response = await axios.post(
    `${process.env.BASE_URL}/api/BestBullionDeals/AddProdBuyClicksLog`,
    {
      productName: productName,
      vendorName: vendorName,
      customerId: customerId,
      vendorId: vendorId
    }
  );
  return response.data;
};

export const GetCustomerDetails = async (emailId: string) => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/Customer/GetCustomerDetails?EmailId=${emailId}`,
    {
      next: {
        revalidate: 120
      }
    }
  );
  return response.json();
};

export const resetPassword = async (
  resetToken: string,
  resetPassword: string
) => {
  const response = await axios.post(
    `${process.env.BASE_URL}/api/Customer/ResetPassword`,
    {
      resetToken: resetToken,
      resetPassword: resetPassword
    }
  );
  return response.data;
};

export const getMaintainance = async () => {
  const res = await fetch(
    `https://bbdapi.bestbulliondeals.com/api/BestBullionDeals/GetMaintenance`
  );
  return res;
};

export const getChartData = async (Number:number, TimeFrame:string,isChange:boolean) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/BestBullionDeals/GetSpotPriceHistory?Num=${Number}&Timeframe=${TimeFrame}&IsChange=${isChange}`
  );
  return res.json();
};

