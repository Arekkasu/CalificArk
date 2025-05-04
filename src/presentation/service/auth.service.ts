import { Public } from "@prisma/client/runtime/library";
import envs from "../../config/envs";
import { JwtAdapter } from "../../config/jwt.adapter";
import { StudentRepositoryImpl } from "../../infrastructure/repository/student.repository .impl";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly studentRepository: StudentRepositoryImpl,
  ) {}

  public sendEmailVerification = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) {
      throw new Error("Failed to generate token");
    }

    const linkVerify = `${envs.WEB_URL}/auth/verify/${token}`;

    const htmlMessage = `
      <h1>Verifica tu email</h1>
      <p>Por favor, haz clic en el siguiente enlace para verificar tu dirección de correo electrónico:</p>
      <p><a href="${linkVerify}" target="_blank" style="color: blue;">Verificar Email</a></p>
    `;
    console.log(htmlMessage);
    const options = {
      to: email,
      subject: "Verificación de correo electrónico",
      htmlBody: htmlMessage,
    };
    const isSent = await this.emailService.sendEmail(options);
    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) {
      throw new Error("Invalid token");
    }
    const { email } = payload as { email: string };
    if (!email) {
      throw new Error("Email is not in token");
    }
    const [error, success] = await this.studentRepository.setVerified(email);
    if (error) {
      return error;
    }
    return success;
  };
}
