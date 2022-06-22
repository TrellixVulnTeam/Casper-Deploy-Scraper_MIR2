import requests
import json
from CONSTANTS import LIMIT, PUBLIC_KEY, BASE_URL, PAGE_DATA
import os
import time #for testing

os.system('clear')
_Deploys = []
_Balance = []
#########################################################################
#                       DEPLOY CLASS                                    #
#########################################################################
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
        natures = {'mint':'mint', 'mint_copies':'mint_copies', 'transfer_from':'transfer_from', 'transfer':'transfer', 'burn':'burn'}
        if not self.entry_point:
            print("SKIP")
            self.nature = None
            return False
        try:
            self.nature = natures[self.entry_point['name']]
            return self._add_deploy()
        except Exception as Unsupported_Nature:
            print('[WARNING: NATURE ' + self.entry_point['name'] + ' NOT YET SUPPORTED]')
            return False


        '''if self.entry_point['name'] == 'mint':
            print(self.entry_point['name'])
            self.nature = "mint"
            return self._add_deploy()
        elif self.entry_point['name'] == 'mint_copies':
            self.nature = 'mint_copies'
            return self._add_deploy()
        elif self.entry_point['name'] == 'transfer_from':
            self.nature = 'transfer_from'
            return self._add_deploy()
        elif self.entry_point['name'] == 'transfer':
            self.nature = 'transfer'
            return self._add_deploy()
        elif self.entry_point['name'] == 'burn':
            self.nature = 'burn'
            return self._add_deploy()
        else:
            print('[WARNING: NATURE ' + self.entry_point['name'] + ' NOT YET SUPPORTED]')
            return False'''
    def _get_metadata(self):
        #
        # IF ELSE LOGIC TEMPORARY SOLUTION
        #
        if self.nature == 'mint':
            url = 'https://event-store-api-clarity-testnet.make.services/extended-deploys/' + self.hash + '?fields=entry_point,contract_package'

            #TEST
            print(requests.get(url).text)
            #time.sleep(100)


            Metadata = json.loads(requests.get(url).text)['args']['token_metas']['parsed']
            #time.sleep(5)
            print(self)
            print(Metadata)



            # GET THE OWNER OF THE NFT @ given hash
            r = json.loads(requests.get(url).text)
            print(r['contract_package']['owner_public_key'])
            time.sleep(100)



        elif self.nature == 'mint_copies':
            print('handle nature mint_copies')
            url = 'https://event-store-api-clarity-testnet.make.services/extended-deploys/' + self.hash + '?fields=entry_point,contract_package'
            Metadata = json.loads(requests.get(url).text)['args']
            print(Metadata)
            token_ids = Metadata['token_ids']
            token_meta = Metadata['token_meta']
            print(token_ids)
            print(token_meta)
            #print(token_meta)
            #time.sleep(100)
            #do stuff
            pass

        elif self.nature == 'transfer_from':
            print('handle nature transfer_from')
            url = 'https://event-store-api-clarity-testnet.make.services/extended-deploys/' + self.hash + '?fields=entry_point,contract_package'
            Metadata = json.loads(requests.get(url).text)

            print(Metadata)
            #time.sleep(100)

            contract_package_hash = Metadata['contract_package_hash']
            print(contract_package_hash)

            # Thanks to the contract_package_hash, we know which NFT was transferred.
            # Additional data we will need: Is it Incoming or Outgoing? Timestamp.
            # Collect all transactions for all NFTs and map them. Then sort them by timestamp.
            # Finally check ownership.
            #time.sleep(100)
            #do stuff
            pass


        elif self.nature == 'transfer':
            print('handle nature transfer')
            #do stuff
            pass
        elif self.nature == 'burn':
            print('handle nature burn')
            #do stuff
            pass
        else:
            print(self.nature)

#########################################################################
#                       General stuff                                   #
#########################################################################

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


#########################################################################
#                       TESTS                                           #
#########################################################################
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


'''
When Metadata is standartized, collect all copies that were minted to an account and
use their ID & the Token Contract's Hash to check whether the account still owns them:

ownerOfTokenFive = await cep47.getOwnerOf("5");
console.log(`...... Owner of token "5" is ${ownerOfTokenFive}`);


Then check outgoing transfers to further validate ownership

'''
