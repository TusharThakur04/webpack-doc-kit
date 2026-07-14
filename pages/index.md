---
title: Webpack
layout: home
mdx: true
---

<Hero>

```bash displayName="npm"
npm install webpack webpack-cli --save-dev
```

```bash displayName="yarn"
yarn add webpack webpack-cli --dev
```

```bash displayName="pnpm"
pnpm add webpack webpack-cli -D
```

```bash displayName="bun"
bun add -d webpack webpack-cli
```

```bash displayName="deno"
deno add npm:webpack npm:webpack-cli
```

</Hero>

<ConfigSection>

```javascript displayName="webpack.config.js"
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

</ConfigSection>
