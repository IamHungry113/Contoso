from pydantic import BaseModel, EmailStr
from typing import Optional

class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: Optional[str]
    role: str
    is_active: bool

    class Config:
        orm_mode = True

class Register(BaseModel):
    email: EmailStr
    password: str
    username: str
    role: str