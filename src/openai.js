import './loadEnv.js'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_KEY
const openai = new OpenAI({ apiKey })

export const chatCompletions = async config => {
  const res = await openai.chat.completions.create(config)
  return res.choices[0].message
}
