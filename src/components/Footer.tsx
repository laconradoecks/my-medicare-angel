import { Link } from 'react-router-dom';
import { footerColumns, legalLinks } from '@/data/nav';
import { site } from '@/config/site';
import { LogoMark } from './Icons';

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot">
        <div className="foot-brand-col">
          <div className="foot-brandrow">
            <LogoMark size={34} tone="light" />
            <span className="footbrand">{site.name}</span>
          </div>

          <p className="footmeta">{site.blurb}</p>

          <address className="foot-contact">
            <a className="phone" href={site.phone.href}>
              {site.phone.display}
            </a>
            <span>{site.hours}</span>
            <span>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </span>
          </address>
        </div>

        <div className="footcols">
          {footerColumns.map((col) => (
            <div className="footcol" key={col.heading}>
              <span className="h">{col.heading}</span>
              {col.links.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
              {col.cta && (
                <Link className="btn btn-amber foot-cta" to={col.cta.to}>
                  {col.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="wrap legal">
        <div className="legal-bar">
          <div className="legal-copy">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <nav className="legal-links" aria-label="Legal">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="legal-disclaimer">{site.disclaimer}</p>
      </div>
    </footer>
  );
}
