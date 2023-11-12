import React, { useEffect, useState } from 'react';
import ICliente from '../../Model/ICliente';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAdd, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import ITicket from '../../Model/ITicket';
import TicketCard from "../Tickets/TicketCards";

export default function ClienteDetails() {

  const [stCliente, setCliente] = useState<ICliente>();
  const [stTicket, setTicket] = useState<Array<ITicket>>([]);
  let { id } = useParams();
  const navigate = useNavigate();
  let tickets = stCliente?.tickets;

  useEffect(
    () => {
      const getCliente = async (id: string | undefined) => {
        let token: string = localStorage.getItem("token") as string;
        let rutaCliente: string = "http://localhost:8080/api/v3/clientes/" + id;
        const headers = {
          headers: { Authorization: token }
        };
        let respuesta = await axios.get(rutaCliente, headers);
        console.log(respuesta.data);
        setCliente(respuesta.data);
      }

      const getTickets = async (id: string | undefined) => {
        let token: string = localStorage.getItem("token") as string;
        let rutaTickets: string = "http://localhost:8080/api/v3/clientes/" + id + "/tickets";
        const headers = {
          headers: { Authorization: token }
        };
        let respuesta = await axios.get(rutaTickets, headers);
        console.log(respuesta.data);
        setTicket(respuesta.data);
      }
      getCliente(id);
      getTickets(id);
    }, []


  );

  const eliminarClienteApi = async () => {
    let token: string = localStorage.getItem("token") as string;
    let rutaEliminar: string = "http://localhost:8080/api/v3/clientes/" + id;
    const headers = {
      headers: { Authorization: token }
    };
    try {
      const { data } = await axios.delete(rutaEliminar, headers)
      console.log(data);
      navigate('/clientes');
    } catch (error) {
      console.log(error);
    }
  }

  function nuevoTicket() {
    navigate("/clientes/" + id + "/nuevotickets");
  }
  /*
    const mostrarSeguimientoTicket = (segTicket: ISeguimientoTicket) => {
      navigate('/clientes/' + id + '/seguimientoTicket/' + segTicket.idSegTicket);
    }*/

  function editarCliente() {
    navigate("/clientes/" + id + "/editar");
  }

  function navegarAtras() {
    navigate('/clientes');
  }

  return (
    <>
            <div>
                <button onClick={nuevoTicket}><FontAwesomeIcon icon={faAdd} />Nuevo Ticket</button>
                <button onClick={eliminarClienteApi}><FontAwesomeIcon icon={faTrash} /> Eliminar Cliente</button>
                <button onClick={editarCliente}><FontAwesomeIcon icon={faAdd} />Nuevo Cliente</button>
                <button onClick={navegarAtras}><FontAwesomeIcon icon={faTrash} /> Volver atras</button>
            </div>

      <h2 className="card-title">Informacion del cliente {stCliente?.nombre}</h2>
      <p>ID Cliente: {stCliente?.idCliente}</p>
      <p>Direccion: {stCliente?.direccion}</p>
      <p>Telefono: {stCliente?.telefono}</p>
      <h4>Tickets del cliente: {stCliente?.idCliente}</h4>
      {
        stTicket?.map((t: ITicket) => {
          return (
            <TicketCard ticket={t} />
          )
        })
      }

    </>
  );
}