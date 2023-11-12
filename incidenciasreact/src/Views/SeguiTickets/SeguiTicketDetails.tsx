import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAdd, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import ISeguimientoTicket from '../../Model/ISeguimientoTicket';


export default function SeguiTicketDetails() {

  const [seguiTicket, setSeguiTicket] = useState<ISeguimientoTicket>();

  let { id } = useParams();
  const navigate = useNavigate();
  //let tickets = ticket?.fechaIniciotickets;

  useEffect(
    () => {

      const getSeguimientosTickets = async (id: string | undefined) => {
        let token: string = localStorage.getItem("token") as string;
        let rutaTickets: string = "http://localhost:8080/api/v3/seguimientotickets/" + id;
        const headers = {
          headers: { Authorization: token }
        };
        let respuesta = await axios.get(rutaTickets, headers);
        console.log(respuesta.data);
        setSeguiTicket(respuesta.data);
      }
      getSeguimientosTickets(id);
    }, []);

  const eliminarSeguiTicketApi = async () => {
    let ruta: string = "http://localhost:8080/api/v3/seguimientotickets/" + id;
    try {
      const { data } = await axios.delete(ruta)
      console.log(data);
      navigate('/tickets');
    } catch (error) {
      console.log(error);
    }
  }

  function nuevoSeguioTicket() {
    navigate("/seguimientotickets/crear");
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
      <h4 className="card-title">{seguiTicket?.id}</h4>
        <p>Fecha: {seguiTicket?.fecha}</p>
        <p>DNI Gestor: {seguiTicket?.dni}</p>
        <p>comentario: {seguiTicket?.comentario}</p>
        <p>ID Ticket: {seguiTicket?.idTicket}</p>
        
    </>
  );
}