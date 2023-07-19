const express = require('express')
const app = express()
const port = 3000
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const productRouter=require('./Router/Product')
const cors = require('cors');


dotenv.config()

app.options("*", cors({ origin: 'http://localhost:19000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:19000", optionsSuccessStatus: 200 }));

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true,limit:'10mb'}))

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('DB Connected'))

app.use('/api/v1',productRouter)





const PORT=process.env.PORT || 3000
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`)) 