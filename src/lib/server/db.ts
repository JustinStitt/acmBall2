import * as sqlite3 from 'sqlite3';
sqlite3.verbose();

export const db = new sqlite3.Database('balls.db');

db.query = function (sql, params) {
	return new Promise((res, rej) => {
		this.all(sql, params, (err, rows) => {
			if (err) rej(err);
			else res(rows);
		});
	});
};

db.on('trace', (msg) => {
	console.log(msg);
});
