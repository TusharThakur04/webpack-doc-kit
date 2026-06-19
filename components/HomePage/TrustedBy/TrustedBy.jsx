import styles from './index.module.css';

const companies = [
  { name: 'Vercel' },
  { name: 'Shopify' },
  { name: 'GitHub' },
  { name: 'Microsoft' },
  { name: 'Netflix' },
  { name: 'Airbnb' },
];

export default function TrustedBy() {
  return (
    <section className={styles.trustedSection}>
      <div className={styles.container}>
        <p className={styles.label}>TRUSTED BY</p>

        <div className={styles.logoGrid}>
          {companies.map((company, index) => (
            <div key={index} className={styles.logoItem}>
              <span className={styles.companyName}>{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
