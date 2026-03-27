from sqlmodel import Session, select
from app.models.base import User, UserTenant, Profile, Tenant
from app.core.security import get_password_hash
from app.schemas.workout import ClientCreate
from fastapi import HTTPException

class ClientService:
    def create_client(self, db: Session, client_in: ClientCreate, tenant_id: int) -> User:
        # Check if user exists
        statement = select(User).where(User.email == client_in.email)
        user = db.exec(statement).first()
        
        if not user:
            # Create new user
            user = User(
                email=client_in.email,
                hashed_password=get_password_hash(client_in.password),
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            
            # Create profile
            profile = Profile(user_id=user.id, full_name=client_in.full_name)
            db.add(profile)
        
        # Check if already in tenant
        statement = select(UserTenant).where(
            UserTenant.user_id == user.id, 
            UserTenant.tenant_id == tenant_id
        )
        existing_link = db.exec(statement).first()
        
        if not existing_link:
            # Link to tenant as client
            link = UserTenant(
                user_id=user.id,
                tenant_id=tenant_id,
                role="client"
            )
            db.add(link)
        
        db.commit()
        db.refresh(user)
        return user

    def list_clients(self, db: Session, tenant_id: int):
        # Join User with UserTenant to filter by tenant_id
        statement = select(User).join(UserTenant).where(
            UserTenant.tenant_id == tenant_id,
            UserTenant.role == "client"
        )
        return db.exec(statement).all()

client_service = ClientService()
