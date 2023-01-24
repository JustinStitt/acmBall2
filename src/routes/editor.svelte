<script>
	import { onMount } from 'svelte';
	import { editor_text, starting_text } from '$public/stores';
	import { createEventDispatcher } from 'svelte';
	import { Linter } from 'eslint-linter-browserify';
	import { linter, lintGutter } from '@codemirror/lint';
	import { EditorView, keymap } from '@codemirror/view';
	import CodeMirror from 'svelte-codemirror-editor';
	import { esLint, javascript } from '@codemirror/lang-javascript';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { closeBrackets, autocompletion } from '@codemirror/autocomplete';
	import readOnlyRangesExtension from 'codemirror-readonly-ranges';

	const dispatch = createEventDispatcher();

	let editor_pane;

	// Make boilerplate Read-Only
	const getReadOnlyRanges = (state) => {
		return [
			{
				from: undefined,
				to: state.doc.line(4).to
			}
		];
	};

	const compileCode = () => {
		dispatch('compileCode');
	};

	const stopCode = () => {
		dispatch('stopCode');
	};

	const resetCode = () => {
		// updateEditorText($starting_text);
	};

	const handleChange = (change) => {
		// console.log('change', change);
	};

	const uploadCode = () => {
		// TODO
	};

	onMount(() => {
		$editor_text = $starting_text;
		// or fetch from local storage here
	});
</script>

<div class="editor-container">
	<div id="editor-pane" class="editor" bind:this={editor_pane}>
		<CodeMirror
			bind:value={$editor_text}
			lang={javascript()}
			theme={oneDark}
			on:change={handleChange}
			extensions={[
				EditorView.lineWrapping,
				linter(esLint(new Linter())),
				closeBrackets(),
				autocompletion(),
				lintGutter(),
				readOnlyRangesExtension(getReadOnlyRanges)
			]}
		/>
	</div>
	<div class="editor-controls">
		<button on:click={compileCode}>Compile Code 🟢</button>
		<button on:click={resetCode}>Reset Code</button>
		<button on:click={uploadCode}>Upload Code</button>
		<button>Submit</button>
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
