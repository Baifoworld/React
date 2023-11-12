import React from 'react';
import ICliente from '../../Model/ICliente';
import { useNavigate } from "react-router-dom";

interface IProps {
    cliente: ICliente
}

export default function ClienteCard (props: IProps) {
    const navigate = useNavigate();

    function mostrarDetalleCliente(){
        navigate("/clientes/" + props.cliente.idCliente);
    }

    return(
        <div className="col">
            <div className="card-body">
                <h4 className="card-title">{props.cliente.nombre}</h4>
                <p className="card-text">ID Cliente: {props.cliente.idCliente}</p>
                <button className="btn btn-primary" onClick={mostrarDetalleCliente}>Ver Cliente</button>
            </div>
        </div>
    )
}