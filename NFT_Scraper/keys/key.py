import base64
import os
public_key = "01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150"
export = base64.b64encode(public_key.encode('utf')).decode('utf-8')
print(export)
if not os.path.exists('/public_key.pem'):
    try:
        open('public_key.pem', 'x')
    except Exception as UnknownException:
        print('Unknown Error: ', UnknownException)
with open('./public_key.pem', 'w') as file:
    file.write(export)
    file.close()
