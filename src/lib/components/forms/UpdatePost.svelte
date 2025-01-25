<!-- src/lib/components/forms/UpdatePost.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Post, FormState } from '$lib/types';

	let { post = $bindable<Post>(), form = $bindable<FormState>(), ...props } = $props();

	let draftContent = $state(post.content);
</script>

<form method="POST" action="?/update" use:enhance class="mb-6">
	<input type="hidden" name="id" value={post.id} />

	<div class="space-y-4">
		<div>
			<textarea
				name="content"
				rows={3}
				class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
				required
				bind:value={draftContent}
			></textarea>
		</div>

		{#if form?.updateError}
			<p class="mt-2 text-sm text-red-600">{form.updateError}</p>
		{/if}

		<div class="flex justify-end gap-2">
			<button
				type="button"
				onclick={() => (post = null)}
				class="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
			>
				Cancel
			</button>
			<button
				type="submit"
				class="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
			>
				Update Post
			</button>
		</div>
	</div>
</form>
