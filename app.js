import express from "express";
import mongoose from "mongoose";
import router from './routes/user-routes.js';
import blogRouter from "./routes/blog-routes.js";
// Explicitly specifying the file extension
import bodyParser from "body-parser";
const app = express();



app.use(bodyParser.json());
app.use(express.json())
app.use("/api/user", router);  //http:localhost:5000/api/user/login


app.use("/api/blog", blogRouter);  //http:localhost:5000/api/user/login


mongoose
  .connect(`mongodb+srv://shivam:shivam123@cluster0.yr7vygl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  
  .then(() => {
    console.log("database connected successfully");
    // mongoose.set('bufferCommands', false);
    // mongoose.set('bufferTimeoutMS', 0);
  })
  .catch((e) => {
    console.log("error while connect to db");
  });

app.listen(5000, () => {
  console.log("server is listening at 5000 port");
});
