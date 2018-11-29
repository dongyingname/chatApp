import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input
          onKeyPress={this.props.changeUser}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
        />
        <input
          onKeyPress={this.props.newMessage}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;
