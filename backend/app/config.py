from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # データベース設定
    DB_USERNAME: str = "root"
    DB_PASSWORD: str = ""  # デフォルト値を空に
    DB_HOST: str = "localhost"
    DB_PORT: str = "3306"
    DB_NAME: str = "database"  # デフォルト値を一般的な名前に
    
    @property
    def DATABASE_URL(self) -> str:
        return f"mysql+pymysql://{self.DB_USERNAME}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    # その他の設定
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FastAPI Project"

    class Config:
        env_file = ".env"
        # 追加の値を許可する
        extra = "allow"

settings = Settings() 