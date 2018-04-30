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

Modal.setAppElement('#app');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        isAdmin: true
      },
      view: 'prompt',
      problem: undefined
    };
  }

  //sets the state of the username when a user is logged in
  componentWillMount() {
    $.get('/isLoggedIn', data => {
      console.log(data);
      if (data !== undefined) {
        this.setState({
          user: {
            username: data.username,
            isAdmin: data.isAdmin
          }
        });
      }
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

  changeProblem (problem) {
    this.setState({ view: 'prompt', problem: problem });
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

  render () {
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
          changeProblem={this.changeProblem.bind(this)}
          problem={this.state.problem}
        />
        <Footer
        />
      </div>
    );
  }
}

export default App
