<script>
	import Box from '../Box.lcod';

	export let title = 'title';
	export let description = 'description';
	export let image = '';
	export let link = '#';
</script>

<Box --background="lightblue" --padding="0px" --margin="20px 0px">
	<a href={link} target="_blank">
		<Box --background="lightgreen" --style="none" --padding="10px">
			<span>{title}</span>
		</Box>
	</a>
	{#if image != '' || description != ''}
		<div>
			{#if image != ''}
				<img src={image} alt={title} />
			{/if}
			{#if description != ''}
				<span>{description}</span>
			{/if}
		</div>
	{/if}
</Box>

<style>
	span {
		text-align: center;
	}
	div {
		margin: 10px;
		padding-bottom: 10px;
	}
	img {
		border-radius: 20px;
		width: 100%;
	}
	a:any-link {
		color: unset;
		text-decoration: none;
	}
</style>
