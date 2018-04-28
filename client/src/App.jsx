import React, { Component } from 'react';
import Modal from 'react-modal';
import AceEditor from 'react-ace';
import brace from 'brace';
import $ from 'jquery';
import 'brace/theme/cobalt';
import 'brace/mode/javascript';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import Footer from './components/footer.jsx';
import { subscribeToSocket, sendMessage } from './socket/api.jsx';

Modal.setAppElement('#app');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        isAdmin: true
      },
      // TESTING SOCKET.IO
      messages: [],
      userMessage: '',
      // END TESTING SOCKET.IO
      view: 'prompt'
    };

    // TESTING SOCKET.IO
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // END TESTING SOCKET.IO
  }

  //sets the state of the username when a user is logged in
  componentWillMount() {
    $.get('/isLoggedIn', function(data) {
      console.log(data);
      if (data !== undefined) {
        this.setState({
          user: {
            username: data.username,
            isAdmin: data.isAdmin
          }
        });
        // TESTING SOCKET.IO
        subscribeToSocket(data.username, (message) => {
          console.log('message', message)
          let messages = [...this.state.messages];
          messages.push(message);
          this.setState({messages});
        });
        // END TESTING SOCKET.IO
      }
      
    }.bind(this));
  }

  //passed down into body and is setting state of user when user logs in or signs up
  setUser (user) {
    this.setState({ user: user});
  }

  changeView (state) {
    return () => {
      this.setState({ view: state});
    }
  }

  logout () {
    $.get('/logout')
    .done((data) => {
      console.log(data);
      this.setUser('');
    })
    .fail((err) => {
      console.log(err);
    });
  }

  // TESTING SOCKET.IO
  handleInputChange(e) {
    this.setState({
      userMessage: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitting')
    sendMessage(this.state.userMessage);
      
  }
  // END TESTING SOCKET.IO

  render () {
    // TESTING SOCKET.IO
    const messages = this.state.messages.map(message => <li>{ message }</li>);

    return (
      <div style={ {backgroundColor: 'black'} }>
        <ul className="messages">
          { messages }
        </ul>
        <form action="">
          <input 
            name="message"
            type="text" 
            className="m"
            placeholder="send a message"
            value={ this.state.userMessage }
            onChange={ this.handleInputChange }
          />
          <button 
            className="send-button"
            onClick={ this.handleSubmit }  
          >
            Send
          </button>
        </form>
      </div>
    )

    // END TESTING SOCKET.IO
    return (
      <div className="container fullh fullw column">
        <Header
          user={this.state.user}
          updateUser={this.setUser.bind(this)}
          logout={this.logout.bind(this)}
          changeView={this.changeView.bind(this)}
          view={this.state.view}
        />
        <Body
          isLoggedIn={!!this.state.user.username}
          view={this.state.view}
          username={this.state.user.username}
        />
        <Footer
        />
      </div>
    );
  }
}

export default App
