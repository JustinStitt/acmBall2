<svelte:options accessors={true} />

<script>
	import Tile from './Tile.svelte';
	import Toolbar from './Toolbar.svelte';
	import {
		Runner,
		setRunning,
		World,
		Engine,
		runner,
		Render,
		engine,
		width,
		height
	} from './engine.js';
	import { onMount } from 'svelte';
	import { editor_text } from '../stores';

	let tile;
	let main_canvas;

	export const runGame = () => {
		setRunning(true);
		Runner.run(runner, engine);
	};

	export const resetGame = () => {
		setRunning(false);
		World.clear(engine.world);
		Engine.clear(engine);
		Runner.stop(runner);
		stopCode();
	};

	export const runCode = () => {
		resetGame();
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
			options: {
				height: height,
				width: width,
				hasBounds: true,
				wireframes: false,
				showPerformance: true,
				background: 'transparent'
			}
		});

		Render.run(render);
	});
</script>

<div class="game-container">
	<canvas id="main-canvas" bind:this={main_canvas} />
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
