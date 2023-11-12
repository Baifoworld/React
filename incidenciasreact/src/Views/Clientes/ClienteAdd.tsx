import React, { FormEvent } from 'react';
import ICliente from '../../Model/ICliente';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ClienteAdd() {
    const navigate = useNavigate();

    const addClienteApi = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let inputUsuario: HTMLFormElement = event.currentTarget.usuario;
        let inputPassword: HTMLFormElement = event.currentTarget.password;
        let inputIdCliente: HTMLFormElement = event.currentTarget.idCliente;
        let inputNombre: HTMLFormElement = event.currentTarget.nombre;
        let inputDireccion: HTMLFormElement = event.currentTarget.direccion;
        let inputTelefono: HTMLFormElement = event.currentTarget.telefono;

        let usuario: string = inputUsuario.value;
        let password: number = Number.parseInt(inputPassword.value);
        let idCliente: string = inputIdCliente.value;
        let nombre: string = inputNombre.value;
        let direccion: string = inputDireccion.value;
        let telefono: string = inputTelefono.value;

        const newCliente = {
            "username": usuario,
            "password": password,
            "id_rol": 2,
            "idCliente": idCliente,
            "nombre": nombre,
            "direccion": direccion,
            "telefono": telefono,
        }

        let ruta = "http://localhost:8080/api/v3/clientes";

        const axiosPost = async (rutaCliente: string) => {
            let token: string = localStorage.getItem("token") as string;
            const headers = {
                headers: { Authorization: token }
            };
            try {
                const { data } = await axios.post(rutaCliente, newCliente, headers)
                console.log(data);
                navigate('/clientes');
            } catch (error) {
                console.log(error);
            }
        }
        axiosPost(ruta);
    }

    return (

        <div className='row'>
            <div className="col-12 text-center mt-5">
                <h3>Crear un nuevo Cliente</h3>
            </div>
            <div className="col-6 offset-3 shadow p-3 mb-2 bg-body rounded mt-5">
                <form onSubmit={addClienteApi}>
                    <div className="mb-3">
                        <label className="form-label">Usuario:</label>
                        <input type="text" className="form-control" id="usuario" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="text" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">ID Cliente:</label>
                        <input type="text" className="form-control" id="idCliente" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input type="text" className="form-control" id="nombre" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Direccion:</label>
                        <input type="text" className="form-control" id="direccion" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Telefono:</label>
                        <input type="text" className="form-control" id="telefono" />
                    </div>
                    <button type="submit" className="btn btn-success mt-2 mb-2 w-100">Crear</button>
                </form>
            </div>
        </div>
    )
}

