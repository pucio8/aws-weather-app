import os
import json
from dotenv import load_dotenv
from lambda_function import lambda_handler

load_dotenv()

def run_test():
    if not os.getenv('WEATHER_API_KEY'):
        print("Error: WEATHER_API_KEY not found in .env")
        return

    mock_event = {
        "queryStringParameters": {
            "city": "Warszawa"
        }
    }

    try:
        response = lambda_handler(mock_event, None)
        
        print(f"Status Code: {response['statusCode']}")
        
        body = json.loads(response['body'])
        print(json.dumps(body, indent=4, ensure_ascii=False))
        
    except Exception as e:
        print(f"Execution Error: {str(e)}")

if __name__ == "__main__":
    run_test()