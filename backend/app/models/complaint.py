from sqlalchemy import Column, String, Date, Text, Float
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    complaint_source = Column(String)
    customer_name = Column(String)

    product_name = Column(String)
    product_strength_grade = Column(String)
    batch_lot_number = Column(String)

    manufacturing_date = Column(Date)
    expiry_date = Column(Date)

    quantity_affected = Column(Float)

    complaint_type = Column(String)
    complaint_date = Column(Date)

    complaint_description = Column(Text)

    initial_severity = Column(String)
    priority = Column(String)

    ai_summary = Column(Text)
    ai_risk_level = Column(String)
    ai_reason = Column(Text)
    ai_recommended_action = Column(Text)

    status = Column(String, default="Pending")