/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import data from '@/data';
import Head from 'next/head';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import LineAreaChart from '@/components/chartData/LineAreaChart/page';
import { chartData } from '@/interfaces/typeinterfaces';
import { getChartData } from '@/services/spot-prices';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dayjs from 'dayjs';
import { getSpotPriceDataHistory } from '@/services/dashboard';
import { pricePerGram, pricePerKilo, toCurrency } from '@/utils/utilities';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Historicaldatatable from '@/components/chartData/historycaldata/page';
import AllproductsOnSpot from '@/components/chartData/NearToSpotProducts/page';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';

const silverChart = ({title , description ,
  chartData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const select = useSelector(selectUser);
  const spotPrice = select.spotPrices;
  const [open, setOpen] = useState(0);
  const [selected, setSelected] = useState<'Silver' | 'Gold'>('Silver');
  const [chartdata, setChartData] = useState<chartData[]>(chartData);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [change, setChange] = useState(0);
  const [spotPriceHistory, setSpotPriceHistory] = useState([]);
  const [currentSpotPriceData, setCurrentSpotPriceData] = useState<chartData>({
    dateNTime: '',
    silver: 0,
    gold: 0
  });
  let today = new Date();
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const currentSpotPrice = async () => {
      setSpotPriceHistory(getSpotPriceDataHistory('Silver', spotPrice));
      setCurrentSpotPriceData({
        dateNTime: `${today.getMonth() + 1
          }/${today.getDate()}/${today.getFullYear()}`,
        silver: spotPrice.silver,
        gold: spotPrice.gold
      });
      setChartData([...chartData, currentSpotPriceData]);
      setFrom(dayjs(chartdata.map((x) => x.dateNTime)[0]).format('MM/DD/YYYY'));
      setTo(currentSpotPriceData.dateNTime);
      setHigh(Math.max(...chartdata.map((x) => x.silver)));
      setLow(Math.min(...chartdata.map((x) => x.silver)));
      setChange(spotPrice.silverChange);
    };
    currentSpotPrice();
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta
          property='og:url'
          content={`${process.env.WEBSITE_URL}/silver-spot-price`}
          key={`${process.env.WEBSITE_URL}/silver-spot-price`}
        />
        <link
          rel='canonical'
          href={`${process.env.WEBSITE_URL}/silver-spot-price`}
        />
      </Head>
      <div className='container mx-auto flex w-full flex-col gap-2 px-2 py-2 text-dark-black overflow-clip'>
        <h1 className='mt-10 w-full sm:px-2 text-[18px] font-semibold sm:mt-12 lg:mt-2 xl:mt-2 2xl:mt-2 sm:text-2xl'>
          Silver Spot Price
        </h1>
        <div className='flex flex-col sm:px-2 py-1 text-[15px] gap-2 font-medium sm:w-fit'>
          <h2>Live Metal Spot Price(24hrs)</h2>
          <div className='flex flex-row justify-start items-start w-full sm:gap-2 gap-1 '>
            {/* -------------------- SILVER PRICE PER OUNCE -------------------- */}
            
            <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-1 sm:p-2 rounded-lg">
              <span className="text-sm text-dark-black font-medium">Silver Price Per Ounce:</span>
              <div className="flex items-center">
              <span className="text-sm text-primary font-medium px-1">
               {spotPrice && spotPrice.silver !== undefined ? toCurrency(spotPrice.silver) : 'N/A'}
              </span>
                 {spotPrice && spotPrice.silverChange !== undefined ? (
                   <>
                     {spotPrice.silverChange < 0 ? (
                       <MdArrowDropDown size={24} fill="#FF2A2A" />
                     ) : (
                       <MdArrowDropUp size={24} fill="#27D24A" />
                     )}
                     <span className={`text-sm font-medium ${spotPrice.silverChange < 0 ? "text-danger" : "text-success"}`}>
                       {Math.abs(spotPrice.silverChange)}
                     </span>
                   </>
                 ) : (
                   'N/A'
                 )}
              </div>
            </div>
                       {/* -------------------- SILVER PRICE PER GRAM -------------------- */}
            <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-1 sm:p-2 rounded-lg">
              <span className="text-sm text-dark-black font-medium">Silver Price Per Gram:</span>
              <div className="flex items-center">
              <span className="text-sm text-primary font-medium px-1">
                 {spotPrice && spotPrice.silver !== undefined ? toCurrency(pricePerGram(spotPrice.silver)) : 'N/A'}
               </span>
               {spotPrice && spotPrice.silverChange !== undefined ? (
                 <>
                   {spotPrice.silverChange < 0 ? (
                     <MdArrowDropDown size={24} fill="#FF2A2A" />
                   ) : (
                     <MdArrowDropUp size={24} fill="#27D24A" />
                   )}
                   <span className={`text-sm font-medium ${spotPrice.silverChange < 0 ? "text-danger" : "text-success"}`}>
                   {Math.abs(pricePerGram(spotPrice.silverChange))}
                   </span>
                 </>
               ) : (
                 'N/A'
               )}
              </div>
            </div>
            {/* -------------------- SILVER PRICE PER KILO -------------------- */}
            <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-1 sm:p-2 rounded-lg">
              <span className="text-sm text-dark-black font-medium">Silver Price Per Kilo:</span>
              <div className="flex items-center">
              <span className="text-sm text-primary font-medium px-1">
                   {spotPrice && spotPrice.silver !== undefined ? toCurrency(pricePerKilo(spotPrice.silver)) : 'N/A'}
                 </span>
                 {spotPrice && spotPrice.silverChange !== undefined ? (
                   <>
                     {spotPrice.silverChange < 0 ? (
                       <MdArrowDropDown size={24} fill="#FF2A2A" />
                     ) : (
                       <MdArrowDropUp size={24} fill="#27D24A" />
                     )}
                     <span className={`text-sm font-medium ${spotPrice.silverChange < 0 ? "text-danger" : "text-success"}`}>
                     {Math.abs(pricePerKilo(spotPrice.silverChange))}
                     </span>
                   </>
                 ) : (
                   'N/A'
                 )}
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full px-2 flex-col gap-4 text-lg font-semibold text-dark-black lg:flex-row'>
          <div className='flex flex-col text-start items-start justify-start'>
            Spot Price Chart
            <span className='flex w-full flex-row items-center justify-start gap-4 text-[14px]'>
              <button
                className={`${selected === 'Silver'
                  ? 'border-b-[3px] border-primary font-semibold text-primary'
                  : ' font-semibold text-dark-black'
                  }`}
                onClick={() => {
                  setSelected('Silver'), setChange(spotPrice.silverChange);
                }}
              >
                Silver
              </button>
              <button
                className={`${selected === 'Gold'
                  ? ' border-b-[3px] border-primary font-semibold text-primary'
                  : 'font-semibold text-dark-black'
                  }`}
                onClick={() => {
                  setSelected('Gold'), setChange(spotPrice.goldChange);
                }}
              >
                Gold
              </button>
            </span>
            <span className='flex w-full flex-row items-start justify-start'>
              <LineAreaChart
                metal={selected}
                currentSpotPrice={currentSpotPriceData}
                initialchartData={chartData}
                initfrom={from}
                initto={to}
                initchange={change}
                initHigh={high}
                initlow={low}
              />
            </span>
          </div>
          <span className='flex h-full w-full flex-col items-start justify-start gap-2 text-start'>
          <span className='text-start px-2'>Historical Spot Prices</span>
            <Historicaldatatable metal={selected} spotpricedata={change} />
          </span>
        </div>
        {/* -------------------- NEAR TO SPOT PRODUCTS -------------------- */}
        <div className='flex w-full flex-col items-center justify-start gap-2'>
          {/* -------------------- HEADING -------------------- */}
          <div className='flex w-full flex-row items-center justify-between'>
            <h3 className='text[15px] flex w-full flex-row items-start justify-start px-2 font-semibold text-dark-black'>
              Cheapest Coins, Bars & Rounds
            </h3>
            <div className=' flex flex-row items-center justify-end mr-3 w-28'>
              <Link
                className='rounded-lg bg-black px-2 py-1 text-center text-[15px] text-white focus:bg-primary'
                href={'/new-launched'}
                passHref
              >View All
              </Link>
            </div>
          </div>
          {/* -------------------- PRODUCTS LISTING -------------------- */}
          <div className='flex w-full flex-row items-start justify-start gap-2 px-3 py-2'>
            <AllproductsOnSpot />
          </div>
        </div>
        <div className='flex max-w-screen-2xl flex-col items-start justify-start gap-2 px-2 text-start'>
          <h2 className='text-[18px] pt-1 font-bold text-dark-black'>
            Silver Spot Price & Charts
          </h2>
          <span className='w-fit whitespace-normal text-[14px] font-normal'>
            The price at which a metal can be exchanged and delivered
            immediately is known as the spot price or the silver spot price.
            This means that the spot price represents the current trading price
            of silver. Commodities like crude oil, silver, and gold markets
            often refer to spot prices. The price of commodities is constantly
            being discovered and monitored by financial institutions, banks,
            dealers, and retail investors. Before purchasing precious metals,
            it's always a good idea to check the spot prices of silver and gold.
            Bullion Mentor provides modern technology that allows you to check
            daily silver spot prices and compare the retail prices of any
            bullion product from over 20 leading online bullion dealers. Its
            user-friendly interface lets you easily access and compare prices to
            make informed decisions when buying precious metals.
          </span>
          <h2 className='text-[18px] font-bold text-dark-black'>
            {' '}
            What is the Silver Spot Price?
          </h2>
          <span className='whitespace-norma w-fit text-[14px] font-normal'>
            The spot price of silver refers to the present market value at which
            one can purchase an ounce of unrefined silver and resell it for
            immediate delivery. Because the spot price of silver constantly
            changes, investors should stay updated on current affairs, market
            conditions, and other performance indicators as they impact buying
            and selling silver. For any silver goods, you will pay the spot
            price plus an additional premium that all dealers charge to cover
            their overhead. Check the spot price of silver today at Bullion
            Mentor, where we diligently maintain regular updates on silver
            prices for your convenience.
          </span>
        </div>
        <h3 className='px-2 text-[18px] font-bold pt-2 text-dark-black'>
          FAQs
        </h3>
            <div className="sm:flex flex-row">
              <div className="w-full md:w-1/2">
                <Accordion type="single" collapsible className="w-full flex flex-col">
                  <AccordionItem value="item-1"className="w-full lg:w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                    <AccordionTrigger onClick={() => handleOpen(1)}
                        className={`border-b-0 text-[15px] transition-colors text-start ${
                        open === 1 ? 'text-primary hover:!text-primary' : ''
                        }`}>What is Silver Bullion?</AccordionTrigger>
                          <AccordionContent className='pt-0 text-base font-normal'>
                          Silver bars are frequently referred to as silver bullion;
                          however, this is a partial description. Any investment-grade  
                          silver offered in bars or coins with a purity of at least .995
                          or .999 is silver bullion.
                          </AccordionContent>
                    </AccordionItem>
                <AccordionItem value="item-3"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                  <AccordionTrigger onClick={() => handleOpen(3)}
                  className={`border-b-0 text-[15px] transition-colors text-start ${
                    open === 3 ? 'text-primary hover:!text-primary' : ''
                  }`}>What is a Troy Ounce?</AccordionTrigger>
                  <AccordionContent className='pt-0 text-base font-normal'>
                  A troy ounce is a Middle Ages-era unit of measurement used to
                  weigh precious metals. The troy ounce, named after Troyes,
                  France, is currently the industry standard for measuring
                  precious metals such as gold, silver, and platinum. A troy ounce
                  weighs 31.1034768 grams, more than an avoirdupois pound, which
                  weighs 28.3495 grams. About 10% heavier than an avoirdupois
                  ounce, the troy ounce is also called "t oz" or "oz t". The
                  prices of valuable metals, like the spot prices of gold or
                  silver, are usually indicated per troy ounce in international
                  markets.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                  <AccordionTrigger onClick={() => handleOpen(5)}
                  className={`border-b-0 text-[15px] transition-colors text-start ${
                    open === 5 ? 'text-primary hover:!text-primary' : ''
                  }`}>What Factors Influence the Price of Silver?</AccordionTrigger>
                  <AccordionContent className='pt-0 text-base font-normal'>
                  Numerous factors impact the price of silver, such as:
                  <ul className='list-inside list-disc md:list-disc'>
                    <li>
                      Fluctuations in the demand and supply within the commercial and investment domains.
                    </li>
                    <li>
                      The economy&apos;s condition and the rate of inflation.
                    </li>
                    <li>Interest rates and monetary policy.</li>
                    <li>
                      Geopolitical turmoil and fluctuations in currency values are
                      two instances.
                    </li>
                    <li>
                      Technological advancements impact the industrial use of
                      silver.
                    </li>
                  </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                            <AccordionTrigger onClick={() => handleOpen(7)}
                            className={`border-b-0 text-[15px] transition-colors text-start ${
                              open === 7 ? 'text-primary hover:!text-primary' : ''
                            }`}>How is the Silver Spot Price Determined?</AccordionTrigger>
                            <AccordionContent className='pt-0 text-base font-normal'>
                            To determine the spot price of silver, one must utilize the
                            futures contract prices of the closest contract with the most
                            excellent trading volume. The COMEX, a division of the Chicago
                            Mercantile Exchange, is the primary exchange used to determine
                            the silver spot price.
                            </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                            <AccordionTrigger onClick={() => handleOpen(9)}
                            className={`border-b-0 text-[15px] transition-colors text-start ${
                              open === 9 ? 'text-primary hover:!text-primary' : ''
                            }`}>What is a Premium Over the Spot Price of Silver?</AccordionTrigger>
                            <AccordionContent className='pt-0 text-base font-normal'>
                            An extra charge added to the purchase of a silver bullion
                            product is a premium over the spot silver price. Every product
                            made of silver has a premium over the spot price, albeit some
                            products have more significant premiums than others.
                            Additionally, different dealers may charge varying premiums for
                            their goods. On Bullion Mentor, you can compare the prices of
                            various bullion products and make an informed decision.
                            </AccordionContent>
                </AccordionItem>
                </Accordion>

              </div>
              <div className="w-full md:w-1/2">
                <Accordion type="single" collapsible className="w-full flex flex-col">
                  <AccordionItem value="item-2"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                    <AccordionTrigger onClick={() => handleOpen(2)}
                    className={`border-b-0 text-[15px] transition-colors text-start ${
                      open === 2 ? 'text-primary hover:!text-primary' : ''
                    }`}>What is the Silver Price Today?</AccordionTrigger>
                    <AccordionContent className='pt-0 text-base font-normal'>
                    Silver bullion prices are set and adjusted by the world market,
                    which involves individuals and companies that buy and sell
                    silver and are closely linked to the price of silver futures.
                    The Commodity Exchange Inc. (COMEX), the New York Mercantile
                    Exchange (NYMEX), the London Bullion Market (LBM), and the
                    Chinese Gold and Silver Exchange Society (CGSE) are notable for
                    their worldwide silver buyers and recognized precious metal
                    exchanges. You can effortlessly monitor daily silver prices with
                    BullionMentor.com, where you can also compare the best deals
                    reputable dealers offer.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4"className="w-full  px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                    <AccordionTrigger onClick={() => handleOpen(4)}
                    className={`border-b-0 text-[15px] transition-colors text-start ${
                      open === 4 ? 'text-primary hover:!text-primary' : ''
                    }`}>Who Buys Silver?</AccordionTrigger>
                    <AccordionContent className='pt-0 text-base font-normal'>
                    Banks, big investment groups, and individuals are all actively
                    purchase silver. Silver is also bought for use in various other
                    industries, including electronics, aircraft, medical, and
                    automobile industries. Individual investors also carefully check
                    the price of an ounce of silver to safeguard their financial
                    position. Similar to gold, silver is used as an investment to
                    protect against the depreciation of fiat currencies. On the
                    other hand, some acquire silver to have money to purchase goods
                    and services if the dollar collapses.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                            <AccordionTrigger onClick={() => handleOpen(6)}
                            className={`border-b-0 text-[15px] transition-colors text-start ${
                              open === 6 ? 'text-primary hover:!text-primary' : ''
                            }`}>Is it a Good Time to Invest in Silver?</AccordionTrigger>
                            <AccordionContent className='pt-0 text-base font-normal'>
                            Indeed, silver prices have increased by more than 5% since the
                            start of the year in 2023. According to some experts, demand for
                            silver may outpace supply, resulting in price support of at
                            least $22 per ounce for the rest of the year.
                            </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                            <AccordionTrigger onClick={() => handleOpen(8)}
                            className={`border-b-0 text-[15px] transition-colors text-start ${
                              open === 8 ? 'text-primary hover:!text-primary' : ''
                            }`}>Is the Spot Price of Silver Frequently Fluctuating?</AccordionTrigger>
                            <AccordionContent className='pt-0 text-base font-normal'>
                            The price of silver on the spot is constantly changing. Recall
                            that there is inherent risk associated with all investments. One
                            of the main reasons so many investors hold a portion of their
                            portfolio in precious metals like silver and gold is the overall
                            favorable historical trend in the spot price. Silver is also an
                            excellent hedge against inflation and uncertainty; you may
                            reduce risk and counteract more volatile stocks by balancing
                            riskier assets with the more reliable silver. One investment
                            approach for silver is dollar-cost averaging. It entails
                            regularly investing a predetermined sum of money into silver
                            over an extended period.
                            </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit  shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                            <AccordionTrigger onClick={() => handleOpen(10)}
                            className={`border-b-0 text-[15px] transition-colors text-start  ${
                              open === 10 ? 'text-primary hover:!text-primary' : ''
                            }`}>What is the Equivalent Amount of Silver Measured in Troy Ounces in a Kilogram?</AccordionTrigger>
                            <AccordionContent className='pt-0 text-base font-normal'>
                            It's important to note that 32.15 troy ounces can be found in
                            every kilogram of silver. If you buy larger quantities of
                            silver, you can decrease the average cost per gram.
                            </AccordionContent>
                </AccordionItem>
                </Accordion>

              </div>
            </div>
      </div>
    </>
  );
};

export default silverChart;

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  chartData: chartData[];
}> = async (res): Promise<any> => {
  const response = await getChartData(3, 'month', false);
  const chartData = response.data;
  const title = data.site.silver.page;
  const description = data.site.silver.description;
  return {
    props: {
      title , description , chartData 
    }
  };
};
