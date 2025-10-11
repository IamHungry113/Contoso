from jose import jwt
from datetime import datetime, timedelta
from app.settings import settings
from enum import Enum

ALGO = "HS256"

def create_access_token(data: dict, expires_delta: int = 60*24*7):
    to_encode = data.copy()
        # 设置过期时间
    expire = datetime.now() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": int(expire.timestamp())})  # datetime -> int timestamp

    # 将 Enum 转成字符串
    for key, value in to_encode.items():
        if isinstance(value, Enum):
            to_encode[key] = value.value

    return jwt.encode(to_encode, settings.api_key, algorithm=ALGO)


def get_token_exp_time(payload: dict[str,any]):
    exp = payload.get("exp")
    if not exp:
        return None
    # ✅ 如果 exp 是字符串，转成 float
    if isinstance(exp, str):
        exp = float(exp)
    # ✅ 返回 datetime 对象
    return datetime.fromtimestamp(exp)