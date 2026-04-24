'use client'
import { useState, useEffect } from 'react'
import { detectBullshift, DetectResponse } from '@/lib/api'
import CringeMeter from '@/components/CringeMeter'
import HighlightedPost from '@/components/HighlightedPost'

const SAMPLES = [
  "Humbled and incredibly excited to announce that after an amazing journey of personal and professional growth, I have accepted a position as Senior Synergy Consultant at DisruptCo. Grateful for my incredible network, my mentor who believed in me, and God's plan. Let's crush it together. Excited for this new chapter!",
  "Hot take: The secret to success is waking up at 4am, working harder than everyone else, never complaining, embracing the grind, and being authentically vulnerable about your wins. I went from nothing to 7 figures by doing exactly this. DM me if you want to know my framework.",
  "I failed 47 times before I succeeded. Most people give up at 46. That's the difference between winners and losers. Repost if you agree. Also I'm launching a course."
]

const LOADING_MESSAGES = [
  "🧠 Deploying our AI synergy matrix...",
  "⛓️ Leveraging blockchain-enabled cringe detection...",
  "💥 Disrupting the LinkedIn ecosystem...",
  "🤝 Adding value to your network...",
  "🚀 Crushing it with machine learning...",
]

const VERDICT_EMOJIS: Record<string, string> = {
  "surprisingly genuine": "🥹😇✨",
  "mildly sus": "🤨👀😬",
  "certified cringe": "😬💀🫣",
  "high-grade bullshift": "💀🚨😭",
  "PURE UNCUT BULLSHIFT": "🚨💩🤡💀🔥",
}

const MAX_CHARS = 3000

