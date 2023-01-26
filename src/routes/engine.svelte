<svelte:options accessors={true} />

<script>
	import { BALL_RADIUS, BALL_START_POSITION } from '$public/stores';
	import Matter from 'matter-js';
	export const matter = Matter;
	export const width = 800;
	export const height = 800;
	export let running = false;

	$: if (running) {
		Runner.run(runner, engine);
	} else {
		Runner.stop(runner);
		// World.clear(engine.world);
		// Engine.clear(engine);
	}

	export const reset = () => {
		Runner.stop(runner);
		World.clear(engine.world);
		Engine.clear(engine);
	};

	/* the setup and draw function are empty, later on the user code has it's
	 * respective setup and draw functions linked */
	export const meta = {
		setup: () => {
			console.log('old setup');
		},
		draw: () => {}
	};

	export const Engine = Matter.Engine;
	export const Events = Matter.Events;
	export const Render = Matter.Render;
	export const Runner = Matter.Runner;
	export const Bodies = Matter.Bodies;
	export const Composite = Matter.Composite;
	export const Body = Matter.Body;
	export const World = Matter.World;
	export const Mouse = Matter.Mouse;
	export const MouseConstraint = Matter.MouseConstraint;

	export const engine = Matter.Engine.create();

	export const addObject = (obj) => {
		Composite.add(engine.world, [obj]);
	};

	export const ball_default = Bodies.circle(
		// reset ball to this state using `clone` (see tile.svelte)
		$BALL_START_POSITION.x,
		$BALL_START_POSITION.y,
		$BALL_RADIUS
	);

	// TODO: set default render styles for everything. make easy-to-use abstraction for users
	ball_default.render.strokeStyle = 'black';
	ball_default.render.fillStyle = 'green';
	ball_default.render.lineWidth = 8;
	addObject(ball_default); // this object gets deleted when compiling

	export let ball; // for use in user code as `Game.ball` (must be let so we can reassign the reference)

	export const runner = Runner.create();
</script>
