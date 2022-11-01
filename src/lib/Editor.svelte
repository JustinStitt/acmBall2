<script>
	import { EditorState } from '@codemirror/state';
	import { EditorView, keymap } from '@codemirror/view';
	import { solarizedDark } from 'cm6-theme-solarized-dark';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { basicSetup } from 'codemirror';
	import { defaultKeymap } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import { onMount } from 'svelte';
	import { editor_text } from '../stores.js';
	import readOnlyRangesExtension from 'codemirror-readonly-ranges';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const getReadOnlyRanges = (target_state) => {
		return [
			{
				from: 0,
				to: target_state.doc.line(1).to
			}
		];
	};

	let editor_pane;

	let editorState = EditorState.create({
		doc: "console.log('hi'); // read-only \n",
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
			readOnlyRangesExtension(getReadOnlyRanges)
		]
	});

	let text = '';
	const editorChanged = (new_view) => {
		/* editor changed */
		text = new_view.state.doc.text;
	};

	let some_value = 1337;

	$: editor_text.set(text);

	let view;
	const updateEditorText = (txt) => {
		// TODO: fix line(2) not existing potentially
		const update = view.state.update({
			changes: { from: view.state.doc.line(2).to, to: view.state.doc.length, insert: txt }
		});
		view.update([update]);
	};

	$: if (view) updateEditorText(text);

	onMount(() => {
		view = new EditorView({
			state: editorState,
			parent: document.getElementById('editor-pane')
		});
		editorChanged(view);
	});

	const runCode = () => {
		dispatch('runCode');
	};
</script>

<div class="editor-container">
	<div id="editor-pane" class="editor" bind:this={editor_pane} />
	<div class="editor-controls">
		<button on:click={runCode}>Run</button>
		<button>Two</button>
		<button>Three</button>
	</div>
</div>

<style>
	.editor {
		background-color: rgb(22, 35, 216);
		width: 40vw;
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
