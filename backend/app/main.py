from fastapi import FastAPI
from app.database import Base, engine
from app.models import Complaint
from app.routers.complaint_router import router as complaint_router
from app.routers.ai_router import router as ai_router
from app.routers.copilot_router import router as copilot_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Powered Customer Complaint Management System",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    complaint_router,
    prefix="/api",
    tags=["Complaints"]
)

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Complaint AI Backend"
    }


app.include_router(
    ai_router,
    prefix="/api/ai",
    tags=["AI"],
)

app.include_router(
    copilot_router,
    prefix="/api/copilot",
    tags=["AI Copilot"],
)

@app.get("/")
def home():
    return {
        "message": "Backend Running 🚀"
    }