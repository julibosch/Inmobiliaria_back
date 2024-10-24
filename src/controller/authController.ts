import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { generarJWT } from "../libs/jwt";

interface IUsuario  {
  id?: number;
  nombre: string;
  password: string;
}

const login = async (req: Request, res: Response) => {
  try {
    const {nombre, password} = req.body;
    const usuario: IUsuario | null = await Usuario.findOne({
      where: { nombre, password }
  });
    if (!usuario) return res.status(404).json({message: "Usuario no encontrado"});
    const token = generarJWT({id:usuario.id});
    return res.json(token)
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { login };
