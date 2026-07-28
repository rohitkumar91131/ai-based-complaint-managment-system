from uuid import UUID

from sqlalchemy.orm import Session

from app.models.complaint import Complaint
from app.schemas.complaint import ComplaintCreate


def create_complaint(db: Session, data: ComplaintCreate):
    complaint = Complaint(**data.model_dump())

    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    return complaint


def get_all_complaints(db: Session):
    return db.query(Complaint).all()


def get_complaint_by_id(db: Session, complaint_id: UUID):
    return db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()


def update_complaint(
    db: Session,
    complaint_id: UUID,
    data: ComplaintCreate,
):
    complaint = get_complaint_by_id(db, complaint_id)

    if complaint is None:
        return None

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(complaint, key, value)

    db.commit()
    db.refresh(complaint)

    return complaint


def delete_complaint(db: Session, complaint_id: UUID):
    complaint = get_complaint_by_id(db, complaint_id)

    if complaint is None:
        return False

    db.delete(complaint)
    db.commit()

    return True