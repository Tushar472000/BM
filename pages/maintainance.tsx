import Image from 'next/image';

export default function Maintainance() {
  return (
    <div className='maintainanceBack bg-contain'>
      <div className=' grid grid-cols-3 '>
        <div className=' col-span-3 mx-auto px-2 md:px-0'>
          <div className='container mx-auto mt-40 h-auto w-auto rounded-2xl bg-white py-14 text-dark-black shadow-[0px_3px_3px_rgba(0,0,0,0.16)]'>
            <div className='container text-center'>
              {/* -------------------- BM LOGO -------------- */}
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Images-Icons/BM-logo_odoodw.png'
                className='mx-auto -mt-28 h-24 w-auto rounded-lg md:h-32 lg:-mt-32'
                alt='Banner'
                height={400}
                width={400}
              />

              {/* -------------------------- Comming Soon Card -------------------------------- */}
              <div>
                <Image
                  src='https://res.cloudinary.com/bullionmentor/image/upload/Images/coming-soon2.webp'
                  className='mx-auto h-40 w-auto pt-2 md:h-60'
                  alt='Banner'
                  height={410}
                  width={410}
                />
                <p className='pt-2 text-xl font-medium text-secondary lg:text-3xl'>
                  Get Ready to
                </p>
                <p className='text-xl font-medium text-secondary lg:text-3xl'>
                  Elevate Your Bullion Investments
                </p>
              </div>
              <p className='px-2 pt-4 pb-6'>
                The world of precious metals awaits you, and bullionmentor is
                here to be your guide. Get ready to embark on a journey of
                growth, knowledge and prosperity in the bullion market.
              </p>
            </div>
            <div className='-bottom-0 rounded-b-2xl bg-primary py-4'>
              <p className='pt-2 text-center text-xl font-medium text-secondary'>
                {/* Be informed as soon as we launch */}
              </p>

              <div className='grid grid-cols-4 justify-center gap-2 py-1 md:flex lg:py-2'>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-1'></div>
      </div>
    </div>
  );
}
