import { lcodHandle } from '@lcod/backend'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const response = await lcodHandle({ event, resolve });
    return response;
}