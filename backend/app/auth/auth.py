import os
from datetime import datetime, timedelta
from jose import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from .crud import pwd_context

SECRET = os.getenv("SECRET_KEY", "changeme")
ALGO = "HS256"
bearer = HTTPBearer()

def create_access_token(data: dict, expires_delta: int = 60*24*7):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET, algorithm=ALGO)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

class CurrentUser:
    def __init__(self, id: int, email: str, role: str):
        self.id = id
        self.email = email
        self.role = role

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGO])
        return CurrentUser(id=int(payload.get("id")), email=payload.get("sub"), role=payload.get("role"))
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
