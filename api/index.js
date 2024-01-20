import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import moralisRouter from './routes/moralis.route.js'
import Moralis from 'moralis'
Moralis.default

dotenv.config()

const app = express()

app.use('/api/v1', moralisRouter)

app.use(express.json())

Moralis.start({
    apiKey: process.env.MORALIS_KEY 
}).then(() => {
    app.listen(3000, ()=> console.log('Server is running on port 3000'))
}).catch((e)=> console.log(e))
