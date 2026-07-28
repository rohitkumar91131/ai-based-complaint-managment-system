from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.complaint import ComplaintCreate, ComplaintResponse

from app.services.complaint_service import (
    create_complaint,
    delete_complaint,
    get_all_complaints,
    get_complaint_by_id,
    update_complaint,
)

router = APIRouter()


@router.post(
    "/complaints",
    response_model=ComplaintResponse,
    status_code=201,
)
def create(
    data: ComplaintCreate,
    db: Session = Depends(get_db),
):
    return create_complaint(db, data)


@router.get(
    "/complaints",
    response_model=list[ComplaintResponse],
)
def get_all(
    db: Session = Depends(get_db),
):
    return get_all_complaints(db)


@router.get(
    "/complaints/{complaint_id}",
    response_model=ComplaintResponse,
)
def get_one(
    complaint_id: UUID,
    db: Session = Depends(get_db),
):
    complaint = get_complaint_by_id(db, complaint_id)

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found",
        )

    return complaint


@router.put(
    "/complaints/{complaint_id}",
    response_model=ComplaintResponse,
)
def update(
    complaint_id: UUID,
    data: ComplaintCreate,
    db: Session = Depends(get_db),
):
    complaint = update_complaint(
        db,
        complaint_id,
        data,
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found",
        )

    return complaint


@router.delete("/complaints/{complaint_id}")
def delete(
    complaint_id: UUID,
    db: Session = Depends(get_db),
):
    deleted = delete_complaint(
        db,
        complaint_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found",
        )

    return {
        "message": "Complaint deleted successfully"
    }