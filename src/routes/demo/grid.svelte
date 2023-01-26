<script lang="ts">
	import Game from '../game.svelte';

	export let tiles;

	$: idxs = Array.from(Array(1).keys());
	$: grids = Array(1);

	const compileAll = () => {
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
		{#if tiles}
			{#each idxs as idx}
				<Game
					bind:this={grids[idx]}
					source_code={tiles[idx].code}
					id={idx}
					render_toolbar={false}
				/>
			{/each}
		{/if}
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
