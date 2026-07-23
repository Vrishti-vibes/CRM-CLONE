from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.models.user import User
from app.schemas.dashboard import DashboardSummary

router = APIRouter()


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    metrics = [
        {"title": "Total Revenue", "value": "$128,450", "change": "+12.5%", "is_positive": True},
        {"title": "Active Deals", "value": "42 Deals", "change": "+8.2%", "is_positive": True},
        {"title": "Pipeline Value", "value": "$485,000", "change": "-2.1%", "is_positive": False},
        {"title": "Win Rate", "value": "68.4%", "change": "+4.1%", "is_positive": True},
    ]

    pipeline_summary = [
        {"stage": "Qualification", "count": 12, "value": 85000.0, "percentage": 75, "color": "bg-sky-500"},
        {"stage": "Needs Analysis", "count": 9, "value": 110000.0, "percentage": 60, "color": "bg-indigo-500"},
        {"stage": "Proposal Sent", "count": 14, "value": 195000.0, "percentage": 85, "color": "bg-amber-500"},
        {"stage": "Negotiation", "count": 5, "value": 75000.0, "percentage": 40, "color": "bg-purple-500"},
        {"stage": "Closed Won", "count": 8, "value": 120000.0, "percentage": 95, "color": "bg-emerald-500"},
    ]

    recent_activities = [
        {"id": 1, "title": "New deal created: Enterprise SaaS Renewal", "type": "deal", "user": current_user.full_name, "timestamp": "10 mins ago"},
        {"id": 2, "title": "Contact added: Sarah Jenkins (Acme Corp)", "type": "contact", "user": "Vrishti Kumari", "timestamp": "1 hour ago"},
        {"id": 3, "title": "Call logged: Product Demo with TechCorp", "type": "call", "user": current_user.full_name, "timestamp": "3 hours ago"},
        {"id": 4, "title": "Deal moved to Negotiation: Cloud Migration", "type": "pipeline", "user": "Vrishti Kumari", "timestamp": "5 hours ago"},
    ]

    upcoming_tasks = [
        {"id": 101, "title": "Follow up with Acme Corp regarding agreement", "due_date": "Today, 4:00 PM", "priority": "HIGH", "completed": False},
        {"id": 102, "title": "Prepare Q3 sales performance review deck", "due_date": "Tomorrow, 11:00 AM", "priority": "MEDIUM", "completed": False},
        {"id": 103, "title": "Send updated proposal to Nexa Solutions", "due_date": "25 Jul, 2:00 PM", "priority": "URGENT", "completed": False},
    ]

    return {
        "metrics": metrics,
        "pipeline_summary": pipeline_summary,
        "recent_activities": recent_activities,
        "upcoming_tasks": upcoming_tasks,
    }