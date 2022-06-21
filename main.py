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

_Deploys = []

class Deploy:
    def __init__(self, entry_point, hash, nature=None):
        self.entry_point = entry_point
        self.hash = hash
        self.nature = nature

    def _add_deploy(self):
        _Deploys.append({
        'hash':self.hash,
        'nature':self.nature,
        'entry_point':self.entry_point
        })

    def _match_deploy_nature(self):
        if not self.entry_point:
            print("SKIP")
            self.nature = None
            return
        if self.entry_point['name'] == 'mint':
            print(self.entry_point['name'])
            self.nature = "mint"
            self._add_deploy()
        else:
            print('[WARNING: NATURE ' + self.entry_point['name'] + ' NOT YET SUPPORTED]')

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

def Get_Deploy_Hashs(Deploys):
    Deploy_Hashs = []
    for item in Deploys:
        for deploy in item['data']:
            Deploy_Hashs.append(deploy['deploy_hash'])

    print(Deploy_Hashs)
    print(len(Deploy_Hashs))

def Get_Entry_Points(Deploys):
    Entry_Points = []
    for item in Deploys:
        for deploy in item['data']:
            #print(deploy)
            #print('-'*20)
            Entry_Points.append(deploy['entry_point'])
        #for deploy in item
            #print('-'*20)
            #print(deploy)
            #Entry_Points.append(deploy['entry_point'])
    #print(Entry_Points)
    #print(len(Entry_Points))
    return Entry_Points

# Check what the Entry Point of the call was
'''
def Match_Entry_Mint(Entry_Points):
    NFTs = []
    for item in Entry_Points:
        print(item)
        try:
            if item['name'] == 'mint':
                NFTs.append(item)
        except Exception as ENTRY_ERROR:
            pass
    print(NFTs)
'''
#example_result_json = json.loads(example_result)

for deploys in Get_Deploys():
    for deploy in deploys['data']:
        print('[CHECKING DEPLOY]')
        hash = deploy['deploy_hash']
        entry_point = deploy['entry_point']
        instance = Deploy(entry_point, hash)
        instance._match_deploy_nature()

print(_Deploys)
print(len(_Deploys))


#deploys = Get_Deploys()
#Get_Entry_Points(deploys)
#Match_Entry_Mint(Get_Entry_Points(deploys))
