<script>
	import { Bodies, addObject } from './engine';
	import { editor_text } from '../stores';

	var boxA = Bodies.rectangle(100, 200, 80, 80);
	addObject(boxA);

	let text;
	editor_text.subscribe((value) => {
		text = value;
	});

	export const runCode = () => {
		console.log('running code inside tile!');
		let to_run = text.join('\n');
		eval(to_run);
	};
</script>

<!-- start html -->

<!-- end html -->
<style></style>
