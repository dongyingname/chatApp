import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {

  render() {
    const list = this.props.messages.map(message => {
      let type = message.type;
      let content = message.content;
      let username = message.username;
      return <Message type={type} content={content} username={username} />;
    });

    return <main className="messages" >{list}</main>;
  }
}
export default MessageList;
