import { createServer } from 'http';

const port = 3000;

export function keepAlive () {
	const server = createServer((req, res) => {
		res.statusCode = 307; // redirect
		res.setHeader('Location', 'https://wiki.4hcomputers.club/wiki/Robo_Cy');
		res.end();
	});
	
	server.listen(port, () => {
		console.log(`Keep alive server running on port ${port}`);
	});
}