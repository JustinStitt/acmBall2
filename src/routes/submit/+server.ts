import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db.ts';

export const POST: RequestHandler = async ({ request }) => {
	const { name, code, version } = await request.json();
	try {
		await db.query(
			'INSERT INTO Submissions (name, code, version, approved, denied) VALUES (?, ?, ?, false, false);',
			[name, code, version]
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
