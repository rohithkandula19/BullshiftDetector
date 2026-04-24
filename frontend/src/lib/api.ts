import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export interface DetectResponse {
  score: number
  buzzwords: string[]
  roast: string
  clean: string
  verdict: string
}

export async function detectBullshift(post: string): Promise<DetectResponse> {
  const res = await axios.post(`${API_BASE}/api/v1/detect`, { post })
  return res.data
}
