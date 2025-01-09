from fastapi import APIRouter
from src.supabase_client import supabase

router = APIRouter()

@router.get("/example")
def get_example_data():
    response = supabase.table("the_new_table").select("*").execute()
    return response
