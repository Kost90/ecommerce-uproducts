import dotenv from "dotenv";
import { ServerConfig } from "../types/types";
dotenv.config();

interface IConfig {
    server:ServerConfig;
}

export const config:IConfig = {
    server:{
        port:parseInt(process.env.PORT || "3001", 10),
    }
}