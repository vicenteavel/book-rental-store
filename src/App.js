import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Books from './pages/Books';
import Rents from './pages/Rents';
import Reservations from './pages/Reservations';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/clients" exact component={Clients} />
          <Route path="/books" exact component={Books} />
          <Route path="/rents" exact component={Rents} />
          <Route path="/reservations" exact component={Reservations} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
