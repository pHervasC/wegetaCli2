import { ITipoUsuario } from "./tipoUsuario.interface";

export interface IUsuario {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    email: string;
    password: string;
    tipousuario: ITipoUsuario;
  }