import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { paths } from '@/routes';
import { site } from '@/config/site';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page does not exist. Start from the homepage or talk to a licensed agent."
        noindex
      />
      <div className="wrap notfound">
        <h1>We could not find that page</h1>
        <p style={{ fontSize: 19, maxWidth: 560 }}>
          The link may be out of date. Start again from the homepage, or call us on{' '}
          <a href={site.phone.href}>
            <strong>{site.phone.display}</strong>
          </a>{' '}
          and a real person will point you in the right direction.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link className="btn btn-amber" to={paths.home}>
            Back to homepage
          </Link>
          <Link className="btn btn-teal" to={paths.learn}>
            Medicare explained
          </Link>
        </div>
      </div>
    </>
  );
}
