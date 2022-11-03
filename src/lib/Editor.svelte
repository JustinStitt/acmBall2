<script>
	import { EditorState } from '@codemirror/state';
	import { EditorView, keymap } from '@codemirror/view';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { basicSetup } from 'codemirror';
	import { defaultKeymap } from '@codemirror/commands';
	import { linter, lintGutter } from '@codemirror/lint';
	import { esLint, javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';
	import { editor_text, starting_text } from '../stores.js';
	import readOnlyRangesExtension from 'codemirror-readonly-ranges';
	import { createEventDispatcher } from 'svelte';
	import '../../node_modules/eslint-linter-browserify';

	const dispatch = createEventDispatcher();
	const lint_config = {
		// eslint configuration
		parserOptions: {
			ecmaVersion: 2019,
			sourceType: 'module'
		},
		env: {
			browser: true,
			node: true
		},
		rules: {
			semi: ['error', 'never']
		}
	};

	const getReadOnlyRanges = (target_state) => {
		return [
			// {
			// 	from: 0,
			// 	to: target_state.doc.line(1).to
			// },
			// {
			// 	from: target_state.doc.line(5).from,
			// 	to: target_state.doc.line(5).to
			// },
			// {
			// 	from: target_state.doc.line(target_state.doc.lines).from,
			// 	to: undefined
			// }
		];
	};

	let editor_pane;

	let editorState = EditorState.create({
		doc: $starting_text,
		extensions: [
			keymap.of(defaultKeymap),
			basicSetup,
			javascript(),
			oneDark,
			EditorView.updateListener.of((v) => {
				if (v.docChanged) {
					editorChanged(v);
				}
			}),
			EditorView.lineWrapping,
			readOnlyRangesExtension(getReadOnlyRanges),
			linter(esLint(new eslint.Linter(), lint_config)) // no idea why red squiggles
		]
	});

	const editorChanged = (new_view) => {
		/* editor changed */
		text = new_view.state.doc.toString();
	};

	$: editor_text.set(text);

	let text = $starting_text;
	editor_text.subscribe((val) => {
		text = val;
	});

	let view;
	export const updateEditorText = (txt) => {
		text = txt;
		editor_text.set(txt);
		console.log($editor_text);
		let old_cursor = view.state.selection.ranges[0].from;
		const update = view.state.update({
			changes: { from: 0, to: view.state.doc.length, insert: txt }
		});
		view.update([update]);
		view.dispatch({
			selection: {
				anchor: old_cursor,
				head: old_cursor
			}
		});
	};

	// $: if (view) updateEditorText(text);

	onMount(() => {
		view = new EditorView({
			state: editorState,
			parent: document.getElementById('editor-pane')
		});
		editorChanged(view);
	});

	const compileCode = () => {
		dispatch('compileCode');
	};

	const stopCode = () => {
		dispatch('stopCode');
	};

	const resetCode = () => {
		updateEditorText($starting_text);
	};
</script>

<div class="editor-container">
	<div id="editor-pane" class="editor" bind:this={editor_pane} />
	<div class="editor-controls">
		<button on:click={compileCode}>Compile Code 🟢</button>
		<button on:click={resetCode}>Reset Code</button>
		<button>QazQux</button>
	</div>
</div>

<style>
	.editor {
		background-color: rgb(22, 35, 216);
		width: 50vw;
		height: 70vh;
		overflow-y: scroll;
		padding: 5px;
		border-radius: 2%;

		display: flex;
		flex-direction: column-reverse;
	}

	.editor-controls {
		margin: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: blueviolet;
		border-radius: 5px;
	}

	.editor-container {
		background-color: orange;
		border-radius: 2%;
		max-height: 80vh;
		padding: 4px;
	}

	@media only screen and (max-width: 490px) {
		.editor {
			width: 97vw;
			margin-top: 5vh;
			margin-bottom: 10vh;
		}
	}
</style>
