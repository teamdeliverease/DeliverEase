/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

//TODO DSE: text-orange is not working
export default ({ href, text }) => (
  <a className="text-orange font-weight-bold" target="_blank" href={href}>
    {text}
  </a>
);
