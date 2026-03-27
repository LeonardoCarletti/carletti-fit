from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class TenantBase(SQLModel):
    name: str
    slug: str = Field(unique=True, index=True)
    is_active: bool = True

class Tenant(TenantBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    users: List["UserTenant"] = Relationship(back_populates="tenant")

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    is_superuser: bool = False

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    profile: Optional["Profile"] = Relationship(back_populates="user")
    tenants: List["UserTenant"] = Relationship(back_populates="user")

class Profile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    
    user: User = Relationship(back_populates="profile")

class UserTenant(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    tenant_id: int = Field(foreign_key="tenant.id", primary_key=True)
    role: str = "member"  # admin, member, coach

    user: User = Relationship(back_populates="tenants")
    tenant: Tenant = Relationship(back_populates="users")

class BusinessBaseModel(SQLModel):
    tenant_id: int = Field(foreign_key="tenant.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
