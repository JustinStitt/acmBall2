import { writable } from 'svelte/store';

/**
 * Creates a persistable svelte store that uses localStorage to persist data
 * @param {string} key - The key to store the value in localStorage
 * @param {T} initialValue - The initial value of the store
 * @returns {writable<T>} - A writable store with added functionality to persist the data
 * @template T
 */
export function persistable<T>(key: string, initialValue: T) {
	let value = initialValue;
	try {
		const storedValue = localStorage.getItem(key);
		if (storedValue !== null) {
			value = JSON.parse(storedValue);
		}
	} catch (err) {
		console.error('Error reading from localStorage', err);
	}

	const store = writable<T>(value);

	const subscribe = store.subscribe;

	/**
	 * set the value of the store and persist it in localStorage
	 * @param {T} newValue - The new value of the store
	 */
	store.set = (newValue: T) => {
		try {
			localStorage.setItem(key, JSON.stringify(newValue));
		} catch (err) {
			console.error('Error writing to localStorage', err);
		}
		store.set(newValue);
	};

	/**
	 * Update the value of the store and persist it in localStorage
	 * @param {(value: T) => T} fn - The update function
	 */
	store.update = (fn: (value: T) => T) => {
		const newValue = fn(value);
		store.set(newValue);
	};

	/**
	 * subscribe to the store and receive the current value
	 * @param {(value: T) => void} run - The callback function
	 */
	store.subscribe = (run: (value: T) => void) =>
		subscribe((value) => {
			run(value);
		});

	return store;
}
