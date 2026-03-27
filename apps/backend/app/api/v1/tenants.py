from fastapi import APIRouter, Depends
from typing import List
from sqlmodel import Session, select
from app.core.deps import get_session, get_current_user
from app.models.base import Tenant, User, UserTenant

router = APIRouter()

@router.get("/", response_model=List[Tenant])
def read_tenants(
    db: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user),
):
    # Retorna apenas os tenants que o usuário participa
    return [ut.tenant for ut in current_user.tenants]
