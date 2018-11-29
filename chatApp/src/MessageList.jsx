import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    const list = this.props.messages.map(message => {
      console.log(message.id);

      return (
        <Message
          message={message}
          key={message.key}
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
