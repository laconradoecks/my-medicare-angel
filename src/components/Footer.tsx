import { Link } from 'react-router-dom';
import { footerColumns, legalLinks } from '@/data/nav';
import { site } from '@/config/site';
import { LogoMark } from './Icons';

/** Layout follows designs/footer-reference.html. */
export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot">
        <div className="brandblock">
          <div className="brandrow">
            <LogoMark size={34} tone="light" />
            <span className="footbrand">{site.name}</span>
          </div>
          <p className="footdesc">{site.blurb}</p>
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
            </div>
          ))}

          <div className="footcol">
            <span className="h">Visit or call</span>
            <address>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </address>
            <span>{site.hours}</span>
            {/* A link rather than the reference's plain text, so it is tappable
                on a phone. Styled to match the surrounding text. */}
            <a href={site.phone.href}>{site.phone.display}</a>
          </div>
        </div>
      </div>

      <div className="wrap legalrow">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>
          {legalLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </span>
      </div>

      <div className="wrap legal">{site.disclaimer}</div>
    </footer>
  );
}
