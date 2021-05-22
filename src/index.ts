import { getCLS, getFCP, getFID, getLCP, getTTFB } from "web-vitals";

import { logPrefix } from "./util";

import type {
  IContext,
  IOptions,
  IWebVitalsOptions,
  SendToAnalytics,
} from "./types";

/**
 * Generate metric data & hand the generated data over to the `sendMetric` function to submit the data to the chosen provider
 *
 * @param {SendToAnalytics} sendMetric - Provider specific send function that will handle the data provided & send it to the chosen provider
 * @param {IContext} context - Current route context to handle the full path / href
 * @param {boolean} debug - Debug log metric data to the console
 */
function sendToProvider(
  sendMetric: SendToAnalytics,
  context: IContext,
  debug: boolean
): void {
  try {
    getFID((metric) => sendMetric({ context, debug, metric }));
    getTTFB((metric) => sendMetric({ context, debug, metric }));
    getLCP((metric) => sendMetric({ context, debug, metric }));
    getCLS((metric) => sendMetric({ context, debug, metric }));
    getFCP((metric) => sendMetric({ context, debug, metric }));
  } catch (error) {
    console.error(logPrefix, error);
  }
}

/**
 * Takes the the provided options & uses them to generate the metric data which is then sent to the chosen vitals provider
 *
 * @param {boolean} options.debug - Debug log metric data to the console
 * @param {provider} options.provider - The chosen web vitals provider to send the metric data to
 * @param {RouteLocationNormalized} options.route - The current / active route to generate & submit vitals data for
 */
async function webVitals({
  debug,
  provider,
  route,
}: IWebVitalsOptions): Promise<void> {
  const context: IContext = {
    fullPath: route.fullPath,
    href: location.href,
  };

  switch (provider) {
    case "vercel":
      const { sendToAnalytics } = await import("./providers/vercel");
      sendToProvider(sendToAnalytics, context, debug);
  }
}

/**
 * Track core web vitals in a Vue.js project
 *
 * @param {boolean} [options.debug=NODE_ENV === "development" || false] - Debug log metric data to the console
 * @param {Provider} [options.provider=vercel] - The provider to submit your metric data to
 * @param {Router} options.router - Vue router instance
 */
export function useVitals({
  debug = process.env.NODE_ENV === "development" || false,
  provider = "vercel",
  router,
}: IOptions) {
  router.isReady().then(() => {
    router.beforeResolve((route) =>
      webVitals({
        debug,
        provider,
        route,
      })
    );
    router.afterEach((route) =>
      webVitals({
        debug,
        provider,
        route,
      })
    );
  });
}

export default useVitals;
