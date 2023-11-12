import React, { useEffect, useState } from "react";
import axios from "axios";
import ISeguimientoTicket from '../../Model/ISeguimientoTicket';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import SeguiTicketCard from "./SeguiTicketCards";


export default function MenuSeguiTicket() {
    const [Seguitickets, setSeguiTickets] = useState<Array<ISeguimientoTicket>>( [] );
    let navigate = useNavigate();

    useEffect(
        () => {
            async function getAllSeguiTickets() {
                let token: string = localStorage.getItem('token') as string;
                let ip: string = "localhost";
                let puerto: number = 8080;
                let rutaBase: string = "http://" + ip + ":" + puerto + "/api/v3";
                let rutaSeguiTickets: string = rutaBase + "/seguimientotickets";
                let ruta = rutaSeguiTickets;
                console.log(ruta);
                const headers = {
                    headers: { Authorization: token }
                };
                let respuesta = await axios.get(ruta, headers);
                console.log(respuesta.data);
                setSeguiTickets(respuesta.data);
            }
            getAllSeguiTickets();

        }, []);

    function crearSeguiTicket() {
        navigate("/seguitickets/crear")
    }
    function eliminarSeguiTicket() {
        navigate("/seguitickets/eliminar")
    }
    function findById(id: number) {
        navigate("")
    }
    return (
        <>
            <div>
                <button onClick={crearSeguiTicket}><FontAwesomeIcon icon={faAdd} />Nuevo Seguimiento Ticket</button>
                <button onClick={eliminarSeguiTicket}><FontAwesomeIcon icon={faTrash} /> Eliminar Seguimiento Ticket</button>
            </div>
            <div className="container">
                <h2>Seguimientos Tickets</h2>
                <div className="ticket-wrapper">
                
                    {
                        Seguitickets.map((st: ISeguimientoTicket, index:number) => {
                            return (
                                <SeguiTicketCard key={"seguiTicket" + index} seguiTicket={st}/>
                            )
                        })
                    }
                    </div>
                
            </div>

        </>
    )
}
