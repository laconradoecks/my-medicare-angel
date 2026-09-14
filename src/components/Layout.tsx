import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { site } from '@/config/site';

/** Restores the top of the page on navigation, as the prototype's go() did. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a className="skiplink" href="#main">
        Skip to content
      </a>
      {/* Sits above the sticky header, so it scrolls away rather than taking up
          space on every screen. The full disclaimer stays in the footer. */}
      <div className="govbar" role="note">
        {site.govNotice}
      </div>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
