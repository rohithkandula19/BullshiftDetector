import anthropic
import json
import os
from app.models.schemas import DetectResponse
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """You are BullshiftDetector, an AI that analyzes LinkedIn posts for corporate buzzwords, hollow humility, and performative authenticity. You respond ONLY with valid JSON, no markdown, no explanation.

Analyze the given LinkedIn post and return this exact JSON structure:
{
  "score": <integer 0-100, cringe score>,
  "buzzwords": [<list of detected bullshift words/phrases from the post, max 8>],
  "roast": "<one sharp, funny, specific roast sentence about this exact post, max 25 words>",
  "clean": "<a brutally honest, direct rewrite of what they actually meant to say, max 30 words>"
}

Score guide: 0-20 genuine, 21-40 mildly sus, 41-60 certified cringe, 61-80 high-grade bullshift, 81-100 pure uncut bullshift.
Buzzwords: humbled, excited to announce, grateful, blessed, incredible journey, add value, crush it, make an impact, passionate, driven, innovative, synergy, rockstar, fail forward, authentic, vulnerable, growth mindset, thought leader, pivot.
Be funny, specific, savage but not mean-spirited."""

VERDICT_MAP = [
    (20, "surprisingly genuine"),
    (40, "mildly sus"),
    (60, "certified cringe"),
    (80, "high-grade bullshift"),
    (101, "PURE UNCUT BULLSHIFT"),
]

def get_verdict(score: int) -> str:
    for threshold, label in VERDICT_MAP:
        if score < threshold:
            return label
    return "PURE UNCUT BULLSHIFT"

async def analyze_post(post: str) -> DetectResponse:
    client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1000,
        system=SYSTEM_PROMPT,
        messages=[
            {"role": "user", "content": f'Analyze this LinkedIn post:\n\n"{post}"'}
        ]
    )

    raw = message.content[0].text
    clean_raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        result = json.loads(clean_raw)
    except json.JSONDecodeError:
        result = {
            "score": 50,
            "buzzwords": [],
            "roast": "Analysis glitched. Try again.",
            "clean": "Could not parse."
        }

    return DetectResponse(
        score=result.get("score", 50),
        buzzwords=result.get("buzzwords", []),
        roast=result.get("roast", ""),
        clean=result.get("clean", ""),
        verdict=get_verdict(result.get("score", 50))
    )