export default function Home() {
  const [post, setPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const [result, setResult] = useState<DetectResponse | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [confetti, setConfetti] = useState<{ x: number, y: number, r: number, c: string, d: number }[]>([])

  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setLoadingMsg(m => (m + 1) % LOADING_MESSAGES.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [loading])

  function spawnConfetti() {
    const colors = ['#ff4d00', '#ffb800', '#00e87a', '#ff006e', '#00b4ff']
    const items = Array.from({ length: 60 }, (_, i) => ({
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      r: Math.random() * 8 + 4,
      c: colors[i % colors.length],
      d: Math.random() * 3 + 1
    }))
    setConfetti(items)
    setTimeout(() => setConfetti([]), 3000)
  }

  async function detect() {
    if (!post.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    setLoadingMsg(0)
    try {
      const data = await detectBullshift(post)
      setResult(data)
      if (data.score >= 70) spawnConfetti()
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Analysis failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function loadSample() {
    setPost(SAMPLES[Math.floor(Math.random() * SAMPLES.length)])
    setResult(null)
  }

  function copyClean() {
    if (!result?.clean) return
    navigator.clipboard.writeText(result.clean)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function shareOnLinkedIn() {
    if (!result) return
    const text = `I just got a ${result.score}/100 cringe score on BullshiftDetector 😂 "${result.verdict}"\n\nCheck yours at bullshiftdetector.com`
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://bullshiftdetector.com')}&summary=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const charCount = post.length
  const charColor = charCount > 2700 ? '#ff4d00' : charCount > 2000 ? '#ffb800' : '#555'
  const emoji = result ? (VERDICT_EMOJIS[result.verdict] || '😐') : ''
  const times = "'Times New Roman', Times, serif"

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', color: '#f0f0f0', fontFamily: "'Syne', sans-serif", position: 'relative', overflow: 'hidden' }}>

      {confetti.map((c, i) => (
        <div key={i} style={{ position: 'fixed', left: `${c.x}%`, top: `${c.y}%`, width: c.r, height: c.r, background: c.c, borderRadius: '50%', animation: `fall ${c.d}s linear forwards`, zIndex: 9999, pointerEvents: 'none' }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
        @keyframes shake { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-3deg)} 75%{transform:rotate(3deg)} }
        @keyframes pulse-badge { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes wiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-5deg) scale(1.1)} 75%{transform:rotate(5deg) scale(1.1)} }
        .shake { animation: shake 0.25s infinite; }
        .pulse-badge { animation: pulse-badge 1s infinite; }
        .blink { animation: blink 1s infinite; }
        .wiggle { animation: wiggle 0.5s infinite; }
        textarea:focus { outline: none; border-color: #ff4d00 !important; }
        * { box-sizing: border-box; }
      `}</style>

      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#ff4d00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: 'white' }}>B</div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>
            Bullshift<span style={{ color: '#ff4d00' }}>Detector</span>
          </span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#444', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>ENTERPRISE v1.0</span>
        </div>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#555' }}>🟢 AI systems nominal</span>
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* HERO */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', fontFamily: 'JetBrains Mono', fontSize: 11, color: '#ff4d00', letterSpacing: 2, background: 'rgba(255,77,0,0.08)', border: '1px solid rgba(255,77,0,0.2)', padding: '4px 14px', borderRadius: 20, marginBottom: 20 }}>
            🏆 #1 AI-POWERED LINKEDIN CRINGE DETECTION PLATFORM
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 16 }}>
            We Analyze.<br />
            <span style={{ color: '#ff4d00' }}>We Roast.</span><br />
            <span style={{ fontSize: 28, fontFamily: times, fontStyle: 'italic', color: '#555', fontWeight: 400, letterSpacing: '0px' }}>
              You Cringe. 💀
            </span>
          </h1>
          <p style={{ fontFamily: times, fontStyle: 'italic', fontSize: 15, color: '#555', maxWidth: 400, margin: '0 auto' }}>
            Enterprise-grade bullshift detection powered by cutting-edge AI synergy
          </p>
        </div>

        {/* INPUT */}
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#ff4d00' }}>▶</span> PASTE LINKEDIN POST FOR ANALYSIS
          </div>
          <textarea
            value={post}
            onChange={e => setPost(e.target.value.slice(0, MAX_CHARS))}
            placeholder='"Humbled and excited to announce I am thrilled to share my incredible journey..."'
            rows={5}
            style={{ width: '100%', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px', fontFamily: 'JetBrains Mono', fontSize: 13, color: '#e0e0e0', resize: 'vertical', lineHeight: 1.7 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 16 }}>
            <span style={{ fontFamily: times, fontStyle: 'italic', fontSize: 13, color: '#555' }}>
              {post ? `"${post.slice(0, 30)}..."` : 'awaiting your corporate nonsense...'}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: charColor }}>{charCount}/{MAX_CHARS}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={detect} disabled={loading || !post.trim()} style={{ background: loading ? '#333' : '#ff4d00', color: 'white', border: 'none', borderRadius: 10, padding: '13px 28px', fontFamily: 'Syne', fontWeight: 800, fontSize: 15, cursor: loading || !post.trim() ? 'not-allowed' : 'pointer', opacity: !post.trim() ? 0.5 : 1, transition: 'all 0.2s' }}>
              {loading ? '🔄 Analyzing...' : '🔍 Detect Bullshift'}
            </button>
            <button onClick={loadSample} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '13px 18px', fontFamily: 'JetBrains Mono', fontSize: 12, color: '#666', cursor: 'pointer' }}>
              load sample 🎲
            </button>
            {post && (
              <button onClick={() => { setPost(''); setResult(null) }} style={{ marginLeft: 'auto', background: 'none', border: 'none', fontFamily: 'JetBrains Mono', fontSize: 12, color: '#444', cursor: 'pointer' }}>
                clear ✕
              </button>
            )}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2.5rem', background: '#111', borderRadius: 16, border: '1px solid rgba(255,77,0,0.15)', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }} className="wiggle">🤖</div>
            <div style={{ fontFamily: times, fontStyle: 'italic', fontSize: 16, color: '#ff4d00', marginBottom: 8 }} className="blink">
              {LOADING_MESSAGES[loadingMsg]}
            </div>
            <div style={{ fontFamily: times, fontStyle: 'italic', fontSize: 13, color: '#444' }}>
              Our AI is working very hard and adding tremendous value to your network 🙏
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(255,77,0,0.08)', border: '1px solid rgba(255,77,0,0.3)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem', fontFamily: 'JetBrains Mono', fontSize: 13, color: '#ff4d00', textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* SCORE CARD */}
            <div style={{ background: '#111', border: result.score >= 80 ? '2px solid #ff4d00' : '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '2.5rem', textAlign: 'center', boxShadow: result.score >= 80 ? '0 0 40px rgba(255,77,0,0.15)' : 'none' }}>
              <div style={{ fontSize: 52, marginBottom: 8 }} className={result.score >= 80 ? 'wiggle' : ''}>{emoji}</div>
              <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, color: result.score >= 80 ? '#ff4d00' : result.score >= 60 ? '#ff8c00' : result.score >= 40 ? '#ffb800' : '#00e87a', fontVariantNumeric: 'tabular-nums', marginBottom: 4 }} className={result.score >= 80 ? 'shake' : ''}>
                {result.score}
              </div>
              <div style={{ fontFamily: times, fontStyle: 'italic', fontSize: 15, color: '#555', marginBottom: 20 }}>
                cringe score out of 100 — the higher, the worse 😭
              </div>
              <div style={{ background: '#1a1a1a', borderRadius: 4, height: 8, width: '100%', overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ height: '100%', borderRadius: 4, width: `${result.score}%`, background: result.score >= 80 ? '#ff4d00' : result.score >= 60 ? '#ff8c00' : result.score >= 40 ? '#ffb800' : '#00e87a', transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: times, fontStyle: 'italic', fontSize: 12, color: '#444', marginBottom: 20 }}>
                <span>genuine 🥹</span><span>sus 🤨</span><span>cringe 😬</span><span>pure bullshift 💩</span>
              </div>
              <div style={{ display: 'inline-block', padding: '10px 24px', borderRadius: 50, fontFamily: times, fontStyle: 'italic', fontWeight: 700, fontSize: 16, letterSpacing: 0.5, background: result.score >= 80 ? 'rgba(255,77,0,0.15)' : result.score >= 60 ? 'rgba(255,140,0,0.15)' : result.score >= 40 ? 'rgba(255,184,0,0.15)' : 'rgba(0,232,122,0.15)', color: result.score >= 80 ? '#ff4d00' : result.score >= 60 ? '#ff8c00' : result.score >= 40 ? '#ffb800' : '#00e87a', border: `1px solid ${result.score >= 80 ? 'rgba(255,77,0,0.4)' : result.score >= 60 ? 'rgba(255,140,0,0.4)' : result.score >= 40 ? 'rgba(255,184,0,0.4)' : 'rgba(0,232,122,0.4)'}` }} className={result.score >= 70 ? 'pulse-badge' : ''}>
                {result.verdict} {emoji}
              </div>
            </div>

            {/* HIGHLIGHTED POST */}
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: '#ff4d00' }}>●</span> BULLSHIFT DETECTED IN THE WILD 🌿
              </div>
              <HighlightedPost text={post} buzzwords={result.buzzwords} />
            </div>

            {/* BUZZWORDS + ROAST */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.5rem' }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14 }}>
                  💩 Offending Words
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {result.buzzwords.length > 0 ? result.buzzwords.map((w, i) => (
                    <span key={i} style={{ background: 'rgba(255,77,0,0.1)', color: '#ff4d00', border: '1px solid rgba(255,77,0,0.3)', borderRadius: 20, padding: '5px 12px', fontFamily: times, fontStyle: 'italic', fontSize: 13 }}>
                      💩 {w}
                    </span>
                  )) : <span style={{ fontFamily: times, fontStyle: 'italic', fontSize: 14, color: '#555' }}>surprisingly clean 🥹 who are you</span>}
                </div>
              </div>

              <div style={{ background: '#111', border: '1px solid rgba(255,184,0,0.2)', borderRadius: 16, padding: '1.5rem' }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 14 }}>
                  🔥 The Roast
                </div>
                <p style={{ fontFamily: times, fontStyle: 'italic', fontSize: 15, lineHeight: 1.7, color: '#e0e0e0' }}>
                  "{result.roast}" 😂
                </p>
              </div>
            </div>

            {/* CLEAN VERSION */}
            <div style={{ background: '#111', border: '1px solid rgba(0,232,122,0.2)', borderRadius: 16, padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 2 }}>
                  ✅ What you should have said
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={copyClean} style={{ fontFamily: 'JetBrains Mono', fontSize: 11, padding: '5px 14px', borderRadius: 20, border: copied ? '1px solid #00e87a' : '1px solid rgba(255,255,255,0.1)', color: copied ? '#00e87a' : '#666', background: 'none', cursor: 'pointer' }}>
                    {copied ? '✓ copied!' : 'copy'}
                  </button>
                  <button onClick={shareOnLinkedIn} style={{ fontFamily: 'JetBrains Mono', fontSize: 11, padding: '5px 14px', borderRadius: 20, border: '1px solid #0077b5', color: '#0077b5', background: 'none', cursor: 'pointer' }}>
                    share 🔗
                  </button>
                </div>
              </div>
              <div style={{ background: '#0d0d0d', borderRadius: 10, padding: '14px 16px', fontFamily: times, fontStyle: 'italic', fontSize: 15, lineHeight: 1.8, color: '#e0e0e0', borderLeft: '3px solid #00e87a' }}>
                {result.clean}
              </div>
            </div>

            {result.score >= 75 && (
              <div style={{ background: 'rgba(255,77,0,0.08)', border: '1px solid rgba(255,77,0,0.2)', borderRadius: 16, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: times, fontStyle: 'italic', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                    😂 This is too good not to share
                  </div>
                  <div style={{ fontFamily: times, fontStyle: 'italic', fontSize: 13, color: '#666' }}>
                    Show the world your {result.score}/100 cringe score 💀
                  </div>
                </div>
                <button onClick={shareOnLinkedIn} style={{ background: '#ff4d00', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'Syne', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Post to LinkedIn 💀
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: 'center', fontFamily: times, fontStyle: 'italic', fontSize: 13, color: '#333', paddingTop: '2rem' }}>
          built with Claude API · no posts stored · roasts fictional · we are not responsible for any existential crises 🫠
        </div>
      </div>
    </div>
  )
}