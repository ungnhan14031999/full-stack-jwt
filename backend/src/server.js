import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initApiRoutes from "./route/api";
import configCors from "./config/cors";
import connectDB from './config/connectDB';
import 'dotenv/config';
import cookieParser from "cookie-parser";


let app = express();

//test connectio db
connectDB();

configCors(app);

//Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config cookie-parser
app.use(cookieParser());

//init route
viewEngine(app);
initApiRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Backend running port: localhost:${port}`);
});
