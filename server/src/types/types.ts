interface ServerConfig {
  port: number;
}

interface IBucket {
  name: string;
  region: string;
  accessKey: string;
  secretAccessKey: string;
}

export interface IConfig {
  server: ServerConfig;
  bucket: IBucket;
}
