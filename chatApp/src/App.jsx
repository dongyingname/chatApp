//Collect all the tools and children components
//Use uuid version 1 to generate a timestamp ID.
import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import uuidv1 from "uuid/v1";

//ChatttPage function takes an object, which contains all the props, represented by props,
// of <ChattyPage /> and returns HTML elements. It pass the props down to its children.
const ChattyPage = props => {
  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <h3 className="number-clients">
          {props.numberOfClients} User(s) Online
        </h3>
      </nav>
      <MessageList messages={props.messages} />
      <ChatBar
        submitMessage={props.submitMessage}
        changeUser={props.changeUser}
      />
    </div>
  );
};

//Main component of this project.
//Client side data are in this.state. The websocket connection is established in the constructor.
class App extends Component {
  constructor() {
    super();
    this.state = {
      userColor: "",
      currentUser: { name: "" },
      numberOfClients: 0,
      messages: []
    };
    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.submitMessage = this.submitMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  //submitMessage: A method that adds "keydown" handler to ChatBar component's message bar;
  //  When "Enter" is hit in the message bar the method will send the newMessage object to the 
  //  WebSocket server.
  submitMessage = event => {
    if (event.key === "Enter") {
      const newKey = uuidv1();
      const newContent = event.target.value;
      let imageURL = "";
      const arr = newContent.split(" ");
      for (let i of arr) {
        if (i.match(/[^/]+(jpg|png|gif)$/)) {
          imageURL = i;
        }
      }
      const newMessage = {
        nameColor: this.state.userColor,
        type: "incomingMessage",
        key: newKey,
        username: this.state.currentUser.name,
        content: newContent,
        imageURL: imageURL
      };
      this.webSocket.send(JSON.stringify(newMessage));
    }
  };

//changeUser: A method that adds "keydown" handler to the ChatBar component's username bar;
//  When "Enter" is hit in the username bar the method will send the newUserChange object to the 
//  WebSocket server, and at the same time setStatecurrentUser: { name: newUsername }.
  changeUser = event => {
    if (event.key === "Enter") {
      const newId = uuidv1();
      const newUsername = event.target.value;
      const currentUser = this.state.currentUser.name;
      const newUserChange = {
        nameColor: this.state.userColor,
        type: "incomingNotification",
        newUsername: newUsername,
        id: newId,
        notification: `${currentUser} changed their name to ${newUsername}`
      };
      this.setState({
        currentUser: { name: newUsername }
      });

      this.webSocket.send(JSON.stringify(newUserChange));
    }
  };

//componentDidMount: Its content is executed after the first rendering is excuted.

//Add "onopen" handler to WebSocket server. Once the connection between the client and the ws server
//is open the client sends a message to notify the server that they are connected.
//Add onmessage listener to the ws server. 

//Handles the ws server response based on the content of the data.


  componentDidMount() {
    this.webSocket.onopen = () => {
      console.log("Connected to server!!");
    };
    this.webSocket.onmessage = event => {
      const parsedData = JSON.parse(event.data);

      //  Getting a new connection or losing a existing connection will send connectCounter to update the 
      //  numberOfClients state.
      if (parsedData.connectCounter) {
        
        const numberOfClients = parsedData.connectCounter;
        this.setState({ numberOfClients: numberOfClients });
        
        //  A new client will be sent a userId and userColor which will update its respective states.
      } else if (parsedData.userId && parsedData.userColor) {
        const userId = parsedData.userId;
        const userColor = parsedData.userColor;
        this.setState({
          currentUser: { name: `Annoymous User # ${userId}` },
          userColor: userColor
        });

      //  If the data contains the key "type" the client will append the new data to the messages state.  
      } else {
        switch (parsedData.type) {
          //Username changes
          case "incomingNotification":
            const notifications = this.state.messages.concat(parsedData);
            this.setState({
              messages: notifications
            });
            break;
          //A new message is "Entered"
          case "incomingMessage":
            const messages = this.state.messages.concat(parsedData);
            this.setState({ messages: messages });
            break;
        }
      }
    };
  }

  //this.state.numberOfClients:  A number. The number of live connections between clients and the
  //ws server on the the header of the page as "this.state.numberOfClients User(s) Online"
  //this.state.messages: An array. The contents in the state messages.
  render() {
    return (
      <ChattyPage
        numberOfClients={this.state.numberOfClients}
        messages={this.state.messages}
        submitMessage={this.submitMessage}
        changeUser={this.changeUser}
      />
    );
  }
}
export default App;
