<svelte:options accessors={true} />

<script>
	import Tile from './Tile.svelte';
	import { editor_text, game_view } from '../stores';

	// grid stuff
	export let source_code = '';
	export let id = 0;
	// end grid stuff

	let tile;
	let main_canvas = {};

	const gamestate = {
		started: false,
		playing: false,
		compiled: false
	};

	export const runGame = () => {
		console.log(id);
		if (!gamestate.started && !gamestate.compiled) {
			console.log('COMPILE FIRST');
			return false;
		}
		if (!gamestate.started) tile.startDraw();
		tile.setRunning(true);
		gamestate.playing = true;
		gamestate.started = true;
		return true;
	};

	export const resetGame = () => {
		/* reset gamestate */
		gamestate.started = false;
		gamestate.playing = false;
		gamestate.compiled = false;

		tile.setRunning(false);
		stopCode(); // implictly stops draw too
		tile.resetGame();
	};

	export const compileCode = () => {
		resetGame();
		tile.compileAndRunCode();
		gamestate.compiled = true;
	};

	export const stopCode = () => {
		tile.stopCode();
	};

	const pauseGame = () => {
		tile.setRunning(false);
	};

	let do_warning_slide = false,
		slide_in_progress = false;
	const togglePlaying = () => {
		if (!gamestate.started) {
			do_warning_slide = !runGame();
			if (do_warning_slide && !slide_in_progress) {
				slide_in_progress = true;
				setTimeout(() => {
					do_warning_slide = false;
					slide_in_progress = false;
				}, 1000);
			}
			return;
		}
		gamestate.playing = !gamestate.playing;
		if (!gamestate.playing) {
			pauseGame();
		} else {
			runGame();
		}
	};

	const toggleView = () => {
		if ($game_view == 'left') game_view.set('right');
		else game_view.set('left');
	};
</script>

<div class="game-container">
	<canvas id={`main-canvas${id}`} bind:this={main_canvas} />
	<div class="warning" class:warning-slide={do_warning_slide}>COMPILE FIRST</div>
	<button on:click={togglePlaying}> {!gamestate.playing ? '▶' : '⏸'} </button>
	<button on:click={resetGame}> 🔁 </button>
	<button on:click={toggleView}> 👀 </button>
</div>

<Tile bind:this={tile} {source_code} {id} />

<style>
	#main-canvas,
	canvas {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		border: 4px dotted gray;
	}

	.game-container {
		width: 35vw;
		/* min-width: 400px; */
		/* aspect-ratio: 1; */
		background-image: url('gridbg.png');
		/* background-color: red; */
		padding: 8px;
		border-radius: 1%;
	}

	@media only screen and (max-width: 490px) {
		.game-container {
			width: 78vw;
			margin-bottom: 10vh;
			padding-bottom: 10vh;
		}
	}

	.warning {
		box-sizing: border-box;
		position: absolute;
		color: red;
		background-color: #212121;
		padding: 5px;
		border-radius: 5px;
		border: 2px dotted red;
		transition: all 0.5s;
		opacity: 0;
		pointer-events: none;
	}

	.warning-slide {
		transform: translateY(-40px);
		opacity: 1;
	}
</style>
