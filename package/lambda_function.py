import json
import requests
import os

def lambda_handler(event, context):
    params = event.get('queryStringParameters')
    city = params.get('city') if params else "Warszawa"
    
    api_key = os.environ.get('WEATHER_API_KEY')
    url = f"http://api.openweathermap.org/data/2.5/weather"
    
    payload = {
        'q': city,
        'appid': api_key,
        'units': 'metric',
        'lang': 'pl'
    }

    try:
        #Send Get -> OpenWeathermap, return response
        response = requests.get(url, params=payload)
        response.raise_for_status() 
        #response(json) -> for python dict
        data = response.json()
        
        return {
            'statusCode': 200,
            #python dict -> to raw string
            'body': json.dumps({
                'miasto': data['name'],
                'temp': f"{data['main']['temp']}°C",
                'pogoda': data['weather'][0]['description']
            }, ensure_ascii=False)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
    