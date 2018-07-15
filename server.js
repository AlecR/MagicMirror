const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3001;

const weatherRouter = require('./routes/WeatherRoutes');
const smartLightsRouter = require('./routes/SmartLightsRoutes');
const clockRouter = require('./routes/ClockRoutes');
const toDoRouter = require('./routes/ToDoRoutes');
const mirrorRouter = require('./routes/MirrorRoutes');
const hackerNewsRouter = require('./routes/HackerNewsRoutes');

const middleware = function (_, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', ['GET', 'PUT']);
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
	next();
};

addRoutes = (name, router) => {
	app.use(`/api/${name}`, middleware, router)
};

app.use(bodyParser.json());
app.use(cookieParser());

addRoutes('weather', weatherRouter);
addRoutes('smartlights', smartLightsRouter);
addRoutes('calendar', clockRouter);
addRoutes('todo', toDoRouter);
addRoutes('mirror', mirrorRouter);
addRoutes('hackernews', hackerNewsRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});