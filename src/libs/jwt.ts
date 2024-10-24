import jwt from "jsonwebtoken";

type Payload = {
  id: number
}

const generarJWT = (payload: Payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  return token;
};

export { generarJWT };
