export class LoginStudentDto {
  private constructor(
    private readonly username: string,
    private readonly password: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, LoginStudentDto?] {
    const { username, password } = props;
    if (!username || !password) {
      return ["Missing username or password", undefined];
    }
    if (typeof username !== "string" || typeof password !== "string") {
      return ["Invalid username or password", undefined];
    }
    return [undefined, new LoginStudentDto(username, password)];
  }

  public getAllData() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
