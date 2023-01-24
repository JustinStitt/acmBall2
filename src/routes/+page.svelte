<script lang="ts">
	import { onMount } from 'svelte';

	import { game_view } from '$public/stores';
	import Game from './game.svelte';
	import Editor from './editor.svelte';

	onMount(() => {});

	let game: Game;
</script>

<div class="container" style={`flex-direction: ${$game_view == 'right' ? 'row-reverse' : 'row'}`}>
	<!-- home -->
	<Game bind:this={game} />
	<Editor on:compileCode={() => game.compileCode()} on:stopCode={() => game.stopCode()} />
</div>

<style>
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
