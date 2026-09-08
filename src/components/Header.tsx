import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { paths } from '@/routes';
import { navGroups } from '@/data/nav';
import { site } from '@/config/site';
import { BurgerIcon, LogoMark } from './Icons';

export default function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  // Close both menus whenever the route changes.
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  // Click outside / Escape closes the desktop dropdowns.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const groupIsActive = (group: (typeof navGroups)[number]) =>
    group.items.some((i) => pathname === i.to || pathname.startsWith(`${i.to}/`));

  return (
    <header className="site">
      <div className="nav" ref={navRef}>
        <Link className="brand" to={paths.home} aria-label={`${site.name} — home`}>
          <LogoMark size={42} />
          <span className="brand-name">{site.name}</span>
        </Link>

        <nav className="links" aria-label="Main">
          {navGroups.map((group) => (
            <div key={group.label} className={`dd${openGroup === group.label ? ' open' : ''}`}>
              <button
                type="button"
                className={`navlink${groupIsActive(group) ? ' on' : ''}`}
                aria-expanded={openGroup === group.label}
                aria-haspopup="true"
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
              >
                {group.label} <span className="caret">▾</span>
              </button>
              <div className="dd-menu">
                {group.items.map((item) => (
                  <Link key={item.to} to={item.to}>
                    <strong>{item.label}</strong>
                    <span>{item.blurb}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link className="btn btn-teal" to={paths.quote}>
            Get a Free Quote
          </Link>
        </nav>

        <button
          type="button"
          className="burger"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <BurgerIcon />
        </button>
      </div>

      <div id="mobile-menu" className={`mobilemenu${mobileOpen ? ' open' : ''}`}>
        <NavLink to={paths.home}>Home</NavLink>
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="mm-label">{group.label.toUpperCase()}</div>
            {group.items.map((item) => (
              <NavLink key={item.to} to={item.to} style={{ display: 'block' }}>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
        <NavLink to={paths.quote} style={{ color: 'var(--amber)' }}>
          Get a Free Quote
        </NavLink>
      </div>
    </header>
  );
}
