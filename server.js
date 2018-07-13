const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3001;

const weatherRouter = require('./routes/WeatherRoutes');
const smartLightsRouter = require('./routes/SmartLightsRoutes');
const clockRouter = require('./routes/ClockRoutes');
const toDoRouter = require('./routes/ToDoRoutes');
const mirrorRoutes = require('./routes/MirrorRoutes');

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

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/weather', middleware, weatherRouter);
app.use('/api/smartlights', middleware, smartLightsRouter);
app.use('/api/calendar', middleware, clockRouter);
app.use('/api/todo', middleware, toDoRouter);
app.use('/api/mirror', middleware, mirrorRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});