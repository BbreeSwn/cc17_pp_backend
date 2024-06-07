require("dotenv").config();
const express = require('express');
const cors = require("cors");
const notFoundPage = require("./middleware/notFoundPage");
const authRouter = require("./routes/authRoutes");
const errorMiddleware = require("./middleware/error-middleware");
const userRouter = require("./routes/userRoute");
const app = express();
const authenticate = require("./middleware/authenticate");



// json
app.use(cors());
app.use(express.json());

// path
app.use("/auth" ,authRouter )  
app.use("/users" ,authenticate, userRouter)  



//not found page
app.use(notFoundPage)  


// ดัก error
app.use(errorMiddleware)
// run port
let port =  process.env.PORT || 8000
app.listen(port , () => {
    console.log("server run on port ...." , port)
})









