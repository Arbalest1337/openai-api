import OpenAI from 'openai'

export const chatCompletions = async config => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY })
  const res = await openai.chat.completions.create(config)
  return res.choices[0].message
}
