import 'dotenv/config'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
setGlobalDispatcher(new ProxyAgent(process.env.HTTP_PROXY))
import OpenAI from 'openai'

const client = new OpenAI()

const streamChat = async input => {
  const systemInput = {
    role: 'system',
    content: ''
  }

  const userInput = {
    role: 'user',
    content: [
      { type: 'input_text', text: input }
      // { type: 'input_image', image_url: `` }
    ]
  }

  const request = {
    stream: true,
    model: 'o4-mini',
    reasoning: {
      effort: 'low',
      summary: 'auto'
    },
    input: [systemInput, userInput]
  }

  const response = await client.responses.create(request)

  for await (const chunk of response) {
    if (chunk.type === 'response.reasoning_summary_text.delta') {
      process.stdout.write(chunk.delta)
    }
    if (chunk.type === 'response.output_text.delta') {
      process.stdout.write(chunk.delta)
    }

    if (chunk.type === `response.completed`) {
      console.log(`\n\nResponse completed.`)
    }
  }
}

streamChat('地球为什么是圆的')
