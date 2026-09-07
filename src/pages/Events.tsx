import { useState } from 'react';
import Seo from '@/components/Seo';
import { TitleBand } from '@/components/Blocks';
import { events } from '@/data/events';
import { paths } from '@/routes';
import { isDemoForms } from '@/config/site';

export default function Events() {
  const [saved, setSaved] = useState<string[]>([]);

  return (
    <>
      <Seo
        title="Free Medicare Seminars & Events"
        description="Join one of our free Medicare sessions: turning 65, annual enrollment, and Medicare for veterans."
      />
      <TitleBand
        crumbs={[{ label: 'Home', to: paths.home }, { label: 'Events & Seminars' }]}
        title="Free Medicare Seminars & Events"
        lede="Prefer to learn in a room with other people asking the same questions? Join one of our free sessions."
      />
      <div className="wrap pagebody">
        <div className="cards3">
          {events.map((event) => {
            const isSaved = saved.includes(event.id);
            return (
              <article className="card on-cream" key={event.id}>
                <div className="kicker">{event.when}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div style={{ fontSize: 16, color: 'var(--muted)' }}>{event.venue}</div>
                <button
                  type="button"
                  className="btn btn-teal"
                  disabled={isSaved}
                  onClick={() => setSaved((s) => [...s, event.id])}
                >
                  {isSaved
                    ? isDemoForms
                      ? 'Seat saved (demo)'
                      : 'Seat saved'
                    : 'Save My Seat'}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
