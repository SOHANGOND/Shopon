const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart");
const cors = require("cors");
const corsOptions = {
    origin: ['http://localhost:3000',"http://localhost:3001"], // Replace with the origin of your frontend app
    methods: 'GET', // Allow only GET requests
    allowedHeaders: ['Content-Type'], // List of allowed headers
  };
app.use(cors(corsOptions)); 

dotenv.config();

mongoose.connect(process.env.MONGO_URL).
then(() => console.log("Connected to the db")).
    catch((err) => console.log(err));



app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);

app.listen(process.env.PORT||5000, () => console.log("Server is listening at port no 5000"));