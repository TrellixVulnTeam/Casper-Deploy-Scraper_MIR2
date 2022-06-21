import requests
import json

def Page_Helper(data):
    print(data)
    return {'itemCount':data['itemCount'], 'pageCount':data['pageCount']}
