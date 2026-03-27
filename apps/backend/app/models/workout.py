from typing import Optional
from sqlmodel import Field
from app.models.base import BusinessBaseModel

class ExerciseBase(BusinessBaseModel):
    name: str
    target_muscle: str
    description: Optional[str] = None

class Exercise(ExerciseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class WorkoutBase(BusinessBaseModel):
    client_id: int = Field(foreign_key="user.id", index=True)
    name: str
    intensity: str
    volume: str
    duration_minutes: int
    completed: bool = False

class Workout(WorkoutBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class ExerciseSetBase(BusinessBaseModel):
    workout_id: int = Field(foreign_key="workout.id", index=True)
    exercise_id: int = Field(foreign_key="exercise.id")
    reps: int
    weight_kg: float
    order: int
    is_completed: bool = False

class ExerciseSet(ExerciseSetBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
