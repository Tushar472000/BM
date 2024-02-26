import fetcher from '@/utils/fetcher';
import { Product } from '@/interfaces/propsinterfaces';
import { ApiResponse } from '@/interfaces/typeinterfaces';

export const getProduct = async (shortName: string) => {
  const res = (
    await fetcher.get<ApiResponse<Product>>(
      `${process.env.BASE_URL}/api/BestBullionDeals/GetProductCompetitorPricesDetails?ShortName=${shortName}`
    )
  ).data;
  return res;
};
