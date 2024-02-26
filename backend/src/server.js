import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initApiRoutes from "./route/api";
import configCors from "./config/cors";
import connectDB from './config/connectDB';
import 'dotenv/config';


let app = express();

//test connection db
connectDB();

configCors(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init route
viewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Backend running port: localhost:${port}`);
});
