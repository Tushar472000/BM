import FormWrapper from '@/components/ModalForm/FormWrapper';
import Input from '@/components/ModalForm/Input';
import { getDealers, requestProduct } from '@/services/spot-prices';
import { FormEvent, useEffect, useState } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getTopProducts } from '@/services/spot-prices';
import { GetTopProductsBy } from '@/interfaces/typeinterfaces';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';

export default function RequestProduct({
  topProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user = useSelector(selectUser);
  const [view, setView] = useState<'detailed' | 'grid'>('grid');
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('');
  const [metalName, setMetalName] = useState('');
  const [weight, setWeight] = useState('');
  const [weightChange, setweightChange] = useState(false);
  const [click, setClick] = useState(false);
  const [customerId, setCustomerId] = useState(0);
  const [dealers, setDealers] = useState<
    Awaited<ReturnType<typeof getDealers>>
  >([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  useEffect(() => {
    if (user.isLoggedin === true) {
      setCustomerId(user.user.id);
    } else {
      setCustomerId(0);
    }
    const initFetch = async () => {
      setStatus('loading');
      try {
        const res = await fetch(`/api/dealers`);

        const isJson = res.headers
          .get('content-type')
          ?.includes('application/json');

        const data: Awaited<ReturnType<typeof getDealers>> | null = isJson
          ? await res.json()
          : null;

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        setDealers(data ?? []);
        setStatus('success');
      } catch (error) {
        setError((error as Error)?.message || 'Api Error');
        setStatus('error');
      }
    };

    initFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productName || !email || !weight || !metalName) {
      setClick(true);
    } else {
      requestProduct(email, productName, metalName, weight, customerId);
    }
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className='h-20 w-full bg-gradient-to-b from-secondary '></div>
        <div className='mx-2 -mt-6 flex rounded-2xl bg-white shadow-xl sm:mx-0 sm:ml-28 sm:mr-28 sm:flex-row sm:bg-white md:mx-0 md:ml-28 md:mr-28 md:flex-row md:bg-white lg:ml-28 lg:mr-28 lg:flex-row lg:bg-primary'>
          <div className='-ml-8 w-[110%] rounded-l-2xl sm:-ml-8 sm:w-full sm:bg-white md:w-full md:bg-white lg:w-[65%] lg:bg-white xl:w-[55%] 2xl:w-[60%]'>
            <FormWrapper
              title='Request a product'
              description='Fill the following details to request a product'
              footer={''}
            >
              <form
                onSubmit={submitHandler}
                className='flex w-[110%] flex-col gap-2 sm:w-[120%] md:w-[110%]  xl:mr-6 xl:w-full 2xl:mr-16'
              >
                <div className='h-20'>
                  <Input
                    label='Email Id'
                    type='email'
                    id='emailId'
                    name='emailId'
                    placeholder='eg: john@gmail.com'
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {click === true ? (
                    <p
                      className={
                        !email || !email.match(validRegex)
                          ? 'text-right text-xs text-red-600'
                          : 'invisible'
                      }
                    >
                      {!email
                        ? 'Email is required'
                        : !email.match(validRegex)
                        ? 'Please enter a valid email'
                        : null}
                    </p>
                  ) : null}
                </div>
                <div className='h-20'>
                  <Input
                    label='Product name'
                    type='text'
                    id='name'
                    name='name'
                    placeholder='eg: Coins'
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                  />
                  {click === true ? (
                    <p
                      className={
                        !productName
                          ? 'text-right text-xs text-red-600'
                          : 'invisible'
                      }
                    >
                      {!productName ? 'Product name is required' : null}
                    </p>
                  ) : null}
                </div>
                <div className='h-20'>
                  <Input
                    label='Metal'
                    type='text'
                    id='metal'
                    name='metal'
                    placeholder='eg: Gold'
                    onChange={(e) => {
                      setMetalName(e.target.value);
                    }}
                  />
                  {click === true ? (
                    <p
                      className={
                        !metalName
                          ? 'text-right text-xs text-red-600'
                          : 'invisible'
                      }
                    >
                      {!metalName ? 'Metal name is required' : null}
                    </p>
                  ) : null}
                </div>
                <div className='mb-4 h-20'>
                  <Input
                    label='Enter weight'
                    type='text'
                    id='weight'
                    name='weight'
                    placeholder='eg: 10g'
                    onChange={(e) => {
                      setWeight(e.target.value);
                      setweightChange(true);
                    }}
                  />
                  {weightChange === true || click === true ? (
                    <p
                      className={
                        !weight
                          ? 'text-right text-xs text-red-600'
                          : 'invisible'
                      }
                    >
                      {!weight ? 'Weight is required' : null}
                    </p>
                  ) : null}
                </div>

                <button
                  type='submit'
                  className='flex w-32 items-center justify-center rounded-full bg-primary py-2.5 text-white'
                >
                  Submit
                </button>
              </form>
            </FormWrapper>
          </div>
        </div>
        <div className='mx-20 flex flex-col gap-4 sm:grid sm:grid-rows-1 md:grid md:grid-rows-1 lg:grid lg:grid-cols-5'>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  topProducts: Awaited<ReturnType<typeof getTopProducts>>;
}> = async ({ query }) => {
  const getBy = query.getBy as GetTopProductsBy | undefined;
  const searchKeyword = query.search as string | undefined;

  const topProducts = await getTopProducts(getBy, searchKeyword);

  return {
    props: {
      topProducts: topProducts
    }
  };
};
