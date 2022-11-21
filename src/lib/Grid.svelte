<script>
	import Game from './Game.svelte';
	import { starting_text } from '../stores';

	let n = 4;
	$: idxs = Array.from(Array(n).keys());

	$: grids = Array(n).fill({});

	const compileAll = () => {
		console.log(grids);
		for (let i = 0; i < grids.length; ++i) {
			grids[i].compileCode();
		}
	};

	const start = () => {
		/* start running the firs tile! */
		grids[0].runGame();

		// quick tester to see tiles in intervals starting up!
		let i = 1;
		setInterval(() => {
			if (i >= n) return;
			grids[i++].runGame();
		}, 1000);
	};
</script>

<div class="container">
	<div class="grid">
		{#each idxs as idx}
			<Game bind:this={grids[idx]} source_code={$starting_text} id={idx} render_toolbar={false} />
		{/each}
	</div>
	<div class="toolbar">
		<button on:click={compileAll}>Compile all</button>
		<button on:click={start}>Start</button>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 90vh;
		display: flex;
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
		background-color: coral;
	}

	.grid {
		display: grid;
		grid-template-rows: repeat(2, 200px);
		grid-template-columns: repeat(2, 200px);
		background-color: rebeccapurple;
		padding: 10px;
	}
</style>
