import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";
import { IUsuario } from "../types/UsuarioTypes";

declare global {
  namespace Express {
    interface Request {
      usuario?: IUsuario
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log("[auth]")
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(404).json({message: "No autorizado"});
  }

  const [, token] = bearer.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'object' && decoded.id) {
      const usuario = await Usuario.findByPk(decoded.id);
      if (!usuario) res.status(404).json({message: "No se encontro el usuario"});
      req.usuario = usuario.dataValues; //Guardo el usuario para pasarselo a la funcion en el controlador en el req
    }
  } catch (error) {
    res.status(500).json({message: "token no valido"});
  }

  next();
}

export {authMiddleware}