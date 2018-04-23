import React from 'react';
import $ from 'jquery';
//direct child of body

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: []
    }
  } 

  componentDidMount () {
    $.get("/leaderboard")
    .done((data) => this.setState({ leaderboard: data }))
  }

  render () {
    return (
      <div className="container column fullh fullw" id="leaderboard">
        {this.state.leaderboard.map((user, key) => {
          return (
            <div className="user-score fullw" key={key}> 
              <h3>{`${user.username} has a score of ${user.score}`}</h3>
            </div>
          )
        })} 
      </div>
    )
  }
}


export default Leaderboard;
    

