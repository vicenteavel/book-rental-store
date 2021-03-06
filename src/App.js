import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

import Clients from './pages/Clients';
import ShowClient from './pages/Clients/Show';
import CreateClient from './pages/Clients/Create';
import EditClient from './pages/Clients/Edit';

import Books from './pages/Books';
import ShowBook from './pages/Books/Show';
import CreateBook from './pages/Books/Create';
import EditBook from './pages/Books/Edit';

import Rents from './pages/Rents';
import CreateRent from './pages/Rents/Create';

import Reservations from './pages/Reservations';
import CreateReservation from './pages/Reservations/Create';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Dashboard} />

          <Route path="/clients" exact component={Clients} />
          <Route path="/client/:id" exact component={ShowClient} />
          <Route path="/clients/create" exatc component={CreateClient} />
          <Route path="/client/edit/:id" exact component={EditClient} />


          <Route path="/books" exact component={Books} />
          <Route path="/book/:id" exact component={ShowBook} />
          <Route path="/books/create" exact component={CreateBook} />
          <Route path="/book/edit/:id" exact component={EditBook} />


          <Route path="/rents" exact component={Rents} />
          <Route path="/rent/create" exact component={CreateRent} />

          <Route path="/reservations" exact component={Reservations} />
          <Route path="/reservation/create" exact component={CreateReservation} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
