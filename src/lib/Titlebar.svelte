<script>
	import { Link } from 'svelte-routing';
</script>

<div class="titlebar">
	<div class="title">acmBall2: Electric Boogaloo</div>
	<!-- <h5>acmBall2 : Electric Boogaloo</h5> -->
	<div class="links">
		<Link class="link" to="/">Editor</Link>
		<Link class="link" to="/demo">Demo</Link>
	</div>
</div>

<style>
	.title {
		font-size: calc(12px + 1.1vw);
		margin-left: auto;
		margin-right: auto;
	}

	.links {
		margin-right: 1vw;
	}

	.titlebar {
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 5vh;
		font-size: calc(12px + 1.2vw);
		background-color: green;
	}
</style>
