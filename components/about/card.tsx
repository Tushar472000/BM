import {
  Card,
  CardHeader,
  CardBody,
  Typography
} from '@material-tailwind/react';
import Link from 'next/link';
import Image from 'next/image';

export default function CardPage() {
  return (
    <div className='mt-14'>
      <div className='ml-10 grid max-w-fit grid-cols-4 gap-4'>
        <div className='mr-10'>
          <Card className='h-52 w-72'>
            <CardHeader floated={false} className='mx-24 mt-4 rounded-full'>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/round_ftief2.png'
                alt={''}
                height={100}
                width={100}
                className=''
                loading='lazy'
              />
            </CardHeader>
            <CardBody className='mt-5 text-center '>
              <Typography variant='h5' color='blue-gray'>
                Variety of Products
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className='...'>
          <Card className='h-52 w-72'>
            <CardHeader floated={false} className='mx-24 mt-4 rounded-full'>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/round_ftief2.png'
                alt={''}
                height={100}
                width={100}
                loading='lazy'
              />
            </CardHeader>
            <CardBody className='mt-5 text-center'>
              <Typography variant='h5' color='blue-gray'>
                Best Deals
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className='...'>
          <Card className='h-52 w-72'>
            <CardHeader floated={false} className='mx-24 mt-4 rounded-full'>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/round_ftief2.png'
                alt={''}
                height={100}
                width={100}
                loading='lazy'
              />
            </CardHeader>
            <CardBody className='mt-5 text-center'>
              <Typography variant='h5' color='blue-gray'>
                Lowest Price Online
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className='...'>
          <Card className='h-52 w-72'>
            <CardHeader floated={false} className='mx-24 mt-4 rounded-full'>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Icons/round_ftief2.png'
                alt={''}
                height={100}
                width={100}
                loading='lazy'
              />
            </CardHeader>
            <CardBody className='mt-5 text-center'>
              <Typography variant='h5' color='blue-gray'>
                Variety of Products
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className='mr-20 ml-20 mt-20 max-w-7xl'>
        <p className='indent-8'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, iste.
          Dicta enim possimus perspiciatis ea, suscipit ad! A fugit ipsa
          accusantium autem odio exercitationem quibusdam at repellendus. Modi,
          voluptatum tempora!Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Ad, iste. Dicta enim possimus perspiciatis ea, suscipit ad! A
          fugit ipsa accusantium autem odio exercitationem quibusdam at
          repellendus. Modi, voluptatum tempora!suscipit ad! A fugit ipsa
          accusantium autem odio exercitationem quibusdam at repellendus. Modi,
          voluptatum tempora!
        </p>
      </div>
      <section>
        <h4 className='mt-16 text-center text-3xl font-medium'>
          Shop Top Categories
        </h4>
        <div className='mt-10 ml-72 flex space-x-5'>
          <div>
            <Link href='/productListing' passHref prefetch={false}>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Images/silver-category_awpzof.png'
                alt='Silver American Eagle'
                className='h-52 w-52'
                loading='lazy'
              />
            </Link>
            <p className='mt-2 ml-6 w-40 text-center font-semibold'>Silver</p>
            <p className='mt-2 ml-6 w-40 text-center font-semibold leading-3 '>
              American Eagle
            </p>
          </div>
          <div>
            <Link href='/productListing' passHref prefetch={false}>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Images/gold-category_ioc1cj.png'
                alt='Gold American Eagle'
                className='h-52 w-52'
                loading='lazy'
              />
            </Link>
            <p className='mt-2 ml-6 w-40 text-center font-semibold'>Gold</p>
            <p className='mt-2 ml-6 w-40 text-center font-semibold leading-3 '>
              American Eagle
            </p>
          </div>
          <div>
            <Link href='/productListing' passHref prefetch={false}>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Images/silver-category_awpzof.png'
                alt='Silver American Eagle'
                className='h-52 w-52'
                loading='lazy'
              />
            </Link>
            <p className='mt-2 ml-6 w-40 text-center font-semibold'>Silver</p>
            <p className='mt-2 ml-6 w-40 text-center font-semibold leading-3 '>
              American Eagle
            </p>
          </div>
          <div>
            <Link href='/productListing' passHref prefetch={false}>
              <Image
                src='https://res.cloudinary.com/bullionmentor/image/upload/Images/gold-category_ioc1cj.png'
                alt='Gold American Eagle'
                className='h-52 w-52'
                loading='lazy'
              />
            </Link>
            <p className='mt-2 ml-6 w-40 text-center font-semibold'>Gold</p>
            <p className='mt-2 ml-6 w-40 text-center font-semibold leading-3 '>
              American Eagle
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
