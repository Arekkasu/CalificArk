import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService
      .validateEmail(token)
      .then((result) => {
        res.status(200).json({ message: "Email validated successfully" });
      })
      .catch((e) => {
        res.status(400).json({ message: "Invalid token", error: e });
      });
  };

  login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    this.authService
      .login(username, password)
      .then((response) => {
        req.session.user = response;
        res.status(200).json({ message: "Logged in successfully", response });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Invalid credentials",
        });
      });
  };

  // checkingSession = (req: Request, res: Response) => {
  //   res
  //     .status(200)
  //     .json({ message: "Session is valid", user: req.session.user });
  // };
}
