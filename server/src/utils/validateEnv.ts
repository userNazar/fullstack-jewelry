import { cleanEnv, num, port, str } from "envalid";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    JWT_ACCESS_SECRET: str(),
    JWT_REFRESH_SECRET: str(),
    SMTP_HOST: str(),
    SMTP_PORT: num(),
    SMTP_MAIL: str(),
    SMTP_PASSWORD: str(),
    API_URL: str(),
    CLIENT_URL: str()
})