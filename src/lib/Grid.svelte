<script>
	import Game from './Game.svelte';
	import { starting_text } from '../stores';

	let n = 3;
	$: idxs = Array.from(Array(n).keys());

	$: grids = Array(n).fill({});

	const compileAll = () => {
		console.log(grids);
		for (let i = 0; i < grids.length; ++i) {
			grids[i].compileCode();
		}
	};
</script>

<div class="container">
	{#each idxs as idx}
		<Game bind:this={grids[idx]} source_code={$starting_text} id={idx} />
	{/each}
	<button on:click={compileAll}>Compile all</button>
</div>

<style>
	.container {
	}
</style>
