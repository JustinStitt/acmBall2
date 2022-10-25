<script>
	import Game from './lib/Game.svelte';
</script>

<div class="titlebar">acmBall2 : Electric Boogaloo</div>
<div class="container">
	<Game />
	<div class="editor">Here's Some Code</div>
</div>

<style>
	.titlebar {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: calc(12px + 3vw);
		text-align: center;
		width: 97vw;
		height: 10vh;
		background-color: rgba(27, 26, 26, 0.799);
		margin-top: 1vh;
		border: 1px dotted aliceblue;
	}

	.editor {
		background-color: green;
		width: 40vw;
		height: 80vh;
	}

	.container {
		max-width: 97vw;
		/* max-height: 97vh; */

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 8px;

		background-color: rebeccapurple;
	}

	@media only screen and (max-width: 490px) {
		.container {
			flex-direction: column;
			/* margin-left: 10vw;
			margin-right: 10vw; */
		}

		.editor {
			width: 97vw;
			margin-top: 5vh;
			margin-bottom: 10vh;
		}
	}
</style>
