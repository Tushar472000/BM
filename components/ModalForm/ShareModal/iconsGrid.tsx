import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import {
  FaSquareXTwitter,
  FaSquareFacebook,
  FaSquareWhatsapp
} from 'react-icons/fa6';
import { IconsGridProps } from '@/interfaces/typeinterfaces';

export default function IconsGrid({ shareUrl, product }: IconsGridProps) {
  const message =
    'Hey there,\nFind the best BULLION DEALS and RELIABLE DEALERS at\n';
  const productMesage = `Hey there,\nFind UNBEATABLE PRICES for the ${product} from REPUTABLE DEALERS now!\n`;

  // function to Share text on Whatsapp
  const handleWhatsappShare = () => {
    // const encodeURL = encodeURIComponent(shareUrl);
    if (product) {
      const encodedMessage = encodeURIComponent(productMesage + shareUrl);

      const shareLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(shareLink, '_blank');
    } else {
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message + shareUrl);

      // Create the shareable link
      const shareLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(shareLink, '_blank');
    }
  };
  const handleEmailShare = () => {
    if (product) {
      const shareLink = `mailto:?subject=${encodeURIComponent(
        productMesage
      )}&body=${encodeURIComponent(shareUrl)}`;
      window.open(shareLink, '_blank');
    } else {
      // Create the shareable link
      const shareLink = `mailto:?subject=${encodeURIComponent(
        message
      )}&body=${encodeURIComponent(shareUrl)}`;
      window.open(shareLink, '_blank');
    }
  };

  // function to Share text on Twitter
  const handleTwitterShare = () => {
    if (product) {
      const encodedMessage = encodeURIComponent(productMesage + shareUrl);
      const shareLink = `https://twitter.com/share?url=${encodedMessage}`;
      window.open(shareLink, '_blank');
    } else {
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message + shareUrl);

      // Create the shareable link
      const shareLink = `https://twitter.com/share?url=${encodedMessage}`;
      window.open(shareLink, '_blank');
    }
  };

  // function to Share text on LinkedIn
  const handleLinkedinShare = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const shareUrl = window.location.href;
    const isLinkedInApp = /LinkedIn/.test(navigator.userAgent); // Check if user agent contains "LinkedIn"

    if (product) {
      const encodedMessage = encodeURIComponent(productMesage + shareUrl);
      if (isMobile) {
        const shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`;
        window.location.href = shareLink;
      } else {
        const shareLink = `https://www.linkedin.com/feed/?shareActive&mini=true&text=${encodedMessage}`;
        window.open(shareLink, '_blank');
      }
    } else {
      const encodedMessage = encodeURIComponent(message + shareUrl);
      if (isMobile) {
        const shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`;
        window.location.href = shareLink;
      } else {
        const shareLink = `https://www.linkedin.com/feed/?shareActive&mini=true&text=${encodedMessage}`;
        window.open(shareLink, '_blank');
      }
    }
  };

  // function to Share text on Facebook
  const handleFacebookShare = () => {
    if (product) {
      // const encodedMessage = encodeURIComponent(productMesage + shareUrl);
      const shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
      window.open(shareLink, '_blank');
      console.log(shareUrl, ' facebook product url');
    } else {
      // const encodedMessage = encodeURIComponent(message + shareUrl);
      const shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`;
      window.open(shareLink, '_blank');
    }
  };

  return (
    <div className='grid grid-cols-3 flex-row justify-center gap-3 sm:flex sm:gap-10'>
      <button onClick={handleWhatsappShare}>
        <FaSquareWhatsapp size={45} fill='#25D366' />
      </button>
      <button onClick={handleFacebookShare}>
        <FaSquareFacebook size={45} fill='#3B5998' />
      </button>
      <button onClick={handleTwitterShare}>
        <FaSquareXTwitter size={45} fill='' />
      </button>
      <button onClick={handleLinkedinShare}>
        <FaLinkedin size={45} fill='#0072B1' />
      </button>
      <button onClick={handleEmailShare}>
        <FaEnvelope size={45} fill='#404040' />
      </button>
    </div>
  );
}
