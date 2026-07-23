from typing import Optional, List
from datetime import datetime, date
from pydantic import BaseModel


class DealBase(BaseModel):
    title: str
    amount: float
    stage: Optional[str] = "QUALIFICATION"
    probability: Optional[int] = 20
    expected_close_date: Optional[date] = None
    contact_id: Optional[int] = None
    company_id: Optional[int] = None


class DealCreate(DealBase):
    pass


class DealUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    stage: Optional[str] = None
    probability: Optional[int] = None
    expected_close_date: Optional[date] = None
    contact_id: Optional[int] = None
    company_id: Optional[int] = None


class DealStageUpdate(BaseModel):
    stage: str


class DealResponse(DealBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


class DealListResponse(BaseModel):
    items: List[DealResponse]
    total: int