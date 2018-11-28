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
    this.changeUser=this.changeUser.bind(this);
  }

  submitMessage = event => {
    if (event.key === "Enter") {
      const newId = uuidv1();
      const newContent = event.target.value;
      const newMessage = {
        id: newId,
        username: this.state.currentUser.name,
        content: newContent
      };
      this.webSocket.send(JSON.stringify(newMessage));
    }
  };

  changeUser = event => {
    if (event.key === "Enter") {
      const newUsername = event.target.value;
      console.log(newUsername);
      this.webSocket.send(JSON.stringify(newUsername));
    }
  };
  componentDidMount() {
    this.webSocket.onopen = () => {
      console.log("Connected to server!!");
    };
    this.webSocket.onmessage = event => {
      // if(typeof event.data.username != "undefined")
      const parsedData = JSON.parse(event.data);
      if (parsedData.username != undefined) {
        const newMessage = parsedData;
        // console.log(newMessage);
        const messages = this.state.messages.concat(newMessage);
        this.setState({ messages: messages });
      } else{
        const newUser = parsedData;
        this.setState({currentUser:{name:newUser}});
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
