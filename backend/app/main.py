from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from .database import engine, Base, get_db

app = FastAPI()

# データベーステーブルの作成
Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        # text()でSQLをラップ
        result = db.execute(text("SELECT 1"))
        return {"message": "データベース接続成功！", "result": result.scalar()}
    except Exception as e:
        return {"error": f"データベース接続エラー: {str(e)}"} 