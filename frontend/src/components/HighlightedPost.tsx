'use client'

interface Props {
  text: string
  buzzwords: string[]
}

export default function HighlightedPost({ text, buzzwords }: Props) {
  if (!text) return null

  let result = text
  const sorted = [...buzzwords].sort((a, b) => b.length - a.length)

  sorted.forEach(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi')
    result = result.replace(regex, `__BS__${word}__BS__`)
  })

  const parts = result.split('__BS__')

  return (
    <div className="text-sm leading-relaxed text-gray-300">
      {parts.map((part, i) => {
        const isBuzz = buzzwords.some(w => w.toLowerCase() === part.toLowerCase())
        return isBuzz ? (
          <span
            key={i}
            className="bg-[rgba(255,77,0,0.15)] text-[#ff4d00] rounded px-0.5 border-b border-[rgba(255,77,0,0.4)] font-medium"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      })}
    </div>
  )
}
