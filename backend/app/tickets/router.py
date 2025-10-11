from app.db.database import get_session as async_session
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import TicketCreate, TicketOut
from .crud import list_all_tickets, list_tickets_by_user, create_ticket, set_ticket_status
from app.auth import get_current_user_from_cookie, CurrentUser
from fastapi import APIRouter, HTTPException


# 创建认证路由实例，设置统一前缀和标签
router = APIRouter(
    prefix="/tickets",
    tags=["auth"]  # API文档中会将这些接口归为"auth"组
)


@router.get("/", response_model=list[TicketOut])
async def list_tickets(
    current: CurrentUser = Depends(get_current_user_from_cookie),
    session: AsyncSession = Depends(async_session)
                       ):
    if current.role == "employer":
        tickets = await list_all_tickets(session)
    else:
        tickets = await list_tickets_by_user(session, current.id)
    return tickets

@router.post("/", response_model=TicketOut, status_code=201)
async def create_ticket_api(ticket: TicketCreate, current=Depends(get_current_user_from_cookie),
    session: AsyncSession = Depends(async_session)
                            ):
    if current.role != "employee":
        raise HTTPException(status_code=403, detail="Only employees create tickets")
    return await create_ticket(session, current.id, ticket)

@router.post("/{ticket_id}/approve")
async def approve_ticket(ticket_id: int, current=Depends(get_current_user_from_cookie),
    session: AsyncSession = Depends(async_session)
                         ):
    if current.role != "employer":
        raise HTTPException(status_code=403, detail="Only employers can approve")
    t = await set_ticket_status(session, ticket_id, "approved")
    if not t:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return {"ok": True}

@router.post("/{ticket_id}/deny")
async def deny_ticket(ticket_id: int, current=Depends(get_current_user_from_cookie),
    session: AsyncSession = Depends(async_session)
                      ):
    if current.role != "employer":
        raise HTTPException(status_code=403, detail="Only employers can deny")
    t = await set_ticket_status(session, ticket_id, "denied")
    if not t:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return {"ok": True}