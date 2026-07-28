from typing import TypedDict


class ComplaintState(TypedDict):
    user_message: str

    intent: str

    current_complaint: dict

    summary: str

    risk: dict