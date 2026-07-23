from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.models.deal import Deal
from app.models.activity import Activity
from app.models.user import User
from app.schemas.deal import (
    DealCreate,
    DealUpdate,
    DealStageUpdate,
    DealResponse,
    DealListResponse,
)

router = APIRouter()


@router.get("", response_model=DealListResponse)
def get_deals(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
    stage: Optional[str] = None,
) -> Any:
    query = db.query(Deal)
    if stage:
        query = query.filter(Deal.stage == stage)

    deals = query.order_by(Deal.id.desc()).all()
    return {
        "items": deals,
        "total": len(deals),
    }


@router.post("", response_model=DealResponse, status_code=status.HTTP_201_CREATED)
def create_deal(
    *,
    db: Session = Depends(deps.get_db),
    deal_in: DealCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    deal = Deal(
        **deal_in.model_dump(),
        owner_id=current_user.id
    )
    db.add(deal)
    db.flush()

    # Log deal creation activity
    activity = Activity(
        title=f"Deal created in stage {deal.stage}",
        activity_type="CREATED",
        deal_id=deal.id,
        user_id=current_user.id
    )
    db.add(activity)

    db.commit()
    db.refresh(deal)
    return deal


@router.get("/{deal_id}", response_model=DealResponse)
def get_deal_by_id(
    deal_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    deal = db.query(Deal).filter(Deal.id == deal_id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal


@router.put("/{deal_id}", response_model=DealResponse)
def update_deal(
    *,
    deal_id: int,
    db: Session = Depends(deps.get_db),
    deal_in: DealUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    deal = db.query(Deal).filter(Deal.id == deal_id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    update_data = deal_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(deal, field, value)

    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal


@router.patch("/{deal_id}/stage", response_model=DealResponse)
def update_deal_stage(
    *,
    deal_id: int,
    db: Session = Depends(deps.get_db),
    stage_in: DealStageUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    deal = db.query(Deal).filter(Deal.id == deal_id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    old_stage = deal.stage
    deal.stage = stage_in.stage

    # Log stage change activity entry
    activity = Activity(
        title=f"Stage updated from {old_stage} to {stage_in.stage}",
        activity_type="STAGE_CHANGE",
        deal_id=deal.id,
        user_id=current_user.id
    )
    db.add(activity)

    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal


@router.delete("/{deal_id}")
def delete_deal(
    deal_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    deal = db.query(Deal).filter(Deal.id == deal_id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    db.delete(deal)
    db.commit()
    return {"message": "Deal deleted successfully"}