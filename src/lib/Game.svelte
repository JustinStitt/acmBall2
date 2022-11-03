<svelte:options accessors={true} />

<script>
	import Tile from './Tile.svelte';
	import Toolbar from './Toolbar.svelte';
	import { onMount } from 'svelte';
	import { editor_text } from '../stores';

	let tile;
	let main_canvas;

	export const runGame = () => {
		tile.setRunning(true);
		tile.startDraw();
	};

	export const resetGame = () => {
		tile.setRunning(false);
		stopCode(); // implictly stops draw too
	};

	export const runCode = () => {
		resetGame();
		tile.runCode();
	};

	export const stopCode = () => {
		tile.stopCode();
	};

	const test = () => {
		stopCode();
	};
</script>

<div class="game-container">
	<canvas id="main-canvas" bind:this={main_canvas} />
	<button on:click={test}> test </button>
</div>
<Tile bind:this={tile} />
<Toolbar {runGame} {resetGame} />

<style>
	#main-canvas {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		border: 4px dotted gray;
	}

	.game-container {
		width: 35vw;
		/* min-width: 400px; */
		aspect-ratio: 1;
		/* background-color: goldenrod; */
		background-image: url('gridbg.png');
		padding: 8px;
		border-radius: 1%;
	}

	@media only screen and (max-width: 490px) {
		.game-container {
			width: 78vw;
		}
	}
</style>
