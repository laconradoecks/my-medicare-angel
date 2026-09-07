import Seo from '@/components/Seo';
import { TitleBand } from '@/components/Blocks';
import { site } from '@/config/site';
import { paths } from '@/routes';

/**
 * The three legal pages. In the designs these carried a summary of what each
 * page will say plus a bracketed note that the real text lands before launch.
 * That structure is preserved so the copy can be dropped straight in.
 */

function LegalShell({
  crumb,
  title,
  children,
}: {
  crumb: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <TitleBand crumbs={[{ label: 'Home', to: paths.home }, { label: crumb }]} title={title} />
      <div className="wrap pagebody" style={{ maxWidth: 860 }}>
        <div className="parts prose" style={{ padding: 30 }}>
          {children}
        </div>
      </div>
    </>
  );
}

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={`How ${site.name} collects, uses and protects the information you send through this site.`}
      />
      <LegalShell crumb="Privacy Policy" title="Privacy Policy">
        <p style={{ margin: '0 0 16px' }}>
          This page will carry the full privacy policy: what information the site collects through
          its forms, how it is used to respond to enquiries, who it is shared with (licensed agents
          only), and how visitors can request their data or opt out of contact.
        </p>
        <p className="placeholder-note" style={{ margin: 0 }}>
          [Full policy text to be inserted before launch]
        </p>
      </LegalShell>
    </>
  );
}

export function Terms() {
  return (
    <>
      <Seo
        title="Terms of Use"
        description={`The terms that govern use of the ${site.name} website and its forms.`}
      />
      <LegalShell crumb="Terms of Use" title="Terms of Use">
        <p style={{ margin: '0 0 16px' }}>
          This page will carry the site’s terms: the educational nature of the content, that nothing
          here is a contract of insurance or legal advice, and the conditions of using the site and
          its forms.
        </p>
        <p className="placeholder-note" style={{ margin: 0 }}>
          [Full terms text to be inserted before launch]
        </p>
      </LegalShell>
    </>
  );
}

export function Disclaimers() {
  return (
    <>
      <Seo
        title="Medicare Disclaimers"
        description={`${site.name} is a non-governmental agency, not affiliated with or endorsed by the federal Medicare program.`}
      />
      <LegalShell crumb="Medicare Disclaimers" title="Medicare Disclaimers">
        <p style={{ margin: '0 0 16px' }}>
          {site.name} is a {site.parentCompany} company. We are a non-governmental agency, not
          affiliated with or endorsed by the United States government or the federal Medicare
          program.
        </p>
        <p style={{ margin: '0 0 16px' }}>
          We do not offer every plan available in your area. Currently we represent [X] organizations
          which offer [Y] products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your
          local State Health Insurance Program to get information on all of your options.
        </p>
        <p className="placeholder-note" style={{ margin: 0 }}>
          [The X and Y figures must reflect actual carrier contracts before launch]
        </p>
      </LegalShell>
    </>
  );
}
