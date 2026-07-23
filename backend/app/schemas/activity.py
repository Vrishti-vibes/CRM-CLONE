from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class ActivityResponse(BaseModel):
    id: int
    title: str
    activity_type: str
    deal_id: int
    user_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


class ActivityListResponse(BaseModel):
    items: List[ActivityResponse]
    total: int