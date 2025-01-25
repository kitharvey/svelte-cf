import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.platform?.env?.DB) {
		event.locals.DB = drizzle(event.platform?.env?.DB);
	}
	const response = await resolve(event);

	return response;
};
