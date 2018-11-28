import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import uuidv1 from "uuid/v1";
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: "bob" },
      messages: []
    };
    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.submitMessage = this.submitMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  submitMessage = event => {
    if (event.key === "Enter") {
      const newId = uuidv1();
      const newContent = event.target.value;
      const newMessage = {
        type: "incomingMessage",
        id: newId,
        username: this.state.currentUser.name,
        content: newContent
      };
      this.webSocket.send(JSON.stringify(newMessage));
    }
  };

  changeUser = event => {
    if (event.key === "Enter") {
      const newId = uuidv1();
      const newUsername = event.target.value;
      const currentUser = this.state.currentUser.name;
      console.log("newUserName", newUsername);
      const newUserChange = {
        type: "incomingNotification",
        newUsername: newUsername,
        id: newId,
        notification: `${currentUser} changed their name to ${newUsername}`
      };
      console.log(newUserChange);
      this.webSocket.send(JSON.stringify(newUserChange));
    }
  };
  componentDidMount() {
    this.webSocket.onopen = () => {
      console.log("Connected to server!!");
    };
    this.webSocket.onmessage = event => {
      const parsedData = JSON.parse(event.data);
      console.log("data from websocket", parsedData.type);
      switch (parsedData.type) {
        case "incomingNotification":
          const newUser = parsedData.newUsername;
          const newNotification = parsedData;
          const notifications = this.state.messages.concat(newNotification);
          this.setState({
            currentUser: { name: newUser },
            messages: notifications
          });
          break;
        case "incomingMessage":
          const newMessage = parsedData;
          console.log(newMessage);
          const messages = this.state.messages.concat(newMessage);
          this.setState({ messages: messages });
          break;
      }
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          newMessage={this.submitMessage}
          changeUser={this.changeUser}
        />
      </div>
    );
  }
}
export default App;
