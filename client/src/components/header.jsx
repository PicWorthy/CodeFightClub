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
      <button className="button" onClick={props.changeView('leaderboard')}><span>Scores</span></button>
      <button className="button" onClick={props.changeView('problems')}><span>Problems</span></button>
      <button className="button" onClick={props.changeView('prompt')}><span>Lobby</span></button>
      </div>
      <div id="logo">
        <img className="logo" src="BrandonStinks.png" alt="BrandonStinks" height="110px" width="390px" />
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
