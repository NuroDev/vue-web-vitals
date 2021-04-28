import type { Metric } from "web-vitals";

import { IContext, IVitalsOptions, send } from "../util";

const VITALS_URL = "https://vitals.vercel-analytics.com/v1/vitals";

export function sendToAnalytics(
  context: IContext,
  metric: Metric,
  options: IVitalsOptions
) {
  const dsn: string | undefined = process.env.VERCEL_ANALYTICS_ID;
  if (!dsn || dsn === undefined)
    return console.error(
      `Metric DSN is undefined. 'VERCEL_ANALYTICS_ID' could not be found`
    );

  const body = {
    dsn,
    event_name: metric.name,
    href: context.href,
    id: metric.id,
    page: context.fullPath,
    value: metric.value.toString(),
  };

  if (options.debug) console.debug(metric.name, JSON.stringify(body, null, 4));

  // This content type is necessary for `sendBeacon`
  const blob: Blob = new Blob([new URLSearchParams(body).toString()], {
    type: "application/x-www-form-urlencoded",
  });

  send(VITALS_URL, blob);
}
