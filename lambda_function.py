import os
import json
import requests
from datetime import datetime, timedelta, timezone

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

def lambda_handler(event, context):
    params = event.get('queryStringParameters')
    # Default city changed to Warsaw (English spelling)
    city = params.get('city') if params else "Warsaw"
    api_key = os.environ.get('WEATHER_API_KEY')
    url = "https://api.openweathermap.org/data/2.5/weather"
    
    payload = {
        'q': city,
        'appid': api_key,
        'units': 'metric',
        'lang': 'pl'
    }

    try:
        response = requests.get(url, params=payload)
        response.raise_for_status() 
        data = response.json()
        
        shift_in_seconds = data.get('timezone', 0)
        local_time = datetime.now(timezone.utc) + timedelta(seconds=shift_in_seconds)

        result = {
            'city': data['name'],
            'temperature': f"{round(data['main']['temp'])}°C",
            'description': data['weather'][0]['description'],
            'time': local_time.strftime("%H:%M"),
            'icon_code': data['weather'][0]['icon']
        }

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps(result)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }