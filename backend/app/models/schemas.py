from pydantic import BaseModel
from typing import List

class DetectRequest(BaseModel):
    post: str

class DetectResponse(BaseModel):
    score: int
    buzzwords: List[str]
    roast: str
    clean: str
    verdict: str
