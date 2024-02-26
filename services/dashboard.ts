import { SpotPrices } from '@/interfaces/typeinterfaces';
import fetcher from '@/utils/fetcher';

export const search = async (query: any, pageSize: number, pageNumber: number) => {
  const convertqueryparams = {
    searchFrom: query.searchFrom ?? '',
    metal: query.metal ?? '',
    productType: query.productType ?? '',
    searchKW: query.searchKW ?? '',
    itemWeight: query.itemWeight ?? '',
    series: query.series ?? '',
    size: pageSize,
    pageNumber: pageNumber 
  };

  const res = (
    await fetcher.post(`${process.env.BASE_URL}/api/BestBullionDeals/SearchProducts`, convertqueryparams)
  ).data;

  return res;
};

export const getSpotPriceDataHistory = (page:string,spotprice:SpotPrices) => {
  let SpotPriceHistory:any = [];
  switch(page)
  {
    case "Silver": SpotPriceHistory = [{
      name:"Silver Price Per Ounce",
      ask:spotprice.silver,
      change:spotprice.silverChange
    },
    {
      name:"Silver Price Per Gram",
      ask:Number(spotprice.silver)/31.1,
      change: parseFloat((spotprice.silverChange/31.1).toFixed(2))

    },{
      name:"Silver Price Per Kilo",
      ask:Number((spotprice.silver)/31.1)*1000,
      change: parseFloat(((spotprice.silverChange/31.1)*1000).toFixed(2))
    }]; break;
    case "Gold": 
    SpotPriceHistory = [{
      name:"Gold Price Per Ounce",
      ask:spotprice.gold,
      change:spotprice.goldChange
    },
    {
      name:"Gold Price Per Gram",
      ask:Number(spotprice.gold)/31.1,
      change: parseFloat((spotprice.goldChange/31.1).toFixed(2))

    },{
      name:"Gold Price Per Kilo",
      ask:(Number(spotprice.gold)/31.1)*1000,
      change: parseFloat(((spotprice.goldChange/31.1)*1000).toFixed(2))
    }]
  }
  return SpotPriceHistory
}