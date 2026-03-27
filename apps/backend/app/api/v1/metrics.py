from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_metrics():
    return {"metrics": []}
