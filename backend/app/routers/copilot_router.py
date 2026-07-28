from fastapi import APIRouter

from app.graph.complaint_graph import graph
from app.schemas.copilot import CopilotChatRequest

router = APIRouter()


@router.post("/chat")
def copilot_chat(request: CopilotChatRequest):
    result = graph.invoke(
        {
            "user_message": request.user_message,
            "intent": "",
            "current_complaint": request.current_complaint,
            "summary": "",
            "risk": {},
        }
    )

    return {
        "complaint": result["current_complaint"],
        "ai_copilot": {
            "summary": result["summary"],
            "risk": result["risk"],
        },
    }