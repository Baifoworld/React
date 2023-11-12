import ITicket from "./ITicket";

export default interface ICliente{
    idCliente: String;
    direccion: String;
    nombre: String;
    telefono: String;
    idUsuario: number;
    tickets: ITicket[];
}