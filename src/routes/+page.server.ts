import { posts } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { DB } = locals;
	const allPosts = await DB.select().from(posts).orderBy(posts.created_at);
	console.log(allPosts);
	return { posts: allPosts };
};

export const actions: Actions = {
	create: async (event) => {
		const { request, locals } = event;
		const { DB } = locals;
		const data = await request.formData();
		const content = data.get('content')?.toString();

		if (!content) return fail(400, { createError: 'Content is required' });
		console.log(content);
		console.log(DB);
		try {
			await DB.insert(posts).values({
				content,
				created_at: new Date().getTime(),
				updated_at: new Date().getTime()
			});
		} catch {
			return fail(500, { createError: 'Failed to create post' });
		}
	},

	update: async (event) => {
		const { request, locals } = event;
		const { DB } = locals;
		const data = await request.formData();
		const id = Number(data.get('id'));
		const content = data.get('content')?.toString();

		if (!content) return fail(400, { updateError: 'Content is required' });
		if (!id) return fail(400, { updateError: 'Invalid post ID' });

		try {
			await DB.update(posts)
				.set({ content, updated_at: new Date().getTime() })
				.where(eq(posts.id, id));
		} catch {
			return fail(500, { updateError: 'Failed to update post' });
		}
	},

	delete: async (event) => {
		const { request, locals } = event;
		const { DB } = locals;
		const data = await request.formData();
		const id = Number(data.get('id'));

		if (!id) return fail(400, { deleteError: 'Invalid post ID' });

		try {
			await DB.delete(posts).where(eq(posts.id, id));
		} catch {
			return fail(500, { deleteError: 'Failed to delete post' });
		}
	}
} satisfies Actions;
