from app.ai.llm_client import llm


def summarize_complaint(extracted_data: dict) -> str:
    prompt = f"""
You are a pharmaceutical Quality Assurance assistant.

Summarize the following complaint in 2-3 professional sentences.

Complaint:

{extracted_data}

Return ONLY the summary.
"""

    response = llm.invoke(prompt)

    return response.content.strip()