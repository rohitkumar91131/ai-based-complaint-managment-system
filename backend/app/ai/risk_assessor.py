import json

from app.ai.llm_client import llm


def assess_risk(extracted_data: dict):
    prompt = f"""
You are a pharmaceutical Quality Assurance expert.

Analyze the following complaint.

Complaint:

{extracted_data}

Return ONLY valid JSON.

{{
    "level":"",
    "reason":"",
    "recommended_action":""
}}
"""

    response = llm.invoke(prompt)

    cleaned = (
        response.content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)