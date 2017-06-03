import React from 'react';

import Message from './Message';

  let userInfo;
class MessageList extends React.Component {

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log(this.props.messages);
  }

  render() {
    let myArray = [];
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {

      for(let key in message) {
        myArray.push(message[key]);
      }
      console.log(myArray);
    });
    const displayMessages = myArray.map((msg) => {
      let newMessage = JSON.stringify(msg);
      let str = '';
      let flag = false;
      let stepOne = msg.split(":");
      let stepTwo = stepOne.toString().split('","');
      console.log(stepTwo);
        return (
          <Message
            username={this.props.userInfo}
            message={stepTwo[1]}
            fromMe={this.props.messages.fromMe} />
        );
      });
    return (
      <div className='messages' id='messageList'>
        { displayMessages }
      </div>
    );
  }
}

MessageList.defaultProps = {
  messages: [],
};

export default MessageList;
