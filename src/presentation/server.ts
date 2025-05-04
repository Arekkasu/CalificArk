import express, { Router } from "express";
import cors from "cors";
import session, { Session } from "express-session";
import envs from "../config/envs";
declare module "express-session" {
  interface SessionData {
    user?: string;
  }
}

interface serverOptions {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: serverOptions) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // CONFIGURANDO EL EXPRESS

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(
      session({
        secret: envs.SECRET_SESSION_TOKEN,
        resave: false, // Evita reguardar la sesión si no hay cambios (mejor rendimiento)
        saveUninitialized: false, // No guarda sesiones vacías (seguridad)
        cookie: {
          httpOnly: true, // Previene acceso desde JavaScript (XSS)
          secure: false, // Permitir cookies en HTTP (localhost)
          sameSite: "lax", // Protección básica contra CSRF (en producción usa 'strict')
          maxAge: 24 * 60 * 60 * 1000, // 1 día de duración
        },
      }),
    );
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Servidor en el puerto = ${this.port}`);
    });
  }
  public close() {
    this.serverListener?.close();
  }
}
