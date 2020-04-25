/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

function CTAButton({ type, href, text }) {
  const btnClassType = type === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <a className="btn {btnClassType} scrollto" href={href}>
      {text}
    </a>
  );
}

export default CTAButton;
