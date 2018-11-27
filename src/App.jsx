import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
class App extends Component {
  constructor() {
    super();
    
    this.state = {
      
      currentUser: { name: "bob" },
      messages: [
        {
          id: 1,
          type: "incomingMessage",
          content:
            "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          id: 2,
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom"
        },
        {
          id: 3,
          type: "incomingMessage",
          content:
            "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        { id: 4, type: "incomingMessage", content: "...", username: "nomnom" },
        {
          id: 5,
          type: "incomingMessage",
          content:
            "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          id: 6,
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          id: 7,
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny"
        }
      ]
    };
    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.submitMessage = this.submitMessage.bind(this);
  }
  
  submitMessage = event => {
    if (event.key == "Enter") {
      const messagesSize = this.state.messages.length;
      const newId = this.state.messages[messagesSize - 1].id + 1;
      const newContent = event.target.value;
      console.log(newContent);
      const newMessage = {
        id: newId,
        username: "Ying Dong",
        content: newContent
      };
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });

      this.webSocket.send(JSON.stringify(newMessage.username +" says "+ newMessage.content ));

    }
  };

  

  componentDidMount() {
    
    this.webSocket.onopen =  (event)=> {
      this.webSocket.send("Connected to React");
      console.log("Connected to server!!"); 
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
