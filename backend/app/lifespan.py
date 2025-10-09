
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.db import init_models

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时执行的代码（替代 startup 事件）
    print("应用启动时执行")
    
    await init_models()
    yield  # 应用运行期间
    
    # 关闭时执行的代码（替代 shutdown 事件）
    print("应用关闭时执行")

