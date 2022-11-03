<svelte:options accessors={true} />

<script>
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

	export const engine = Matter.Engine.create();

	export const addObject = (obj) => {
		Composite.add(engine.world, [obj]);
	};

	export const runner = Runner.create();
</script>
