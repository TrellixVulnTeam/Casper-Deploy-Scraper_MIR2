import requests
import json
from CONSTANTS import LIMIT, PUBLIC_KEY, BASE_URL, PAGE_DATA
import os
import time #for testing

os.system('clear')
_Deploys = []

class Deploy:
    def __init__(self, entry_point, hash, nature):
        self.entry_point = entry_point
        self.hash = hash
        self.nature = nature

    def _add_deploy(self):
        _Deploys.append({
        'hash':self.hash,
        'nature':self.nature,
        'entry_point':self.entry_point
        })
        return True

    def _match_deploy_nature(self):
        if not self.entry_point:
            print("SKIP")
            self.nature = None
            return False
        if self.entry_point['name'] == 'mint':
            print(self.entry_point['name'])
            self.nature = "mint"
            return self._add_deploy()
        else:
            print('[WARNING: NATURE ' + self.entry_point['name'] + ' NOT YET SUPPORTED]')
            return False
    def _get_metadata(self):
        if self.nature == 'mint':
            url = 'https://event-store-api-clarity-testnet.make.services/extended-deploys/' + self.hash + '?fields=entry_point,contract_package'
            Metadata = json.loads(requests.get(url).text)['args']['token_metas']['parsed']
            time.sleep(5)
            print(self)
            print(Metadata)
        else:
            print(self.nature)

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
        #print(page_data)
        #print('-'*7 + 'END OF BLOCK' + '-'*7)
        Deploys.append(page_data)
    if itemCount - (int(LIMIT) * CURRENT_PAGE) != 0:
        last_page_data = json.loads(requests.get(BASE_URL + PUBLIC_KEY + "/extended-deploys?with_amounts_in_currency_id=1&page=" + str(CURRENT_PAGE + 1) + "&limit=" + LIMIT + "&fields=entry_point,contract_package").text)
        Deploys.append(last_page_data)
    return Deploys



############################################################################


#[TESTS]
for deploys in Get_Deploys():
    for deploy in deploys['data']:
        print('[CHECKING DEPLOY]')
        hash = deploy['deploy_hash']
        entry_point = deploy['entry_point']
        i1 = Deploy(entry_point, hash, None)
        i1._match_deploy_nature()

print(_Deploys)
print(len(_Deploys))


for deploy in _Deploys:
    print("DEPLOY:")
    print(deploy)
    hash = deploy['hash']
    entry_point = deploy['entry_point']
    nature = deploy['nature']
    i2 = Deploy(entry_point, hash, nature)
    print(i2._get_metadata())
