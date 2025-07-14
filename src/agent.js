import 'dotenv/config'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
setGlobalDispatcher(new ProxyAgent(process.env.HTTP_PROXY))
import { Agent, run } from '@openai/agents'

import { getWeather } from './tools/get_weather.js'

const agent = new Agent({
  model: 'gpt-4.1-nano',
  name: 'Openai Assistant',
  instructions: '你是一个万能助手',
  tools: [getWeather]
})

const chatAgent = async input => {
  const result = await run(agent, input, {
    stream: true
  })

  for await (const event of result) {
    if (event.type === 'raw_model_stream_event') {
      console.log(`${event.type} %o`, event.data)
    }
    if (event.type == 'agent_updated_stream_event') {
      console.log(`${event.type} %s`, event.agent.name)
    }
    if (event.type === 'run_item_stream_event') {
      console.log(`${event.type} %o`, event.item)
    }
  }
}

chatAgent('北京当前温度多少度')
