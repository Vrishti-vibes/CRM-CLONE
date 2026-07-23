from typing import List
from pydantic import BaseModel


class MetricCard(BaseModel):
    title: str
    value: str
    change: str
    is_positive: bool


class StageSummary(BaseModel):
    stage: str
    count: int
    value: float
    percentage: int
    color: str


class RecentActivity(BaseModel):
    id: int
    title: str
    type: str
    user: str
    timestamp: str


class TaskWidget(BaseModel):
    id: int
    title: str
    due_date: str
    priority: str
    completed: bool


class DashboardSummary(BaseModel):
    metrics: List[MetricCard]
    pipeline_summary: List[StageSummary]
    recent_activities: List[RecentActivity]
    upcoming_tasks: List[TaskWidget]