import data from '@/data';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function TermsAndConditions({title , description ,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const termsData = data.site.termsConditions;
  const ogTag = data.OGTags.home;
  const canonicalUrl = data.WEBSITEUrl + '/terms-conditions';
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const terms = [
    {
      id: 1,
      heading: 'About the Website',
      paragraph: [
        <div key={1}>
          <p className='py-2 text-xs text-slate-600 md:text-sm '>
            Our advanced technology compares prices from 30 trusted dealers,
            covering over 250 popular precious metals products. You&apos;ll have
            accurate information to make informed buying decisions and find
            incredible deals and the lowest prices.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 2,
      heading: 'We Do Not Sell Products',
      paragraph: [
        <div key={2}>
          <p className='py-2 text-xs text-slate-600 md:text-sm'>
            This Platform is a product search engine for gold, silver, and other
            precious metals coins, bars, and other bullion. We don&apos;t own or
            control the products available on the Platform, as they are owned
            and provided by third-party “Dealers/Retailers”. The
            dealers/retailers are responsible for the products and contracts,
            and their terms and privacy policies apply to your purchase. Any
            interaction with a dealer through our Platform is at your own risk,
            and Bullion Mentor is not liable for any issues with your product.
            We have no control over the products or their prices. For more
            information, please visit our Home Page and FAQs
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 3,
      heading: 'Cookies',
      paragraph: [
        <div key={3}>
          <p className='pt-2 text-xs text-slate-600 md:text-sm'>
            We employ the use of cookies. By accessing Bullion Mentor, you
            agreed to use cookies in agreement with the Bullion Mentor&apos;s
            Privacy Policy.
          </p>
          <p className='pt-1 text-xs text-slate-600 md:text-sm'>
            The website allows user-generated comments, which are not filtered
            or reviewed by Bullion Mentor prior to posting. The views and
            opinions expressed in the comments are solely those of the
            individuals who post them and do not represent Bullion Mentor or its
            affiliates. Bullion Mentor reserves the right to monitor and remove
            inappropriate or offensive comments. By posting comments, you
            warrant that you have the necessary licenses and consents, and that
            your comments do not infringe upon any intellectual property rights
            or contain unlawful or offensive material.
          </p>
          <p className='pt-1 pb-2 text-xs text-slate-600 md:text-sm'>
            Most interactive websites use cookies to let us retrieve the
            user&apos;s details for each visit. Our website uses cookies to
            enable the functionality of certain areas to make it easier for
            people visiting our website. Some of our affiliate/advertising
            partners may also use cookies.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 4,
      heading: 'License',
      paragraph: [
        <div key={4}>
          <p className='pt-2  text-xs text-slate-600 md:text-sm'>
            Bullion Mentor owns all intellectual property rights to this
            website, domain, trademark etc. Access to the website is for
            personal use only, subject to the specified restrictions. You are
            prohibited from republishing, selling, renting, sub-licensing,
            reproducing, duplicating, copying, or redistributing the content.
            All property rights, including copyrights, trademarks, and prices
            related to the extracted data belong to the respective third-party
            websites.
          </p>
          <p className='pt-1 text-xs text-slate-600 md:text-sm'>
            The website allows user-generated comments, which are not filtered
            or reviewed by Bullion Mentor prior to posting. The views and
            opinions expressed in the comments are solely those of the
            individuals who post them and do not represent Bullion Mentor or its
            affiliates. Bullion Mentor reserves the right to monitor and remove
            inappropriate or offensive comments. By posting comments, you
            warrant that you have the necessary licenses and consents, and that
            your comments do not infringe upon any intellectual property rights
            or contain unlawful or offensive material.
          </p>
          <p className='pt-1 pb-2 text-xs text-slate-600 md:text-sm'>
            You grant Bullion Mentor a non-exclusive license to use, reproduce,
            edit, and authorize others to use and reproduce your comments in any
            form or media.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 5,
      heading: 'iFrames',
      paragraph: [
        <div key={5}>
          <p className='py-2 text-xs text-slate-600 md:text-sm'>
            Without prior approval and written permission, you may not create
            frames around our Web Pages that alter in any way the visual
            presentation or appearance of our website.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 6,
      heading: 'Content Liability',
      paragraph: [
        <div key={6}>
          <p className='pt-2 text-xs text-slate-600 md:text-sm'>
            We are not liable for the content on your website. We do not claim
            ownership of the third party extracted data, content, or prices
            which remain the property of the relevant third-party websites. We
            make no guarantees regarding the accuracy, completeness, or
            reliability of the extracted data from third-party websites.
          </p>
          <p className='pt-1 pb-2 text-xs text-slate-600 md:text-sm'>
            We provide links to external websites on our platform for your
            ‘reference’. These websites are not under our control, and we are
            not responsible for their content, privacy policies, or procedures.
            Our terms do not govern your use of third-party websites accessed
            through our platform. We recommend reading their terms and
            conditions before using them. You are responsible for ensuring that
            any links or software you choose to access are free from harmful
            elements like viruses or malware. Including any links does not imply
            our approval or affiliation with the content or owners of those
            websites.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 7,
      heading: 'Your Privacy',
      paragraph: [
        <div key={7}>
          <p className='py-2 text-xs text-slate-600 md:text-sm'>
            BullionMentor values your online privacy. Our goal is to make using
            the internet fun and safe. However, we gather specific data from our
            users, and you need to be aware of how it will be utilized, as
            described in this policy statement.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 8,
      heading: 'Reservation of Rights',
      paragraph: [
        <div key={8}>
          <p className='pt-2 text-xs text-slate-600 md:text-sm'>
            BullionMentor has the right to request the deletion of any links to
            the site. Upon our request, you must immediately take down all
            links. Bullion Mentor reserves the right to list or feature
            dealers/retailers on our website. The listing of dealers/retailers
            on Bullion Mentor does not constitute an endorsement or guarantee of
            their products or services.
          </p>
          <p className='pt-1 pb-2 text-xs text-slate-600 md:text-sm'>
            We may modify this disclaimer and our linking policy at any time.
            You agree to comply with these linking guidelines by placing a link
            to our website.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 9,
      heading: 'Removal of Links from Our Website',
      paragraph: [
        <div key={9}>
          <p className='pt-2 text-xs text-slate-600 md:text-sm'>
            If any Dealer/Retailer wishes to be excluded from our listings on
            Bullion Mentor, they may submit a written request to us, upon which
            we can cease their listing within a specified timeframe. Once a
            dealer&apos;s listing is removed from Bullion Mentor, their products
            and services will no longer be displayed or promoted on our website.
          </p>
          <p className='pt-1 text-xs text-slate-600 md:text-sm'>
            If you find any offensive links on our website, you can contact us
            via{' '}
            <Link
              href='mailto:info@bullionmentor.com'
              className='cursor-pointer font-semibold text-blue-500'
              prefetch={false}
            >
              info@bullionmentor.com
            </Link>{' '}
            and inform us anytime. We will consider requests to remove links,
            but we are not obligated to or so or to respond to you directly.
          </p>
          <p className='pt-1 text-xs text-slate-600 md:text-sm'>
            We take great care to provide accurate information on this website;
            however, we cannot guarantee its completeness or accuracy.
          </p>
          <p className='pt-1 pb-2 text-xs text-slate-600 md:text-sm'>
            While we strive to keep the website up-to-date, we cannot assure its
            availability or guarantee that the material on the website remains
            current. Nonetheless, we remain committed to continuously improving
            our website to provide valuable and informative content to our
            users.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 10,
      heading: 'Disclaimer',
      paragraph: [
        <div key={10}>
          <p className='pt-2 text-xs text-slate-600 md:text-sm'>
            We exclude all representations, warranties, and conditions regarding
            our website and its use to the maximum extent permitted by
            applicable law. This disclaimer does not limit or exclude our or
            your liability - for death or personal injury, fraud or fraudulent
            misrepresentation, or any liability prohibited by applicable law.
            The limitations and prohibitions of liability stated in this section
            and throughout this disclaimer are subject to the preceding
            paragraph and govern all liabilities arising under the disclaimer,
            including those arising from contracts, torts, and breaches of
            statutory duty. We will not be liable for any loss or damage of any
            nature as long as the website and its information and services are
            provided free of charge.
          </p>
          <p className='pt-1 pb-2 text-xs text-slate-600 md:text-sm'>
            The limitations and prohibitions of liability stated in this section
            and throughout this disclaimer are subject to the preceding
            paragraph and govern all liabilities arising under the disclaimer,
            including those arising from contracts, torts, and breaches of
            statutory duty. We will not be liable for any loss or damage of any
            nature as long as the website and its information and services are
            provided free of charge.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 11,
      heading: 'Changes to the Terms',
      paragraph: [
        <div key={11}>
          <p className='py-2 text-xs text-slate-600 md:text-sm'>
            {' '}
            We may modify these Terms if required by regulations or if there are
            changes in our business practices. Reviewing the Terms each time you
            use our Platform to stay updated with the latest version is
            important. The current Terms on the Platform will govern your use of
            our platform. We recommend regularly checking the posted Terms to
            stay informed about relevant updates.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 12,
      heading: 'You Agree to Protect Us',
      paragraph: [
        <div key={12}>
          <p className='py-2 text-xs text-slate-600 md:text-sm'>
            By agreeing to these Terms, you agree to indemnify and hold Bullion
            Mentor, its officers, directors, employees, and agents harmless from
            any claims, actions, demands, losses, damages, fines, penalties, or
            expenses, including legal and accounting fees, arising from your
            violation of laws or third-party rights, your breach of these Terms
            or related documents, or your usage of our platform. For more
            information, please visit our Home Page and FAQs.
          </p>
          <br />
        </div>
      ]
    },
    {
      id: 13,
      heading: 'Hyperlinking to our Content',
      paragraph: [
        <div key={13}>
          <p className='pt-2 text-xs text-slate-600 md:text-sm'>
            Links to websites run by companies other than Bullion Mentor may be
            found on our platform. These links are just available for your
            reference. Such websites are not within our control, and we are not
            liable for their content, privacy policies, or other operating
            procedures. Your use of any third-party website that you visit
            through our Platform is not subject to these Terms. We advise you to
            carefully read any extra terms and conditions before using any
            third-party website as they may apply to your use of such websites.
          </p>
          <p className='pt-1 pb-2 text-xs text-slate-600 md:text-sm'>
            Furthermore, it is your responsibility to take precautions to make
            sure that any links you choose to click on or software you download
            (whether from our Platform or other websites) is free of defects and
            other potentially destructive software, such as viruses, worms,
            Trojan horses, and other malware. Our provision of links to these
            websites does not imply any approval or affiliation with the content
            or owners of such websites.
          </p>
          <br />
        </div>
      ]
    }
  ];
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:type' content={ogTag.type} />
        <meta property='og:url' content={canonicalUrl} key={canonicalUrl} />
        <link rel='canonical' href={canonicalUrl} />
      </Head>
      {hydrated === true ? (
        <div>
          <div className='h-10 w-full bg-gradient-to-b from-secondary'></div>
          <div className='container mx-auto -mt-10 pt-2 text-[13px] leading-[19.5px] text-[#5c5b5b]'>
            <div>
              <h1 className='mt-10 text-xl font-semibold text-dark-black md:mt-14 md:text-2xl'>
                Terms and Conditions
              </h1>
              <section className='mt-4'>
                <p className='text-xs font-thin text-slate-600 md:text-sm'>
                  <span className='font-semibold'>
                    Welcome to Bullion Mentor,
                  </span>{' '}
                  where we prioritize your positive experience. Please take a
                  moment to familiarize yourself with our terms and conditions,
                  which govern the use of our website. You agree to these terms
                  and conditions by visiting our website. Enjoy your visit!
                </p>
              </section>
              <p className='pt-2 text-xs text-slate-600 md:text-sm'>
                At Bullion Mentor, we are committed to providing exceptional
                services to all our customers. Kindly read and accept our terms
                and conditions before placing an order.
              </p>
              <p className='pt-1 text-xs text-slate-600 md:text-sm'>
                We are dedicated to transparency and integrity. We never create
                or endorse our individual sales and discounts. Instead, we
                obtain bullion data from reputable dealers and online retailers
                to facilitate these offers for the benefit of our users. All the
                data extracted from third-party websites is intended solely for
                informational purposes on our platform.
              </p>
              <p className='pt-1 text-xs text-slate-600 md:text-sm'>
                Our precious metals spot prices are updated every four hours,
                providing our users with reliable and up-to-date information and
                the best deals.
              </p>
              <p className='pt-1 text-xs text-slate-600 md:text-sm '>
                Subscribing to Bullion Mentor or using our website constitutes
                your consent to the terms of this agreement. In addition, we
                reserve the right to modify the terms and conditions or make
                changes to the website without prior notice through any means.
                Your continued use of the website indicates your acceptance of
                the most recent version of the terms and conditions with legal
                obligations
              </p>
              <br />
              <br />
              {terms.map((value) => (
                <div key={value.id} className='-mt-3'>
                  <h2 className='text-xs font-medium text-black md:text-base '>
                    {value.id + '. ' + value.heading}
                  </h2>
                  <p className='text-xs font-thin text-slate-600 md:text-sm'>
                    {value.paragraph.map((paragraphs) => paragraphs)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  title: any;
  description: any;
}> = async () => {
  const title = data.site.termsConditions.page;
  const description = data.site.termsConditions.description;
  return {
    props: {
      title,
      description,
    }
  };
};

