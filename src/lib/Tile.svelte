<script>
	import { editor_text } from '../stores';
	import Engine from './Engine.svelte';
	import { onMount } from 'svelte';
	import { engines } from './engines';

	let id = 0; // each tile needs unique id which maps to their engine index
	let tick_rate = 1;
	let text;
	editor_text.subscribe((value) => {
		text = value;
	});

	let draw_interval;
	let engine;

	export const runCode = () => {
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
		draw_interval = setInterval(() => {
			engine.meta.draw();
		}, tick_rate);
	};

	export const stopCode = () => {
		let code_runner = document.querySelector('#code-runner');
		if (code_runner) {
			code_runner.remove();
		}

		/* janky hack to clear ALL intervals */
		let max_interval = setInterval(() => {}, Number.MAX_SAFE_INTEGER);
		for (let i = 1; i <= max_interval; ++i) {
			clearInterval(i);
		}
	};

	export const setRunning = (is_running) => {
		engine.running = is_running;
	};

	onMount(() => {
		let main_canvas = document.querySelector('#main-canvas');
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
		engines.push(engine);
		console.log(engines);
	});
</script>

<Engine bind:this={engine} />
