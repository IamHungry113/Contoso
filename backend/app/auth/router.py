from fastapi import APIRouter, HTTPException
from app.db.database import get_session as async_session
from app.auth.schemas import Token, Login
from app.user.schemas import Register
from .auth import create_access_token, verify_password
from app.user import crud as user_crud

# 创建认证路由实例，设置统一前缀和标签
router = APIRouter(
    prefix="/auth",
    tags=["auth"]  # API文档中会将这些接口归为"auth"组
)

@router.post("/register", response_model=Token)
async def register(data: Register):
    async with async_session() as session:
        user = await user_crud.get_user_by_email(session, data.email)
        if user:
            raise HTTPException(status_code=400, detail="Email already registered")
        user = await user_crud.create_user(session, data)
        token = create_access_token({"sub": user.email, "role": user.role, "id": user.id})
        return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(data: Login):
    async with async_session() as session:
        user = await user_crud.get_user_by_email(session, data.email)
        if not user or not verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        if not user.is_active:
            raise HTTPException(status_code=403, detail="User suspended")
        token = create_access_token({"sub": user.email, "role": user.role, "id": user.id})
        return {"access_token": token, "token_type": "bearer"}