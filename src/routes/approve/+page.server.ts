import type { RequestHandler, PageServerLoad } from '@sveltejs/kit';
import { db } from '$lib/server/db.ts';

export async function load({ params }): PageServerLoad {
	try {
		let tiles = await db.query(
			'SELECT * FROM (SELECT a.* FROM Submissions a LEFT OUTER JOIN Submissions b ON a.name = b.name AND a.version < b.version WHERE b.name IS NULL) as c WHERE c.denied = 0 AND c.approved = 0;'
		);
		if (!tiles) tiles = [];
		return { submissions: tiles };
	} catch (err) {
		console.log(err);
		return { submissions: [] };
	}
}
