const ngrok = require('ngrok');
const nodemon = require('nodemon');
const Logger = require('./lib/Logger');

const logger = new Logger('🔋');


async function startNgrok() {
  const url = await ngrok.connect({
      proto: 'http',
      addr: 3001,
      subdomain: 'alecrodgers',
  });
  logger.log(`Ngrok started @ ${url}`); 
}

function startNodemon() {
  nodemon({
    script: 'server',
    ext: 'js'
  });
  
  nodemon.on('start', function () {
      logger.log('Nodemon started');
      startNgrok();
    }).on('quit', function () {
      logger.log('Nodemon has quit');
    }).on('restart', function (files) {
      logger.log('Nodemon restarted due to: ', files);
    });
}

function startServer() {
  startNodemon();
}

startServer();
