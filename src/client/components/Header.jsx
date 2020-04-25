/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

export default ({ pathname }) => (
  <header>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : undefined}>Home</a>
    </Link>{' '}
    <Link href="/about">
      <a className={pathname === '/about' ? 'is-active' : undefined}>About</a>
    </Link>
  </header>
);
