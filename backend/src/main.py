from fastapi import FastAPI
from src.endpoints import test

app = FastAPI()

app.include_router(test.router, prefix="/api")
