import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers.ai_router import router as ai_router
from app.routers.copilot_router import router as copilot_router
from app.routers.complaint_router import router as complaint_router

# =====================================================
# Load Environment Variables
# =====================================================

load_dotenv()

# =====================================================
# Create FastAPI App
# =====================================================

app = FastAPI(
    title="AI Powered Customer Complaint Management System",
    version="1.0.0",
)

# =====================================================
# Database
# =====================================================

Base.metadata.create_all(bind=engine)

# =====================================================
# CORS Configuration
# =====================================================

cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# Health Check
# =====================================================

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Complaint AI Backend",
    }

# =====================================================
# Routers
# =====================================================

app.include_router(
    ai_router,
    prefix="/api",
    tags=["AI"],
)

app.include_router(
    copilot_router,
    prefix="/api/copilot",
    tags=["AI Copilot"],
)

app.include_router(
    complaint_router,
    prefix="/api",
    tags=["Complaints"],
)

# =====================================================
# Root Endpoint
# =====================================================

@app.get("/")
def root():
    return {
        "message": "AI Powered Customer Complaint Management System API",
        "docs": "/docs",
        "health": "/health",
    }