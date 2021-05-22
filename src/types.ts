import type { Router, RouteLocationNormalized } from "vue-router";
import type { Metric } from "web-vitals";

export type Provider = "log" | "vercel";

export interface IOptions {
  debug?: boolean;
  provider?: Provider;
  router: Router;
}

export interface IWebVitalsOptions {
  debug: boolean;
  provider: Provider;
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

export type SendToAnalytics = (options: ISendOptions) => void;
