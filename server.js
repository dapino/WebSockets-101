'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  fs.createReadStream(path.join(__dirname, 'public', 'index.html')).pipe(res);
});
const port = process.env.PORT ?? 3000;

const wss = new WebSocket.Server({
  server,
  path: '/ws',
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Message received: ', message);
  });

  setInterval(() => {
    ws.send('Hello, welcome to dp WS');
  }, 10000);
});

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
