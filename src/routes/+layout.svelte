<script lang="ts">
	import { onMount } from 'svelte';

	import Titlebar from './titlebar.svelte';

	onMount(() => {});

	let game;
</script>

<svelte:head>
	<title>acmBall2: Electric Boogaloo</title>
	<link rel="stylesheet" href="/global.css" />
</svelte:head>

<main>
	<Titlebar />

	<slot />
</main>

<style>
	main {
		width: 100vw;
    margin: 0;
	}
</style>
