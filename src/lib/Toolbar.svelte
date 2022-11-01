<script>
	import { editor_text, starting_text } from '../stores';

	export let runGame;
	export let resetGame;

	const test = () => {
		editor_text.set('test');
	};
</script>

<div class="toolbar-container">
	<button on:click={runGame}>Run Game</button>
	<button on:click={resetGame}>Reset Game</button>
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
