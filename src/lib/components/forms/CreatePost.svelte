<!-- src/lib/components/forms/CreatePost.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { FormState } from '$lib/types';

	let { form = $bindable<FormState>() } = $props();
	let draftContent = $state('');
</script>

<form method="POST" action="?/create" use:enhance class="mb-8">
	<div class="space-y-4">
		<div>
			<textarea
				name="content"
				rows={3}
				class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="Write your post..."
				required
				bind:value={draftContent}
			></textarea>
		</div>

		{#if form?.createError}
			<p class="mt-2 text-sm text-red-600">{form.createError}</p>
		{/if}

		<div class="flex justify-end">
			<button
				type="submit"
				class="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Create Post
			</button>
		</div>
	</div>
</form>
