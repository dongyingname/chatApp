// server.js

const express = require("express");
const WebSocket = require("ws");

// Set the port to 3001
const PORT = 3001;

const clients = [];
// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new WebSocket.Server({ server });
let connectCounter = 0;



//function that generate a random color for the newly logged-in user
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '';
  for   (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  
  console.log("Client connected");
  connectCounter++;

  const userColor=JSON.stringify(getRandomColor());
  ws.send(userColor);

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      const numberOfClients = JSON.stringify({
        connectCounter: connectCounter
      });
      client.send(numberOfClients);
    }
  });

  console.log("Current Number of Connections:", connectCounter);
  ws.on("message", function incoming(data) {
    // console.log(JSON.parse(data));
    console.log(wss.clients);
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.

  ws.on("close", () => {
    console.log("Client disconnected");
    connectCounter--;
    console.log("Current Number of Connections:", connectCounter);
    wss.clients.forEach(function each(client) {
      const numberOfClients = JSON.stringify({
        connectCounter: connectCounter
      });
      client.send(numberOfClients);
    });
  });
});
