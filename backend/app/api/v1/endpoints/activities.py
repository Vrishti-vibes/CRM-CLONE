from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.models.activity import Activity
from app.models.user import User
from app.schemas.activity import ActivityListResponse

router = APIRouter()


@router.get("/deals/{deal_id}/activities", response_model=ActivityListResponse)
def get_deal_activities(
    deal_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    activities = db.query(Activity).filter(Activity.deal_id == deal_id).order_by(Activity.id.desc()).all()
    return {"items": activities, "total": len(activities)}