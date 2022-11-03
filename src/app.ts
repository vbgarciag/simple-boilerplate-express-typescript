import express from "express";
import usersRoutes from './routes/usersRoutes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users",usersRoutes);

app.listen(3000, ()=>{
    console.log("server running");
});