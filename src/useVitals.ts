import { getCLS, getFCP, getFID, getLCP, getTTFB } from "web-vitals";

import type { Metric } from "web-vitals";

import type { IContext, ISendOptions, IVitalsOptions } from "./types";

const VITALS_URL = "https://vitals.vercel-analytics.com/v1/vitals";

export function useVitals({
  debug = process.env.NODE_ENV === "development" || false,
  route,
}: IVitalsOptions): void {
  const context: IContext = {
    fullPath: route.fullPath,
    href: location.href,
  };

  try {
    getFID((metric: Metric) => sendMetric({ context, metric, debug }));
    getTTFB((metric: Metric) => sendMetric({ context, metric, debug }));
    getLCP((metric: Metric) => sendMetric({ context, metric, debug }));
    getCLS((metric: Metric) => sendMetric({ context, metric, debug }));
    getFCP((metric: Metric) => sendMetric({ context, metric, debug }));
  } catch (error) {
    console.error("[Analytics]", error);
  }
}

function sendMetric({ context, debug, metric }: ISendOptions) {
  const speed: string =
    "connection" in navigator &&
    navigator["connection"] &&
    "effectiveType" in navigator["connection"]
      ? navigator["connection"]["effectiveType"]
      : "";

  const body = {
    dsn: process.env.VERCEL_ANALYTICS_ID as string,
    event_name: metric.name,
    href: context.href,
    id: metric.id,
    page: context.fullPath,
    speed,
    value: metric.value.toString(),
  };

  if (debug) console.debug(`${metric.name}:`, JSON.stringify(body, null, 4));

  // This content type is necessary for `sendBeacon`
  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: "application/x-www-form-urlencoded",
  });

  navigator.sendBeacon
    ? navigator.sendBeacon(VITALS_URL, blob)
    : fetch(VITALS_URL, {
        body: blob,
        credentials: "omit",
        keepalive: true,
        method: "POST",
      });
}
