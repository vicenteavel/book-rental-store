import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Books from './pages/Books';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/clients" exact component={Clients} />
          <Route path="/books" exact component={Books} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
