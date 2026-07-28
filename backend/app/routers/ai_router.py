from fastapi import APIRouter

from app.schemas.ai import AnalyzeComplaintRequest
from app.graph.complaint_graph import graph

router = APIRouter()


@router.post("/analyze")
def analyze(request: AnalyzeComplaintRequest):
    result = graph.invoke(
        {
            "complaint_text": request.complaint_text
        }
    )

    return result