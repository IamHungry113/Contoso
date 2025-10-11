from fastapi import APIRouter, HTTPException, Response,Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_session as async_session
from app.auth.schemas import Login
from app.user.schemas import Register, UserOut
from .auth import create_access_token, verify_password, get_current_user_from_cookie, CurrentUser
from app.user import crud as user_crud
from app.settings import settings

# 创建认证路由实例，设置统一前缀和标签
router = APIRouter(
    prefix="/auth",
    tags=["auth"]  # API文档中会将这些接口归为"auth"组
)

@router.post("/register", response_model=UserOut)
async def register(data: Register, response: Response, session: AsyncSession = Depends(async_session)):
    user = await user_crud.get_user_by_email(session, data.email)
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = await user_crud.create_user(session, data)
    token = create_access_token({"sub": user.email, "role": user.role, "id": user.id})

    # 设置到浏览器 cookie 中
    response.set_cookie(
        key="session_token",   # cookie 名称
        value=token,
        httponly=True,         # JS 无法访问，提高安全性
        max_age=900,          # 秒，token 过期时间
        samesite="lax",        # CSRF 防护
        secure=settings.is_dev           # 如果是 HTTPS，改为 True
    )
    return user

@router.post("/login", response_model=UserOut)
async def login(data: Login, response: Response, session: AsyncSession = Depends(async_session)):
    user = await user_crud.get_user_by_email(session, data.email)
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="User suspended")
    token = create_access_token({"sub": user.email, "role": user.role, "id": user.id})
    # 设置到浏览器 cookie 中
    response.set_cookie(
        key="session_token",   # cookie 名称
        value=token,
        httponly=True,         # JS 无法访问，提高安全性
        max_age=900,          # 秒，token 过期时间
        samesite="lax",        # CSRF 防护
        secure=settings.is_dev           # 如果是 HTTPS，改为 True
    )
    return user

@router.get("/me", response_model=UserOut)
async def me(
    current_user: CurrentUser = Depends(get_current_user_from_cookie),
    session: AsyncSession = Depends(async_session)
):
    user = await user_crud.get_user_by_email(session, current_user.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user