
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.user.schemas import Register
from app.db.models import User
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["argon2"],  # 或者 ["pbkdf2_sha256"]
    deprecated="auto",
)

async def get_user_by_email(session: AsyncSession, email: str):
    q = await session.execute(select(User).where(User.email == email))
    return q.scalars().first()

async def create_user(session: AsyncSession, data: Register):
    hashed = pwd_context.hash(data.password)
    user = User(email=data.email, username=data.username, hashed_password=hashed, role=data.role)
    
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

async def list_users(session: AsyncSession):
    q = await session.execute(select(User))
    return q.scalars().all()

async def set_user_active(session: AsyncSession, user_id: int, active: bool):
    q = await session.execute(select(User).where(User.id == user_id))
    user = q.scalars().first()
    if not user:
        return False
    user.is_active = active
    await session.commit()
    return True

