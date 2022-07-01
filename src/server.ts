import express,{ Application, Request, Response } from "express";
import userRoute from "./routes/userRoute";
import authorRoute from "./routes/authorRoute";
import bookRoute from "./routes/bookRoute";
import "./config/dbConfig";

const app:Application = express();
const port:number = 4002;
app.use(express.json());

app.get("/", (req:Request, res: Response) =>{
    res.send("Hello LAVANKumar!!")
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
});


app.use("/user", userRoute);
app.use("/author", authorRoute);
app.use("/book", bookRoute);
