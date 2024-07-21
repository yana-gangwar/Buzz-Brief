import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/' component={() => <News key="general" pageSize={5} country="in" category="general" />} />
            <Route exact path='/business' component={() => <News key="business" pageSize={5} country="in" category="business" />} />
            <Route exact path='/entertainment' component={() => <News key="entertainment" pageSize={5} country="in" category="entertainment" />} />
            <Route exact path='/health' component={() => <News key="health" pageSize={5} country="in" category="health" />} />
            <Route exact path='/science' component={() => <News key="science" pageSize={5} country="in" category="science" />} />
            <Route exact path='/sports' component={() => <News key="sports" pageSize={5} country="in" category="sports" />} />
            <Route exact path='/technology' component={() => <News key="technology" pageSize={5} country="in" category="technology" />} />
          </Switch>
        </Router>
      </div>
    );
  }
}
