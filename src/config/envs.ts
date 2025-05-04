import dotenv from "dotenv";
import { get } from "env-var";
dotenv.config();

const envs = {
  SERVERMAIL: get("SERVERMAIL").required().asString(),
  PORT_ONE: get("PORT_ONE").required().asPortNumber(),
  USERNAME_MAIL: get("USERNAME_MAIL").required().asString(),
  PASSWORD_MAIL: get("PASSWORD_MAIL").required().asString(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  WEB_URL: get("WEB_URL").required().asString(),
};

export default envs;
