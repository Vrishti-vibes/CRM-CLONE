from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class CompanyBase(BaseModel):
    name: str
    industry: Optional[str] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    employee_count: Optional[int] = None
    annual_revenue: Optional[float] = None


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    phone: Optional[str] = None
    employee_count: Optional[int] = None
    annual_revenue: Optional[float] = None


class CompanyResponse(CompanyBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


class CompanyListResponse(BaseModel):
    items: List[CompanyResponse]
    total: int
    page: int
    size: int
    pages: int