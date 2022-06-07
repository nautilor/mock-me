const app = require('express')();
const router = require("./routes/routes.js");
const bodyParser = require("body-parser");
const port = 3000;

/**
 * 
 * MockMe by Nautilor
 * 
 * A mocking tool for JSON rest api
 * 
 */
async function main() {
    // this will parse the body of the requests as json data
    app.use(bodyParser.json());
    router.routes.forEach(route => {
        console.log(`* Configuring route ${route.path} with method ${route.method}`);
        // add all the routes to express 
        route.definition = (req, res) => defineRoute(route, req, res);

        switch (route.method) {
            case "GET":
                app.get(route.path, route.definition);
                break;
            case "POST":
                app.post(route.path, route.definition);
                break;
            case "DELETE":
                app.delete(route.path, route.definition);
                break;
            case "PUT":
                app.put(route.path, route.definition);
                break;
            case "UPDATE":
                app.update(route.path, route.definition);
                break;
            case "ALL":
                app.all(route.path, route.definition);
                break;
            default:
                console.log(`* E: Ignoring route with unknown method ${route.method}`);
        }
    });
    // Listen on `port` for incoming requests
    app.listen(port, () => console.log(`* Started on port ${port}...`));
}

const defineRoute = async (route, req, res) => {
    // process only if the req method matched the configured one or if the route is configured to accept all requests
    // return 405 "method not allowed" otherwise
    return req.method === route.method || route.method == "ALL" ? parseRoute(route, req, res) : res.status(405).end();
}

const parseRoute = async (route, req, res) => {
    // If the configuration has custom headers just set them
    route.headers && route.headers.forEach(header => res.set(header.name, header.value));
    // If the configuration body is a function execute it, send the body otherwise
    // Be aware that the function must return back data to the client
    return typeof (route.body) === "function" ? route.body(route, req, res) : res.status(route.status).send(route.body);
}

main()
