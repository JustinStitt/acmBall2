<script lang="ts">
	import { onMount } from 'svelte';

	import { game_view } from '$public/stores';
	import Game from './game.svelte';
	import Editor from './editor.svelte';

	onMount(() => {});

	let game: Game;
</script>

<div class="container">
  <div class="control-panel" style={`flex-direction: ${$game_view == 'right' ? 'row-reverse' : 'row'}`}>
    <!-- home -->
    <Game bind:this={game} />
    <Editor on:compileCode={() => game.compileCode()} on:stopCode={() => game.stopCode()} />
  </div>
  <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#eee" fill-opacity="1" d="M0,64L60,64C120,64,240,64,360,85.3C480,107,600,149,720,165.3C840,181,960,171,1080,144C1200,117,1320,75,1380,53.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> -->
</div>

<style>
	.control-panel {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 1.5vw;
    padding: 1.5vw;
    background-color: #eee;
    border-radius: 20px;
	}
	@media only screen and (max-width: 490px) {
		.container {
			flex-direction: column !important;
		}
	}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/*
svg, path {
  max-width: 90%;
  margin: 0;
  padding: 0;
}
*/


</style>
