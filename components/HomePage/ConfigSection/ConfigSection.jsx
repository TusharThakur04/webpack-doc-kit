import { useState } from 'react';

import styles from './index.module.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ConfigSection() {
  const [activeSyntax, setActiveSyntax] = useState('js');

  const jsCode = `// webpack.config.js
    const path = require('path');
    
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      mode: 'production'
    };`;

  const mjsCode = `// webpack.config.mjs
    import path from 'path';
    import { fileURLToPath } from 'url';
    
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    
    export default {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      mode: 'production'
    };`;

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = activeSyntax === 'js' ? jsCode : mjsCode;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const configFeatures = [
    'Zero-config for common setups',
    'Tree-shaking out of the box',
    'Hot Module Replacement',
    'Long-term caching with content hashes',
  ];
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
          <div className={styles.codeWindow}>
            <div className={styles.codeTabs}>
              <button
                onClick={() => setActiveSyntax('js')}
                className={
                  activeSyntax === 'js' ? styles.activeTab : styles.inactiveTab
                }
              >
                webpack.config.js
              </button>
              <button
                onClick={() => setActiveSyntax('mjs')}
                className={
                  activeSyntax === 'mjs' ? styles.activeTab : styles.inactiveTab
                }
              >
                webpack.config.mjs
              </button>
            </div>

            <div className={styles.codeBody}>
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  backgroundColor: 'transparent',
                  margin: 0,
                  padding: 0,
                }}
              >
                {activeSyntax === 'js' ? jsCode : mjsCode}
              </SyntaxHighlighter>
            </div>

            <div className={styles.codeFooter}>
              <span className={styles.codeLang}>JavaScript</span>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {isCopied ? (
                  <>
                    <svg
                      className={styles.checkmarkSVG}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      className={styles.copySVG}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Copy to clipboard
                  </>
                )}
              </button>
            </div>
          </div>

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
}
