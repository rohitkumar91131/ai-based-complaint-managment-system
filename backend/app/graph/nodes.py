from app.ai.extractor import extract_information
from app.ai.summarizer import summarize_complaint
from app.ai.risk_assessor import assess_risk


def extract_node(state):
    extracted = extract_information(
        state["complaint_text"]
    )

    return {
        "extracted_data": extracted
    }





def summary_node(state):
    summary = summarize_complaint(
        state["extracted_data"]
    )

    return {
        "summary": summary
    }



def risk_node(state):
    risk = assess_risk(
        state["extracted_data"]
    )

    return {
        "risk": risk
    }