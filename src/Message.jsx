import React, { Component } from "react";
class Message extends Component {
  render() {
    // const type=this.props.message.type;
    const content=this.props.message.content; 
    const username=this.props.message.username; 
    const notification = this.props.message.notification;
    return (
        <li>
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">
            {content}
          </span>
        </div>
        <div className="message system">
          {notification}
        </div>
     </li>
    );
  }
}
export default Message;
