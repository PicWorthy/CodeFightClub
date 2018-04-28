import React, { Component } from 'react';
import ReactModal from 'react-modal';

class TimesUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <ReactModal
          isOpen={this.props.gameTimer <= 0 && this.props.view === 'gameRoom'}
          contentLabel="SignUp Modal"
          className="Modal container"
          overlayClassName="Overlay"
        >
          <span>GAME OVER</span>
          <br /><br />
          <button onClick={this.props.changeView('waitingRoom')}>
            PLAY AGAIN
          </button>
        </ReactModal>
      </span>
    )
  }
}

export default TimesUp;