import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    const list = this.props.messages.map(message => {
      return <Message message={message} />;
    });

    return <main className="messages">{list}</main>;
  }
}
export default MessageList;
