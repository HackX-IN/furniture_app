const express = require('express')
const app = express()
const port = 3000
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const productRouter=require('./Router/Product')
const userRouter=require('./Router/User')
const cors = require('cors');
const cookieParser=require('cookie-parser')


dotenv.config()

app.options("*", cors({ origin: 'http://localhost:19000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:19000", optionsSuccessStatus: 200 }));

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true,limit:'10mb'}))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('DB Connected'))

app.use('/api/v1',productRouter)
app.use('/api/v1',userRouter)





const Port = 3001; // Change the port number to a value above 1024
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});