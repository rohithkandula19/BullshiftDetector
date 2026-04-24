from fastapi import APIRouter, HTTPException
from app.models.schemas import DetectRequest, DetectResponse
from app.services.claude_service import analyze_post

router = APIRouter()

@router.post("/detect", response_model=DetectResponse)
async def detect_bullshift(request: DetectRequest):
    if not request.post or len(request.post.strip()) < 10:
        raise HTTPException(status_code=400, detail="Post is too short to analyze")
    if len(request.post) > 3000:
        raise HTTPException(status_code=400, detail="Post is too long (max 3000 chars)")

    try:
        result = await analyze_post(request.post)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
