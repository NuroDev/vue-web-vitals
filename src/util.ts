import type { RouteLocationNormalized } from "vue-router";
import { Metric } from "web-vitals";

import { sendToAnalytics } from "./providers/vercel";

export interface IContext {
  /**
   * Full router path
   */
  fullPath: string;
  /**
   * Current `location` href
   */
  href: string;
}

export interface IVitalsOptions {
  /**
   * Prints metrics in the console (Optional)
   *
   * @default false
   */
  debug: boolean;

  /**
   * Vitals provider (Optional)
   *
   * @default "vercel"
   */
  provider: string;

  /**
   * The vue router's current coute
   */
  route: RouteLocationNormalized;
}

/**
 * Generate all metrics for a single route & send them to the providers endpoint
 *
 * @param {IVitalsOptions} options
 */
export async function webVitals(options: IVitalsOptions) {
  const context: IContext = {
    fullPath: options.route.fullPath,
    href: location.href,
  };

  try {
    // const { sendToAnalytics } = await import(
    //   `./providers/${options.provider}`
    // );

    // NOTE: Dynamically importing these may cause issues down the line. May be worth switching to fixed imports
    const { getCLS, getFID, getLCP, getTTFB, getFCP } = await import(
      "web-vitals"
    );

    getCLS((metric: Metric) => sendToAnalytics(context, metric, options));
    getFCP((metric: Metric) => sendToAnalytics(context, metric, options));
    getFID((metric: Metric) => sendToAnalytics(context, metric, options));
    getLCP((metric: Metric) => sendToAnalytics(context, metric, options));
    getTTFB((metric: Metric) => sendToAnalytics(context, metric, options));
  } catch (error) {
    console.error(`[vue-web-vitals]:`, error);
  }
}

/**
 * Send a single metric to the provided analytics endpoint
 *
 * @param {string} url - URL endpoint to send the metrics to.
 * @param {string} [body] - Body metric data to send.
 */
export const send = (url: string, body?: any) => {
  if (navigator.sendBeacon) return navigator.sendBeacon(url, body);

  try {
    fetch(url, {
      body,
      credentials: "omit",
      keepalive: true,
      method: "POST",
    });
  } catch (error) {
    console.error(`[vue-web-vitals]:`, error);
  }
};
