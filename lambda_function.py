import os
import json
import requests
from datetime import datetime, timedelta, timezone

def lambda_handler(event, context):
    params = event.get('queryStringParameters') or {}
    city = params.get('city', 'Warszawa')
    api_key = os.environ.get('WEATHER_API_KEY')
    url = "https://api.openweathermap.org/data/2.5/weather"
    
    payload = {
        'q': city,
        'appid': api_key,
        'units': 'metric',
        'lang': 'en'
    }

    try:
        response = requests.get(url, params=payload)
        response.raise_for_status() 
        data = response.json()
        
        shift = data.get('timezone', 0)
        local_time = datetime.now(timezone.utc) + timedelta(seconds=shift)


        result = {
            'city': data['name'],
            'temp': data['main']['temp'], 
            'description': data['weather'][0]['description'],
            'time': local_time.strftime("%H:%M"),
            'icon': data['weather'][0]['icon']
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
            'headers': { 'Access-Control-Allow-Origin': '*' },
            'body': json.dumps({'error': str(e)})
        }