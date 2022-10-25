<script>
	import Matter from 'matter-js';
	import { onMount } from 'svelte';

	export let width = 500;
	export let height = 500;

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
	var boxA = Bodies.rectangle(100, 200, 80, 80);
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
			element: main_canvas,
			engine: engine,
			options: { height: height, width: width }
		});

		Render.run(render);
	});

	const applyForceToBoxA = () => {
		Matter.Body.applyForce(boxA, { x: boxA.position.x, y: boxA.position.y }, { x: 0, y: -0.5 });
	};
</script>

<div class="game-container" bind:this={main_canvas}>
	<!-- <P5 {sketch} /> -->
</div>

<button on:click={applyForceToBoxA}>Apply Force to boxA</button>

<style>
	.game-container {
		padding: 8px;
		margin: 8px;
		background-color: goldenrod;
	}
</style>
