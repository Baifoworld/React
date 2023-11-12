import React, { FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

export const Login = () => {
    let navigate = useNavigate();
    function handleform(event: FormEvent) {
        event.preventDefault();
        let formulario = event.currentTarget as HTMLFormElement;
        let inputNombre = formulario.nombre as HTMLInputElement;
        let inputPassword = formulario.password as HTMLInputElement;
        let nombre: string = inputNombre.value as string;
        let password: string = inputPassword.value;
        let login = {
            username: nombre,
            password: password
        }
        let loginok = false;
        
        const axiospost = async (rutaDeLogin: string) => {
            
            try {
                const { data } = await axios.post(rutaDeLogin, login)
                localStorage.clear();
                localStorage.setItem("token", data);
                let jwt:string = localStorage.getItem("token") as string;
                let tokens = jwt.substring(7);
                let jwtdecoded:any = jwtDecode(tokens);
                let rol: string = jwtdecoded.authorities[0] as string;
                if(rol === "ROLE_ADMIN"){
                    console.log("ok")
                    navigate("/gestores/")
                } else if(rol === "ROLE_USER") {
                    navigate("/")
                } else{
                    console.log("No");
                }
            }catch (error) {
                console.log(error);
            }

                
        }
        axiospost("http://localhost:8080/api/v1/login");
        
        //if(loginok){
            //navigate("/clientes/")
        //}
    }
    return (
        <form onSubmit={handleform}>
            <input type="text" name="nombre" id="nombre" placeholder="nombre" /><br />
            <input type="password" name="password" id="password" placeholder="password" /><br />
            <button type="submit">Enviar</button>
        </form>
    )
}