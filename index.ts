import type { Plugin } from 'vite';
import type { Metric } from 'web-vitals';

export interface VercelOptions {
	/**
	 * Prints metrics in the console (Optional)
	 * @default false
	 */
	debug?: boolean;
}

interface SendOptions {
	/**
	 * Whether to log metric details to the console (Optional)
	 * @default false
	 */
	debug?: boolean;
	/**
	 * Full path to the page route for metric being sent
	 */
	full_path: string;
	/**
	 * The metric data being sent to Vercel
	 */
	metric: Metric;
}

const VITALS_URL = 'https://vitals.vercel-analytics.com/v1/vitals';

const send_to_analytics = (send_options: SendOptions): void => {
	const {
		debug = false,
		full_path,
		metric,
	} = send_options;

	const body = {
		dsn: process.env.VERCEL_ANALYTICS_ID,
		id: metric.id,
		page: full_path,
		href: location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: 'connection' in navigator && navigator['connection'] && 'effectiveType' in navigator['connection'] ? navigator['connection']['effectiveType'] : '',
	};

	if (debug) console.log(metric.name, JSON.stringify(body, null, 2));

	const blob = new Blob([
		new URLSearchParams(body).toString(),
	], {
		// This content type is necessary for `sendBeacon`:
		type: 'application/x-www-form-urlencoded',
	});

	(navigator.sendBeacon && navigator.sendBeacon(VITALS_URL, blob)) || fetch(VITALS_URL, {
		body: blob,
		method: 'POST',
		credentials: 'omit',
		keepalive: true,
	});
}

export const Vercel = (options: VercelOptions): Plugin => {
	const {
		debug = false,
	} = options;

	return {
		name: 'vite-plugin-vercel',
		enforce: 'post',
		apply: 'build',
		async load(id) {
			try {
				const full_path = '';

				const {
					getCLS,
					getFCP,
					getFID,
					getLCP,
					getTTFB,
				} = await import('web-vitals');

				getCLS(metric => send_to_analytics({ debug, full_path, metric }));
				getFCP(metric => send_to_analytics({ debug, full_path, metric }));
				getFID(metric => send_to_analytics({ debug, full_path, metric }));
				getLCP(metric => send_to_analytics({ debug, full_path, metric }));
				getTTFB(metric => send_to_analytics({ debug, full_path, metric }));
			} catch (err) {
				console.error('[vite-plugin-vercel]', err);
			}
		},
	}
};

export default Vercel;
