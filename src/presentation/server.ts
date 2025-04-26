import express, { Router } from "express";

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
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Servidor en el puerto = ${this.port}`);
    });
  }
  public close() {
    this.serverListener?.close();
  }
}
