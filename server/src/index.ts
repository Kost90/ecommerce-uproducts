import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import cors from "cors";
import { router as productRoutes } from "./routes/ProductRoutes";

dotenv.config();

// Express server
const  port  = process.env.PORT;

const app: Express = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

app.use("/products", productRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
