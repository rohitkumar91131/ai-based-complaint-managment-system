import json

from app.ai.llm_client import llm


def edit_complaint(current_complaint: dict, user_message: str):
    prompt = f"""
You are editing an existing pharmaceutical customer complaint.

Current Complaint:

{current_complaint}

User Update:

{user_message}

Rules:

1. Update ONLY the fields explicitly mentioned by the user.
2. Preserve all other fields exactly as they are.
3. Do NOT remove or modify any existing values unless the user explicitly requests it.
4. Return the COMPLETE updated complaint.
5. Return ONLY valid JSON.
6. Do NOT include markdown.
7. Do NOT include explanations.
8. Do NOT include code fences.

Example:

Current Complaint:

{{
    "product_name": "Paracetamol",
    "batch_lot_number": "ABC123",
    "quantity_affected": 20
}}

User:

Sorry, batch number is BMX24602.

Output:

{{
    "product_name": "Paracetamol",
    "batch_lot_number": "BMX24602",
    "quantity_affected": 20
}}
"""

    response = llm.invoke(prompt)

    print("========== RAW RESPONSE ==========")
    print(response.content)
    print("==================================")

    cleaned = (
        response.content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    print("========== CLEANED RESPONSE ==========")
    print(cleaned)
    print("======================================")

    try:
        return json.loads(cleaned)

    except json.JSONDecodeError:
        print("❌ Invalid JSON returned by LLM")
        return {
            "error": "Invalid JSON",
            "raw_response": cleaned,
        }