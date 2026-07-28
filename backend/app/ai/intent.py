import json

from app.ai.llm_client import llm


def detect_intent(user_message: str):
    prompt = f"""
You are an AI Customer Complaint Assistant.

Classify the user's intent into exactly ONE of these values:

1. LOG_COMPLAINT
- User is reporting a NEW complaint.
Examples:
- Apollo Pharmacy reported broken capsules.
- Customer received damaged tablets.
- Create a complaint for batch ABC123.

2. EDIT_COMPLAINT
- User is correcting or modifying an EXISTING complaint.
Examples:
- Sorry, batch number is BMX24602.
- Update the affected quantity to 48 capsules.
- Change expiry date to July 2027.
- Replace the customer name with Apollo Pharmacy.

3. DOCUMENT_EXTRACTION
- User wants to upload or extract information from a document.
Examples:
- Upload this PDF.
- Extract details from this email.
- Analyze this complaint document.

4. UNKNOWN
- Anything else.

Return ONLY valid JSON.

{{
    "intent": ""
}}

User Message:
{user_message}
"""

    response = llm.invoke(prompt)

    cleaned = (
        response.content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)