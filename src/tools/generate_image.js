import 'dotenv/config'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
setGlobalDispatcher(new ProxyAgent(process.env.HTTP_PROXY))
import OpenAI from 'openai'
import path from 'path'

const client = new OpenAI()

const generateImage = async input => {
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
    tools: [{ type: 'image_generation', quality: 'low', size: '1024x1024' }],
    input: [systemInput, userInput]
  }

  const response = await client.responses.create(request)

  const imageData = response.output
    .filter(output => output.type === 'image_generation_call')
    .map(output => output.result)

  if (imageData.length > 0) {
    writeFile(
      'image',
      `gpt_image_1_${new Date().getTime()}.png`,
      Buffer.from(imageData[0], 'base64')
    )
  }
  console.log('done')
}

generateImage('帮我生成一个小猫图片')
