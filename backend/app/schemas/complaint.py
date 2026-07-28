from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ComplaintCreate(BaseModel):
    complaint_source: str | None = None
    customer_name: str | None = None

    product_name: str | None = None
    product_strength_grade: str | None = None
    batch_lot_number: str | None = None

    manufacturing_date: date | None = None
    expiry_date: date | None = None

    quantity_affected: float | None = None

    complaint_type: str | None = None
    complaint_date: date | None = None
    complaint_description: str | None = None

    initial_severity: str | None = None
    priority: str | None = None


class ComplaintResponse(ComplaintCreate):
    id: UUID
    status: str

    model_config = ConfigDict(from_attributes=True)