import dotenv from 'dotenv';
import express, { Express } from "express";
import http from "http";
import cors from "cors";

dotenv.config();

// Express server
const port = 3001;
const app: Express = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
