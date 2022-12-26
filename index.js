require('dotenv').config()
require('./db/conn')
const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./models/userSchema')
const router = require('./routes/router')
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use(router)

app.get('/',(req,res)=>{
    res.send('server running')
}
)



app.listen(PORT,()=>console.log(`Listening on => http://localhost:${PORT}`))