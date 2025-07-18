import { z } from 'zod'
import { tool } from '@openai/agents'

export const getWeather = tool({
  name: 'get_weather',
  description: 'Get current temperature for provided coordinates in celsius.',
  parameters: z
    .object({
      latitude: z.number(),
      longitude: z.number()
    })
    .strict(),
  async execute({ latitude, longitude }) {
    console.log('###### GET WEATHER ###########')
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    )
    const data = await response.json()
    return data.current.temperature_2m
  }
})
