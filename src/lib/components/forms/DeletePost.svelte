<!-- src/lib/components/forms/DeletePost.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Post, FormState } from '$lib/types';

	let { post = $bindable<Post>(), form = $bindable<FormState>() } = $props();

	let showConfirmation = $state(false);
</script>

<div class="relative">
	{#if showConfirmation}
		<form
			method="POST"
			action="?/delete"
			use:enhance
			class="absolute right-0 top-0 flex gap-2 rounded-md bg-white p-2 shadow-lg"
		>
			<input type="hidden" name="id" value={post.id} />
			<button
				type="button"
				onclick={() => (showConfirmation = false)}
				class="inline-flex items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
			>
				Cancel
			</button>
			<button
				type="submit"
				class="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700"
			>
				Confirm Delete
			</button>
		</form>
	{:else}
		<button
			onclick={() => (showConfirmation = true)}
			class="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
		>
			Delete
		</button>
	{/if}

	{#if form?.deleteError}
		<p class="mt-2 text-sm text-red-600">{form.deleteError}</p>
	{/if}
</div>
