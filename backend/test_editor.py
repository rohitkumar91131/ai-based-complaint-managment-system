from app.ai.editor import edit_complaint

complaint = {
    "product_name": "Amoxicillin Capsules",
    "product_strength_grade": "500 mg",
    "batch_lot_number": "ABC123",
    "quantity_affected": 20,
    "complaint_description": "Broken blister packs"
}

result = edit_complaint(
    complaint,
    "Sorry, the batch number is BMX24602 and the affected quantity is 48 capsules."
)

print(result)