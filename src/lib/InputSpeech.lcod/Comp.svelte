<script>
	import { onDestroy, onMount } from 'svelte';
	import langs from './langs.json';

	const storeKey = 'InputSpeech.lcod/selectedLang';

	let speech;
	let text;

	let isRecording = false;
	let selectedLang = '';

	onMount(() => {
		selectedLang =
			localStorage.getItem(storeKey) ?? navigator.language ?? navigator.userLanguage ?? 'en-US';

		const SpeechRecognition = window?.SpeechRecognition || window?.webkitSpeechRecognition;
		speech = new SpeechRecognition();
		speech.continuous = true;
		speech.interimResults = true;
		speech.onresult = (evt) => {
			console.log('result', evt.results);
			console.log('lang', speech.lang);

			text = [...evt.results].map((r) => r[0]?.transcript.trim()).join(' ');
		};
	});

	onDestroy(() => {
		speech?.stop();
	});

	function toggle() {
		if (!isRecording) {
			speech.start();
		} else {
			speech.stop();
		}
		isRecording = !isRecording;
	}

	$: if (selectedLang != '') localStorage.setItem(storeKey, selectedLang);
	$: if (speech) speech.lang = selectedLang;
</script>

<div class="comp">
	<div class="text">
		<slot name="input">
			<textarea bind:value={text} disabled={isRecording} />
		</slot>
	</div>
	<div class="lang">
		{#if selectedLang != ''}
			<select bind:value={selectedLang}>
				{#each Object.entries(langs) as lang}
					<option value={lang[0]}>{lang[1]}</option>
				{/each}
			</select>
		{:else}
			<select>
				<option>Initialization...</option>
			</select>
		{/if}
	</div>
	<span class="mic" on:click={toggle} on:keypress class:isRecording>🎤</span>
</div>

<style>
	.comp {
		display: flex;
		flex-direction: row;
		border: solid;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 5px;
		padding: 5px;
	}
	.text {
		flex-grow: 1;
		height: 50px;
		display: grid;
	}
	textarea {
		border: none;
		resize: none;
	}
	.text > *,
	.lang > * {
		width: 100%;
		height: 100%;
	}

	@keyframes recording {
		from {
			padding: 15px;
			margin: 5px;
		}
		to {
			padding: 5px;
			margin: 15px;
		}
	}
	.mic {
		cursor: pointer;
		border-radius: 50%;
		background-color: lightgreen;
		padding: 15px;
		margin: 5px;
		transition: 1s;
	}
	.isRecording {
		background-color: red;
		animation-name: recording;
		animation-iteration-count: infinite;
		animation-duration: 1s;
		animation-direction: alternate;
	}
</style>
