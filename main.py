import requests
import json
from CONSTANTS import LIMIT, PUBLIC_KEY, BASE_URL, PAGE_DATA
import os

#r = requests.get('https://event-store-api-clarity-testnet.make.services/accounts/01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150/extended-deploys?with_amounts_in_currency_id=1&page=1&limit=10&fields=entry_point,contract_package')
#r_json = json.loads(r.text)

os.system('clear')
#print(r_json['data'][0]['deploy_hash'])


# Now that you have the deploy_hash, use the casper-client with
# get-deploy <DEPLOY HASH>
def Get_Deploys():
    if not PAGE_DATA:
        return False
    #itemCount, pageCount, LIMIT
    itemCount = PAGE_DATA['itemCount']
    #pageCount = PAGE_DATA['pageCount']
    Deploys = []
    CURRENT_PAGE = 0
    while (itemCount - int(LIMIT)) > 0:
        page_data = json.loads(requests.get(BASE_URL + PUBLIC_KEY + "/extended-deploys?with_amounts_in_currency_id=1&page=" + str(CURRENT_PAGE) + "&limit=" + LIMIT + "&fields=entry_point,contract_package").text)
        itemCount -= int(LIMIT)
        CURRENT_PAGE += 1
        print(page_data)
        print('-'*7 + 'END OF BLOCK' + '-'*7)
        Deploys.append(page_data)
    if itemCount - (int(LIMIT) * CURRENT_PAGE) != 0:
        last_page_data = json.loads(requests.get(BASE_URL + PUBLIC_KEY + "/extended-deploys?with_amounts_in_currency_id=1&page=" + str(CURRENT_PAGE + 1) + "&limit=" + LIMIT + "&fields=entry_point,contract_package").text)
        Deploys.append(last_page_data)
    return Deploys

def Get_Deploy_Hashs(Deploys):
    Deploy_Hashs = []
    for item in Deploys:
        for deploy in item['data']:
            Deploy_Hashs.append(deploy['deploy_hash'])

    print(Deploy_Hashs)
    print(len(Deploy_Hashs))

def Sort_Deploys_Chronologically(Deploys):
    return None
# Check what the Entry Point of the call was

#example_result_json = json.loads(example_result)

Get_Deploy_Hashs(Get_Deploys())
