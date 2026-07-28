from app.document.pdf_extractor import extract_text_from_pdf

text = extract_text_from_pdf(
    "sample_documents/complaint.pdf"
)

print(text)