import jwt from "jsonwebtoken";

type Payload = {
  id: number
}

const generarJWT = (payload: Payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  return token;
};

export { generarJWT };
