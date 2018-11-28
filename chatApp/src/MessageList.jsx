import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    const list = this.props.messages.map(message => {
      return (
        <Message
          message={message}
          key={message.id}
        />
      );
    });

    return (
      <main className="messages">
        <ul>{list}</ul>
      </main>
    );
  }
}
export default MessageList;
