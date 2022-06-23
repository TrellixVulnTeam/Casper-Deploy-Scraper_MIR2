from Constants import PAGE_LENGTH, CONTRACT_HASH
import requests
import json

def All():
    #CONTRACT_URL = "https://event-store-api-clarity-testnet.make.services/extended-deploys?with_amounts_in_currency_id=1&page=1&limit=" + str(PAGE_LENGTH) + "&contract_hash=" + CONTRACT_HASH
    CONTRACT_BASE_URL = "https://event-store-api-clarity-testnet.make.services/extended-deploys?with_amounts_in_currency_id=1&fields=entry_point,contract_package&limit=" + str(PAGE_LENGTH) + "&contract_hash=" + CONTRACT_HASH + "&page="
    data_json = json.loads(requests.get(CONTRACT_BASE_URL + "1").text)
    pageCount = int(data_json['pageCount'])
    itemCount = data_json['itemCount']

    print('Pages: ' , pageCount)
    print('Items: ' , itemCount)

    items = int(itemCount)
    ALL = []
    if pageCount == 1:
        ALL.append(data_json['data'])
        return ALL
    for p in range(1, pageCount + 1):
        page = requests.get(CONTRACT_BASE_URL + str(p)).text
        ALL.append(json.loads(page)['data'])
    return ALL
