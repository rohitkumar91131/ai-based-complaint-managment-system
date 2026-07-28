from pydantic import BaseModel, Field


class CopilotChatRequest(BaseModel):
    user_message: str
    current_complaint: dict = Field(default_factory=dict)