// Import React and Semantic-UI Components
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class MenuBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <div id="menuBar">
        <Menu attached="top" stackable color="green">
          <Menu.Item>
            <img src="http://i.imgur.com/9fVGvPD.png" alt="" />
          </Menu.Item>

          <Menu.Item
            name='createEvent'
            color="green"
            active={activeItem === 'createEvent'}
            onClick={this.handleItemClick}
          >
            Create an Event
          </Menu.Item>

          <Menu.Item
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={this.handleItemClick}
            position="right"
          >
            Sign-in
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default MenuBar;
