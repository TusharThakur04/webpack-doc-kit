import styles from './index.module.css';

const Features = [
  {
    title: 'Module Federation',
    description:
      'Share code across separately-deployed applications at runtime. The micro-frontend pattern, done right.',
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Code splitting',
    description:
      "Split bundles by route, by demand, or by vendor. Load what's needed, when it's needed.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Tree shaking',
    description:
      'Static analysis of ES modules eliminates dead code in production builds — automatically.',
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Hot module replacement',
    description:
      'Edit and see the result without losing application state. The fastest feedback loop in JavaScript tooling.',
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        ></path>
      </svg>
    ),
  },
  {
    title: 'Persistent caching',
    description:
      "v5's filesystem cache makes warm builds near-instant. Cold builds are 38% faster than v4 on large monorepos.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        ></path>
      </svg>
    ),
  },
  {
    title: '11,000+ plugins',
    description:
      "The largest ecosystem in JavaScript tooling. If a build problem exists, there's a webpack plugin for it.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        ></path>
      </svg>
    ),
  },
];

export default () => {
  return (
    <section className={styles.whySection}>
      <div className={styles.container}>
        <div className={styles.whyHeader}>
          <p className={styles.preTitle}>WHY WEBPACK</p>
          <h2 className={styles.title}>Built for serious applications.</h2>
          <p className={styles.subtext}>
            The original module bundler. Used by Vercel, Shopify, GitHub,
            Microsoft, and most of the modern frontend stack.
          </p>
        </div>

        <div className={styles.gridContainer}>
          {Features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
