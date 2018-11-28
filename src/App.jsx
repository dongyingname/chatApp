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
  }

  submitMessage = event => {
    if (event.key == "Enter") {
      const newId = uuidv1();
      const newContent = event.target.value;
      const newMessage = {
        id: newId,
        username: "Ying Dong",
        content: newContent
      };

      this.webSocket.send(JSON.stringify(newMessage));
    }
  };

  componentDidMount() {
    this.webSocket.onopen = () => {
      console.log("Connected to server!!");
    };
    this.webSocket.onmessage = event => {
      const newMessage = JSON.parse(event.data);
      console.log(newMessage);
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
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
          currentUser={this.state.currentUser}
          hitEnter={this.submitMessage}
        />
      </div>
    );
  }
}
export default App;
