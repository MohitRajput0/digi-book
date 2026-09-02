from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.resource import ResourceCreate, ResourceResponse, ResourceUpdate
from app.crud import resource as crud_resource
from app.crud import user as crud_user

router = APIRouter()

@router.post("/", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
def create_new_resource(resource_in: ResourceCreate, owner_id: int, db: Session = Depends(get_db)):
    owner = crud_user.get_user_by_id(db, user_id=owner_id)
    if not owner:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Owner user does not exist.")
    return crud_resource.create_resource(db=db, resource_in=resource_in, owner_id=owner_id)

@router.get("/", response_model=List[ResourceResponse])
def read_resources(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_resource.get_resources(db=db, skip=skip, limit=limit)

@router.get("/{resource_id}", response_model=ResourceResponse)
def read_resource_by_id(resource_id: int, db: Session = Depends(get_db)):
    resource = crud_resource.get_resource_by_id(db=db, resource_id=resource_id)
    if not resource:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found.")
    return resource

@router.delete("/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = crud_resource.get_resource_by_id(db=db, resource_id=resource_id)
    if not resource:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found.")
    crud_resource.delete_resource(db=db, db_resource=resource)