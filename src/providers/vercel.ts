import { logPrefix, getConnectionSpeed, send } from "../util";

import type { ISendOptions } from "../types";

const VERCEL_VITALS_URL = "https://vitals.vercel-analytics.com/v1/vitals";

export function sendToAnalytics({ context, debug, metric }: ISendOptions) {
  const { VERCEL_ANALYTICS_ID } = process.env;
  const speed = getConnectionSpeed();

  const body = {
    dsn: VERCEL_ANALYTICS_ID || "",
    event_name: metric.name,
    href: context.href,
    id: metric.id,
    page: context.fullPath,
    speed,
    value: metric.value.toString(),
  };

  if (debug)
    console.debug(logPrefix, metric.name, JSON.stringify(body, null, 4));

  // This content type is necessary for `sendBeacon`
  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: "application/x-www-form-urlencoded",
  });

  send(VERCEL_VITALS_URL, blob);
}
