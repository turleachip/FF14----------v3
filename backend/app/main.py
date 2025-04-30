from fastapi import FastAPI, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from sqlalchemy import text
from .database import engine, Base, get_db
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from . import models  # モデルをインポート
from datetime import datetime

# データモデルの定義
class ApiTestBase(BaseModel):
    test_value: Optional[str] = None

class ApiTestCreate(ApiTestBase):
    pass

class ApiTest(ApiTestBase):
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True

app = FastAPI()

# CORS設定を追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Viteのデフォルトポート
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# データベーステーブルの作成
Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# テスト用エンドポイントを追加
@app.get("/test")
async def test():
    return {"message": "バックエンドとの接続テスト成功！"}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        # text()でSQLをラップ
        result = db.execute(text("SELECT 1"))
        return {"message": "データベース接続成功！", "result": result.scalar()}
    except Exception as e:
        return {"error": f"データベース接続エラー: {str(e)}"}

# テストデータ一覧取得
@app.get("/api-tests", response_model=List[ApiTest])
def get_api_tests(db: Session = Depends(get_db)):
    try:
        # api_test_tableからデータを取得
        items = db.execute(text("SELECT id, test_value, created_at FROM api_test_table")).fetchall()
        return [{"id": item[0], "test_value": item[1], "created_at": item[2]} for item in items]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"データベースエラー: {str(e)}")

# テストデータ追加
@app.post("/api-tests", response_model=ApiTest)
def create_api_test(item: ApiTestCreate = Body(...), db: Session = Depends(get_db)):
    try:
        # 1. INSERTを実行
        insert_query = text("INSERT INTO api_test_table (test_value) VALUES (:test_value)")
        db.execute(insert_query, {"test_value": item.test_value})
        
        # 2. 最後に挿入されたIDを取得 (MySQLの場合)
        last_id_query = text("SELECT LAST_INSERT_ID()")
        last_id = db.execute(last_id_query).scalar()
        
        # 3. 挿入したデータを取得
        select_query = text("SELECT id, test_value, created_at FROM api_test_table WHERE id = :id")
        result = db.execute(select_query, {"id": last_id}).fetchone()
        
        db.commit()
        
        return {"id": result[0], "test_value": result[1], "created_at": result[2]}
    except Exception as e:
        db.rollback()
        print(f"エラー詳細: {str(e)}")  # デバッグ用
        raise HTTPException(status_code=500, detail=f"データベースエラー: {str(e)}") 