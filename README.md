# 📊 vue-web-vitals

A small plugin to track [core web vitals](https://web.dev/vitals/) in vue projects

[![License](https://img.shields.io/badge/-MIT-f56565.svg?longCache=true&style=for-the-badge)](https://github.com/nurodev/vue-web-vitals/blob/main/LICENSE)
[![Vue 3.x](https://img.shields.io/badge/-vue%203.x-3eaf7c.svg?longCache=true&style=for-the-badge)](https://v3.vuejs.org)
[![Vue-router 4.x](https://img.shields.io/badge/-vue%203.x-3eaf7c.svg?longCache=true&style=for-the-badge)](https://next.router.vuejs.org/)
[![Version](https://img.shields.io/npm/v/vue-web-vitals?label=%20&style=for-the-badge)](https://www.npmjs.com/package/vue-web-vitals)
[![Downloads](https://img.shields.io/npm/dm/vue-web-vitals?label=%20&logo=Docusign&logoColor=white&style=for-the-badge)](https://www.npmjs.com/package/vue-web-vitals)

## 🦄 Usage

Install the dependency

```bash
npm install --save vue-web-vitals

# OR

yarn add vue-web-vitals
```

Add it to wherever you create/access your vue-router instance

```typescript
// main.ts
import { createRouter } from "vue-router";
import { useVitals } from "vue-web-vitals";

const router = createRouter({
  // ...
});

useVitals({
  /// Log metrics in the console (Optional) [Default: `true` if running in development]
  debug: false,

  /// Analytics provider (Optional) [Default: 'vercel']
  provider: "vercel",

  /// Vue Router instance (Required)
  router,
});
```

## ⚠️ Requirements

Currently this module only supports Vue 3.x and vue-router 4.x.

## ✨ Inspiration

[nuxt-community/web-vitals-module](https://github.com/nuxt-community/web-vitals-module)
[isabella232/nuxt-plugin-vercel](https://github.com/isabella232/nuxt-plugin-vercel)
