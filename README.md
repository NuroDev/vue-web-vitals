# 📊 vue-web-vitals

A small plugin to track [core web vitals](https://web.dev/vitals/) in vue projects

[![License](https://img.shields.io/badge/-MIT-f56565.svg?longCache=true&style=for-the-badge)](https://github.com/nurodev/vue-web-vitals/blob/main/LICENSE)
[![Vue 3.x](https://img.shields.io/badge/-vue%203.x-3eaf7c.svg?longCache=true&style=for-the-badge)](https://vuejs.dev)
[![Version](https://img.shields.io/npm/v/vue-web-vitals?label=%20&style=for-the-badge)](https://www.npmjs.com/package/vue-web-vitals)
[![Downloads](https://img.shields.io/npm/dm/vue-web-vitals?label=%20&logo=Docusign&logoColor=white&style=for-the-badge)](https://www.npmjs.com/package/vue-web-vitals)

## 🦄 Usage

Install the dependency
```bash
npm install --save-dev vue-web-vitals # yarn add -D vue-web-vitals
```

Add it to wherever you create/access your vue-router instance
```typescript
// main.ts
import { createRouter } from 'vue-router';
import { useVitals } from 'vue-web-vitals';

const router = createRouter({
    // ...
});

useVitals({
    /// Prints metrics in the console (Optional) [Default: false]
    debug: false,

    /// Pass the app router instance to vitals to catch route changes (Required)
    router,

    /// URL endpoint to upload vital metric data (Optional) [Default: https://vitals.vercel-analytics.com/v1/vitals]
    url: 'https://vitals.vercel-analytics.com/v1/vitals',
});
```

## ⚠️ Requirements

Currently this plugin only supports Vue 3.x and vue-router 4.x


## ✨ Inspiration

[vercel/nuxt-plugin-vercel](https://github.com/vercel/nuxt-plugin-vercel)
