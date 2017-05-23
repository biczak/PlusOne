// Import React and Semantic-UI Components
import React, { Component } from 'react';
import { Grid, Menu, Segment, Divider, Button, Icon } from 'semantic-ui-react';

class MenuTabs extends Component {
  state = {
    activeItem: 'bio',
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Grid className="profileTabs" color="teal" stretched stackable>
          <Grid.Column width={4} className="tabs">
            <Menu fluid vertical tabular size="massive">
              <Menu.Item className="tab" name="bio" active={activeItem === 'bio'} onClick={this.handleItemClick} />
              <Menu.Item className="tab" name="events" active={activeItem === 'events'} onClick={this.handleItemClick} />
              <Menu.Item className="tab" name="ratings" active={activeItem === 'ratings'} onClick={this.handleItemClick} />
              <Menu.Item className="tab" name="misc." active={activeItem === 'misc.'} onClick={this.handleItemClick} />
              <Divider fitted />
              <Button animated="vertical" color="blue" size="massive" floated="left">
                <Button.Content hidden>Message</Button.Content>
                <Button.Content visible>
                  <Icon name="mail outline" />
                </Button.Content>
              </Button>
              <Button animated="vertical" size="massive" negative floated="right">
                <Button.Content hidden>Report</Button.Content>
                <Button.Content visible>
                  <Icon name="warning" />
                </Button.Content>
              </Button>
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12} className="userText">
            <Segment id="userBio" textAlign="center" size="massive" color="orange" inverted vertical padded>
              <p>I'm the top basketball player in the United States, and am being pursued by the top college basketball programs in the nation.</p>
              <p>My father, Jake, is a convicted felon serving time at Attica Correctional Facility for accidentally killing my mother, Martha, twelve years ago.</p>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default MenuTabs;
