import json
import os
import shutil
import tempfile
import traceback

from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.document.pdf_extractor import extract_text_from_pdf
from app.graph.complaint_graph import graph

router = APIRouter()


@router.post("/chat")
async def copilot_chat(
    user_message: str = Form(""),
    current_complaint: str = Form("{}"),
    file: UploadFile | None = File(None),
):
    try:
        complaint = json.loads(current_complaint)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Invalid current_complaint JSON.",
        )

    text = user_message

    if file:
        extension = os.path.splitext(file.filename)[1].lower()

        if extension != ".pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are supported.",
            )

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=extension,
        ) as temp_file:

            shutil.copyfileobj(
                file.file,
                temp_file,
            )

            temp_path = temp_file.name

        try:
            pdf_text = extract_text_from_pdf(temp_path)

        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

        if user_message.strip():
            text = (
                pdf_text
                + "\n\nAdditional User Message:\n"
                + user_message
            )
        else:
            text = pdf_text

    try:
        result = graph.invoke(
            {
                "user_message": text,
                "intent": "",
                "current_complaint": complaint,
                "summary": "",
                "risk": {},
            }
        )

        return {
            "intent": result.get("intent", ""),
            "complaint": result.get("current_complaint", {}),
            "ai_copilot": {
                "summary": result.get("summary", ""),
                "risk": result.get("risk", {}),
            },
        }

    except Exception as e:
        traceback.print_exc()

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )