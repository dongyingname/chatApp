import React, { Component } from "react";
class MessageList extends Component {
  render() {
    // const type=this.props.message.type;
    const content=this.props.message.content; 
    const username=this.props.message.username; 

    return (
        <div>
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">
            {content}
          </span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
     </div>
    );
  }
}
export default MessageList;
