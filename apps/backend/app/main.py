from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, tenants, workouts, metrics, nutrition, ai, integrations, clients

app = FastAPI(title="Carletti Fit SaaS API", version="0.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://172.18.4.34:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(tenants.router, prefix="/api/v1/tenants", tags=["Tenants"])
app.include_router(clients.router, prefix="/api/v1/clients", tags=["Clients"])
app.include_router(workouts.router, prefix="/api/v1/workouts", tags=["Workouts"])
app.include_router(metrics.router, prefix="/api/v1/metrics", tags=["Metrics"])
app.include_router(nutrition.router, prefix="/api/v1/nutrition", tags=["Nutrition"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI"])
app.include_router(integrations.router, prefix="/api/v1/integrations", tags=["Integrations"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Fitness SaaS API"}
