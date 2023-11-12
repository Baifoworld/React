import React, { useEffect, useState } from 'react';
import IGestor from '../../Model/IGestor';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAdd, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';


export default function GestorDetails() {

  const [gestor, setGestor] = useState<IGestor>();

  let { dni } = useParams();
  const navigate = useNavigate();
  useEffect(
    () => {
      const getGestor = async (dni: string | undefined) => {
        let token: string = localStorage.getItem("token") as string;
        let rutaGestor: string = "http://localhost:8080/api/v3/gestores/" + dni;
        const headers = {
          headers: { Authorization: token }
      };
      let respuesta = await axios.get(rutaGestor, headers);
      console.log(respuesta.data);
      setGestor(respuesta.data);
      }
      getGestor(dni);
    }, []);

  const eliminarGestorApi = async () => {
    let token: string = localStorage.getItem("token") as string;
    let ruta: string = "http://localhost:8080/api/v3/gestores/" + dni;
    const headers = {
      headers: { Authorization: token }
    };
    try {
      const { data } = await axios.delete(ruta,headers)
      console.log(data);
      navigate('/gestores');
    } catch (error) {
      console.log(error);
    }
  }

  function nuevoTicket() {
    navigate("/gestores/" + dni + "/nuevotickets");
  }
  /*
    const mostrarSeguimientoTicket = (segTicket: ISeguimientoTicket) => {
      navigate('/clientes/' + id + '/seguimientoTicket/' + segTicket.idSegTicket);
    }*/

  function editarCliente() {
    navigate("/gestores/" + dni + "/editar");
  }

  function navegarAtras() {
    navigate('/gestores');
  }

  return (
    <>  
    
      <div className="container">
      <h4 className="card-title">{gestor?.nombre} {gestor?.apellidos}</h4>
                <p className="card-text">ID Usuario: {gestor?.idUsuario}</p>
                <p className="card-text">Dni: {gestor?.dni}</p>
                
        </div>
        <button className="btn btn-primary" onClick={eliminarGestorApi}>Eliminar Gestor</button>
    </>
  );
}