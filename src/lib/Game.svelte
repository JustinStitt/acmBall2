<svelte:options accessors={true} />

<script>
	import Tile from './Tile.svelte';
	import Toolbar from './Toolbar.svelte';
	import { Render, engine, width, height } from './engine.js';
	import { onMount } from 'svelte';
	import { editor_text } from '../stores';

	let tile;
	let main_canvas;

	export const runCode = () => {
		tile.runCode();
	};

	export const stopCode = () => {
		tile.stopCode();
	};

	const test = () => {
		editor_text.set('test');
		console.log($editor_text);
	};

	onMount(() => {
		var render = Render.create({
			// element: main_canvas,
			canvas: main_canvas,
			engine: engine,
			options: { height: height, width: width, hasBounds: true }
		});

		Render.run(render);
	});
</script>

<div class="game-container">
	<canvas id="main-canvas" bind:this={main_canvas} />
</div>
<Tile bind:this={tile} />
<Toolbar />

<style>
	#main-canvas,
	.game-container {
		border-radius: 2%;
	}

	#main-canvas {
		width: 100%;
		height: 100%;
	}

	.game-container {
		width: 35vw;
		/* min-width: 400px; */
		aspect-ratio: 1;
		background-color: goldenrod;
		padding: 8px;
	}

	@media only screen and (max-width: 490px) {
		.game-container {
			width: 78vw;
		}
	}
</style>
