import Link from 'next/link';

const Header = () => (
  <header className="header">
    <div className="branding">
      <div className="container-fluid position-relative py-3">
        <div className="logo-wrapper">
          <div className="site-logo">
            <Link href="/">
              <a href="/">
                <img className="logo-icon mr-2" src="assets/images/logo.png" alt="logo" />
              </a>
            </Link>
            <div className="title-container">
              <Link href="/">
                <a href="/" className="logo-text title">
                  DeliverEase
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
