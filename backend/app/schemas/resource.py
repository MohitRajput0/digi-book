from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.schemas.user import UserResponse

# Base schema with shared properties
class ResourceBase(BaseModel):
    title: str
    description: Optional[str] = None

# Properties to receive on resource creation
class ResourceCreate(ResourceBase):
    file_path: str
    file_type: str

# Properties to receive on resource update
class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

# Properties returned to client
class ResourceResponse(ResourceBase):
    id: int
    file_path: str
    file_type: str
    owner_id: int
    created_at: datetime
    updated_at: datetime
    owner: Optional[UserResponse] = None

    model_config = ConfigDict(from_attributes=True)