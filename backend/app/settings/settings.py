from pydantic_settings import BaseSettings, SettingsConfigDict

# 环境变量配置模型
class Settings(BaseSettings):
    # 服务器配置
    app_port: int
    app_host: str
    app_env: str = "development"  # 默认值
    
    # 数据库配置
    db_url: str
    
    # 安全配置
    api_key: str
    
    # 配置读取 .env 文件
    model_config = SettingsConfigDict(
        env_file=".env",  # 指定环境变量文件
        env_file_encoding="utf-8",
        case_sensitive=False  # 不区分大小写（例如 APP_PORT 和 app_port 都可识别）
    )

# 实例化配置（自动加载 .env 文件）
settings = Settings()
