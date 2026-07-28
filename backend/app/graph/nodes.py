from app.ai.extractor import extract_information
from app.ai.summarizer import summarize_complaint
from app.ai.risk_assessor import assess_risk
from app.ai.intent import detect_intent
from app.ai.editor import edit_complaint
from app.ai.editor import edit_complaint


def intent_node(state):
    result = detect_intent(
        state["user_message"]
    )

    return {
        "intent": result["intent"]
    }


def intent_router(state):
    return state["intent"]


def extract_node(state):
    extracted = extract_information(
        state["user_message"]
    )

    return {
        "current_complaint": extracted
    }






def edit_node(state):
    updated = edit_complaint(
        state["current_complaint"],
        state["user_message"],
    )

    return {
        "current_complaint": updated
    }
def document_node(state):
    print("Document Extraction Node")

    # Placeholder for now
    return {}


def summary_node(state):
    summary = summarize_complaint(
        state["current_complaint"]
    )

    return {
        "summary": summary
    }


def risk_node(state):
    risk = assess_risk(
        state["current_complaint"]
    )

    return {
        "risk": risk
    }