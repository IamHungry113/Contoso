
from sqlalchemy import Column, Integer, String, Boolean, Enum
from sqlalchemy.orm import relationship
from app.db.database import Base
import enum


class UserRole(enum.Enum):
    employee = "employee"
    employer = "employer"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.employee, nullable=False)
    is_active = Column(Boolean, default=True)

    # 用户自己拥有的票
    tickets = relationship("Ticket", back_populates="owner", foreign_keys="Ticket.user_id")
    # 用户创建的票
    tickets_created = relationship("Ticket", back_populates="creator", foreign_keys="Ticket.creator_id")
