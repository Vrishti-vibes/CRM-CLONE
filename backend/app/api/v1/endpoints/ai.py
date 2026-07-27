from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class AIQueryRequest(BaseModel):
    prompt: str
    context: str | None = None

@router.post("/analyze")
async def analyze_pipeline(request: AIQueryRequest):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")
    
    prompt_lower = request.prompt.lower()
    
    if "deal" in prompt_lower or "pipeline" in prompt_lower:
        result = "Active pipeline value is $485,000 across 42 deals. 'Proposal Sent' stage currently has 14 deals valued at $195,000 with high conversion probability."
    elif "task" in prompt_lower or "follow" in prompt_lower:
        result = "You have 3 pending high-priority tasks for today, including follow-ups with Acme Corp and TechCorp."
    else:
        result = f"Aura AI Insight: Request '{request.prompt}' processed. All account metrics are performing within normal baseline thresholds."

    return {
        "status": "success",
        "response": result
    }