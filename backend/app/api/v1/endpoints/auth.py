from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api import deps
from app.core.config import settings
from app.core.security import create_access_token, verify_password, get_password_hash
from app.crud.user import get_user_by_email, create_user
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserResponse
from app.models.user import User

router = APIRouter()

@router.post("/login", response_model=Token)
def login_access_token(
    db: Session = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    db_user = get_user_by_email(db, email=form_data.username)
    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(db_user.id, expires_delta=access_token_expires),
        "token_type": "bearer",
    }

@router.post("/register", response_model=UserResponse)
def register(
    user_in: UserCreate,
    db: Session = Depends(deps.get_db)
):
    existing_user = get_user_by_email(db, email=user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists in Digi Book.",
        )
    
    hashed_password = get_password_hash(user_in.password)
    db_user = create_user(db=db, user_in=user_in, hashed_password=hashed_password)
    return db_user

@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(deps.get_current_user)
):
    return current_user