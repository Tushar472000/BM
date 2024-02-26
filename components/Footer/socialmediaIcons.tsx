import React from 'react';
import { BiLogoFacebook, BiLogoPinterest } from 'react-icons/bi';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { AiFillYoutube } from 'react-icons/ai';
import Link from 'next/link';

export default function SocialMediaIcons() {
  return (
    <div className='flex flex-row items-center justify-center px-2 py-2 lg:justify-end'>
      <div className='grid grid-cols-6 justify-between gap-4 bg-secondary-dark sm:gap-10 lg:justify-end 2xl:gap-10 '>
        <span className='flex w-full justify-end text-white hover:text-[#3b5998]'>
          <Link
            href={'https://www.facebook.com/bullionmentor'}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='facebook'
            passHref
          >
            <BiLogoFacebook size={20} />
          </Link>
        </span>
        <span className='flex w-full flex-row justify-end  text-white hover:text-[#000000]'>
          <Link
            href={'https://twitter.com/BullionMen85361'}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='twiter'
            passHref
          >
            <FaXTwitter size={20} />
          </Link>
        </span>
        <span className='flex w-full flex-row justify-end  text-white hover:text-purple-600'>
          <Link
            href={'https://www.instagram.com/bullion.mentor'}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='instagram'
            passHref
          >
            <FaInstagram size={20} />
          </Link>
        </span>
        <span className='flex w-full flex-row justify-end  text-white hover:text-[#E60023]'>
          <Link
            href={'https://www.pinterest.com/bullionmentor/'}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='pinterest'
            passHref
          >
            <BiLogoPinterest size={20} />
          </Link>
        </span>
        <span className='flex w-full flex-row justify-end text-white hover:text-[#0072b1]'>
          <Link
            href={
              'https://www.linkedin.com/company/100737830/admin/feed/posts/'
            }
            target='_blank'
            rel='noopener noreferrer'
            aria-label='linkedin'
            passHref
          >
            <FaLinkedinIn size={20} />
          </Link>
        </span>
        <span className='flex w-full flex-row justify-center text-white hover:text-[#CD201F]'>
          <Link
            href={'https://www.youtube.com/channel/UCNaOKCzd07JjzXpwWALE3Yg'}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='youtube'
            passHref
          >
            <AiFillYoutube size={20} />
          </Link>
        </span>
      </div>
    </div>
  );
}
