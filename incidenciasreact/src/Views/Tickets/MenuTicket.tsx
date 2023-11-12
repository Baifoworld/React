import React, { useEffect, useState } from "react";
import axios from "axios";
import ITicket from '../../Model/ITicket';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import TicketCard from "./TicketCards";


export default function MenuTicket() {
    const [tickets, setTickets] = useState<Array<ITicket>>( [] );
    let navigate = useNavigate();

    useEffect(
        () => {
            async function getAllTickets() {
                let token: string = localStorage.getItem('token') as string;
                let ip: string = "localhost";
                let puerto: number = 8080;
                let rutaBase: string = "http://" + ip + ":" + puerto + "/api/v3";
                let rutaTickets: string = rutaBase + "/tickets";
                let ruta = rutaTickets;
                console.log(ruta);
                const headers = {
                    headers: { Authorization: token }
                };
                let respuesta = await axios.get(ruta, headers);
                console.log(respuesta.data);
                setTickets(respuesta.data);
            }
            getAllTickets();

        }, []);

    function crearTicket() {
        navigate("/tickets/crear")
    }
    function eliminarTicket() {
        navigate("/tickets/eliminar")
    }
    function findById(id: number) {
        navigate("")
    }
    return (
        <>
            <div>
                <button onClick={crearTicket}><FontAwesomeIcon icon={faAdd} />Nuevo Ticket</button>
                <button onClick={eliminarTicket}><FontAwesomeIcon icon={faTrash} /> Eliminar Ticket</button>
            </div>
            <div className="container">
                <h2>Clientes</h2>
                <div className="ticket-wrapper">
                
                    {
                        tickets.map((t: ITicket, index:number) => {
                            return (
                                <TicketCard key={"ticket" + index} ticket={t}/>
                            )
                        })
                    }
                    </div>
                
            </div>

        </>
    )
}
