import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UsersList from './UsersList';
import ViewUserContainer from './ViewUserContainer';
import NotFound from './NotFound';
import AddUserContainer from "./AddUserContainer";

class App extends Component {
    render() {
      return (
        <div>
          <div className="content">
            <Switch>
              <Route path="/user/add" component={AddUserContainer} />
              <Route path="/users/:id" component={ViewUserContainer} />
              <Route path="/users" component={UsersList} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={UsersList} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </div>
      );
    }
  }
  
  export default App;
  