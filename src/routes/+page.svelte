<script>
	import Card from '$lib/Card.lcod';
	import Box from '$lib/Box.lcod';
	import CnnNews from '$lib/CnnNews.lcod';
</script>

<div>
	<Box --style="none">
		<Box --align="center" --background="lightpink"><span>News</span></Box>
		<CnnNews edition="">
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
		</CnnNews>
	</Box>
</div>

<style>
	div {
		max-width: 300px;
	}
	span {
		font-weight: bolder;
	}
</style>
