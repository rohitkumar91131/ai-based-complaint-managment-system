from datetime import date, datetime
from uuid import UUID
import re

from pydantic import BaseModel, ConfigDict, field_validator


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

    @field_validator(
        "manufacturing_date",
        "expiry_date",
        "complaint_date",
        mode="before",
    )
    @classmethod
    def parse_dates(cls, value):
        if value in (None, ""):
            return None

        if isinstance(value, date):
            return value

        if isinstance(value, str):
            # Supports: 15-03-2026
            try:
                return datetime.strptime(value, "%d-%m-%Y").date()
            except ValueError:
                pass

            # Supports: 2026-03-15
            try:
                return datetime.strptime(value, "%Y-%m-%d").date()
            except ValueError:
                pass

        raise ValueError("Invalid date format")

    @field_validator("quantity_affected", mode="before")
    @classmethod
    def parse_quantity(cls, value):
        if value in (None, ""):
            return None

        if isinstance(value, (int, float)):
            return float(value)

        if isinstance(value, str):
            match = re.search(r"\d+(\.\d+)?", value)

            if match:
                return float(match.group())

        raise ValueError("Invalid quantity")


class ComplaintResponse(ComplaintCreate):
    id: UUID
    status: str

    model_config = ConfigDict(from_attributes=True)