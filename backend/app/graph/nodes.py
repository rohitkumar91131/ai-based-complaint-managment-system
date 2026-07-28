from app.ai.extractor import extract_information


def extract_node(state):
    extracted = extract_information(
        state["complaint_text"]
    )

    return {
        "extracted_data": extracted
    }


def summary_node(state):
    return {
        "summary": "Summary placeholder"
    }


def risk_node(state):
    return {
        "risk": {
            "level": "Medium",
            "reason": "Placeholder"
        }
    }