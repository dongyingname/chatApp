import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import uuidv1 from "uuid/v1";
class App extends Component {
  constructor() {
    super();
    this.state = {
      userColor: "red",
      currentUser: { name: "BOB!!!!!" },
      numberOfClients: 0,
      messages: [
      ]
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
        nameColor: this.state.userColor,
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

  componentDidMount() {
    this.webSocket.onopen = () => {
      console.log("Connected to server!!");
    };
    this.webSocket.onmessage = event => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.connectCounter) {
        const numberOfClients = parsedData.connectCounter;
        this.setState({ numberOfClients: numberOfClients });

      } else if (parsedData.length === 6) {
        this.setState({ userColor: "#" + parsedData });

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
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <h3 className="number-clients">
            {this.state.numberOfClients} User(s) Online
          </h3>
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
