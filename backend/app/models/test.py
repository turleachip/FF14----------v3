from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql import func
from ..database import Base

class ApiTest(Base):
    __tablename__ = "api_test_table"

    id = Column(Integer, primary_key=True, index=True)
    test_value = Column(String(255), nullable=True)
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now()) 