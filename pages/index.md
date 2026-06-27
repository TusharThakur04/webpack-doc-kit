---
layout: home
mdx: true
---

<ConfigCodeBlock>

```javascript displayName="webpack.config.js"
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};
```

```javascript displayName="webpack.config.mjs"
// webpack.config.mjs
import path from 'path';

export default {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(import.meta.dirname, 'dist'),
  },
  mode: 'production',
};
```

```typescript displayName="webpack.config.ts"
// webpack.config.ts
import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};

export default config;
```

</ConfigCodeBlock >
