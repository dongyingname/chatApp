import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import uuidv1 from "uuid/v1";
class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: { name: "bob" },
      messages: [
        {
          type: "incomingMessage",
          content:
            "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        }
      ]
    };
    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage = event => {
    if (event.key == "Enter") {
      // const messagesSize = this.state.messages.length;
      const newId = uuidv1();
      const newContent = event.target.value;
      // console.log(newContent);
      const newMessage = {
        id: newId,
        username: "Ying Dong",
        content: newContent
      };
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });

      this.webSocket.send(
        JSON.stringify(newMessage.username + " says " + newMessage.content)
      );
    }
  };

  componentDidMount() {
    this.webSocket.onopen = (event) => {
      this.webSocket.send("Connected to React");
      console.log("Connected to server!!");
    };
    this.webSocket.onmessage = (event) => {
      const broadcastMessage = event.data;
      console.log("broadcast",broadcastMessage);
    }
    
  }

  // componentDidUpdate(){

  // }

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
