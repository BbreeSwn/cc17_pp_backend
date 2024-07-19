require("dotenv").config();
const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan')

const notFoundPage = require("./middleware/notFoundPage");
const authRouter = require("./routes/authRoutes");
const errorMiddleware = require("./middleware/error-middleware");
const userRouter = require("./routes/userRoute");
const authenticate = require("./middleware/authenticate");
const limiter = require('./middleware/rateLimit');
const auth_admin = require('./middleware/admin_authenticate');
const manageContentRouter = require("./routes/adminRoute");
const contentRouter = require("./routes/contentRote");
const newsRouter = require("./routes/newsRoute");



// json
app.use(cors());
app.use(morgan('dev')); //ดัก server ที่ยิงเข้ามา มีประโยชน์ตอน ไปเชื่อม react ว่ายิง severเข้ามามี bug อะไร
// app.use(limiter)
app.use(express.json());


// path
app.use("/auth" ,authRouter )  
app.use("/users" ,authenticate, userRouter)
app.use('/admin', auth_admin , manageContentRouter)
app.use('/content', contentRouter)
app.use('/news', newsRouter)



//not found page
app.use(notFoundPage)  


// ดัก error
app.use(errorMiddleware)
// run port
let port =  process.env.PORT || 8000
app.listen(port , () => {
    console.log("server run on port ...." , port)
})









