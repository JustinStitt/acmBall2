<script>
	import Game from './lib/Game.svelte';
	import Editor from './lib/Editor.svelte';
	import { onMount } from 'svelte';
	import { game_view } from './stores';

	onMount(() => {});

	let game;
</script>

<div class="titlebar">
	<h5>acmBall2 : Electric Boogaloo</h5>
</div>

<div class="container" style={`flex-direction: ${$game_view == 'right' ? 'row-reverse' : 'row'}`}>
	<Game bind:this={game} />
	<Editor on:compileCode={() => game.compileCode()} on:stopCode={() => game.stopCode()} />
</div>

<style>
	.titlebar > h5 {
		margin-right: auto;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.titlebar {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: calc(12px + 2vw);
		text-align: center;
		width: 97vw;
		height: 7vh;
		background-color: rgba(27, 26, 26, 0.799);
		margin-top: 1vh;
		border: 1px dotted aliceblue;
		padding: 0.1em;
	}

	.container {
		max-width: 97vw;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 8px;

		background-color: rgba(47, 39, 56, 0.293);
		border: 2px inset aliceblue;
	}

	@media only screen and (max-width: 490px) {
		.container {
			flex-direction: column !important;
			/* margin-left: 10vw;
			margin-right: 10vw; */
		}
	}
</style>
