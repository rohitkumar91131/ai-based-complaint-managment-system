from pydantic import BaseModel


class AnalyzeComplaintRequest(BaseModel):
    complaint_text: str