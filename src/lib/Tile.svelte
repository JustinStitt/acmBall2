<!-- DOM-less (sorta) component used by Graphical aid, Game -->
<script>
	import { editor_text } from '../stores';
	import Engine from './Engine.svelte';
	import { onMount } from 'svelte';
	import { engines } from './engines';

	export let id = 0; // each tile needs unique id which maps to their engine index
	export let source_code = '';

	$: text = source_code.length == 0 ? $editor_text : source_code;

	// let text;
	// editor_text.subscribe((value) => {
	// 	text = value;
	// });

	let draw_interval;
	let engine;

	export const compileAndRunCode = () => {
		console.log('running code inside tile!');

		/* 		remove old code runner if it exists */
		{
			let old_node = document.querySelector('#code-runner');
			if (old_node) old_node.remove();
		}

		/* construct new code runner and do meta bindings */
		let runner = document.createElement('script');
		runner.setAttribute('id', 'code-runner'); // for targeting later and now
		runner.setAttribute('type', 'module'); // allows imports/exports

		/* bootstrap meta setup/draw injection */
		runner.textContent =
			`import { engines } from "./src/lib/engines.js";\nconst Game = engines[${id}];\n` +
			text +
			'\nGame.meta.setup = setup\nGame.meta.draw = draw;\n';
		document.body.appendChild(runner); // add to DOM
		setTimeout(() => {
			engine.meta.setup();
		}, 100); // janky hack for post-meta setup injection
	};

	export const startDraw = () => {
		engine.Events.on(engine.runner, 'tick', engine.meta.draw);
	};

	export const stopCode = () => {
		let code_runner = document.querySelector('#code-runner');
		if (code_runner) {
			code_runner.remove();
		}

		/* unsubscribe from all runner events */
		engine.Events.off(engine.runner);
		engine.Runner.stop(engine.runner);
	};

	export const resetGame = () => {
		engine.reset();
	};

	export const setRunning = (is_running) => {
		engine.running = is_running;
	};

	onMount(() => {
		let main_canvas = document.querySelector(`#main-canvas${id}`);
		if (!main_canvas) console.error('NO main-canvas FOUND');
		var render = engine.Render.create({
			// element: main_canvas,
			canvas: main_canvas,
			engine: engine.engine,
			options: {
				height: engine.height,
				width: engine.width,
				hasBounds: true,
				wireframes: false,
				showPerformance: true,
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
