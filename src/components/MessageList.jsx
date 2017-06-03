import React from 'react';

import Message from './Message';

class MessageList extends React.Component {
  componentWillMount() {
    console.log
  }
  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log(this.props.messages);
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            username={this.props.display_name}
            message={this.props.messages[0][0].message}
            fromMe={this.props.messages[0][0].fromMe} />
        );
      });
    return (
      <div className='messages' id='messageList'>
        { messages }
      </div>
    );
  }
}

MessageList.defaultProps = {
  messages: [],
};

export default MessageList;
