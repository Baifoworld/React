import React from 'react';
import ITicket from '../../Model/ITicket';
import { useNavigate } from "react-router-dom";

interface IProps {
    ticket: ITicket
}

export default function TicketCard (props: IProps) {
    const navigate = useNavigate();

    function mostrarDetalleTicket(){
        navigate("/tickets/" + props.ticket.idTicket);
    }

    return(
        <div className="col">
            <div className="card-body">
                <h4 className="card-title">{props.ticket.idTicket}</h4>
                <p className="card-text">Estado: {props.ticket.estado}</p>
                <p className="card-text">Descripcion: {props.ticket.descripcion}</p>
                <button className="btn btn-primary" onClick={mostrarDetalleTicket}>Ver Ticket</button>
            </div>
        </div>
    )
}