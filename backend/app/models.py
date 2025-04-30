from sqlalchemy import Column, Integer, String, TIMESTAMP, text
from .database import Base

class ApiTestTable(Base):
    __tablename__ = "api_test_table"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    test_value = Column(String(255), nullable=True)
    created_at = Column(TIMESTAMP, nullable=False, server_default=text("CURRENT_TIMESTAMP")) 