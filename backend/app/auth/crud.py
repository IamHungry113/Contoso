
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["argon2"],  # 或者 ["pbkdf2_sha256"]
    deprecated="auto",
)

