from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlmodel import Session, create_engine, select
from app.core.config import settings
from app.core.security import verify_password
from app.models.base import User, Tenant

engine = create_engine(settings.DATABASE_URL)

def get_session() -> Generator:
    with Session(engine) as session:
        yield session

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

def get_current_user(
    db: Session = Depends(get_session), token: str = Depends(reusable_oauth2)
) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials",
            )
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_current_tenant(
    user: User = Depends(get_current_user),
    tenant_id: Optional[int] = None, # Pode vir de header ou query
) -> Tenant:
    # TODO: Implementar lógica de seleção de tenant ativo do usuário
    if not user.tenants:
        raise HTTPException(status_code=403, detail="User not associated with any tenant")
    return user.tenants[0].tenant
