/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import data from '@/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import LineAreaChart from '@/components/chartData/LineAreaChart/page';
import { getChartData, getSpotPrice } from '@/services/spot-prices';
import { SpotPrices, chartData } from '@/interfaces/typeinterfaces';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dayjs from 'dayjs';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { pricePerGram, pricePerKilo, toCurrency } from '@/utils/utilities';
import { getSpotPriceDataHistory } from '@/services/dashboard';
import Historicaldatatable from '@/components/chartData/historycaldata/page';
import AllproductsOnSpot from '@/components/chartData/NearToSpotProducts/page';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';

const goldChart = ({
  title , description , chartData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const select = useSelector(selectUser);
  const spotPrice = select.spotPrices;
  const [open, setOpen] = useState(0);
  const [selected, setSelected] = useState<'Silver' | 'Gold'>('Gold');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [change, setChange] = useState(0);
  let today = new Date();
  const [spotPriceHistory, setSpotPriceHistory] = useState([]);
  const [currentSpotPriceData, setCurrentSpotPriceData] = useState<chartData>({
    dateNTime: '',
    silver: 0,
    gold: 0
  });
  const [chartdata, setChartData] = useState<chartData[]>(chartData);
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    currentSpotPrice();
  }, []);
  const currentSpotPrice = async () => {
    setSpotPriceHistory(getSpotPriceDataHistory('Gold', spotPrice));
    setCurrentSpotPriceData({
      dateNTime: `${
        today.getMonth() + 1
      }/${today.getDate()}/${today.getFullYear()}`,
      silver: spotPrice.silver,
      gold: spotPrice.gold
    });
    setChartData([...chartData, currentSpotPriceData]);
    setFrom(dayjs(chartdata.map((x) => x.dateNTime)[0]).format('MM/DD/YYYY'));
    setTo(currentSpotPriceData.dateNTime);
    setHigh(Math.max(...chartdata.map((x) => x.gold)));
    setLow(Math.min(...chartdata.map((x) => x.gold)));
    setChange(spotPrice.goldChange);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={data.OGTags.home.type} />
        <meta
          property='og:url'
          content={`${process.env.WEBSITE_URL}/gold-spot-price`}
          key={`${process.env.WEBSITE_URL}/gold-spot-price`}
        />
        <link
          rel='canonical'
          href={`${process.env.WEBSITE_URL}/gold-spot-price`}
        />
      </Head>
      <div className='container mx-auto flex w-full flex-col gap-2 px-2 py-2 text-dark-black overflow-clip'>
      <h1 className='mt-10 w-full text-[18px] font-semibold sm:px-2 sm:mt-12 lg:mt-2 xl:mt-2 2xl:mt-2 sm:text-2xl'>
          Gold Spot Price
        </h1>
        <div className='flex flex-col sm:px-2 py-1 text-[15px] gap-2 font-medium'>
          <h2>Live Metal Spot Price(24hrs)</h2>
          <div className='flex flex-row justify-start items-center w-full gap-1 sm:gap-2'>
            {/* -------------------- Gold PRICE PER OUNCE -------------------- */}
            <div className="flex flex-col sm:flex-row items-center h-full bg-gray-100 p-1 sm:p-2 rounded-lg">
              <span className="text-sm font-medium text-dark-black px-2 sm:px-0">Gold Price Per Ounce:</span>
              <div className="flex items-center">
                <span className="text-sm font-medium text-primary px-1">{toCurrency(spotPrice.gold)}</span>
                {spotPrice.goldChange < 0 ? (
                  <MdArrowDropDown size={24} fill="#FF2A2A" />
                ) : (
                  <MdArrowDropUp size={24} fill="#27D24A" />
                )}
                <span className={`text-sm font-medium ${spotPrice.goldChange < 0 ? "text-danger" : "text-success"}`}>
                  {Math.abs(spotPrice.goldChange)}
                </span>
              </div>
            </div>
            {/* -------------------- Gold PRICE PER GRAM -------------------- */}
            <div className="flex flex-col sm:flex-row items-center bg-gray-100 p-1 sm:p-2 rounded-lg">
              <span className="text-sm font-medium text-dark-black px-2 sm:px-0">Gold Price Per Gram:</span>
              <div className="flex items-center">
                <span className="text-sm font-medium text-primary px-1">{toCurrency(pricePerGram(spotPrice.gold))}</span>
                {spotPrice.goldChange < 0 ? (
                  <MdArrowDropDown size={24} fill="#FF2A2A" />
                ) : (
                  <MdArrowDropUp size={24} fill="#27D24A" />
                )}
                <span className={`text-sm font-medium ${spotPrice.goldChange < 0 ? "text-danger" : "text-success"}`}>
                  {Math.abs(pricePerGram(spotPrice.goldChange))}
                </span>
              </div>
            </div>
            {/* -------------------- Gold PRICE PER KILO -------------------- */}
            <div className="flex flex-col sm:flex-row items-center h-full bg-gray-100 p-1 sm:p-2 rounded-lg">
              <span className="text-sm font-medium text-dark-black px-2 sm:px-0"> Gold Price Per Kilo: </span>
              <div className="flex items-center sm:px-1">
                <span className="text-sm font-medium text-primary sm:px-1">{toCurrency(pricePerKilo(spotPrice.gold))}</span>
                {spotPrice.goldChange < 0 ? (
                  <MdArrowDropDown size={24} fill="#FF2A2A" />
                ) : (
                  <MdArrowDropUp size={24} fill="#27D24A" />
                )}
                <span className={`text-sm font-medium ${spotPrice.goldChange < 0 ? "text-danger" : "text-success"}`}>
                  {Math.abs(pricePerKilo(spotPrice.goldChange))}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full px-2 flex-col gap-4 text-lg font-semibold text-dark-black lg:flex-row'>
          <div className='flex flex-col text-start items-start justify-start'>
            Spot Price Chart
            <span className='flex w-full flex-row items-center justify-start gap-4 text-[14px]'>
              <button
                className={`${
                  selected === 'Silver'
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
                className={`${
                  selected === 'Gold'
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
            <span className='px-2 text-start'>Historical Spot Prices</span>
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
            <div className=' flex flex-row items-center justify-end mr-2 w-24'>
              <Link
                className='rounded-lg bg-black px-1 py-1 text-center text-[15px] text-white focus:bg-primary'
                href={'/new-launched'}
                passHref
              >
                View All
              </Link>
            </div>
          </div>
          {/* -------------------- PRODUCTS LISTING -------------------- */}
          <div
            className='flex w-full flex-row items-start justify-start gap-2 px-3 py-2'>
            <AllproductsOnSpot />
          </div>
        </div>
        <div className='flex flex-col items-start justify-start gap-2 px-2 text-start'>
          <h2 className='text-[18px] pt-1 font-bold text-dark-black'>
            Gold Spot Price & Charts
          </h2>
          <span className='w-fit whitespace-normal text-[14px] font-normal'>
            In gold trading, the spot price of gold is used worldwide.
            Determining the spot price of gold is crucial to monitoring the
            demand for the precious metal as an investment. Numerous factors,
            including the need for safe havens and speculation in the futures
            market, cause it to fluctuate constantly.
          </span>
          <h2 className='text-[18px] font-bold text-dark-black'>
            {' '}
            What is the Gold Spot Price?
          </h2>
          <span className='w-fit whitespace-normal text-[14px] font-normal'>
            The current market value for the immediate purchase and sale of one
            ounce of gold is the spot price. Since market conditions and current
            events significantly impact the buying and selling of gold, it is
            imperative to stay informed about performance indicators like these,
            as the spot price of gold is subject to frequent fluctuations.
            Although troy ounces are the standard unit of measurement for gold
            prices, any quantity can be purchased or sold. Since most gold
            markets use real-time prices expressed in US dollars, the cost of an
            ounce of gold is the same everywhere. As a result, gold spot prices
            are universal.
          </span>
        </div>
        <h3 className='px-2 text-[15px] font-bold  text-dark-black'>
          FAQs
        </h3>
            <div className="sm:flex flex-row">
              <div className="w-full md:w-1/2">
                <Accordion type="single" collapsible className="w-full flex flex-col">
                  <AccordionItem value="item-1"className="w-full lg:w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(1)}
                className={`border-b-0 text-[15px] transition-colors ${
                  open === 1 ? 'text-primary hover:!text-primary' : ''
                }`}>What is Gold Bullion?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                Pure and precious metals are called &quot;bullion&quot;. Gold
                bullion are gold bars or coins made mainly for investment
                purposes. Typically, pure gold content ranges from .995 to .9999
                in gold bars and coins. Their costs and the current price of
                gold are determined by their weight and purity.
                </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(3)}
                className={`border-b-0 text-[15px] transition-colors ${
                  open === 3 ? 'text-primary hover:!text-primary' : ''
                }`}>Why Does the Price of Gold Fluctuate?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                Due to an increase in the number of currency units in
                circulation, which are greater in number than the amount of gold
                ounces available, prices tend to rise. Excessive money printing
                leads to more currency units chasing the same number of gold
                ounces. However, when governments behave responsibly and live
                within their means, the price of gold tends not to perform as
                well as other assets. The availability of mines also impacts
                gold prices. The demand for gold jewelry and geopolitical unrest
                are a few aspects of fluctuating gold prices.
                </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(5)}
                className={`border-b-0 text-[15px] transition-colors text-start ${
                  open === 5 ? 'text-primary hover:!text-primary' : ''
                }`}>What is the Highest Price of Gold in History?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                The highest price of gold in history was $2,171.36 per ounce,
                reached on December 1, 2023. Also, the COVID-19 pandemic caused
                the economic downturn, due to which the world recorded the
                highest gold price on March 8, 2022, of US $ 2,074.60.
                </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(7)}
                className={`border-b-0 text-[15px] transition-colors ${
                  open === 7 ? 'text-primary hover:!text-primary' : ''
                }`}>What are bid and ask prices?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                The highest amount a buyer is willing to pay when buying shares
                of stock is referred to as the &quot;bid&quot;. On the other
                hand, the &quot;ask&quot; is the lowest amount at which a seller
                is ready to part with their commodity or shares. The difference
                between the ask or &quot;offer&quot; price and the bid
                price—typically lower—is called the spread.
                </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(9)}
                className={`border-b-0 text-[15px] transition-colors ${
                  open === 9 ? 'text-primary hover:!text-primary' : ''
                }`}>What Causes the Gold Prices to Go Up?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                Gold sold for about $20 per ounce a century ago. Gold prices per
                ounce have recently fluctuated between $1,200 and $1,900. That
                represents a significant nominal advancement over the previous
                century. The price of gold skyrocketed and is not without
                justification. This is also because of the significant currency
                depreciation used to quote gold prices. Regarding purchasing
                power, gold&apos;s value does not fluctuate over time.
                Naturally, there are significant cycles in which fluctuations in
                supply and demand, speculative activity, or manipulation can
                cause gold&apos;s value to fluctuate significantly. But gold,
                the ultimate form of money, will eventually reflect this
                depreciation by rising in value as long as the US Dollar Index
                continues declining.
                </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="w-full md:w-1/2">
                <Accordion type="single" collapsible className="w-full flex flex-col">
                  <AccordionItem value="item-2"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(2)}
                className={`border-b-0 text-[15px] transition-colors ${
                  open === 2 ? 'text-primary hover:!text-primary' : ''
                }`}>What is a Troy Ounce?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                The troy ounce is the accepted unit of measurement for the
                weight of precious metals. This metric is equivalent to
                31.1034768 grams. So 1 troy ounce of gold means 31.1034768 grams
                of gold.
                </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(4)}
                className={`border-b-0 text-[15px] transition-colors ${
                  open === 4 ? 'text-primary hover:!text-primary' : ''
                }`}>What is Gold Bullion Worth?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                Several factors can influence the value of gold - for instance,
                its form, weight, and price, which are constantly changing. The
                determination of gold&apos;s worth hinges on these crucial
                elements.
                </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(6)}
                className={`border-b-0 text-[15px] transition-colors text-start ${
                  open === 6 ? 'text-primary hover:!text-primary' : ''
                }`}>Which is a Better Investment Gold or Silver?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                For those who prefer stability over volatility, gold may be a
                better option because it is less prone to the wild fluctuations
                of the silver market. Investing in gold might be prudent to
                safeguard your wealth from inflation over an extended period.
                Conversely, silver could be a good choice for investors prepared
                to take on more significant risks in exchange for higher
                returns.
                </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8"className="w-full px-2 py-1 border-blue-gray-100 mb-2 rounded-[15px] px-4 h-fit shadow-[4px_4px_4px_rgba(0,0,0,0.10)]" >
                <AccordionTrigger onClick={() => handleOpen(8)}
                className={`border-b-0 text-[15px] transition-colors ${
                  open === 8 ? 'text-primary hover:!text-primary' : ''
                }`}>What Affects Spot Price?</AccordionTrigger>
                <AccordionContent className='pt-0 text-base font-normal'>
                Because so many things can influence the market, spot price
                constantly fluctuates. Among these elements are:
                <ul className='list-inside list-disc md:list-disc'>
                  <li className='font-bold'>
                    Politics:
                    <p className='font-thin'>
                      A political power shift has the power to affect spot
                      prices significantly; people tend to gravitate toward
                      safe-haven assets like precious metals if they are worried
                      about elections and policy changes, particularly those
                      that impact money.
                    </p>
                  </li>
                  <li className='font-bold'>
                    Economic developments:
                    <p className='font-thin'>
                      The federal government may alter interest rates, taxes, or
                      other policies. Spot prices may also fluctuate, and the
                      public&apos;s perception of the economy may shift from
                      favorable to unfavorable.
                    </p>
                  </li>
                  <li className='font-bold'>
                    Supply and demand:
                    <p className='font-thin'>
                      {' '}
                      the spot price of gold may fall during periods of excess
                      production and low demand, and the spot price may rise
                      during periods of limited production and high demand.
                    </p>
                  </li>
                  <li className='font-bold'>
                    Environmental conditions:
                    <p className='font-thin'>
                      environmental disasters and drastic changes also affect
                      the economy, which results in the fluctuation in spot
                      prices.
                    </p>
                  </li>
                </ul>
                </AccordionContent>
                 </AccordionItem>
                </Accordion>
              </div>
            </div>
            
      </div>
    </>
  );
};
export default goldChart;

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
  chartData: chartData[];
}> = async (res): Promise<any> => {
  const response = await getChartData(3, 'month', false);
  const chartData = response.data;
  const title = data.site.gold.page;
  const description = data.site.gold.description;
  return {
    props: {  title , description , chartData  }
  };
};
