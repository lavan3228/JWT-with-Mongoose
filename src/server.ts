import express,{ Application, Request, Response } from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import "./config/dbConfig";
import EndPoints from "./routes/endpoints";

const app:Application = express();
const port:any = process.env.PORT || 4002;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req:Request, res: Response) =>{
    res.send("Hello LAVANKUMAR!!")
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
});

try {
  app.use("/api", new EndPoints().configureRoutes());
} catch (error) {
  console.error('Error loading endpoints:', error);
}