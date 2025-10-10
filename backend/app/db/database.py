
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from app.settings import settings

Base = declarative_base()

# 创建异步引擎
engine = create_async_engine(
    settings.db_url,
    future=True,
    echo=False,  # 可以设置为 True 查看 SQL 执行日志，便于调试
    pool_pre_ping=True  # 检查连接是否有效
)

# 创建异步会话工厂
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def init_models():
    """初始化数据库表结构"""
    print(f"初始化数据库，连接地址: {settings.db_url}")
    try:
        # 使用 async with 确保连接正确关闭
        async with engine.begin() as conn:
            print("开始创建数据库表...")
            print("已注册的表:", Base.metadata.tables.keys())
            # 为所有模型创建表
            await conn.run_sync(Base.metadata.create_all)
            print("数据库表创建完成")
    except Exception as e:
        print(f"初始化数据库时发生错误: {str(e)}")
        raise  # 重新抛出异常，让调用者知道发生了错误

async def get_session() -> AsyncSession:
    """依赖项：获取数据库会话"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception as e:
            await session.rollback()
            raise e
        finally:
            await session.close()



