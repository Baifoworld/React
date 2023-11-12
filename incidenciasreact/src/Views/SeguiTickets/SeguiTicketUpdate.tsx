import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ITicket from '../../Model/ITicket';

interface IProps { }
interface IState { ticket: ITicket }

export default function TicketUpdate(props: IProps) {

    const [ticket, setTicket] = useState<IState>();
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(
        () => {
            const getTicket = async (id: string | undefined) => {
                let token: string = localStorage.getItem("token") as string;
                let ruta = "http://localhost:8080/api/v3/tickets/" + id;
                const headers = {
                    headers: { Authorization: token }
                };
                let respuesta = await axios.get(ruta, headers);
                console.log(respuesta.data);
                setTicket({ ticket: respuesta.data });
            }
            getTicket(id);
        }, []
    );

    const ticketModi = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let inputestado: HTMLInputElement = event.currentTarget.estado;
        let inputfechainicio: HTMLInputElement = event.currentTarget.fechaInicio;
        let inputfechafin: HTMLInputElement = event.currentTarget.fechaFin;
        let inputidcliente: HTMLInputElement = event.currentTarget.idCliente;
        let inputdescripcion: HTMLInputElement = event.currentTarget.descripcion;
        
        let estado: string = inputestado.value;
        let idTicket = ticket?.ticket.idTicket;
        let strFechaInicio: string = inputfechainicio.value;
        let strFechaFin: string = inputfechafin.value;
        let descripcion: string = inputdescripcion.value;
        let idCliente: number = Number.parseInt(inputidcliente.value);

        if (strFechaInicio == null)
            strFechaInicio = ticket?.ticket.fechaInicio + "";

        const toTimestamp = (strDate: string) => {
            const dt = new Date(strDate.toString()).getTime();
            return dt;
        }
    
        let fechaInicio = toTimestamp(strFechaInicio);
        let fechaFin = toTimestamp(strFechaFin);

        const ticketUpdate = {
            "idTicket": idTicket,
            "estado": estado,
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin,
            "descripcion": descripcion,
            "idCliente": idCliente
        }
        
        let rutaTicket = "http://localhost:8080/api/v3/tickets/" + id;
        const axiosPut = async (rutaTicket: string) => {
            try {
                const { data } = await axios.put(rutaTicket, ticketUpdate);
            } catch {
                console.log("Update error");
            }
        }

        axiosPut(rutaTicket);
        navigate("/tickets");
    }

    return (
        <div className='row'>
            <div className="col-12 text-center mt-5">
                <h3>Modificar Ticket</h3>
            </div>
            <div className="col-6 offset-3 shadow p-3 mb-2 bg-body rounded mt-5">
                <form onSubmit={ticketModi}>
                    <div className="mb-3">
                        <label className="form-label">ID Ticket:</label>
                        <input type="text" className="form-control" id="idTicket" placeholder={ticket?.ticket.idTicket + ""} readOnly/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Estado:</label>
                        <input type="text" className="form-control" id="estado" placeholder={ticket?.ticket.estado + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha Inicio:</label>
                        <input type="text" className="form-control" id="fechaInicio" placeholder={ticket?.ticket.fechaInicio + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha Fin:</label>
                        <input type="text" className="form-control" id="fechaFin" placeholder={ticket?.ticket.fechaFin + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripcion:</label>
                        <input type="text" className="form-control" id="descripcion" placeholder={ticket?.ticket.descripcion + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">ID Cliente:</label>
                        <input type="text" className="form-control" id="idCliente" placeholder={ticket?.ticket.idCliente + ""} />
                    </div>
                    <button type="submit" className="btn btn-success mt-2 mb-2 w-100">Modificar Ticket</button>
                </form>
            </div>
        </div>
    );

}