<script>
	import Game from './lib/Game.svelte';
	import Editor from './lib/Editor.svelte';
	import Grid from './lib/Grid.svelte';
	import Titlebar from './lib/Titlebar.svelte';
	import { Router, Route, Link } from 'svelte-routing';
	import { onMount } from 'svelte';
	import { game_view } from './stores';

	onMount(() => {});

	export let url = '';

	let game;
</script>

<Router {url}>
	<main>
		<Titlebar />
		<div
			class="container"
			style={`flex-direction: ${$game_view == 'right' ? 'row-reverse' : 'row'}`}
		>
			<!-- home -->
			<Route path="/">
				<Game bind:this={game} />
				<Editor on:compileCode={() => game.compileCode()} on:stopCode={() => game.stopCode()} />
			</Route>
		</div>

		<!-- demo grid page -->
		<Route path="/demo">
			<Grid />
		</Route>

		<!-- 404 unknown route -->
		<Route>
			<h1>⚠ 404: Page not Found! ⚠</h1>
		</Route>
	</main>
</Router>

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

	main {
		width: 99vw;
	}
</style>
