from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
import datetime
from app.db.database import Base

class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    # 创建者（谁创建的）
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, default="pending")  # pending/approved/denied
    hidden = Column(Boolean, default=False)

    owner = relationship("User", back_populates="tickets", foreign_keys=[user_id])
    creator = relationship("User", back_populates="tickets_created", foreign_keys=[creator_id])
