import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

import Clients from './pages/Clients';
import ShowClient from './pages/Clients/Show';
import CreateClient from './pages/Clients/Create';
import EditClient from './pages/Clients/Edit';

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
          <Route path="/client/:id" exact component={ShowClient} />
          <Route path="/client/create" exact component={CreateClient} />
          <Route path="/client/edit/:id" exact component={EditClient} />


          <Route path="/books" exact component={Books} />
          <Route path="/rents" exact component={Rents} />
          <Route path="/reservations" exact component={Reservations} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
