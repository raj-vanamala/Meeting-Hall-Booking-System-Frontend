import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MeetingHallComponent from './MeetingHallComponent'

export default function NavBar({name}) {
  return (
    <Router>
      <div>
        <div 
        style ={{
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:"space-around",
            marginTop :"50px"
            }}
        >
          <div>
            <Link to="/"><b>MeetingHallInfo</b></Link>
          </div>
        </div>
        <hr />

        <Switch>
          <Route exact path="/">
            <MeetingHallComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

