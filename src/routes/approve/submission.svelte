<script>
	export let name;
	export let code;
	export let version;

	let visible = true;

	const send = async (status) => {
		visible = false;
		const res = await fetch('/approve', {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				version: version,
				status: status
			})
		});
	};

	const deny = async () => {
		await send('denied');
	};

	const approve = async () => {
		await send('approved');
	};
</script>

{#if visible}
	<div>
		<h1 class="name">{name}</h1>
		<div class="code">{code}</div>
		<div class="buttons">
			<button on:click={approve}>Approve 🟢</button>
			<button on:click={deny}>Deny 🔴</button>
		</div>
	</div>
{/if}

<style>
	.code {
		font-family: monospace;
		background-color: black;
		color: white;
		border-radius: 2px;
		padding: 10px;
		white-space: pre-line;
	}
</style>
