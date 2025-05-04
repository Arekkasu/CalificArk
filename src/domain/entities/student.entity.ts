export class StudentEntity {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _username: string;
  private readonly _password: string;
  private readonly _email_verified: boolean;

  constructor(
    id: string,
    email: string,
    username: string,
    password: string,
    email_verified: boolean,
  ) {
    this._id = id;
    this._email = email;
    this._username = username;
    this._password = password;
    this._email_verified = email_verified;
  }
  static fromObjectUser(obj: { [key: string]: any }) {
    const { id, email, username, password, email_verified } = obj;
    if (!id) {
      throw new Error("Student id is required");
    }
    if (!email) {
      throw new Error("Student email is required");
    }
    if (!username) {
      throw new Error("Student username is required");
    }
    if (!password) {
      throw new Error("Student password is required");
    }
    if (!Object.prototype.hasOwnProperty.call(obj, "email_verified")) {
      throw new Error("Student email_verified is required");
    }

    return new StudentEntity(id, email, username, password, email_verified);
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get email_verified(): boolean {
    return this._email_verified;
  }
}
