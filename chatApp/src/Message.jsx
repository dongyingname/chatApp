//Message render one message element

import React, { Component } from "react";
class Message extends Component {
  render() {
    const {
      content,
      username,
      notification,
      nameColor,
      imageURL
    } = this.props.message;
    const styles = {
      color: "#" + nameColor
    };
    return (
      <li>
        <div className="message">
          <span className="message-username" style={styles}>
            {username}
          </span>
          <span className="message-content">{content}</span>
        </div>
        <div className="message system">{notification}</div>
        <img src={imageURL} />
      </li>
    );
  }
}
export default Message;
