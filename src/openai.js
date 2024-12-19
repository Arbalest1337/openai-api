import OpenAI from 'openai'

setTimeout(() => {
  console.log(process.env.OPENAI_KEY)
  const apiKey = process.env.OPENAI_KEY
  const openai = new OpenAI({ apiKey })
}, 100)

export const chatCompletions = async config => {
  const res = await openai.chat.completions.create(config)
  return res.choices[0].message
}
