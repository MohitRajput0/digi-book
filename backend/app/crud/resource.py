from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.resource import Resource
from app.schemas.resource import ResourceCreate, ResourceUpdate

def get_resource_by_id(db: Session, resource_id: int) -> Optional[Resource]:
    return db.query(Resource).filter(Resource.id == resource_id).first()

def get_resources(db: Session, skip: int = 0, limit: int = 100) -> List[Resource]:
    return db.query(Resource).offset(skip).limit(limit).all()

def get_resources_by_owner(db: Session, owner_id: int, skip: int = 0, limit: int = 100) -> List[Resource]:
    return db.query(Resource).filter(Resource.owner_id == owner_id).offset(skip).limit(limit).all()

def create_resource(db: Session, resource_in: ResourceCreate, owner_id: int) -> Resource:
    db_resource = Resource(
        title=resource_in.title,
        description=resource_in.description,
        file_path=resource_in.file_path,
        file_type=resource_in.file_type,
        owner_id=owner_id,
    )
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

def update_resource(db: Session, db_resource: Resource, resource_in: ResourceUpdate) -> Resource:
    update_data = resource_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_resource, field, value)
    db.commit()
    db.refresh(db_resource)
    return db_resource

def delete_resource(db: Session, db_resource: Resource) -> None:
    db.delete(db_resource)
    db.commit()