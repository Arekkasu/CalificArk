import jwt from "jsonwebtoken";
import envs from "./envs";

const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {
  static async generateToken(payload: any, expiresIn: number = 3600) {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }

  static validateToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return reject(err);

        resolve(decoded);
      });
    });
  }
}
