from app.graph.complaint_graph import graph

result = graph.invoke(
    {
        "user_message": "Apollo Pharmacy reported broken blister packs for batch BT-101.",
        "intent": "",
        "current_complaint": {},
        "summary": "",
        "risk": {},
    }
)

print(result)