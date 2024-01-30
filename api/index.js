import express from 'express'
import dotenv from 'dotenv'
import moralisRouter from './routes/moralis.route.js'
import Moralis from 'moralis'
import path from 'path'
import oneInchRouter from './routes/oneInch.route.js'


dotenv.config()




const app = express()
app.use(express.json())

Moralis.start({
    apiKey: process.env.MORALIS_KEY 
})
  .then(() => {
    app.listen(3000, ()=> console.log('Server is running on port 3000'))
  })
  .catch((e) => console.log(e))
  const __dirname = path.resolve()


app.use('/api/v1', moralisRouter)
app.use('/api/v1' , oneInchRouter)

app.use(express.json())





app.use(express.static(path.join(__dirname, '../client/dist')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,'../client/dist/index.html'));
// })