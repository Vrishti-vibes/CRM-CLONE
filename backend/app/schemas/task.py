from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: Optional[str] = "TASK"
    due_date: Optional[datetime] = None
    priority: Optional[str] = "MEDIUM"
    completed: Optional[bool] = False
    contact_id: Optional[int] = None
    deal_id: Optional[int] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[str] = None
    completed: Optional[bool] = None
    contact_id: Optional[int] = None
    deal_id: Optional[int] = None


class TaskResponse(TaskBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


class TaskListResponse(BaseModel):
    items: List[TaskResponse]
    total: int