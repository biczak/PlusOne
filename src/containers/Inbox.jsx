import React, { Component } from 'react';
import io from 'socket.io-client';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import { connect } from 'react-redux';
import { sendToUser, sendMessage } from '../actions/actions';
class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], targetUser: 161 };
    this.sendHandler = this.sendHandler.bind(this);
    
    // Connect to the server
    this.socket = io("http://localhost:3000", { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  socket = {};
  componentWillMount() {
    console.log(this.props);
    const messages = this.props.messages.split(" ");
    this.state.messages.push(messages);
  }
  sendHandler(message) {
    this.state.message_id += 1;
    const messageObject = {
      username: this.props.username,
      message,
      targetUser: this.state.targetUser,
    };
    this.props.sendMsg(messageObject);
    this.props.toTarget(messageObject);
    // Emit the message to the server
    this.socket.emit('client:message', messageObject);
  
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    const targetUser = this.state.targetUser;
    console.log('You added a message:', message);
    messages.push(message);
    this.setState({ messages, targetUser });
  }

  render() {
    return (
      <div className="container">
        <h3>Leo's Socket.io</h3>
        <MessageList messages={this.state.messages} userInfo={this.props.display_name} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}

const mapStateToProps = state => state.user;

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: (message) => {
      dispatch(sendMessage(message));
    },
    toTarget: (message) => {
      dispatch(sendToUser(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inbox);
