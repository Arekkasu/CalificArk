import { Public } from "@prisma/client/runtime/library";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { validateEmail, validatePassword } from "../../utils/validators";

export class RegisterStudentDto {
  private constructor(
    private readonly username: string,
    private readonly email: string,
    private readonly password: string,
  ) {}

  static registerStudent(props: {
    [key: string]: any;
  }): [string?, RegisterStudentDto?] {
    const { username, email, password } = props;
    if (!username || !email || !password) {
      return ["Hay campos Faltantes", undefined];
    }
    if (!validateEmail(email)) {
      return ["Invalid Email", undefined];
    }
    if (!validatePassword(password)) {
      return ["Invalid Password", undefined];
    }
    const hashedPassword = bcryptAdapter.hash(password);
    return [
      undefined,
      //ESTE AL FINAL SE ENVIA AL ORM
      new RegisterStudentDto(username, email, hashedPassword),
    ];
  }

  public getAllData() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }
}
