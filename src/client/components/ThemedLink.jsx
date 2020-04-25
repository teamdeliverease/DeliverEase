/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

export default (props) => (
  <a id={props.id} className="text-orange font-weight-bold" target="_blank" href={props.href}>
    {props.text}
  </a>
);
