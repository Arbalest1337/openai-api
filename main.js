import 'dotenv/config'
import express from 'express'
import * as openai from './src/openai.js'

const PORT = 6657
const app = express()
app.use(express.json())

const GlobalMiddleware = (req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url, req.body)
  next()
}
app.use(GlobalMiddleware)

app.post('/openai/chat/completions', async (req, res) => {
  try {
    const res = await openai.chatCompletions(req.body)
    res.send(success(response))
  } catch (err) {
    res.send(failed(err))
  }
})

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})

const success = (data = {}) => {
  return {
    code: 200,
    success: true,
    message: 'success',
    data
  }
}

const failed = (err = {}) => {
  console.log(err)
  return {
    code: 500,
    success: false,
    message: 'failed',
    data: err
  }
}
