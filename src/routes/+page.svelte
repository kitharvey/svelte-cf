<!-- src/routes/posts/+page.svelte -->
<script lang="ts">
	import CreatePost from '$lib/components/forms/CreatePost.svelte';
	import UpdatePost from '$lib/components/forms/UpdatePost.svelte';
	import DeletePost from '$lib/components/forms/DeletePost.svelte';
	import type { FormState, Post } from '$lib/types';

	let { data } = $props();
	let form = $state<FormState>({});
	let editingPost = $state<Post | null>(null);
</script>

<div class="mx-auto max-w-2xl px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">Posts</h1>

	<CreatePost bind:form />

	<div class="space-y-6">
		{#each data.posts as post, i (post.id)}
			<div class="rounded-lg border border-gray-200 p-6 shadow-sm">
				{#if editingPost?.id === post.id}
					<UpdatePost bind:post={editingPost} bind:form />
				{:else}
					<p class="mb-4 text-gray-600">{post.content}</p>
					<div class="flex items-center justify-between text-sm text-gray-500">
						<span>
							Posted on {new Date(post.created_at).toLocaleDateString()}
						</span>
						<div class="flex gap-2">
							<button
								onclick={() => (editingPost = post)}
								class="text-blue-600 hover:text-blue-800"
							>
								Edit
							</button>
							<DeletePost bind:post={data.posts[i]} bind:form />
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
