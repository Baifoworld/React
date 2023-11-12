import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import IGestor from '../../Model/IGestor';

interface IProps { }
interface IState { gestor: IGestor }

export default function GestoresUpdate(props: IProps) {

    const [gestor, setGestor] = useState<IState>();
    let { dni } = useParams();
    let navigate = useNavigate();

    useEffect(
        () => {
            const getGestor = async (dni: string | undefined) => {
                let token: string = localStorage.getItem("token") as string;
                let ruta = "http://localhost:8080/api/v3/gestores/" + dni;
                const headers = {
                    headers: { Authorization: token }
                };
                let respuesta = await axios.get(ruta, headers);
                console.log(respuesta.data);
                setGestor({ gestor: respuesta.data });
            }
            getGestor(dni);
        }, []
    );

    const gestorModi = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let inputdni: HTMLInputElement = event.currentTarget.dni;
        let inputnombre: HTMLInputElement = event.currentTarget.nombre;
        let inputapellidos: HTMLInputElement = event.currentTarget.apellidos;

        let dni: string = inputdni.value;
        let nombre: string = inputnombre.value;
        let apellidos: string = inputapellidos.value;

        if (dni === "")
            dni = gestor?.gestor.dni + "";
        if (nombre === "")
            nombre = gestor?.gestor.nombre + "";

        const gestorUpdate = {
            "dni": dni,
            "nombre": nombre,
            "apellidos": apellidos
        }
        
        let rutaGestor = "http://localhost:8080/api/v3/gestores/" + dni;
        const axiosPut = async (rutaGestor: string) => {
            try {
                const { data } = await axios.put(rutaGestor, gestorUpdate);
            } catch {
                console.log("Update error");
            }
        }

        axiosPut(rutaGestor);
        navigate("/gestores");
    }

    return (
        <div className='row'>
            <div className="col-12 text-center mt-5">
                <h3>Modificar Gestor</h3>
            </div>
            <div className="col-6 offset-3 shadow p-3 mb-2 bg-body rounded mt-5">
                <form onSubmit={gestorModi}>
                    <div className="mb-3">
                        <label className="form-label">DNI Gestor:</label>
                        <input type="text" className="form-control" id="dni" placeholder={gestor?.gestor.dni + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input type="text" className="form-control" id="nombre" placeholder={gestor?.gestor.nombre + ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos:</label>
                        <input type="text" className="form-control" id="apellidos" placeholder={gestor?.gestor.apellidos + ""} />
                    </div>
 
                    <button type="submit" className="btn btn-success mt-2 mb-2 w-100">Modificar Gestor</button>
                </form>
            </div>
        </div>
    );

}