

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.db.models import Ticket
from app.tickets import schemas

async def create_ticket(session: AsyncSession, user_id: int, ticket_in: schemas.TicketCreate):
    ticket = Ticket(user_id=user_id, amount=ticket_in.amount, description=ticket_in.description, creator_id=user_id)
    session.add(ticket)
    await session.commit()
    await session.refresh(ticket)
    return ticket

async def list_tickets_by_user(session: AsyncSession, user_id: int):
    q = await session.execute(select(Ticket)
            .options(selectinload(Ticket.owner))
                              .where(Ticket.user_id == user_id, Ticket.hidden == False))
    return q.scalars().all()

async def list_all_tickets(session: AsyncSession):
    q = await session.execute(select(Ticket)
            .options(selectinload(Ticket.owner))
                              .where(Ticket.hidden == False))
    return q.scalars().all()

async def set_ticket_status(session: AsyncSession, ticket_id: int, status: str):
    q = await session.execute(select(Ticket).where(Ticket.id==ticket_id))
    t = q.scalars().first()
    if not t:
        return None
    t.status = status
    await session.commit()
    return t
