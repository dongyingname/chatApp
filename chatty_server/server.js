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

//Create the WebSockets server
//Create a counter for number of clients that are connected.
//Create a userId counter, which will be used in Annoymous User #{userId} 
//if the a name is not entered.
const wss = new WebSocket.Server({ server });
let connectCounter = 0;
let userId = 0;

//function that generate a random color code for the newly logged-in user
//Length:6.
//Doens't contain "#", which would cause an issue when being parsed.
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Set up a callback that will run when a client connects to the server
//when a client connects they are assigned a socket, represented by
//the ws parameter in the callback.
wss.on("connection", ws => {
  console.log(" A client has connected");
  userId++;
  connectCounter++;
  console.log("Current Number of Connections:", connectCounter);

  //A new client is given a color of their username and a userId, which 
  const newConnectionStates = JSON.stringify({
    userColor: getRandomColor(),
    userId
  });
  ws.send(newConnectionStates);

  //Everytime a new client is connected all the clients are broadcast 
  //a new numberOfClients
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      const numberOfClients = JSON.stringify({
        connectCounter: connectCounter
      });
      client.send(numberOfClients);
    }
  });
  
  //For every data is sent to the server it is broadcast to all the clients.
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  });

  //Set up a callback for when a client closes the socket.
  //On losing a connect the number of clients reduces and is broadcast to all clients. 
  ws.on("close", () => {
    console.log("A client has disconnected");
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
