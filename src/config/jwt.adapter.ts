import jwt from "jsonwebtoken";
import envs from "./envs";

export class JwtAdapter {
  // expira en una hora
  static async generateToken(payload: any, expiresIn: number = 3600) {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SECRET,
        { expiresIn: expiresIn },
        (err, token) => {
          if (err) return resolve(null);

          resolve(token);
        },
      );
    });
  }

  static validateToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, envs.JWT_SECRET, (err, decoded) => {
        if (err) return reject(err);

        resolve(decoded);
      });
    });
  }
}
