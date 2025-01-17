import dotenv from 'dotenv';
import { ServerConfig } from '../types/types';
dotenv.config();

interface IConfig {
  server: ServerConfig;
  apiAuth: {
    key: string;
    name: string;
  };
  limits: {
    products: {
      paginationsLimit: number;
    };
  };
  awsBucket: {
    name: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
}

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

export const config: IConfig = {
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
  },
  apiAuth: {
    key: getEnvVar('API_KEY'),
    name: getEnvVar('API_NAME'),
  },
  limits: {
    products: {
      paginationsLimit: parseInt(getEnvVar('PRODUCTS_PER_PAGE')),
    },
  },
  awsBucket: {
    name: getEnvVar('NEXT_PUBLIC_AWS_BUCKET_NAME'),
    region: getEnvVar('NEXT_PUBLIC_AWS_BUCKET_REGION'),
    accessKeyId: getEnvVar('NEXT_PUBLIC_AWS_ACCESS_KEY') || '',
    secretAccessKey: getEnvVar('NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY') || '',
  },
};
