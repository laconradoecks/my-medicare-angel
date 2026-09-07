import { Link } from 'react-router-dom';
import { footerColumns } from '@/data/nav';
import { site } from '@/config/site';

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot">
        <div style={{ maxWidth: 320 }}>
          <div className="footbrand">{site.name}</div>
          <div className="footmeta">{site.blurb}</div>
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
            <span>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </span>
            <span>{site.hours}</span>
            <a href={site.phone.href}>{site.phone.display}</a>
          </div>
        </div>
      </div>
      <div className="wrap legal">{site.disclaimer}</div>
    </footer>
  );
}
