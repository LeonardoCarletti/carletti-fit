from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List
from app.core.deps import get_session, get_current_user, get_current_tenant
from app.models.base import User, Tenant
from app.schemas.user import UserOut
from app.schemas.workout import ClientCreate
from app.services.client_service import client_service

router = APIRouter()

@router.post("/", response_model=UserOut)
def create_client(
    *,
    db: Session = Depends(get_session),
    client_in: ClientCreate,
    current_tenant: Tenant = Depends(get_current_tenant)
):
    return client_service.create_client(db, client_in, current_tenant.id)

@router.get("/", response_model=List[UserOut])
def list_clients(
    db: Session = Depends(get_session), 
    current_tenant: Tenant = Depends(get_current_tenant)
):
    return client_service.list_clients(db, current_tenant.id)
