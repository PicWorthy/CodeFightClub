import React from 'react';
import SignUp from './signup.jsx';
import Login from './login.jsx';
import User from './user.jsx';
import Timer from './timer.jsx';
import TimesUp from './timesUp.jsx';
//direct child of App


const Header = function(props) {
  return (
    <header id="header" className="container row fullw bg-main">
      <div id="leaderboard-header">
      <button onClick={props.changeView('leaderboard')}>Scores</button>
      <button onClick={props.changeView('problems')}>Problems</button>
      <button onClick={props.changeView('prompt')}>Lobby</button>
      </div>
      <div id="logo">
        <img src="BrandonStinks.png" alt="BrandonStinks" height="90px" width="150px" />
      </div>
        { !!props.user.username
          ? <div className="container row" id="user">
              <Timer 
                timerTillNextGame={props.timerTillNextGame} 
                gameTimer={props.gameTimer} 
                view={props.view} 
                changeView={props.changeView} />
              <User user={props.user} logout={props.logout} view={props.view} changeView={props.changeView} />
              <TimesUp gameTimer={props.gameTimer} changeView={props.changeView} view ={props.view}/>
            </div>
          : <div className="container row" id="user">
              <SignUp setUsername={props.updateUser} />
              <Login setUsername={props.updateUser} />
            </div> }
    </header>
  );
}

export default Header;
