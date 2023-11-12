import React, { useEffect, useState } from "react";
import axios from "axios";
import ICliente from '../../Model/ICliente';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import ClienteCard from "./ClienteCards";


export default function MenuCliente() {
    const [clientes, setClientes] = useState<Array<ICliente>>( [] );
    let navigate = useNavigate();

    useEffect(
        () => {
            async function getAllClients() {
                let token: string = localStorage.getItem('token') as string;
                let ip: string = "localhost";
                let puerto: number = 8080;
                let rutaBase: string = "http://" + ip + ":" + puerto + "/api/v3";
                let rutaClientes: string = rutaBase + "/clientes";
                let ruta = rutaClientes;
                console.log(ruta);
                const headers = {
                    headers: { Authorization: token }
                };
                let respuesta = await axios.get(ruta, headers);
                console.log(respuesta.data);
                setClientes(respuesta.data);
            }
            getAllClients();

        }, []);

    function crearCliente() {
        navigate("/clientes/crear")
    }
    function eliminarCliente() {
        navigate("/clientes/eliminar")
    }
    function findById(id: number) {
        navigate("")
    }
    return (
        <>
            <div>
                <button onClick={crearCliente}><FontAwesomeIcon icon={faAdd} />Nuevo Cliente</button>
                <button onClick={eliminarCliente}><FontAwesomeIcon icon={faTrash} /> Eliminar Cliente</button>
            </div>
            <div className="container">
                <h2>Clientes</h2>
                <div className="cliente-wrapper">
                
                    {
                        clientes.map((c: ICliente, index:number) => {
                            return (
                                <ClienteCard key={"cliente" + index} cliente={c}/>
                            )
                        })
                    }
                    </div>
                
            </div>

        </>
    )
}
