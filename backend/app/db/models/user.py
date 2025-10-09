
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="employee")  # 'employee' or 'employer'
    is_active = Column(Boolean, default=True)

    tickets = relationship("Ticket", back_populates="owner")
