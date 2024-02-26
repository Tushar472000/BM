import fetcher from '@/utils/fetcher';
import axios from 'axios';
import { PriceHistory } from '@/interfaces/propsinterfaces';
import { ApiResponse,Observation } from '@/interfaces/typeinterfaces';

export const getObservations = async (id: number, accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  const res = (
    await fetcher.get<ApiResponse<Observation[]>>(
      `${process.env.BASE_URL}/api/BestBullionDeals/GetObservationListProducts?CustomerId=${id}`,
      config
    )
  ).data;
  return res.data;
};

export const addProduct = async (
  productId: number,
  customerId: number,
  token: string
) => {
  try {
    const data = {
      productId: productId,
      customerId: customerId
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const res = (
      await fetcher.post<ApiResponse<string>>(
        `${process.env.BASE_URL}/api/BestBullionDeals/AddProductToObservationList`,
        data,
        config
      )
    ).data;
    return res.success;
  } catch (error) {
    console.log(error);
  }
};

export const getPriceHistory = async (query: string): Promise<PriceHistory> => {
  const response = await axios.get<ApiResponse<PriceHistory>>(
    `${process.env.BASE_URL}/api/BestBullionDeals/GetProductPriceHistory${query ? '?' + query : ''
    }`
  );
  return response.data.data;
};
