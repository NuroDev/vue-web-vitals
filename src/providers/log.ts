import { logPrefix } from "../util";

import type { ISendOptions } from "../types";

export function logAnalytics({ context, debug, metric }: ISendOptions) {
  console.log(logPrefix, context, debug, metric);
}
