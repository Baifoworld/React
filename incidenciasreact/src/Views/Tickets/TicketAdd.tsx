import React, { FormEvent } from 'react';
import ITicket from '../../Model/ITicket';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function TicketAdd() {
    const navigate = useNavigate();

    const addTicketApi = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let inputEstado: HTMLFormElement = event.currentTarget.estado;
        let inputDescripcion: HTMLFormElement = event.currentTarget.descripcion;
        let inputFechaFin: HTMLFormElement = event.currentTarget.fechaFin;
        let inputFechaInicio: HTMLFormElement = event.currentTarget.fechaInicio;
        let inputIdCliente: HTMLFormElement = event.currentTarget.idCliente;
        let inputGestores: HTMLFormElement = event.currentTarget.gestores;

        let descripcion: string = inputDescripcion.value;
        let estado: string = inputEstado.value;
        let idCliente: string = inputIdCliente.value;
        let fechaFin: string = inputFechaFin.value;
        let fechaInicio: string = inputFechaInicio.value;
        let gestores: string = inputGestores.value;

        const newTicket = {
            "descripcion": descripcion,
            "estado": estado,
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin,
            "idCliente": idCliente,
            "gestores": gestores,
        }

        let ruta = "http://localhost:8080/api/v3/tickets";

        const axiosPost = async (rutaCliente: string) => {
            let token: string = localStorage.getItem("token") as string;
            const headers = {
                headers: { Authorization: token }
            };
            try {
                const { data } = await axios.post(rutaCliente, newTicket, headers)
                console.log(data);
                navigate('/tickets');
            } catch (error) {
                console.log(error);
            }
        }
        axiosPost(ruta);
    }

    return (

        <div className='row'>
            <div className="col-12 text-center mt-5">
                <h3>Crear un nuevo Ticket</h3>
            </div>
            <div className="col-6 offset-3 shadow p-3 mb-2 bg-body rounded mt-5">
                <form onSubmit={addTicketApi}>
                    <div className="mb-3">
                        <label className="form-label">Descripcion:</label>
                        <input type="text" className="form-control" id="descripcion" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Estado:</label>
                        <input type="text" className="form-control" id="estado" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha Inicio:</label>
                        <input type="text" className="form-control" id="fechaInicio" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha Fin:</label>
                        <input type="text" className="form-control" id="fechaFin" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">ID Cliente:</label>
                        <input type="text" className="form-control" id="idCliente" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gestores (Dni):</label>
                        <input type="text" className="form-control" id="gestores" />
                    </div>
                    <button type="submit" className="btn btn-success mt-2 mb-2 w-100">Crear Ticket</button>
                </form>
            </div>
        </div>
    )
}

