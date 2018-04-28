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
import ChatBox from './components/chatBox.jsx';
import { subscribeToSocket, sendMessage, subscribeToTimerSocket, getDateTimerSocket} from './socket/api.jsx';

Modal.setAppElement('#app');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user
      user: {
        username: '',
        isAdmin: true
      },
      // for chat
      messages: [],
      userMessage: '',
      timerTillNextGame: ' ',
      gameTimer: 30,
      // END TESTING SOCKET.IO
      view: 'prompt',
    };

    this.handleInputChangeChat = this.handleInputChangeChat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    // END TESTING SOCKET.IO
  }
  
  //sets the state of the username when a user is logged in
  componentDidMount() {
    $.get('/isLoggedIn', data => {
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
        
        getDateTimerSocket();
        subscribeToTimerSocket(this.updateTimer);
        // END TESTING SOCKET.IO
      }
      
    });
  }

  subscribeToSocketChat() {
    subscribeToSocket(data.username, (message) => {
      let messages = [...this.state.messages];
      messages.push(message);
      this.setState({messages});
    });
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

  handleInputChangeChat(e) {
    this.setState({
      userMessage: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitting')
    sendMessage({
      user: this.state.user.username,
      time: new Date().getTime(),
      contents: this.state.userMessage,
    })
  }

  updateTimer(date) {
    let secondsTillNextGame = 60 - (new Date(date).getSeconds());
    this.setState({timerTillNextGame: secondsTillNextGame});
    let timer = setInterval(() => {
      secondsTillNextGame--;
      this.setState({timerTillNextGame: secondsTillNextGame});
      if (secondsTillNextGame <= -1) {
        clearInterval(timer);
        if (this.state.view === 'waitingRoom') {
          this.setState({view: 'gameRoom'})
          this.updateGameTimer();
        }
        getDateTimerSocket();
      }
    }, 1000)
  }

  updateGameTimer() {
    let secondsTillEndGame = this.state.gameTimer;
    let gameTimer = setInterval(() => {
      this.setState({gameTimer: secondsTillEndGame});
      secondsTillEndGame--;
      if (secondsTillEndGame < 0) {
        clearInterval(gameTimer);
        setTimeout(() => {this.setState({gameTimer: 30})}, 2000)
      }
    }, 1000)
  }
  // END TESTING SOCKET.IO

  render () {
    // TESTING ChatBox
    // return (
    //   <ChatBox 
    //     messages={ this.state.messages }
    //     userMessage={ this.state.userMessage }
    //     handleInputChange={ this.state.handleInputChangeChat }
    //     handleSubmit={ this.state.handleSubmit }
    //   />
    // )

    // END TESTING CHatbox

    // TESTING SOCKET.IO
    const messages = this.state.messages.map(message => <li>{ message }</li>);

    // return (
    //   <div style={ {backgroundColor: 'black'} }>
    //   <p>Next Fight In: {this.state.timer}</p>
    //     <button>
    //       Join Fight
    //     </button>
    //     <ul className="messages">
    //       { messages }
    //     </ul>
    //     <form action="">
    //       <input 
    //         name="message"
    //         type="text" 
    //         className="m"
    //         placeholder="send a message"
    //         value={ this.state.userMessage }
    //         onChange={ this.handleInputChange }
    //       />
    //       <button 
    //         className="send-button"
    //         onClick={ this.handleSubmit }  
    //       >
    //         Send
    //       </button>
    //     </form>
    //   </div>
    // )

    // END TESTING SOCKET.IO
    return (
      <div className="container fullh fullw column">
        <Header
          user={this.state.user}
          updateUser={this.setUser.bind(this)}
          logout={this.logout.bind(this)}
          changeView={this.changeView.bind(this)}
          view={this.state.view}
          timerTillNextGame={this.state.timerTillNextGame}
          gameTimer={this.state.gameTimer}
        />
        <Body
          isLoggedIn={ !!this.state.user.username }
          view={ this.state.view }
          username={ this.state.user.username }
        />
        <Footer
        />
      </div>
    );
  }
}

export default App
