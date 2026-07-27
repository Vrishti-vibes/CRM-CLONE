from typing import Optional, List
from pydantic import BaseModel, EmailStr


class ProfileUpdate(BaseModel):
    full_name: str


class PasswordChange(BaseModel):
    current_password: str
    new_password: str


class UserRBACUpdate(BaseModel):
    role: str
    is_active: bool


class UserAdminResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True


class UserAdminListResponse(BaseModel):
    items: List[UserAdminResponse]
    total: int