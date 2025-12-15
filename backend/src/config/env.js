import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URL,

  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    emailVerifySecret: process.env.JWT_EMAIL_VERIFY_SECRET,
    passwordResetSecret: process.env.JWT_PASSWORD_RESET_SECRET,
  },
};
