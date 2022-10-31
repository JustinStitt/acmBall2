<svelte:options accessors={true} />

<script>
	import Matter from 'matter-js';
	import { onMount } from 'svelte';
	import { boxA_pos } from '../stores.js';

	/* These don't affect physical Canvas size but rather resolution of game image
	 * (zoom... basically) */
	export let width = 800;
	export let height = 800;

	// module aliases
	var Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Bodies = Matter.Bodies,
		Composite = Matter.Composite;

	// create an engine
	var engine = Engine.create();

	let main_canvas;
	// create a renderer

	// create two boxes and a ground
	export var boxA = Bodies.rectangle(100, 200, 80, 80);
	var boxB = Bodies.rectangle(200, 50, 80, 80);
	var ground = Bodies.rectangle(width / 2, height, width, 60, { isStatic: true });

	// add all of the bodies to the world
	Composite.add(engine.world, [boxA, boxB, ground]);

	// create runner
	var runner = Runner.create();

	// run the engine
	Runner.run(runner, engine);
	onMount(() => {
		var render = Render.create({
			// element: main_canvas,
			canvas: main_canvas,
			engine: engine,
			options: { height: height, width: width, hasBounds: true }
		});

		Render.run(render);
	});

	const applyForceToBoxA = () => {
		Matter.Body.applyForce(
			boxA,
			{ x: boxA.position.x, y: boxA.position.y },
			{
				x: 0,
				y: -0.5
			}
		);
	};

	const changeBoxAPosition = (new_pos) => {
		Matter.Body.setPosition(boxA, { x: new_pos, y: boxA.position.y });
		boxA = boxA; // used for reactive statements to trigger on property change
	};

	$: changeBoxAPosition(x_slider);
	// let gamma = 0;
	// setInterval(() => {
	// 	gamma += 0.11;
	// 	Matter.Body.setPosition(boxA, { x: Math.sin(gamma) * 50 + x_slider, y: boxA.position.y });
	// }, 1);

	$: {
		boxA_pos.update((n) => (n = boxA.position.x));
	}

	let x_slider = 200;
</script>

<div class="game-container">
	<canvas id="main-canvas" bind:this={main_canvas} />
</div>

<!-- <button on:click={applyForceToBoxA}>Apply Force to boxA</button> --->
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
