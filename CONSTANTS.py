from helper import Page_Helper
import json
import requests

LIMIT = "10" # LIMIT per page. small limit is better for testing, large limit is better for production
PUBLIC_KEY = "01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150"
BASE_URL = "https://event-store-api-clarity-testnet.make.services/accounts/"

# This needs an exception as it is retrieved from the Casper-Explorer
try:
    PAGE_DATA = Page_Helper(json.loads(requests.get(BASE_URL + PUBLIC_KEY + "/extended-deploys?with_amounts_in_currency_id=1&page=1&limit=" + LIMIT + "&fields=entry_point,contract_package").text))
except Exception as UnhandledError:
    print("Unhandled Exception: " + str(UnhandledError))
    PAGE_DATA = False
