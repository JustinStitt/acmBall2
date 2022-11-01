import { readable, writable } from 'svelte/store';

export const starting_text = readable(
	"function setup() { // runs once at start\n  console.log('hi')\n}\n\nfunction draw() { // runs every frame\n  console.log('drawing')\n}"
);
export const editor_text = writable('');
