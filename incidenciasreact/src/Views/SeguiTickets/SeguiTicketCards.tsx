import React from 'react';
import ISeguimientoTicket from '../../Model/ISeguimientoTicket';
import { useNavigate } from "react-router-dom";

interface IProps {
    seguiTicket: ISeguimientoTicket
}

export default function SeguiTicketCard (props: IProps) {
    const navigate = useNavigate();

    function mostrarDetalleTicket(){
        navigate("/seguitickets/" + props.seguiTicket.id);
    }

    return(
        <div className="col">
            <div className="card-body">
                <h4 className="card-title">Seguimiento {props.seguiTicket.id}</h4>
                <p className="card-text">ID Ticket: {props.seguiTicket.idTicket}</p>
                <p className="card-text">Dni del Gestor: {props.seguiTicket.dni}</p>
                <p className="card-text">Fecha del seguimiento: {props.seguiTicket.fecha}</p>
                <p className="card-text">Comentario: {props.seguiTicket.comentario}</p>
                
                <button className="btn btn-primary" onClick={mostrarDetalleTicket}>Ver Seguimiento Ticket</button>
            </div>
        </div>
    )
}