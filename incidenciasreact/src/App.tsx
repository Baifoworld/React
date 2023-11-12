import React from 'react';
import './App.css';
import { Login } from './Views/Login';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import MenuCliente from './Views/Clientes/MenuCliente';
import MenuGestor from './Views/Gestores/MenuGestor';
import ClienteAdd from './Views/Clientes/ClienteAdd';
import ClienteDetails from './Views/Clientes/ClienteDetails';
import GestorDetails from './Views/Gestores/GestorDetails';
import GestorAdd from './Views/Gestores/GestorAdd';
import MenuTicket from './Views/Tickets/MenuTicket';
import TicketDetails from './Views/Tickets/TicketDetails';
import TicketAdd from './Views/Tickets/TicketAdd';
import MenuSeguiTicket from './Views/SeguiTickets/MenuSeguiTicket';
import SeguiTicketDetails from './Views/SeguiTickets/SeguiTicketDetails';
import SeguiTicketAdd from './Views/SeguiTickets/SeguiTicketAdd';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/clientes" element={<MenuCliente />} />
          <Route path="/clientes/crear" element={<ClienteAdd/>} />
          <Route path="/clientes/:id" element={<ClienteDetails />} />
          <Route path="/gestores" element={<MenuGestor />} />
          <Route path="/gestores/:dni" element={<GestorDetails />} />
          <Route path="/gestores/crear" element={<GestorAdd />} />
          <Route path="/tickets" element={<MenuTicket />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
          <Route path="/tickets/crear" element={<TicketAdd />} />
          <Route path="/seguitickets" element={<MenuSeguiTicket />} />
          <Route path="/seguitickets/:id" element={<SeguiTicketDetails />} />
          <Route path="/seguitickets/crear" element={<SeguiTicketAdd />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

function Navbar() {
  // visible on every page
  return (
    <nav>
      <Link to="/"> Login </Link> &nbsp;
      <Link to="/home"> Inicio </Link> &nbsp;
      <Link to="/clientes">Clientes  </Link> &nbsp;
      <Link to="/gestores">Gestores </Link>
    </nav>
  );
}
export default App;
