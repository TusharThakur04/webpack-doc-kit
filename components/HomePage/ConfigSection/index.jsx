import styles from './index.module.css';

const configFeatures = [
  'Zero-config for common setups',
  'Tree-shaking out of the box',
  'Hot Module Replacement',
  'Long-term caching with content hashes',
];

export default ({ codeBlock }) => {
  return (
    <section className={styles.configSection}>
      <div className={styles.container}>
        <div className={styles.configHeader}>
          <p className={styles.preTitle}>CONFIGURATION</p>
          <h2 className={styles.title}>
            Sensible defaults. Configurable when you need it.
          </h2>
          <p className={styles.subtext}>
            A single config file is enough for most projects. Compose loaders to
            transform any input; reach for plugins when behavior is non-trivial.
          </p>
        </div>

        <div className={styles.configGrid}>
          {/* rendering the code block described at root index.md*/}
          {codeBlock}
          <div className={styles.features}>
            <h3 className={styles.featuresTitle}>Loaders for any input</h3>
            <p className={styles.featuresText}>
              Through loaders, modules can be CommonJS, AMD, ES6 modules, CSS,
              Images, JSON, Coffeescript, LESS — and your custom stuff.
            </p>

            <ul className={styles.checkList}>
              {configFeatures.map((feature, index) => (
                <li key={index} className={styles.checkItem}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
