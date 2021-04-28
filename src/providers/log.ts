import type { Metric } from "web-vitals";

import { IContext } from "../util";

const eventListeners = [];
// @ts-ignore
window.onVitalEvent = (listener) => eventListeners.push(listener);

export function sendToAnalytics(
  context: IContext,
  metric: Metric,
  options: any
) {
  const event = {
    context,
    date: new Date(),
    metric,
    options,
  };

  eventListeners.forEach((listener) => listener(event));

  console.log("[vue-web-vitals]", metric.name, metric.value, context, {
    context,
    metric,
    options,
  });
}
