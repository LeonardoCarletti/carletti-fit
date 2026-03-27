import traceback
try:
    from app.main import app
    print("SUCCESS")
except Exception as e:
    print(traceback.format_exc())
