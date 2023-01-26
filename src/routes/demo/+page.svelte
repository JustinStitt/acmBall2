<script type="ts">
	import Grid from './grid.svelte';

	export let data;

	console.log('DATA:', data);
</script>

<Grid tiles={data.tiles} />
