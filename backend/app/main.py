from fastapi import FastAPI

from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Customer Complaint System"
)


@app.get("/")
def home():
    return {
        "message": "Backend Running 🚀"
    }