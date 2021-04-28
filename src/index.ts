import type { RouteLocationNormalized, Router } from "vue-router";

import { webVitals } from "./util";

export interface IOptions {
  debug?: boolean;
  provider?: "log" | "vercel";
  router: Router;
}

export function useVitals(options: Partial<IOptions>): void {
  const {
    debug = process.env.NODE_ENV === "development",
    provider = "vercel",
    router,
  } = options;

  if (!router || router === undefined)
    throw new Error(`[vue-web-vitals]: Router instance is undefined`);

  router.isReady().then(() =>
    router.beforeEach(
      async (route: RouteLocationNormalized) =>
        await webVitals({
          debug,
          provider,
          route,
        })
    )
  );
}

export default useVitals;
