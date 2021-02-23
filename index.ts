import type { Metric } from 'web-vitals';
import type { Router } from 'vue-router';

export interface VitalsOptions {
	/**
	 * Prints metrics in the console (Optional)
	 * 
	 * @default false
	 */
	debug?: boolean;
	/**
	 * Pass the app router instance to vitals to catch route changes (Required)
	 */
	router: Router;
	/**
	 * URL endpoint to upload vital metric data (Optional)
	 * 
	 * @default 'https://vitals.vercel-analytics.com/v1/vitals'
	 */
	url?: string;
}

interface MetricOptions {
	/**
	 * Prints metrics in the console (Optional)
	 * 
	 * @default false
	 */
	debug: boolean;
	/**
	 * Current full route path to be sent (Required)
	 */
	full_path: string;
	/**
	 * The metric data being sent
	 */
	metric: Metric;
	/**
	 * URL endpoint to upload vital metric data (Optional)
	 * 
	 * @default 'https://vitals.vercel-analytics.com/v1/vitals'
	 */
	url: string;
}

/**
 * Send a single performance metric to the provided analytics endpoint
 * 
 * @param {MetricOptions} options
 */
const send_to_analytics = (options: MetricOptions): void => {
	const body = {
		dsn: process.env.VERCEL_ANALYTICS_ID, // TODO: Add as customizable parameter
		id: options.metric.id,
		page: options.full_path,
		href: location.href,
		event_name: options.metric.name,
		value: options.metric.value.toString(),
		speed: 'connection' in navigator && navigator['connection'] && 'effectiveType' in navigator['connection'] ? navigator['connection']['effectiveType'] : '',
	};

	if (options.debug) console.log(options.metric.name, JSON.stringify(body, null, 2));

	const blob = new Blob([
		new URLSearchParams(JSON.stringify(body)).toString(),
	], {
		// This content type is necessary for `sendBeacon`:
		type: 'application/x-www-form-urlencoded',
	});

	(navigator.sendBeacon && navigator.sendBeacon(options.url, blob)) || fetch(options.url, {
		body: blob,
		method: 'POST',
		credentials: 'omit',
		keepalive: true,
	});
}

export const useVitals = async (options: VitalsOptions): Promise<void> => {
	const {
		debug = false,
		router,
		url = 'https://vitals.vercel-analytics.com/v1/vitals',
	} = options;

	try {
		await router.isReady();
		router.beforeEach(async to => {
			try {
				const {
					getCLS,
					getFCP,
					getFID,
					getLCP,
					getTTFB,
				} = await import('web-vitals');

				const metric_options = (metric: Metric): MetricOptions => ({
					debug,
					full_path: to.fullPath,
					metric,
					url,
				});

				getCLS(metric => send_to_analytics(metric_options(metric)));
				getFCP(metric => send_to_analytics(metric_options(metric)));
				getFID(metric => send_to_analytics(metric_options(metric)));
				getLCP(metric => send_to_analytics(metric_options(metric)));
				getTTFB(metric => send_to_analytics(metric_options(metric)));
			} catch (err) {
				console.error('[vue-web-vitals]', err);
			}
		});
	} catch (error) {
		console.error(`[vue-web-vitals]`, error);
	}
};
