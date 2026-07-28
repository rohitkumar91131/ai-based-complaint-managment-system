from app.graph.complaint_graph import graph

result = graph.invoke(
    {
        "user_message": "Sorry, the batch number is BMX24602 and quantity is 48 capsules.",

        "intent": "",

        "current_complaint": {
            "product_name": "Amoxicillin Capsules",
            "product_strength_grade": "500 mg",
            "batch_lot_number": "ABC123",
            "quantity_affected": 20,
            "complaint_description": "Broken blister packs"
        },

        "summary": "",

        "risk": {},
    }
)

print(result)