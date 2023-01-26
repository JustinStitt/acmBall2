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
		$editor_text = $starting_text;
	};

	const handleChange = (change) => {
		// console.log('change', change);
	};
	// Upload code from external file
	const uploadCode = async () => {
		// TODO
	};

	// Send code to backend and save to localStorage
	const submitCode = async () => {
		localStorage.setItem('editor-text', $editor_text);
		let name = localStorage.getItem('name');
		console.log(name);
		if (!name) {
			name = window.prompt('Enter your team name:', '');
			localStorage.setItem('name', name);
			localStorage.setItem('version', 1);
		}
		const version = parseInt(localStorage.getItem('version'));
		localStorage.setItem('version', version + 1);

		const res = await fetch('/submit', {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				code: $editor_text,
				version: version
			})
		});

		const result = await res.text();
		console.log(result);
	};

	onMount(() => {
		// or fetch from local storage here
		let last_uploaded_text = localStorage.getItem('editor-text');
		$editor_text = last_uploaded_text || $starting_text;
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
		<button on:click={submitCode}>Submit</button>
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
