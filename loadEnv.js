export const initEnv = async () => {
  console.log(`env: ${process.env.NODE_ENV}`)
  if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv')
    await dotenv.config()
    await new Promise(resolve => resolve())
    console.log('.env loaded')
  }
}

await initEnv()
