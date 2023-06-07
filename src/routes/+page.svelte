<script>
	import Card from '$lib/Card.lcod';
	import Box from '$lib/Box.lcod';
	import WiredNews from '$lib/WiredNews.lcod';

	let edition = '';
</script>

<div>
	<Box --style="none" --background="darkgrey">
		<Box --align="center" --background="lightpink"
			><span title="menu" on:click={() => (edition = '')} on:keydown>
				{#if edition == ''}
					News
				{:else}
					← {edition.replace(/.*?(\w+$)/, '$1')}
				{/if}
			</span></Box
		>
		<WiredNews limit={5} bind:edition>
			<Card
				slot="post"
				let:title
				{title}
				let:description
				description={description == title ? '' : description}
				let:link
				{link}
				let:image
				{image}
			/>
		</WiredNews>
	</Box>
</div>

<style>
	div {
		max-width: 300px;
	}
	span {
		font-weight: bolder;
		cursor: pointer;
	}
</style>
