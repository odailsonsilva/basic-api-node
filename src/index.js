const http = require('http');
const { URL } = require('url');

const routes = require('./routes')
const { bodyParse } = require('../src/helpers/bodyParse')
// const UserController = require('./controllers/UserController')

const baseUrl = 'http://localhost:'
const port = 3000

// criar server
const server = http.createServer((req, res) => {
    const parseUrl = new URL(`${baseUrl}${port}${req.url}`)

    let { pathname } = parseUrl
    let id = null;

    const splitEndpoint = pathname
        .split('/')
        .filter(Boolean); // remover os vzios
    // .filter((routeItem) => Boolean(routeItem)); // mesma coisa do de cima

    if (splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`;
        id = splitEndpoint[1];
    }

    const route = routes.find((routeObj) => (
        routeObj.endpoint === pathname && routeObj.method === req.method
    ));

    if (route) {
        req.query = Object.fromEntries(parseUrl.searchParams);
        req.params = { id };

        res.send = (statusCode, body) => {
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(body));
        }

        if (['POST', 'PUT'].includes(req.method)) {
            bodyParse(req, () => route.handler(req, res))
        } else {
            route.handler(req, res);
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`Cannot ${req.method} ${pathname}`);
    }

    // console.log(`Request method: ${req.method} | Endpoint: ${req.url}`);

    // if (req.url === '/users' && req.method === 'GET') {
    //     UserController.listUsers(req, res)
    // } else {
    //     res.writeHead(404, { 'Content-Type': 'text/html' });
    //     res.end(`Cannot ${req.method} ${req.url}`);
    // }

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.end('<h1>Hello World!</h1>');
})

// executar
server.listen(port, () => console.log('Server started at http://localhost:3000'));

