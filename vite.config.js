import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { lcodBackendConfig } from '@lcod/backend/config';

export default defineConfig({
	plugins: [sveltekit(), lcodBackendConfig()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
