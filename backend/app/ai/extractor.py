import json

from app.ai.llm_client import llm
from app.ai.prompts import EXTRACTION_PROMPT


def extract_information(text: str):

    response = llm.invoke(
        EXTRACTION_PROMPT + "\n\nComplaint:\n" + text
    )

    cleaned = (
        response.content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)