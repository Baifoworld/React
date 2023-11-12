import React, { useEffect, useState } from 'react';
import ICliente from '../../Model/ICliente';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAdd, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import ITicket from '../../Model/ITicket';


export default function TicketDetails() {

  const [ticket, setTicket] = useState<ITicket>();

  let { id } = useParams();
  const navigate = useNavigate();
  //let tickets = ticket?.fechaIniciotickets;

  useEffect(
    () => {
      const getTicket = async (id: string | undefined) => {
        let token: string = localStorage.getItem("token") as string;
        let rutaTicket: string = "http://localhost:8080/api/v3/tickets/" + id;
        const headers = {
          headers: { Authorization: token }
        };
        let respuesta = await axios.get(rutaTicket, headers);
        console.log(respuesta.data);
        setTicket(respuesta.data);
      }

      const getSeguimientosTickets = async (id: string | undefined) => {
        let token: string = localStorage.getItem("token") as string;
        let rutaTickets: string = "http://localhost:8080/api/v3/clientes/" + id + "/tickets";
        const headers = {
          headers: { Authorization: token }
        };
        let respuesta = await axios.get(rutaTickets, headers);
        console.log(respuesta.data);
        setTicket(respuesta.data);
      }
      getTicket(id);
    }, []);

  const eliminarTicketApi = async () => {
    let ruta: string = "http://localhost:8080/api/v3/tickets/" + id;
    try {
      const { data } = await axios.delete(ruta)
      console.log(data);
      navigate('/tickets');
    } catch (error) {
      console.log(error);
    }
  }

  function nuevoTicket() {
    navigate("/tickets/crear");
  }
  /*
    const mostrarSeguimientoTicket = (segTicket: ISeguimientoTicket) => {
      navigate('/clientes/' + id + '/seguimientoTicket/' + segTicket.idSegTicket);
    }*/

  function editarCliente() {
    navigate("/tickets/" + id + "/editar");
  }

  function navegarAtras() {
    navigate('/tickets');
  }

  return (
    <>
      <h4 className="card-title">{ticket?.idTicket}</h4>
        <p>Descripcion: {ticket?.descripcion}</p>
        <p>ID Cliente: {ticket?.idCliente}</p>
        <p>Estado: {ticket?.estado}</p>
        <p>Fecha Inicio: {ticket?.fechaInicio}</p>
        <p>Fecha Fin: {ticket?.fechaFin}</p>
    </>
  );
}