from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from app.core.deps import get_session, get_current_tenant
from app.models.base import Tenant
from app.models.workout import Workout
from app.schemas.workout import WorkoutCreate, WorkoutOut
from app.services.workout_service import workout_service

router = APIRouter()

@router.post("/", response_model=WorkoutOut)
def create_workout(
    *,
    db: Session = Depends(get_session),
    workout_in: WorkoutCreate,
    current_tenant: Tenant = Depends(get_current_tenant)
):
    return workout_service.create_workout(db, workout_in, current_tenant.id)

@router.get("/", response_model=List[WorkoutOut])
def list_workouts(
    db: Session = Depends(get_session),
    current_tenant: Tenant = Depends(get_current_tenant)
):
    statement = select(Workout).where(Workout.tenant_id == current_tenant.id)
    return db.exec(statement).all()
