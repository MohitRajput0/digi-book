from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.crud.resource import (
    get_resource_by_id,
    get_resources,
    create_resource,
    update_resource,
    delete_resource,
)
from app.schemas.resource import ResourceCreate, ResourceResponse, ResourceUpdate
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=List[ResourceResponse])
def read_resources(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve all resources (Public access).
    """
    return get_resources(db, skip=skip, limit=limit)


@router.get("/{resource_id}", response_model=ResourceResponse)
def read_resource(
    resource_id: int,
    db: Session = Depends(deps.get_db),
):
    """
    Get a specific resource by ID (Public access).
    """
    resource = get_resource_by_id(db, resource_id=resource_id)
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found",
        )
    return resource


@router.post("/", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
def create_new_resource(
    resource_in: ResourceCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Upload a new resource. Requires authentication.
    Automatically assigns ownership to current_user.
    """
    return create_resource(db=db, resource_in=resource_in, owner_id=current_user.id)


@router.put("/{resource_id}", response_model=ResourceResponse)
def update_existing_resource(
    resource_id: int,
    resource_in: ResourceUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Update a resource. Only the owner or a superuser can modify it.
    """
    resource = get_resource_by_id(db, resource_id=resource_id)
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found",
        )
    if resource.owner_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to modify this resource",
        )
    return update_resource(db=db, db_resource=resource, resource_in=resource_in)


@router.delete("/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_resource(
    resource_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    """
    Delete a resource. Only the owner or a superuser can delete it.
    """
    resource = get_resource_by_id(db, resource_id=resource_id)
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found",
        )
    if resource.owner_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this resource",
        )
    delete_resource(db=db, db_resource=resource)
    return None