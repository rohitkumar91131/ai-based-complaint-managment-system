from fastapi import FastAPI
from app.database import Base, engine
from app.models import Complaint
from app.routers.complaint_router import router as complaint_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Powered Customer Complaint Management System",
    version="1.0.0",
)

app.include_router(
    complaint_router,
    prefix="/api",
    tags=["Complaints"]
)


@app.get("/")
def home():
    return {
        "message": "Backend Running 🚀"
    }