from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # データベース設定
    DATABASE_URL: str = "sqlite:///./test.db"
    
    # その他の設定
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FastAPI Project"

    class Config:
        env_file = ".env"

settings = Settings() 