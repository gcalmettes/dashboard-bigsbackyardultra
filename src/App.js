import React, { Component } from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import { HashRouter, Route, Switch, Link} from 'react-router-dom'

import Dashboard from './components/Dashboard.js'
import LazBoard from './components/LazBoard.js'

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
          <Navbar collapseOnSelect expand='sm' bg="dark" variant="dark">
            <Navbar.Brand>BBU</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/laz">Laz</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Text className='d-none d-sm-block'>
                Big Backyard Ultra 2017
              </Navbar.Text>
          </Navbar>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/laz' component={LazBoard} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App;

