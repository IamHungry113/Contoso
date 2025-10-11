
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.lifespan import lifespan
from app.tickets.router import router as tickets_router
from app.auth.router import router as auth_router
from app.user.router import router as user_router

app = FastAPI(lifespan=lifespan, title="Contoso Backend")
origins = [
    "http://localhost:5173",  # 前端地址
    # "https://yourfrontend.com"  # 生产环境
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # 允许带 cookie
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tickets_router)
app.include_router(auth_router)
app.include_router(user_router)