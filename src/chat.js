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
    // previous_response_id,
    model: 'gpt-4.1-nano',
    stream: true,
    tools: [{ type: 'web_search_preview' }],
    input: [systemInput, userInput]
  }

  const response = await client.responses.create(request)

  for await (const chunk of response) {
    if (chunk.type === 'response.output_text.delta') {
      process.stdout.write(chunk.delta)
    }

    if (chunk.type === `response.completed`) {
      console.log(`\n\nResponse completed.`)
    }
  }
}

streamChat('今天的热点新闻')
