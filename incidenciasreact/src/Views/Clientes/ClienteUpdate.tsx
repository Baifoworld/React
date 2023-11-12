import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ICliente from '../../Model/ICliente';

interface IProps { }
interface IState { cliente: ICliente }

export default function ClienteUpdate(props: IProps) {

    const [cliente, setCliente] = useState<IState>();
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(
        () => {
            const getCliente = async (id: string | undefined) => {
                let token: string = localStorage.getItem("token") as string;
                let ruta = "http://localhost:8080/api/v3/clientes/" + id;
                const headers = {
                    headers: { Authorization: token }
                };
                let respuesta = await axios.get(ruta, headers);
                console.log(respuesta.data);
                setCliente({ cliente: respuesta.data });
            }
            getCliente(id);
        }, []
    );

    const clienteModi = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let inputidcliente: HTMLInputElement = event.currentTarget.idCliente;
        let inputnombre: HTMLInputElement = event.currentTarget.nombre;
        let inputdireccion: HTMLInputElement = event.currentTarget.direccion;
        let inputtelefono: HTMLInputElement = event.currentTarget.telefono;

        let idCliente: string = inputidcliente.value;
        let nombre: string = inputnombre.value;
        let direccion: string = inputdireccion.value;
        let telefono: string = inputtelefono.value;

        if (idCliente === "")
            idCliente = cliente?.cliente.idCliente + "";
        if (nombre === "")
            nombre = cliente?.cliente.nombre + "";
        if (direccion === "")
            direccion = cliente?.cliente.direccion + "";

        const clienteUpdate = {
            "idCliente": idCliente,
            "nombre": nombre,
            "direccion": direccion,
            "telefono": telefono
        }
        
        let rutaCliente = "http://localhost:8080/api/v3/clientes/" + id;
        const axiosPut = async (rutaCliente: string) => {
            try {
                const { data } = await axios.put(rutaCliente, clienteUpdate);
            } catch {
                console.log("Update error");
            }
        }

        axiosPut(rutaCliente);
        navigate("/clientes");
    }

    return (
        <div className='row'>
            <div className="col-12 text-center mt-5">
                <h3>Modificar Cliente</h3>
            </div>
            <div className="col-6 offset-3 shadow p-3 mb-2 bg-body rounded mt-5">
                <form onSubmit={clienteModi}>
                    <div className="mb-3">
                        <label className="form-label">ID Cliente:</label>
                        <input type="text" className="form-control" id="idCliente" placeholder={cliente?.cliente.idCliente + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input type="text" className="form-control" id="nombre" placeholder={cliente?.cliente.nombre + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Direccion:</label>
                        <input type="text" className="form-control" id="direccion" placeholder={cliente?.cliente.direccion + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Telefono:</label>
                        <input type="text" className="form-control" id="telefono" placeholder={cliente?.cliente.telefono + ""} />
                    </div>
                    <button type="submit" className="btn btn-success mt-2 mb-2 w-100">Modificar Cliente</button>
                </form>
            </div>
        </div>
    );

}