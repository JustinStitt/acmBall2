<script>
	import { EditorState } from '@codemirror/state';
	import { EditorView, keymap } from '@codemirror/view';
	import { solarizedDark } from 'cm6-theme-solarized-dark';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { basicSetup } from 'codemirror';
	import { defaultKeymap } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';
	import { boxA_pos } from '../stores.js';

	let editorState = EditorState.create({
		doc: 'Hello World\n\n\n\n',
		extensions: [
			keymap.of(defaultKeymap),
			basicSetup,
			javascript(),
			oneDark,
			EditorView.updateListener.of((v) => {
				if (v.docChanged) {
					editorChanged(v);
				}
			})
		]
	});

	const editorChanged = (v) => {
		/* editor changed */
	};

	let some_value;
	boxA_pos.subscribe((value) => {
		some_value = value;
	});

	$: text = 'hello world\n boxA x pos: ' + some_value + "\n\n\n\nconsole.log('test')\n";
	let view;
	const updateEditorText = (txt) => {
		console.log('here');
		const update = view.state.update({
			changes: { from: 0, to: view.state.doc.length, insert: txt }
		});
		view.update([update]);
	};

	$: if (view) updateEditorText(text);

	onMount(() => {
		view = new EditorView({
			state: editorState,
			parent: document.getElementById('editor-pane')
		});
	});
</script>

<style>
</style>
