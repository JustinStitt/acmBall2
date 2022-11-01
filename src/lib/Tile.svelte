<script>
	import { Bodies, addObject, engine } from './engine';
	import { editor_text } from '../stores';
	// https://codepen.io/FCCJMC/pen/YWLGpa (use this for <script> injection)
	let tick_rate = 1;
	let text;
	editor_text.subscribe((value) => {
		text = value;
	});

	export const runCode = () => {
		console.log('running code inside tile!');
		console.log(text);
		// eval(to_run);
		let old_node = document.querySelector('#code-runner');
		if (old_node) old_node.remove();
		let runner = document.createElement('script');
		runner.setAttribute('id', 'code-runner');
		runner.setAttribute('type', 'module');
		runner.textContent = 'import * as Game from "./src/lib/engine.js";\n' + text + '\n';
		runner.textContent +=
			'\nsetup();\nlet drawinterval = setInterval(() => { if (Game.running) draw(); },' +
			tick_rate +
			')\n';
		document.body.appendChild(runner); // add to DOM
		console.log({ runner });
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
</script>

<!-- start html -->

<!-- end html -->
<style></style>
