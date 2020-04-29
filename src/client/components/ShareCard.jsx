import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const ShareCard = ({ message, content }) => {
  const router = useRouter();

  const handleMobileShare = async () => {
    const mobileShareContent = { ...content, url: `${window.location.href}${content.url}` };
    try {
      await navigator.share(mobileShareContent);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDesktopShare = async () => {
    router.push(content.url);
  };

  const handleShare = () => {
    if (navigator.share !== undefined) {
      handleMobileShare();
    } else {
      handleDesktopShare();
    }
  };

  return (
    <div className="confirmation-message mt-5 text-center">
      <h4 className="form-heading text-center">{message}</h4>
      <br />
      <h5 className="text-center">In the meantime, please spread the word!</h5>
      <button
        onClick={() => handleShare()}
        type="button"
        className="btn btn-success btn-submit mx-auto share-button mt-4"
      >
        Share DeliverEase
      </button>
    </div>
  );
};

ShareCard.propTypes = {
  message: PropTypes.string.isRequired,
  content: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShareCard;
