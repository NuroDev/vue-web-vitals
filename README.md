# 📊 vite-plugin-vercel

A small plugin to track [core web vitals](https://web.dev/vitals/) in Vite projects via Vercel Analytics

[![License](https://img.shields.io/badge/-MIT-f56565.svg?longCache=true&style=for-the-badge)](https://github.com/nurodev/vite-plugin-vercel/blob/main/LICENSE)
[![Vite](https://img.shields.io/badge/-vite%202.x-3eaf7c.svg?longCache=true&style=for-the-badge)](https://vitejs.dev)
[![Version](https://img.shields.io/npm/v/vite-plugin-vercel?label=%20&style=for-the-badge)](https://www.npmjs.com/package/vite-plugin-vercel)
[![Downloads](https://img.shields.io/npm/dm/vite-plugin-vercel?label=%20&logo=Docusign&logoColor=white&style=for-the-badge)](https://www.npmjs.com/package/vite-plugin-vercel)

## 🦄 Usage

Install the dependency
```bash
npm install --save-dev vite-plugin-vercel # yarn add -D vite-plugin-vercel
```

Add it to your Vite config
```typescript
// vite.config.ts
import Vercel from 'vite-plugin-vercel';

export default defineConfig({
    plugins: [
        Vercel(),
    ],
});
```

## 🔧 Configuration

```typescript
export default defineConfig({
    plugins: [
        ViteSplitbee({
            /// Prints metrics in the console (Optional) [Default: false]
            debug: false,
        }),
    ],
});
```

## ⚠️ Requirements

Currently this plugin only supports Vite 2.x


## ✨ Inspiration

[vercel/nuxt-plugin-vercel](https://github.com/vercel/nuxt-plugin-vercel)
