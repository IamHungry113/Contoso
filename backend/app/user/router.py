
from fastapi import APIRouter, Depends, HTTPException
from .schemas import UserOut
from app.db.database import get_session as async_session
from .crud import list_users, set_user_active
from app.auth import auth

# 创建认证路由实例，设置统一前缀和标签
router = APIRouter(
    prefix="/employees",
    tags=["employees"]  # API文档中会将这些接口归为"auth"组
)

@router.get("/", response_model=list[UserOut])
async def list_employees(current=Depends(auth.get_current_user)):
    if current.role != "employer":
        raise HTTPException(status_code=403, detail="Only employers")
    async with async_session() as session:
        return await list_users(session)

@router.post("/{user_id}/suspend")
async def suspend_user(user_id: int, current=Depends(auth.get_current_user)):
    if current.role != "employer":
        raise HTTPException(status_code=403, detail="Only employers")
    async with async_session() as session:
        ok = await set_user_active(session, user_id, False)
        if not ok:
            raise HTTPException(status_code=404, detail="User not found")
        return {"ok": True}

@router.post("/{user_id}/activate")
async def activate_user(user_id: int, current=Depends(auth.get_current_user)):
    if current.role != "employer":
        raise HTTPException(status_code=403, detail="Only employers")
    async with async_session() as session:
        ok = await set_user_active(session, user_id, True)
        if not ok:
            raise HTTPException(status_code=404, detail="User not found")
        return {"ok": True}
