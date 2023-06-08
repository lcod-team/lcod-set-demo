<script>
	import { call } from '@lcod/backend/client';
	import categories from './categories.json';
	import { onMount } from 'svelte';

	export let edition = '';
	export let limit;
	let live = false;
	let data = 'n/a';

	$: if (live && edition != '') {
		call({ edition, limit }).then((d) => (data = d));
	}
	onMount(() => (live = true));
</script>

{#if edition == ''}
	{#each Object.keys(categories) as category}
		<div
			on:click={async (e) => {
				e.preventDefault();
				edition = categories[category];
			}}
			on:keydown
		>
			<slot name="post" title={category} description="">
				<h2>{category}</h2>
			</slot>
		</div>
	{/each}
{:else if Array.isArray(data)}
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
