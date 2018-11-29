import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import uuidv1 from "uuid/v1";

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
      <ChatBar submitMessage={props.submitMessage} changeUser={props.changeUser} />
    </div>
  );
};
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

  submitMessage = event => {
    console.log("trying to submit Message")
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
  };submitMessage

  componentDidMount() {
    this.webSocket.onopen = () => {
      console.log("Connected to server!!");
    };
    this.webSocket.onmessage = event => {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData);

      if (parsedData.connectCounter) {
        const numberOfClients = parsedData.connectCounter;
        this.setState({ numberOfClients: numberOfClients });
      } else if (parsedData.userId && parsedData.userColor) {
        // console.log("Ready to get newConnectionStates!!!");
        const userId = parsedData.userId;
        const userColor = parsedData.userColor;
        console.log("userColor",userColor);
        this.setState({
          currentUser: { name: `Annoymous User # ${userId}` },
          userColor: userColor
        });
      } else {
        switch (parsedData.type) {
          case "incomingNotification":
            const notifications = this.state.messages.concat(parsedData);
            this.setState({
              messages: notifications
            });
            break;

          case "incomingMessage":
            const messages = this.state.messages.concat(parsedData);
            this.setState({ messages: messages });
            break;
        }
      }
    };
  }

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
