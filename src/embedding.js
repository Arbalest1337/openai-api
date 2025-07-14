import 'dotenv/config'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
setGlobalDispatcher(new ProxyAgent(process.env.HTTP_PROXY))
import OpenAI from 'openai'
const openai = new OpenAI()

const getEmbeddings = async input => {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input
  })
  return res.data.map(d => d.embedding)
}

const cosineSimilarity = (vec1, vec2) => {
  let dot = 0,
    normA = 0,
    normB = 0
  for (let i = 0; i < vec1.length; i++) {
    dot += vec1[i] * vec2[i]
    normA += vec1[i] ** 2
    normB += vec2[i] ** 2
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

const embeddings = await getEmbeddings([
  'ai人工智能',
  'ai人工智能领域科技创新日新月异，算法与模型不断优化升级，大模型推动感知与决策能力提升。智能医疗、自动驾驶、智慧城市等场景快速落地，边缘计算与联邦学习强化安全性。未来跨领域融合将引领更高水平的产业新变革。'
])
const similarity = cosineSimilarity(...embeddings)
console.log(`文本 A 与 文本 B 的相似度：${similarity.toFixed(4)}`)
