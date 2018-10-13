import React, { Component } from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import { BrowserRouter, HashRouter, Route, Switch, Link} from 'react-router-dom'

import Dashboard from './components/Dashboard.js'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      variable: null
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>BBU</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/laz">Laz</Nav.Link>
            </Nav>
            <Navbar.Text>
              Big Backyard Ultra 2017
            </Navbar.Text>
          </Navbar>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/laz' component={()=> <div>Laz poetry</div>} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App;

