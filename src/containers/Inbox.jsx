import React, { Component } from 'react';
import io from 'socket.io-client';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import ChatList from '../components/ChatList';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/actions';
import { Message, Button, Icon, Segment, Header } from 'semantic-ui-react';
import { sendToUser, getUserMessages } from '../utils/utils';
import $ from 'jquery';
import '../../public/styles/chat.scss';
class Inbox extends Component {
  socket = {};
  timeoutVar;
  constructor(props) {
    super(props);
    this.state = { messages: [], flag: false, recipient_id: 161, otherUser: '' };
    this.sendHandler = this.sendHandler.bind(this);
    this.newMessage = this.newMessage.bind(this);
    this.usersOrMessages = this.usersOrMessages.bind(this);
    this.switchToMessages = this.switchToMessages.bind(this);
    this.showMessages = this.showMessages.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.backButton = this.backButton.bind(this);
    // Connect to the server
    this.socket = io(window.location.origin).connect();
    this.socket.on('server:message', message => {
      $('.typingAlert').css("visibility", "hidden");
      clearTimeout(this.timeoutVar);
      this.newMessage(message);
    });
    this.socket.on('user:isTyping', data => {
        $('.typingAlert').css("visibility", "visible");
        this.timeoutVar = setTimeout(() => {
          $('.typingAlert').css("visibility", "hidden");
        }, 3500);
    });
    // Listen for messages from the server
  }

  componentWillMount() {
    fetch(`/messages/${this.props.id}`, { credentials: 'include' })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ messages: data });
      });
  }
  newMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }
  sendHandler(message) {
    const messageObject = {
      message,
      sender_id: this.props.id,
      userName: this.props.display_name,
      recipient_id: this.state.recipient_id,
    };

  // Emit the message to the server
    this.addMessage(messageObject);
  }

  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
    // Append the message to the component state
    fetch(`users/${message.sender_id}`, { credentials: 'include' })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        message.userName = data.display_name;
        this.props.sendMsg(message);
        this.props.toTarget(message);
        return message;
      })
      console.log(message);
      this.socket.emit('send:message', message);
  }
  switchToMessages(e) {
    console.log(e);
    console.log(this.props);
    const filter = this.state.messages.filter((msg) => {
      if(msg.sender_id == e) {
        this.setState({ otherUser: msg.userName})
      }
      return (msg.sender_id == e && msg.recipient_id === this.props.id) || (msg.sender_id === this.props.id && msg.recipient_id == e);
    });
    let newArray = [];
    const recipient = Number(e);
    console.log(this.state.messages);
    console.log('New Recipient', recipient);
    return this.showMessages(filter, recipient);
  }
  showMessages(arr, otherUser) {
    this.setState({ messages: arr, flag: true, recipient_id: otherUser });
  }
  changeHandler() {
    this.socket.emit('user:typing', `${this.state.otherUser} is typing...`);
  }

  backButton() {
    this.setState({ flag: false });
  }

  usersOrMessages() {
    if(this.state.flag === false) {
      return (
        <div className="container">
          <h2>Your Chat List</h2>
          <ChatList messages={this.state.messages} switchToMessages={this.switchToMessages} userName={this.props.display_name} userId={this.props.id} />
        </div>
      );
    } else {
      return (
        <div>
          <Segment className="inbox-container">
            <Button onClick={this.backButton} className="chat-back">
              <Icon size="large" name="arrow left" />
            </Button>
            <Header as="h2" textAlign="center">Chatting with {this.state.otherUser} </Header>
            <Message className="typingAlert" color="blue">{this.state.otherUser} is typing...</Message>
            <MessageList messages={this.state.messages} userName={this.props.display_name} userId={this.props.id} />
            <ChatInput onSend={this.sendHandler} onChange={this.changeHandler} />
          </Segment>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="chat-container">
        {this.usersOrMessages()}
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
    getMessages: (userId) => {
      dispatch(getUserMessages(userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inbox);
