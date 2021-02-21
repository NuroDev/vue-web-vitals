import type { Plugin } from 'vite';

export interface VercelOptions {
	/// Prints metrics in the console (Optional) [Default: false]
	debug?: boolean;
};

export const Vercel = (options: VercelOptions = {}): Plugin => {
	const {
		debug = false,
	} = options;

	return {
		name: 'vite-plugin-splitbee',
		configResolved(config) {
			console.log(`Vercel Debug: `, debug);
			console.log(`Config: `, config);
		},
	}
};

export default Vercel;
