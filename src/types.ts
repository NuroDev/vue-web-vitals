import type { RouteLocationNormalized } from "vue-router";
import type { Metric } from "web-vitals";

export interface IVitalsOptions {
  debug?: boolean;
  route: RouteLocationNormalized;
}

export interface IContext {
  fullPath: string;
  href: string;
}

export interface ISendOptions {
  context: IContext;
  debug: boolean;
  metric: Metric;
}
