from sqlmodel import Session, select
from app.models.workout import Workout, Exercise, ExerciseSet
from app.schemas.workout import WorkoutCreate
from typing import List

class WorkoutService:
    def create_workout(self, db: Session, workout_in: WorkoutCreate, tenant_id: int) -> Workout:
        # 1. Create Workout Header
        db_workout = Workout(
            tenant_id=tenant_id,
            client_id=workout_in.client_id,
            name=workout_in.name,
            intensity=workout_in.intensity,
            volume=workout_in.volume,
            duration_minutes=workout_in.duration_minutes
        )
        db.add(db_workout)
        db.commit()
        db.refresh(db_workout)
        
        # 2. Add Exercises Sets
        for set_in in workout_in.exercises:
            db_set = ExerciseSet(
                tenant_id=tenant_id,
                workout_id=db_workout.id,
                exercise_id=set_in.exercise_id,
                reps=set_in.reps,
                weight_kg=set_in.weight_kg,
                order=set_in.order
            )
            db.add(db_set)
        
        db.commit()
        db.refresh(db_workout)
        return db_workout

    def get_client_workouts(self, db: Session, client_id: int, tenant_id: int) -> List[Workout]:
        statement = select(Workout).where(
            Workout.client_id == client_id,
            Workout.tenant_id == tenant_id
        )
        return db.exec(statement).all()

workout_service = WorkoutService()
