from sqlmodel import Session, create_engine, select, SQLModel
from app.models.base import User, Tenant, UserTenant, Profile
from app.models.workout import Exercise, Workout, ExerciseSet
from app.core.security import get_password_hash
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)

def seed():
    # Create tables
    SQLModel.metadata.create_all(engine)
    
    with Session(engine) as db:
        # 1. Create Tenant
        tenant = db.exec(select(Tenant).where(Tenant.slug == "carletti-fit")).first()
        if not tenant:
            tenant = Tenant(name="Carletti Fit Elite", slug="carletti-fit")
            db.add(tenant)
            db.commit()
            db.refresh(tenant)

        # 2. Create Coach
        coach_email = "coach@carletti.fit"
        coach = db.exec(select(User).where(User.email == coach_email)).first()
        if not coach:
            coach = User(
                email=coach_email,
                hashed_password=get_password_hash("carletti123"),
                is_superuser=True
            )
            db.add(coach)
            db.commit()
            db.refresh(coach)
            
            profile = Profile(user_id=coach.id, full_name="Leonardo Carletti (Coach)")
            db.add(profile)
            
            link = UserTenant(user_id=coach.id, tenant_id=tenant.id, role="admin")
            db.add(link)

        # 3. Create Exercises
        exercises_data = [
            ("Bench Press", "Chest"),
            ("Squat", "Legs"),
            ("Pull-ups", "Back"),
            ("Overhead Press", "Shoulders")
        ]
        for name, muscle in exercises_data:
            ex = db.exec(select(Exercise).where(Exercise.name == name)).first()
            if not ex:
                ex = Exercise(name=name, target_muscle=muscle, tenant_id=tenant.id)
                db.add(ex)
        
        db.commit()

        # 4. Create dummy Students (Clients)
        students = [
            ("joao@student.com", "João Silva"),
            ("maria@student.com", "Maria Souza"),
            ("pedro@student.com", "Pedro Alvares")
        ]
        for email, name in students:
            user = db.exec(select(User).where(User.email == email)).first()
            if not user:
                user = User(
                    email=email,
                    hashed_password=get_password_hash("aluno123")
                )
                db.add(user)
                db.commit()
                db.refresh(user)
                
                db.add(Profile(user_id=user.id, full_name=name))
                db.add(UserTenant(user_id=user.id, tenant_id=tenant.id, role="client"))
        
        db.commit()
        print("✅ Database Seeded Successfully!")

if __name__ == "__main__":
    import traceback
    try:
        seed()
    except Exception:
        print(traceback.format_exc())
