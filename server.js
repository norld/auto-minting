// CHILD PROCESS
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

// CONFIG FILE
const fs = require('fs');
const fileName = './sugar/config.json';
const file = require(fileName);

// SETUP SERVER
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// ROUTE & SOCKET
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
io.on('connection', (socket) => socket.on('minting', (msg) => deploy(msg)));
server.listen(3000, () => console.log('http://localhost:3000'));

// PROGRESS FUNCTION
async function deploy(msg) {
  try {
    // VALIDATION
    io.emit('minting', 'PROGRESS');
    io.emit('minting', 'VALIDATING');
    const step1 = await exec('sugar validate ./sugar/assets');
    console.log('stdout:', step1.stdout);
    console.error('stderr:', step1.stderr);

    // UPLOADING
    io.emit('minting', 'UPLOADING');
    const step2 = await exec(
      'sugar upload -c ./sugar/config.json --cache ./sugar/cache.json ./sugar/assets'
    );
    console.log('stdout:', step2.stdout);
    console.error('stderr:', step2.stderr);

    // DEPLOYMENT
    io.emit('minting', 'DEPLOYING');
    const step3 = await exec(
      'sugar deploy -c ./sugar/config.json --cache ./sugar/cache.json -k ~/.config/solana/devnet.json'
    );
    console.log('stdout:', step3.stdout);
    console.error('stderr:', step3.stderr);

    // VERIFYING
    io.emit('minting', 'VERIFYING');
    const step4 = await exec('sugar verify --cache ./sugar/cache.json');
    console.log('stdout:', step4.stdout);
    console.error('stderr:', step4.stderr);

    // MINTING
    io.emit('minting', 'MINTING');
    const step5 = await exec(
      `sugar mint --cache ./sugar/cache.json -n ${file.number}`
    );
    console.log('stdout:', step5.stdout);
    console.error('stderr:', step5.stderr);

    // DELETE CACHE
    io.emit('minting', 'DELETE CACHE BOI');
    const step6 = await exec(`rm -rf ./sugar/cache.json`);
    console.log('stdout:', step6.stdout);
    console.error('stderr:', step6.stderr);
    io.emit('minting', 'DONE :)');
  } catch (e) {
    console.log(e);
  }
}
