<!-- DOM-less (sorta) component used by Graphical aid, Game -->
<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { engines } from '$public/engines';
	import { editor_text, BALL_RADIUS, BALL_START_POSITION } from '$public/stores';

	import Engine from './engine.svelte';
	import clone from 'clone';

	export let id = 0; // each tile needs unique id which maps to their engine index
	export let source_code = '';

	$: text = source_code.length == 0 ? $editor_text : source_code;

	let draw_interval;
	let engine;
	let render;
	let mouse;
	let mouse_circle;

	let ball_start_position = $BALL_START_POSITION;

	export const compileAndRunCode = () => {
		makeRunner();
		setTimeout(() => {
			engine.meta.setup();
		}, 100); // janky hack for post-meta setup injection
	};

	// This function makes a new <script> element in the DOM to run user code
	const makeRunner = () => {
		/* 		remove old code runner if it exists */
		{
			let old_node = document.querySelector(`#code-runner${id}`);
			if (old_node) old_node.remove();
		}

		/* construct new code runner and do meta bindings */
		let runner = document.createElement('script');
		runner.setAttribute('id', `code-runner${id}`); // for targeting later and now
		runner.setAttribute('type', 'module'); // allows imports/exports

		/* bootstrap meta setup/draw injection */
		runner.textContent = text;
		runner.textContent = runner.textContent.replace('[0]', `[${id}]`);
		document.body.appendChild(runner); // add to DOM
	};

	export const startDrawMouse = () => {
		createMouse();
		engine.Events.on(render, 'afterRender', drawCircleOnMouse);
	};

	const stopDrawMouse = () => {
		engine.Events.off(render);
	};

	export const startDraw = () => {
		engine.Events.on(engine.runner, 'tick', engine.meta.draw);
		stopDrawMouse();
	};

	export const stopCode = () => {
		let code_runner = document.querySelector(`#code-runner${id}`);
		if (code_runner) {
			code_runner.remove();
		}

		/* unsubscribe from all runner events */
		engine.Events.off(engine.runner);
		engine.Runner.stop(engine.runner);
	};

	export const resetGame = () => {
		engine.reset();
		engine.ball = clone(engine.ball_default);
		engine.addObject(engine.ball);
	};

	export const setRunning = (is_running) => {
		engine.running = is_running;
	};

	const createMouse = () => {
		mouse = engine.Mouse.create(render.canvas);
		render.mouse = mouse;
		mouse_circle = engine.Bodies.circle(0, 0, $BALL_RADIUS);
		mouse_circle.isSensor = true;
		mouse_circle.render.fillStyle = 'green';
		engine.addObject(mouse_circle);
	};

	const drawCircleOnMouse = () => {
		mouse_circle.position = { x: mouse.position.x, y: mouse.position.y };
	};

	onMount(() => {
		let main_canvas = document.querySelector(`#main-canvas${id}`);
		if (!main_canvas) console.error('NO main-canvas FOUND');
		render = engine.Render.create({
			// element: main_canvas,
			canvas: main_canvas,
			engine: engine.engine,
			options: {
				height: engine.height,
				width: engine.width,
				hasBounds: true,
				wireframes: false,
				// showPerformance: true,
				background: 'transparent'
			}
		});

		engine.Render.run(render);
		/* add ourself to engine pool */
		engines[id] = engine;
	});
</script>

<!-- Engine used by this tile -->
<Engine bind:this={engine} />
