from datetime import datetime, timedelta
from jose import jwt,JWTError
from fastapi import  HTTPException, Request, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.settings import settings
from .crud import pwd_context
from .util import create_access_token, ALGO,get_token_exp_time

bearer = HTTPBearer()

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

class CurrentUser:
    def __init__(self, id: int, email: str, role: str):
        self.id = id
        self.email = email
        self.role = role

async def get_current_user_from_cookie(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, settings.api_key, algorithms=[ALGO])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    exp_time = get_token_exp_time(payload)
    if not exp_time:
        raise HTTPException(status_code=401, detail="Token missing exp")

    # ✅ 如果 token 剩余时间少于 5 分钟，就刷新 cookie
    remaining = exp_time - datetime.now()
    if remaining < timedelta(minutes=5):
        new_token = create_access_token({
            "sub": payload["sub"],
            "role": payload["role"],
            "id": payload["id"]
        })
        response.set_cookie(
            key="session_token",
            value=new_token,
            httponly=True,
            max_age=900,
            samesite="lax",
            secure=settings.is_dev,
        )
    return CurrentUser(
        id=int(payload.get("id")),
        email=payload.get("sub"),
        role=payload.get("role")
    )