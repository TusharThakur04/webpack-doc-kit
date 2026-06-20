import { useMemo } from 'react';
import classNames from 'classnames';
import Avatar from '@node-core/ui-components/Common/AvatarGroup/Avatar';
import BaseButton from '@node-core/ui-components/Common/BaseButton';

import SectionHeader from '../../SectionHeader/index.jsx';
import SponsorTier from '../../Sponsors/Tier/index.jsx';
import data from '#theme/sponsors' with { type: 'json' };

import styles from './index.module.css';

const OC_URL = 'https://opencollective.com/webpack';
const OC_BASE = 'https://opencollective.com';
const SPONSORS_URL = '/about/sponsors';

// Home page always ranks by monthly contribution — no sort toggle needed.
const METRIC = 'monthly';

// Max cards shown per tier before the overflow "· · · +N more" row appears.
const TIERS = [
  {
    tier: 'platinum',
    label: 'Platinum',
    price: '$2,500+ / month',
    cardSize: 'lg',
    limit: 4,
  },
  {
    tier: 'gold',
    label: 'Gold',
    price: '$500 / month',
    cardSize: 'md',
    limit: 6,
  },
  {
    tier: 'silver',
    label: 'Silver',
    price: '$100 / month',
    cardSize: 'sm',
    limit: 8,
  },
  {
    tier: 'bronze',
    label: 'Bronze',
    price: '$10 / month',
    cardSize: 'xs',
    limit: 12,
  },
];

// Max backer avatars shown before the overflow row appears.
const BACKER_LIMIT = 40;

const sortByMetric = (list, metric) =>
  [...list].sort((a, b) => b[metric].value - a[metric].value);

// Group all sponsors into tier buckets (mirrors SponsorsLayout logic).
const bucketSponsors = (sponsors, metric) => {
  const buckets = { platinum: [], gold: [], silver: [], bronze: [] };
  for (const sponsor of sortByMetric(sponsors, metric)) {
    const tier = sponsor[metric].tier;
    if (!tier) continue;
    buckets[tier].push(sponsor);
  }
  return buckets;
};

const initialsOf = name =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

// Randomise backer wall order on every render so no backer is permanently buried.
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// Shared overflow indicator

function SeeMore({ count, href, className }) {
  return (
    <div className={classNames(styles.seeMore, className)}>
      <span className={styles.dots} aria-hidden="true">
        · · ·
      </span>
      <a href={href} className={styles.seeMoreLink}>
        +{count} more (see all)
      </a>
    </div>
  );
}

export default function HomeSponsorSection() {
  const buckets = useMemo(() => bucketSponsors(data.sponsors, METRIC), []);
  const hasAnySponsor = TIERS.some(({ tier }) => buckets[tier].length > 0);

  if (!hasAnySponsor) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          eyebrow="Open source, sustained"
          title="The organizations powering webpack"
        />

        {/* ── Sponsor tiers ── */}
        <div className={styles.tiers}>
          {TIERS.map(({ tier, label, price, cardSize, limit }) => {
            const all = buckets[tier];
            if (!all.length) return null;

            const shown = all.slice(0, limit);
            const overflow = all.length - limit;

            return (
              <div
                key={tier}
                className={classNames(
                  styles.tierWrapper,
                  tier === 'platinum' && styles.platinumStage
                )}
              >
                <SponsorTier
                  tier={tier}
                  label={label}
                  price={price}
                  cardSize={cardSize}
                  sponsors={shown}
                  metric={METRIC}
                />
                {overflow > 0 && (
                  <SeeMore count={overflow} href={SPONSORS_URL} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Backer wall ── */}
        {data.backers?.length > 0 && (
          <div className={styles.backersSection}>
            <p className={styles.backersLabel}>And the people who chip in</p>
            <div className={styles.backerWall}>
              {CLIENT &&
                shuffle(data.backers)
                  .slice(0, BACKER_LIMIT)
                  .map(backer => (
                    <Avatar
                      key={backer.slug}
                      image={backer.imageUrl}
                      name={backer.name}
                      nickname={backer.slug}
                      fallback={initialsOf(backer.name)}
                      url={`${OC_BASE}/${backer.slug}`}
                    />
                  ))}
            </div>
            {data.backers.length > BACKER_LIMIT && (
              <SeeMore
                count={data.backers.length - BACKER_LIMIT}
                href={SPONSORS_URL}
                className={styles.backerSeeMore}
              />
            )}
          </div>
        )}

        <div className={styles.actions}>
          <BaseButton
            href={OC_URL}
            target="_blank"
            rel="noreferrer noopener"
            kind="primary"
          >
            Become a sponsor
          </BaseButton>
          <a href={SPONSORS_URL} className={styles.allSponsorsLink}>
            See all sponsors &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
