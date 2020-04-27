/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

export default ({ pathname }) => (
  <header>
    <Link href="/login">
      <a style={{ marginRight: '20px' }}>Login</a>
    </Link>
    <Link href="/sample-auth-page">
      <a>Logged in status</a>
    </Link>
  </header>
);
