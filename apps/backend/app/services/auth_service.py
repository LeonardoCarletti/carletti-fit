from datetime import datetime
from typing import Optional
from jose import jwt
from passlib.context import CryptContext
from sqlmodel import Session, select
from app.core.security import create_access_token, create_refresh_token, verify_password, get_password_hash
from app.models.base import User
from app.schemas.user import UserCreate

def authenticate(db: Session, email: str, password: str) -> Optional[User]:
    user = db.exec(select(User).where(User.email == email)).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def create_user(db: Session, user_in: UserCreate) -> User:
    db_obj = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        is_superuser=user_in.is_superuser,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
