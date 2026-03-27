from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class ExerciseBase(BaseModel):
    name: str
    target_muscle: str
    description: Optional[str] = None

class ExerciseCreate(ExerciseBase):
    pass

class ExerciseOut(ExerciseBase):
    id: int
    
    class Config:
        from_attributes = True

class ExerciseSetBase(BaseModel):
    exercise_id: int
    reps: int
    weight_kg: float
    order: int
    is_completed: bool = False

class ExerciseSetCreate(ExerciseSetBase):
    pass

class WorkoutBase(BaseModel):
    name: str
    intensity: str
    volume: str
    duration_minutes: int
    client_id: int

class WorkoutCreate(WorkoutBase):
    exercises: List[ExerciseSetCreate] = []

class WorkoutOut(WorkoutBase):
    id: int
    completed: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ClientCreate(BaseModel):
    email: str
    full_name: str
    password: Optional[str] = "carlettifit123" # Default para novos alunos
