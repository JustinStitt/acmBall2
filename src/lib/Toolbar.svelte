<script>
	import { editor_text, starting_text } from '../stores';

	const test = () => {
		editor_text.set('test');
	};

	const resetCode = () => {
		editor_text.set($starting_text);
	};
</script>

<div class="toolbar-container">
	<button on:click={test}>test</button>
	<button on:click={test}>test</button>
	<button on:click={resetCode}>Reset Code</button>
</div>

<style>
	.toolbar-container {
		height: 70vh;
		display: flex;
		flex-direction: column;
		gap: 1vh;
		background-color: aquamarine;
	}
	@media only screen and (max-width: 490px) {
		.toolbar-container {
			flex-direction: row;
			height: 15vh;
			/* margin-left: 10vw;
			margin-right: 10vw; */
		}
	}
</style>
