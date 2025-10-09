
from pydantic import BaseModel
from typing import Optional
import datetime

class TicketCreate(BaseModel):
    amount: float
    description: Optional[str] = None

class TicketOut(BaseModel):
    id: int
    user_id: int
    amount: float
    description: Optional[str]
    status: str
    created_at: datetime.datetime
    hidden: bool

    class Config:
        orm_mode = True
