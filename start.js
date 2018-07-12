const ngrok = require('ngrok');
const nodemon = require('nodemon');


async function startNgrok() {
  const url = await ngrok.connect({
      proto: 'http',
      addr: 3001,
      subdomain: 'alecrodgers',
  })
  console.log(`[NGROK] Started @ ${url}`); 
}

function startNodemon() {
  nodemon({
    script: 'server',
    ext: 'js'
  });
  
  nodemon.on('start', function () {
      console.log('[NODEMON] App has started');
    }).on('quit', function () {
      console.log('[NODEMON] App has quit');
    }).on('restart', function (files) {
      console.log('[NODEMON] App restarted due to: ', files);
    });
}

function startServer() {
  startNodemon();
  startNgrok();
}

startServer();
