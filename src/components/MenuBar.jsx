// Import React Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import $ from 'jquery';
// Import Semantic-UI Dependencies
import { Menu, Image, Button, Icon, Header } from 'semantic-ui-react';
import EventForm from './EventForm.jsx';
import LoginModal from '../components/LoginModal';
import '../../public/styles/menuBar.scss';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      menuButton: <Menu.Item name="status">Loading...</Menu.Item>,
    };

    this.getUserStatus = this.getUserStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillMount = () => {
    this.getUserStatus();
  }

  getUserStatus= () => {
    let { activeItem } = this.state.activeItem;
    const eventForm = <EventForm />;
    const loginModal = <LoginModal />;
    const profileButton = <Menu.Item className="menuBarButton" name="profile" position="right" active={activeItem = 'profile'} onClick={this.handleItemClick}>Profile</Menu.Item>;
    const logOutButton = <Menu.Item className="menuBarButton" name="logout" position="right"><Button negative onClick={this.handleLogout}><Icon name="sign out" /> Logout</Button></Menu.Item>;
    
    fetch('/auth/loggedIn', { credentials: 'include' })
      .then(res => res.json())
      .then((data) => {
        if (data === false) {
          this.setState({
            activeItem: '',
            menuButton: <Menu.Item position="right">{loginModal}</Menu.Item>,
          });
        } else if (data && window.location === '/#/profile') {
          this.setState({
            activeItem: 'profile',
            menuButton: [eventForm, <Menu.Menu position="right">{profileButton} {logOutButton}</Menu.Menu>],
          });
        } else {
          this.setState({
            activeItem: 'events',
            menuButton: [eventForm, <Menu.Menu position="right">{profileButton} {logOutButton}</Menu.Menu>],
          });
        }
      })
      .catch(err => console.error('Error:', err, 'MenuBar.jsx (Line 42)'));
  }

  handleLogout = () => {
    const cookies = new Cookies();
    cookies.set('redirectTo', location.href, { path: '/' });
    location.href = location.href.split('#')[0] + 'auth/logout';
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name,
      menuButton: this.state.menuButton,
    });
    if (name === 'profile') {
      window.location = '/#/profile';
    }
    if(name === 'events') {
      window.history.back();
    }
  }

  render= () => {
    let color = Math.floor((Math.random() * 10) + 1);
    let headerColor;
    if (color % 2 === 0) {
      headerColor = '#247BA0';
    } else {
      headerColor = '#F9575F';
    }
    const headerStyle = {
      color: headerColor,
      fontFamily: 'Bungee Shade',
      fontSize: '36px',
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    };

    const { activeItem } = this.state.activeItem;
    return (
      <div>
        <Menu stackable className="menu-bar">
          <Menu.Item
            name="events"
            active={activeItem === 'events'}
            onClick={this.handleItemClick}
          >
            Events
          </Menu.Item>
          <Header className="menu-logo">
            <Header.Content style={headerStyle} className="menu-bar-logo">EleventHour</Header.Content>
          </Header>
          {this.state.menuButton}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(MenuBar);
