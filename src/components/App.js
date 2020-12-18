import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UsersList from './UsersList';
import UserItem from './UserItem';
import AddUserForm from './AddUserForm';
import NotFound from './NotFound';

class App extends Component {
    render() {
      return (
        <div>
          <div className="content">
            <Switch>
              <Route path="/users/:id" component={UserItem} />
              <Route path="/users" component={UsersList} />
              { // TODO: Instead of passing a string use UserFormMode.ADD
                // TODO: I actually prefer /users/add. May need to define it
                //       higher than /user/:id for it to work. Because the match
                //       is done from top to bottom and if /users/:id comes first,
                //       it will match thinking 'add' is the id
              }
              <Route path="/add-user" component={() => <AddUserForm mode="Add"/>} />
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
