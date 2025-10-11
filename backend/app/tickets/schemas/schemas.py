
from pydantic import BaseModel
from typing import Optional
import datetime
from app.user.schemas import UserOut

class TicketCreate(BaseModel):
    amount: float
    description: Optional[str] = None
    link: Optional[str] = None
    user: str
    createdAt: datetime.datetime

class TicketOut(BaseModel):
    id: int
    user_id: int
    amount: float
    description: Optional[str]
    status: str
    created_at: datetime.datetime
    hidden: bool
    owner: UserOut  # 改成嵌套 user 对象


    class Config:
        orm_mode = True