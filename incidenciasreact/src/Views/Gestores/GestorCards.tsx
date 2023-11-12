import React from 'react';
import IGestor from '../../Model/IGestor';
import { useNavigate } from "react-router-dom";

interface IProps {
    gestor: IGestor
}

export default function GestorCard (props: IProps) {
    const navigate = useNavigate();

    function mostrarDetalleGestor(){
        navigate("/gestores/" + props.gestor.dni);
    }

    return(
        <div className="col">
            <div className="card-body">
                <h4 className="card-title">{props.gestor.nombre}</h4>
                <p className="card-text">DNI Gestor:{props.gestor.dni}</p>
                <button className="btn btn-primary" onClick={mostrarDetalleGestor}>Ver Gestor</button>
            </div>
        </div>
    )
}