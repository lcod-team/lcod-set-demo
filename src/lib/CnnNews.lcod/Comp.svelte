<script>
	import { call } from '@lcod/backend/client';
	import { onMount } from 'svelte';

	export let edition = '';
	let data = 'n/a';
	onMount(async () => {
		data = await call({ edition });
	});
</script>

{#if Array.isArray(data)}
	{#each data as item}
		<slot
			name="post"
			title={item.title}
			description={item.description}
			link={item.link}
			image={item.image}
		>
			<h2><a href={item.link}>{item.title}</a></h2>
			<h3>{item.description}</h3>
			<img src={item.image} alt={item.title} width="300px" />
			<hr />
		</slot>
	{:else}
		<slot name="empty">no news!</slot>
	{/each}
{:else}
	<slot name="loading">loading...</slot>
{/if}
