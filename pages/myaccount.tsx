import EmptyAccount from '@/components/EmptyAccount';
import Spinner from '@/components/Spinner';
import Notify from '@/components/userAccount/Notify';
import PersonalDetails from '@/components/userAccount/PersonalDetail'
import UpdatePassword from '@/components/userAccount/UpdatePassword'
import { selectUser } from '@/features/userSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
export default function UserInformation() {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false)
  const user = useSelector(selectUser);
  useEffect(() => {
    setHydrated(true)
  }, [])
  useEffect(() => {
    setLoading(true)
    if (user.isLoggedin === true) {
      setTimeout(() => setLoading(false), 15000);
    }
  }, [user.isLoggedin])
  if (hydrated === false) {
    return <Spinner />
  }
  if (user.isLoggedin === true && !user.user.isGoogleUser) {
    return (
      <div className="flex flex-col h-full w-full mx-auto container text-dark-black">
        {/* ******************* HEADER ******************* */}
        <div>
          <h1 className='semibold relative mt-7 md:mt-10 lg:mt-6 w-full pt-4 text-xl font-medium md:text-2xl'>My Account</h1>
          <article className='text-sm leading-6 md:text-sm lg:text-base'>
            Hello, now you have access to a range of valuable features on our
            website, including real-time prices of bullion coins, latest offers,
            news and updates, from our team of experts will keep you up to date with
            the latest trends and developments in the bullion market.
          </article>
        </div>
        <div className="flex flex-col md:mt-4 lg:mt-3 lg:flex-row items-start gap-4">
          <PersonalDetails />
          <div className='flex w-full flex-col gap-3 lg:w-2/5'>
            <UpdatePassword />
            <Notify />
          </div>
        </div>
      </div>
    )
  }
  if (user.isLoggedin === true && user.user.isGoogleUser === true) {
    return (
      <div className="flex flex-col h-full w-full mx-auto container text-dark-black">
        {/* ******************* HEADER ******************* */}
        <div>
          <h1 className='semibold relative mt-7 md:mt-10 lg:mt-6 w-full pt-4 text-xl font-medium md:text-2xl'>My Account</h1>
          <article className='text-sm leading-6 md:text-sm lg:text-base'>
            Hello, now you have access to a range of valuable features on our
            website, including real-time prices of bullion coins, latest offers,
            news and updates, from our team of experts will keep you up to date with
            the latest trends and developments in the bullion market.
          </article>
        </div>
        <div className="flex flex-col md:mt-4 lg:mt-3 lg:flex-row items-start gap-4">
          <PersonalDetails />
          <div className='flex w-full flex-col gap-3 lg:w-2/5'>
            <Notify />
          </div>
        </div>
      </div>
    )
  }
  if (user.isLoggedin === false && loading === false) {
    return <EmptyAccount />
  }
  if (user.isLoggedin === false && loading === true) {
    return <Spinner />
  }
}
