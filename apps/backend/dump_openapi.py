import json
import os
import sys

# Adiciona a raiz do backend ao PYTHONPATH
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.main import app

def generate():
    schema = app.openapi()
    
    # Path no api-client local
    output_path = os.path.join(
        os.path.dirname(__file__), 
        "../../packages/api-client/openapi.json"
    )
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(schema, f, indent=2)
        
    print(f"✅ OpenAPI Schema exportado com sucesso para: {output_path}")

if __name__ == "__main__":
    generate()
