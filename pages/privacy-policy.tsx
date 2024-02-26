import Link from 'next/link';
export default function PrivacyPolicy() {
  const information = [
    {
      id: 1,
      title: 'Personal Information',
      description: `We may collect personally identifiable information, such as your name, email address, postal  code, and phone 
            number when voluntarily provided by you. This information is collected when you create an account, subscribe to our newsletter, 
            or submit inquiries or feedback through our website. We never share your any kind of personal information with any entity. 
            We only use it to make our website performance better through your preferences.`
    },
    {
      id: 2,
      title: 'Non-Personal Information',
      description: `We may collect non-personal information about your usage of the Site. This information may include your IP address, 
            browser type, operating system, the pages you visit, and other similar data. We collect this information through the use of 
            cookies and other tracking technologies. This non-personal information is used to analyse trends, administer the Site, track user 
            movements, and gather demographic information.`
    },
    {
      id: 3,
      title: 'Cookies',
      description: (
        <p>
          We may use cookies and similar tracking technologies on our Site.
          Cookies are small files that are stored on your computer or device
          when you visit our websites. These cookies help us improve your
          browsing experience, analyse Site usage, and personalise content. You
          can manage your cookie preferences through your browser settings. Data
          Security: We take appropriate measures to protect the security of your
          personal and demographic information and ensure it is treated
          securely. Use Of Information{''}{' '}
          <Link
            href='/'
            target='_blank'
            className='font-semibold text-blue-500'
            prefetch={false}
          >
            BullionMentor.com&nbsp;
          </Link>
          may utilize any information voluntarily provided by our users (while
          logging in, subscribing newsletters, or interacting with our surveys,
          etc.) to enhance their experience across our network of sites. This
          may involve incorporating interactive or personalized elements on the
          sites or curating future content based on the interests of our users.
          We respect your privacy by not monitoring the specific articles you
          read. Instead, our focus lies in assessing the overall performance of
          each page. This approach enables us to enhance our service and cater
          to your needs more effectively. As part of our efforts to understand
          user interests, we analyze search terms entered in our Search function
          among various other measures. However, we do not track the search
          terms of individual users.
        </p>
      )
    }
  ];
  const content = [
    {
      id: 1,
      title: 'Sharing of the information',
      description: [
        <div key={1}>
          <p>
            {' '}
            <Link
              href='/'
              target='_blank'
              className='font-semibold text-blue-500'
              prefetch={false}
            >
              BullionMentor.com&nbsp;
            </Link>
            makes use of the data mentioned above to both better understand our
            audience&apos;s demographics and to customise our content according
            to their needs. To keep our service free, this is necessary. We
            might also disclose user data in order to comply with by the law, to
            respond to a court order, to protect the rights, property, or safety
            of our users or the general public.
          </p>
        </div>
      ]
    },
    {
      id: 2,
      title: 'Security',
      description: [
        <div key={2}>
          <p>
            {' '}
            <Link
              href='/'
              target='_blank'
              className='font-semibold text-blue-500'
              prefetch={false}
            >
              BullionMentor.com&nbsp;
            </Link>
            offers an industry-standard firewall and password protection
            system-enabled secure data network. Only those with permission can
            access the data submitted by our visitors, and our security and
            privacy rules are regularly reviewed and improved.
          </p>
        </div>
      ]
    },
    {
      id: 3,
      title: 'Your consent',
      description: [
        <div key={3}>
          <p>
            You allow{' '}
            <Link
              href='/'
              target='_blank'
              className='font-semibold text-blue-500'
              prefetch={false}
            >
              BullionMentor.com&nbsp;
            </Link>
            your consent to collect and use this information if you use this
            website. You may always be informed about the data we gather, how we
            use it, and when we disclose it by visiting this page, where we will
            post any changes to our privacy policy.
          </p>
        </div>
      ]
    }
  ];
  return (
    <div className='container mx-2 flex flex-col text-dark-black'>
      <h1 className='semibold relative mt-7 w-full pt-5 text-xl font-medium md:mt-10 md:text-2xl lg:mt-2'>
        Privacy policy
      </h1>
      {/* ******************** INTRODUCTION ******************** */}
      <h2 className='semibold mt-2 text-sm font-medium  md:text-base'>
        Introduction
      </h2>
      <article className='mt-2 text-xs text-slate-600 md:text-sm lg:text-sm'>
        Thank you for using Bullion Mentor. We are committed to safeguarding
        your privacy and ensuring the security of your personal information. By
        accessing or using our Site, you consent to the practices outlined in
        this Privacy Policy.
      </article>
      {/* ******************** INFORMATION WE COLLECT ******************** */}
      {information.map((values: any, index: number) => (
        <div key={index}>
          <h2 className='semibold mt-2 text-sm font-medium md:mt-2 md:text-base'>
            {values.title}
          </h2>
          <article className='mt-2 text-xs text-slate-600 md:text-sm lg:text-sm'>
            {values.description}
          </article>
        </div>
      ))}
      {/* ******************** SECONDARY TEXT ******************** */}
      {content.map((values: any, index: number) => (
        <div key={index}>
          <h2 className='semibold mt-2 text-sm font-medium md:text-base'>
            {values.title}
          </h2>
          <article className='mt-2 text-xs text-slate-600 md:text-sm lg:text-sm'>
            {values.description}
          </article>
        </div>
      ))}
    </div>
  );
}
