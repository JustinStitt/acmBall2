<script lang="ts">
	import Submission from './submission.svelte';

	export let data;
</script>

<div class="container">
	{#each data.submissions as item}
		<Submission name={item.name} code={item.code} version={item.version} />
	{/each}
	{#if data.submissions.length == 0}
		<h3>No submissions awaiting approval!</h3>
	{/if}
</div>

<style>
	.container {
		max-width: 97vw;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 8px;

		background-color: rgba(47, 39, 56, 0.293);
		border: 2px inset aliceblue;
	}
</style>
