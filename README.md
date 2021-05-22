# 📊 vue-web-vitals

A small plugin to track [core web vitals](https://web.dev/vitals/) in Vue.js projects

[![License](https://img.shields.io/badge/-MIT-f56565.svg?longCache=true&style=for-the-badge)](https://github.com/nurodev/vue-web-vitals/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/vue-web-vitals?label=%20&style=for-the-badge)](https://www.npmjs.com/package/vue-web-vitals)
[![Downloads](https://img.shields.io/npm/dm/vue-web-vitals?label=%20&logo=Docusign&logoColor=white&style=for-the-badge)](https://www.npmjs.com/package/vue-web-vitals)

## 🦄 Usage

Install the dependency

```bash
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

useVitals({ router });
```

## ⚠️ Requirements

This module currently has only been tested on Vue 3.x / Vue Router 4.x.
While the module MAY work, support is not guarenteed.

## ✨ Inspiration

[nuxt-community/web-vitals-module](https://github.com/nuxt-community/web-vitals-module)

[isabella232/nuxt-plugin-vercel](https://github.com/isabella232/nuxt-plugin-vercel)
