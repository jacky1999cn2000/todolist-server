'use strict';

var koa = require('koa');
var app = module.exports = koa();
var routes = require('koa-route');
var cors = require('koa-cors');

var todoController = require('./controllers/todoController');
app.use(cors({
	origin: '*',
	methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS'
}));
app.use(routes.get('/todos/', todoController.getTodos));
app.use(routes.get('/notes/', todoController.getNotes));
// app.use(routes.post('/client/', clientController.createClient));
// app.use(routes.delete('/client/:id', clientController.destroyClient));

app.listen(3000);
console.log('The app is listening at port 3000');
