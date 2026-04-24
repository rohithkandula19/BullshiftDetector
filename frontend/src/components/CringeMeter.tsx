'use client'
import { useEffect, useState } from 'react'

interface Props {
  score: number
  verdict: string
}

function getColor(score: number) {
  if (score < 30) return '#00e87a'
  if (score < 55) return '#ffb800'
  if (score < 75) return '#ff8c00'
  return '#ff4d00'
}

function getVerdictStyle(verdict: string) {
  if (verdict.includes('genuine')) return { bg: 'rgba(0,232,122,0.15)', color: '#00e87a' }
  if (verdict.includes('sus')) return { bg: 'rgba(255,184,0,0.15)', color: '#ffb800' }
  if (verdict.includes('cringe')) return { bg: 'rgba(255,140,0,0.15)', color: '#ff8c00' }
  return { bg: 'rgba(255,77,0,0.2)', color: '#ff4d00' }
}

export default function CringeMeter({ score, verdict }: Props) {
  const [displayed, setDisplayed] = useState(0)
  const [barWidth, setBarWidth] = useState(0)
  const color = getColor(score)
  const vs = getVerdictStyle(verdict)

  useEffect(() => {
    setDisplayed(0)
    setBarWidth(0)
    let current = 0
    const step = score / 40
    const interval = setInterval(() => {
      current = Math.min(current + step, score)
      setDisplayed(Math.round(current))
      setBarWidth((current / 100) * 100)
      if (current >= score) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [score])

  return (
    <div className="bg-[#111] border border-white/8 rounded-xl p-8 text-center dark:bg-[#111]">
      <div className="text-[80px] font-extrabold leading-none mb-1 tabular-nums transition-colors duration-500"
        style={{ color }}>
        {displayed}
      </div>
      <div className="font-mono text-[11px] text-gray-500 uppercase tracking-widest mb-6">
        cringe score / 100
      </div>
      <div className="bg-white/5 rounded h-2 w-full overflow-hidden mb-2">
        <div
          className="h-full rounded transition-all duration-[1200ms]"
          style={{ width: `${barWidth}%`, background: color }}
        />
      </div>
      <div className="flex justify-between font-mono text-[10px] text-gray-600 mb-4">
        <span>genuine</span><span>sus</span><span>cringe</span><span>pure bullshift</span>
      </div>
      <span
        className="inline-block px-4 py-1.5 rounded-full text-[13px] font-bold font-mono"
        style={{ background: vs.bg, color: vs.color }}
      >
        {verdict}
      </span>
    </div>
  )
}
