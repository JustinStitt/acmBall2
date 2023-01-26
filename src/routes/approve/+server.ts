import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db.ts';

export const POST: RequestHandler = async ({ request }) => {
	const { name, version, status } = await request.json();
	const approved = status == 'approved';
	const denied = status == 'denied';
	try {
		await db.query(
			'UPDATE Submissions SET approved = ?, denied = ? WHERE name = ? AND version = ?;',
			[approved, denied, name, version]
		);
	} catch (err) {
		return new Response(err, {
			status: 500,
			headers: { 'Content-Type': 'text/plain' }
		});
	}
	return new Response('Success!', {
		status: 200,
		headers: { 'Content-Type': 'text/plain' }
	});
};
