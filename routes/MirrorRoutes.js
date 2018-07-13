const express = require('express');
const spawn = require('child_process').spawn;
const fs = require('fs');
const Logger = require('../lib/Logger');

const router = express.Router();
const logger = new Logger('💻');


router.get('/modules/index', (_, res) => {
	const indexProcess = spawn('python', ['./index_modules.py']);
	indexProcess.stdout.on('data', data => {
		const data_string = data.toString();
		const data_json = JSON.parse(data_string);
		logger.log('Indexed modules');
		indexProcess.kill();
		res.status(200).json(data_json);
	})
});

router.post('/config', (req, res) => {
	const moduleData = JSON.stringify(req.body);
	fs.writeFile('./client/src/config.json', moduleData, (err) => {
		if(err) {
			logger.log('Failed to updated config.json')
			res.sendStatus(500);
		} else {
			logger.log('Updated config.json');
			res.sendStatus(200);
		}
	});
});

module.exports = router;