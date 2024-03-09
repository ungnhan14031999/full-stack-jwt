import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initApiRoutes from "./route/api";
import configCors from "./config/cors";
import connectDB from './config/connectDB';
import 'dotenv/config';

import {creatJWT,verifyToken}  from './middleware/JWTAction';


//test JWT
creatJWT();
let decodedData = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWljaGkiLCJhZ2UiOjI1LCJpYXQiOjE3MDk5OTA1OTJ9._Y2_A8mhh6nZMMJ49fmMK_gW67XtnvxmigFBTDA9NzY');
console.log('decodedData',decodedData);

let app = express();

//test connection db
connectDB();

configCors(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init route
viewEngine(app);
initApiRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Backend running port: localhost:${port}`);
});
