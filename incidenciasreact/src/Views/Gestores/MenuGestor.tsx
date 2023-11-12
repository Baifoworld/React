import React, { useEffect, useState } from "react";
import axios from "axios";
import IGestor from '../../Model/IGestor';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import GestorCard from "./GestorCards";



export default function MenuGestor() {
    const [gestores, setGestores] = useState<Array<IGestor>>( [] );
    let navigate = useNavigate();

    useEffect(
        () => {
            async function getAllGestores() {
                let token: string = localStorage.getItem("token") as string;
                let ip: string = "localhost";
                let puerto: number = 8080;
                let rutaBase: string = "http://" + ip + ":" + puerto + "/api/v3";
                let rutaGestores: string = rutaBase + "/gestores";
                let ruta = rutaGestores;
                console.log(ruta);
                const headers = {
                    headers: { Authorization: token }
                };
                let respuesta = await axios.get(ruta, headers);
                console.log(respuesta.data);
                setGestores(respuesta.data);
            }
            getAllGestores();

        }, []);

    function crearGestor() {
        navigate("/gestores/crear")
    }
    function eliminarGestor() {
        navigate("/gestores/eliminar")
    }
    function findById(id: number) {
        navigate("")
    }
    return (
        <>
            <div>
                <button onClick={crearGestor}><FontAwesomeIcon icon={faAdd} />Nuevo Gestor</button>
                <button onClick={eliminarGestor}><FontAwesomeIcon icon={faTrash} />Eliminar Gestor</button>
            </div>
            <div className="container">
                <h2>Gestores</h2>
               
                
                    {
                        gestores.map((g: IGestor, index:number) => {
                            return (
                                <GestorCard key={"gestor" + index} gestor={g}/>
                            )
                        })
                    }
                  
                
            </div>

        </>
    )
}
