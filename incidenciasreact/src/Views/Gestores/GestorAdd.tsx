import React, { FormEvent } from 'react';
import ICliente from '../../Model/ICliente';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function GestorAdd() {
    const navigate = useNavigate();

    const addGestorApi = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let inputUsuario: HTMLFormElement = event.currentTarget.usuario;
        let inputPassword: HTMLFormElement = event.currentTarget.password;
        let inputDni: HTMLFormElement = event.currentTarget.dni;
        let inputNombre: HTMLFormElement = event.currentTarget.nombre;
        let inputApellidos: HTMLFormElement = event.currentTarget.apellidos;

        let usuario: string = inputUsuario.value;
        let password: number = Number.parseInt(inputPassword.value);
        let dni: string = inputDni.value;
        let nombre: string = inputNombre.value;
        let apellidos: string = inputApellidos.value;

        const newGestor = {
            "username": usuario,
            "password": password,
            "id_rol": 1,
            "dni": dni,
            "nombre": nombre,
            "apellidos": apellidos,
        }

        const axiosPost = async () => {
            let token: string = localStorage.getItem("token") as string;
            let rutaAdd = "http://localhost:8080/api/v3/gestores";
            const headers = {
              headers: { Authorization: token }
            };
            try {
                const { data } = await axios.post(rutaAdd, newGestor, headers)
                console.log(data);
                navigate('/gestores');
            } catch (error) {
                console.log(error);
            }
        }
        axiosPost();
    }

    return (

        <div className='row'>
            <div className="col-12 text-center mt-5">
                <h3>Crear un nuevo Gestor</h3>
            </div>
            <div className="col-6 offset-3 shadow p-3 mb-2 bg-body rounded mt-5">
                <form onSubmit={addGestorApi}>
                    <div className="mb-3">
                        <label className="form-label">Usuario:</label>
                        <input type="text" className="form-control" id="usuario" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="text" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dni:</label>
                        <input type="text" className="form-control" id="dni" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input type="text" className="form-control" id="nombre" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos:</label>
                        <input type="text" className="form-control" id="apellidos" />
                    </div>
                    <button type="submit" className="btn btn-success mt-2 mb-2 w-100">Crear</button>
                </form>
            </div>
        </div>
    )
}

