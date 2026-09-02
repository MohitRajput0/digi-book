from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict

# Base schema with shared properties
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True

# Properties to receive via API on user registration
class UserCreate(UserBase):
    password: str

# Properties to receive via API on user update
class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = None

# Properties returned to client (never expose hashed_password)
class UserResponse(UserBase):
    id: int
    is_superuser: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)