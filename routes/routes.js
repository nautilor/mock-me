const _underscore = require("underscore");

/*
 * These the routes to mock
 * A route is defined by the following keys
 * 
 * path    --> The API endpoint that needs to be called
 * headers --> If extra headers are needed in the response just add then as a list here
 * body    --> If the endpoint shoud just return a body you can put it in here
 * status  --> The status code of the response
 * method  --> Type of reuqest allowed for the endpoint, values are 'GET', 'POST', 'DELETE', 'UPDATE', 'ALL'
 * 
 * N.B.    --> for the response body you can define a function to execute where you could run some code 
 */
const routes = [
    {
        path: '/welcome/:name',
        body: welcome,
        status: 200,
        method: "GET"
    },
    {
        path: '/users/',
        body: save_user,
        status: 200,
        method: "POST"
    },
    {
        path: '/users/',
        body: get_user,
        status: 200,
        method: "GET"
    },
]

let users = []

async function save_user(route, req, res) {
    user = req.json;
    console.log(user);
    users.push(user);
    return res.status(route.status).json(users);
}

async function get_user(route, req, res) {
    return res.status(route.status).json(users);
}

async function welcome(route, req, res) {
    name  = req.params.name
    return res.status(route.status).json({ "message": `Welcome ${name}!` });
}

exports.routes = routes;
