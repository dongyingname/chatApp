import React, { Component } from "react";
import Message from "./Message.jsx";

const printMessages = () => {
  this.state.messages.map(message => {
    let type = message.type;
    let content = message.content;
    let username = message.username;
    return <Message />;
  });
};
class MessageList extends Component {
  constructor() {
    super();
    this.state = {
      messages: [
        {
          type: "incomingMessage",
          content:
            "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom"
        },
        {
          type: "incomingMessage",
          content:
            "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        }
      ]
    };
  }

  render() {
    return (
      <main className="messages">
        <Message />
      </main>
    );
  }
}
export default MessageList;
