import React from 'react';
import Prompt from './prompt.jsx';
import Admin from './admin.jsx';
import Leaderboard from './leaderboard.jsx';
import WaitingRoom from './waitingRoom.jsx';
//direct child of App

const Body = ({ view, isLoggedIn, username }) => {
  let body;
  if (view === 'prompt') {
    body = <Prompt username={username} isLoggedIn={isLoggedIn} />;
  } else if (view === 'admin') {
    body = <Admin />;
  } else if (view === 'leaderboard') {
    body = <Leaderboard />;
  } else if (view === 'waitingRoom') {
    body = <WaitingRoom />
  }

  return (
    <div className="container fullw bg-main" id="body">
      {body}
    </div>
  )
}


export default Body;
