import dotenv from "dotenv";
import { IConfig } from "../types/types";
dotenv.config();

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

export const config: IConfig = {
  server: {
    port: parseInt(process.env.PORT || "3001", 10),
  },
  bucket: {
    name: getEnvVar("AWS_BUCKET_NAME"),
    region: getEnvVar("AWS_BUCKET_REGION"),
    accessKey: getEnvVar("AWS_ACCESS_KEY"),
    secretAccessKey: getEnvVar("AWS_SECRET_ACCESS_KEY"),
  },
};
