from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class NoteBase(BaseModel):
    content: str


class NoteCreate(NoteBase):
    pass


class NoteResponse(NoteBase):
    id: int
    deal_id: int
    author_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


class NoteListResponse(BaseModel):
    items: List[NoteResponse]
    total: int