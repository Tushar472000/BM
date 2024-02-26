/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { chartData } from '@/interfaces/typeinterfaces';
import { getChartData } from '@/services/spot-prices';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { toCurrency, toPercent } from '@/utils/utilities';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type metalProps = {
  metal: string;
  currentSpotPrice: chartData;
  initialchartData: chartData[];
  initfrom: string;
  initto: string;
  initchange: number;
  initHigh: number;
  initlow: number;
};
const LineAreaChart = ({
  metal,
  currentSpotPrice,
  initialchartData,
  initfrom,
  initto,
  initchange,
  initHigh,
  initlow
}: metalProps) => {
  const [chartdata, setChartData] = useState(initialchartData);
  const [Number, setNumber] = useState(3);
  const [TimeFrame, setTimeFrame] = useState('month');
  const [initialdata, setInitialData] = useState(true);
  const [from, setFrom] = useState(initfrom);
  const [to, setTo] = useState(initto);
  const [high, setHigh] = useState(initHigh);
  const [low, setLow] = useState(initlow);
  const select = useSelector(selectUser)
  useEffect(() => {
    initFetch(Number, TimeFrame);
    metal === 'Silver'
      ? setHigh(Math.max(...chartdata.map((x) => x.silver)))
      : setHigh(Math.max(...chartdata.map((x) => x.gold)));
    metal === 'Silver'
      ? setLow(Math.min(...chartdata.map((x) => x.silver)))
      : setLow(Math.min(...chartdata.map((x) => x.gold)));
    if (TimeFrame == 'month' || TimeFrame == 'week') {
      setFrom(dayjs(chartdata.map((x) => x.dateNTime)[0]).format('MM/DD/YYYY'));
    } else {
      setFrom(chartdata.map((x) => x.dateNTime.replaceAll(' 00:00:00', ''))[0]);
    }
    if (currentSpotPrice.dateNTime !== '') {
      setTo(dayjs(currentSpotPrice.dateNTime).format('MM/DD/YYYY'));
     }  }, [metal, Number, TimeFrame]);

  const initFetch = async (Number: number, TimeFrame: string) => {
    setNumber(Number);
    setTimeFrame(TimeFrame);
    const response = await getChartData(Number, TimeFrame, false);
    const allreponse = [...response.data, currentSpotPrice];
    setChartData(allreponse);
  };
  return (
    <div className='sm:m-2 mt-2 flex h-fit flex-col items-center justify-center rounded-xl bg-gray-100 shadow-lg w-full'>
      <div className='mt-2 flex w-full flex-col justify-start text-[15px] font-semibold text-dark-black md:flex-row md:justify-between lg:text-[20px]'>
        <h2 className='flex w-full items-start px-1 py-1 text-start'>
          {metal} Spot Price Chart
        </h2>
        <ul className='flex h-fit w-full flex-row items-start justify-start gap-1 px-1 py-1 text-sm text-gray-700 md:items-end md:justify-end'>
          <li
            onClick={() => {
              initFetch(1, 'week'), setInitialData(false);
            }}
          >
            <button className='rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'>
              1W
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(2, 'week'), setInitialData(false);
            }}
          >
            <button className='rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'>
              2W
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(1, 'month'), setInitialData(false);
            }}
          >
            <button className='rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'>
              1M
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(3, 'month'), setInitialData(false);
            }}
          >
            <button
              className={
                initialdata
                  ? 'rounded-lg bg-primary px-1 sm:px-2 py-1 sm:py-2'
                  : 'rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'
              }
            >
              3M
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(6, 'month'), setInitialData(false);
            }}
          >
            <button className='rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'>
              6M
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(1, '1-Year'), setInitialData(false);
            }}
          >
            <button className='rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'>
              1Y
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(5, 'year'), setInitialData(false);
            }}
          >
            <button className='rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'>
              5Y
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(10, 'year'), setInitialData(false);
            }}
          >
            <button className='rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'>
              10Y
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(0, 'All'), setInitialData(false);
            }}
          >
            <button className='rounded-lg bg-gray-300 px-1 sm:px-2 py-1 sm:py-2 focus:bg-primary'>
              All
            </button>
          </li>
        </ul>
      </div>
      <div className='flex w-full flex-col items-start justify-between px-1 py-1 md:-mt-5'>
        <div className='flex flex-row items-center justify-start gap-5'>
          <span className='text-lg font-semibold text-primary'>
            USD $
            {metal === 'Silver'
              ? currentSpotPrice?.silver
              : currentSpotPrice?.gold}
          </span>
          <div className="flex items-center">
          {initchange < 0 ? (
            <MdArrowDropDown size={24} fill="#FF2A2A" />
            ) : (
            <MdArrowDropUp size={24} fill="#27D24A" />
            )}
            <span className={`text-sm font-semibold ${initchange < 0 ? "text-red-600" : "text-green-600"}`}>
              {Math.abs(initchange)}
            </span>
          </div>
        </div>
        <div className='items-between flex w-full flex-col justify-between  gap-2 md:flex-row'>
          <div className='flex flex-row items-start justify-start gap-2 lg:gap-8'>
          <span className='text-sm font-medium text-gray-700'>
            Bid ${select.spotPrices && metal === 'Silver' ? (select.spotPrices.silverBid || 'N/A') : (select.spotPrices && select.spotPrices.goldBid || 'N/A')}
           </span>


            <span className='text-sm font-medium text-gray-700'>
               Ask ${select.spotPrices && metal === 'Silver' ? (select.spotPrices.silver || 'N/A') : (select.spotPrices && select.spotPrices.gold || 'N/A')}
            </span>

            <div className='text-sm font-medium text-gray-700 flex gap-1 items-center text-center'>
              Change Percent
              <span className={`flex items-center space-x-1 ${metal === "Silver" ? (select.spotPrices.silverChangePercent >= 0 ? 'text-green-600' : 'text-red-600') : (select.spotPrices.goldChangePercent >= 0 ? 'text-green-600' : 'text-red-600')}`}>
                {metal === "Silver" ? 
                  (select.spotPrices.silverChangePercent > 0 ? <MdArrowDropUp size={16} fill="#27D24A" /> : <MdArrowDropDown size={16} fill="#FF2A2A" />)
                  :
                  (select.spotPrices.goldChangePercent > 0 ? <MdArrowDropUp size={16} fill="#27D24A" /> : <MdArrowDropDown size={16} fill="#FF2A2A" />)
                }
                {toPercent(metal === "Silver" ? Math.abs(select.spotPrices.silverChangePercent) : Math.abs(select.spotPrices.goldChangePercent))}%
              </span>
            </div>


          </div>
          <div className='flex flex-row items-end justify-end gap-2 whitespace-normal text-sm font-medium'>
            From{' '}
            <span className='relative bg-gray-300 text-gray-700'>
              {from.replaceAll('/', '-')}
            </span>
            To{' '}
            <span className='relative bg-gray-300 text-gray-700'>
              {to.replaceAll('/', '-')}
            </span>
          </div>
        </div>
      </div>
      <div className='flex h-fit w-full items-start justify-start px-1 py-1'>
        <Suspense
          fallback={
            <section className='h-[200px] items-start bg-gray-100 w-full sm:w-[350px] md:h-[300px] 2xl:w-[1050px]'></section>
          }
        >
          <Line
            className='h-[200px] items-start bg-gray-100 sm:w-[700px] md:h-[300px] 2xl:w-[1050px]'
            data={{
              labels:
                TimeFrame == 'week' ||
                  TimeFrame == 'month' ||
                  (TimeFrame === 'year' && Number === 1)
                  ? chartdata
                    .filter((x) => x.dateNTime)
                    .map((x) => dayjs(x.dateNTime).format('D MMM'))
                  : chartdata
                    .filter((x) => x.dateNTime)
                    .map((x) => x.dateNTime),
              datasets: [
                {
                  label: `${metal} Spot Prices`,
                  fill: true,
                  pointRadius: 0,
                  backgroundColor: (context: ScriptableContext<'line'>) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgb(255, 175, 71,1)');
                    gradient.addColorStop(1, 'rgb(255, 175, 71,0)');
                    return gradient;
                  },
                  borderColor: 'rgb(255, 175, 71)',
                  borderWidth: 2,
                  data:
                    metal === 'Silver'
                      ? chartdata.filter((x) => x.silver).map((x) => x.silver)
                      : chartdata.filter((x) => x.gold).map((x) => x.gold)
                }
              ]
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              scales: {
                x: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    color: 'black',
                    maxTicksLimit: 15,
                    padding: 1,
                    font: {
                      size: 10
                    }
                  }
                },
                y: {
                  grid: {
                    display: true
                  },
                  ticks: {
                    color: 'black',
                    padding: 1,
                    font: {
                      size: 10
                    }
                  }
                }
              }
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};
export default LineAreaChart;
