from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.core import security
from app.models.user import User, UserRole
from app.schemas.user import UserResponse
from app.schemas.settings import (
    ProfileUpdate,
    PasswordChange,
    UserRBACUpdate,
    UserAdminResponse,
    UserAdminListResponse,
)

router = APIRouter()


@router.put("/profile", response_model=UserResponse)
def update_profile(
    *,
    db: Session = Depends(deps.get_db),
    profile_in: ProfileUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    current_user.full_name = profile_in.full_name
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


@router.put("/password")
def change_password(
    *,
    db: Session = Depends(deps.get_db),
    password_in: PasswordChange,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if not security.verify_password(password_in.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail="Current password verification failed. Please check your password."
        )

    current_user.hashed_password = security.get_password_hash(password_in.new_password)
    db.add(current_user)
    db.commit()
    return {"message": "Password updated successfully."}


@router.get("/users", response_model=UserAdminListResponse)
def list_team_users(
    db: Session = Depends(deps.get_db),
    current_admin: User = Depends(deps.check_admin_role),
) -> Any:
    users = db.query(User).order_by(User.id.asc()).all()
    return {"items": users, "total": len(users)}


@router.patch("/users/{user_id}/role", response_model=UserAdminResponse)
def update_user_rbac(
    user_id: int,
    *,
    db: Session = Depends(deps.get_db),
    rbac_in: UserRBACUpdate,
    current_admin: User = Depends(deps.check_admin_role),
) -> Any:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User account not found")

    if user_id == current_admin.id and rbac_in.role != UserRole.ADMIN.value:
        raise HTTPException(
            status_code=400,
            detail="System protection: You cannot demote your own active Administrator account."
        )

    user.role = rbac_in.role.upper()
    user.is_active = rbac_in.is_active
    db.add(user)
    db.commit()
    db.refresh(user)
    return user