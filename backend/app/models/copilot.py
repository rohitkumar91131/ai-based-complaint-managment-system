from pydantic import BaseModel


class CopilotChatRequest(BaseModel):
    user_message: str
    current_complaint: dict = {}