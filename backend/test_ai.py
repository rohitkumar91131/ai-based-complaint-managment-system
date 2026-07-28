from app.ai.extractor import extract_information

text = """
Customer ABC Pharma reported that
Paracetamol 500 mg batch BT-101
has broken blister packs.
"""

print(extract_information(text))