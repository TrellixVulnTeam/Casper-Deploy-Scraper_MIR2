# An unoptimized skeleton Tool to get the IDs of NFTs held by a Casper Account.
# Highly Experimental at this stage.
# Configure Keys and Contract Hash in "Constants.py"
from Constants import Account_Hash
from Helper import All
#[FOR TESTING]
import time

# WARNING! Deploy of nature "transfer" are currently not handled. I do not know whether this
# needs to be changed, as I currenlty think "transfer" can only be used on testnet and therefore
# isn't relevant. Should I be wrong in this assumption, a "transfer" handler will be added.

#HANDLED: 'transfer_from', 'mint', 'mint_copies', 'burn'
def FIND_IDS(_IDS=[], _TXR=[], _BURNT=[], pages=All()):
    # Iterage over pages that were collected by the Handler ( simple web scraper using the API )
    for page in pages:
        # Iterate over deploys in every page
        for deploy in page:
            # We don't want to handle failed deploys
            print(deploy['error_message'])
            if deploy['error_message'] != None:
                continue
            nature = deploy['entry_point']['name']
            print("#"*35)
            print("DEPLOY NATURE: ", nature)
            print("#"*35)
            print(deploy)

            # Handle Deploys of nature "mint"
            if nature == 'mint':
                metadata_parsed = deploy['args']['token_metas']['parsed']
                print(metadata_parsed)
                token_ids = deploy['args']['token_ids']['parsed']
                print(token_ids)
                for id in token_ids:
                    _IDS.append(id)
                print('_IDS: ', _IDS)
                #time.sleep(100)
                #pass

            # Handle Deploys of nature "mint_copies"
            elif nature == 'mint_copies':
                token_ids = deploy['args']['token_ids']['parsed']
                print(token_ids)
                for id in token_ids:
                    _IDS.append(id)
                print('_IDS: ', _IDS)
                #time.sleep(100)

            # Handle Deploys of nature "transfer_from"
            elif nature == 'transfer_from':
                token_ids = deploy['args']['token_ids']['parsed']
                timestamp = deploy['timestamp']
                recipient = deploy['args']['recipient']['parsed']['Account']
                sender = deploy['args']['sender']['parsed']['Account']
                if sender == recipient:
                    # Don't handle situation if sent to same address
                    continue

                print(timestamp)
                print(token_ids)
                print(sender)
                print(recipient)
                for id in token_ids:
                    tx = {'id':id, 'timestamp':timestamp, 'sender':sender, 'recipient':recipient}
                    _TXR.append(tx)

            # Handle Deploys of nature "burn"
            elif nature == 'burn':
                token_ids = deploy['args']['token_ids']['parsed']
                for id in token_ids:
                    _BURNT.append(id)
                # Burn can't be undone, so the ID is permanently "unowned".
            #time.sleep(100)

    print('BURNT: ' , _BURNT)
    print('MINTED: ' , _IDS)
    print('TXR: ' , _TXR)

    ## PROCESS TRANSACTIONS
    _lost = []
    _received = [] # if you received more than you lost, +1 & Vice versa -1

    # HANDLE TRANSACTIONS ADDED TO _TXR. A _TXR transaction requires a recipient and a sender.
    # This structure needs to be changed if one insists on more detailed transaction history.
    # Currently the only purpose this code serves is to deduce whether Tokens of a given
    # Contract are currently held by the provided address.
    for tx in _TXR:
    # PARSE THE TRANSACTION TIMESTAMP FIRST
        if tx['sender'] == Account_Hash and tx['recipient'] != Account_Hash: # Double check ( just to make sure )
            _lost.append(tx['id'])
        elif tx['sender'] != Account_Hash and tx['recipient'] == Account_Hash:
            _received.append(tx['id'])
    # Ingoing : +1, Outgoing : -1. Simple but effective way to deduce whether a token has left the wallet.
    for id in _IDS:
        c = 0
        for key in _lost:
            if key == id:
                c -= 1
        for key in _received:
            if key == id:
                c += 1
        for key in _BURNT:
            if key == id:
                c = -1
        # IF c < 0: not owned anymore. IF c > 0: add to balance, as it was received through a transfer.
        if c == 1:
            print('| [:1] FOUND OWNED |')
            _IDS.append(id)
        elif c == -1:
            __IDS = []
            for key in _IDS:
                if key != id:
                    __IDS.append(key)
            _IDS = __IDS
            pass
        elif c == 0:
            print('| [:2] FOUND OWNED |')
            pass
        else:
            print("[ERROR: ]", "invalid c value was calculated.", '\n', "! This should not happen. Waiting for Input. !")
            print('\n')
            input("[IGNORE] this critical !ERROR! BY PRESSING ANY KEY: ")

        print('ID: ' , id , ' C: ' , c)

    print('#'*100)
    print('IDS OF CURRENTLY OWNED TOKENS BY THE GIVEN ACCOUNT HASH FOR THE SELECTED NFT-CONTRACT HASH:', _IDS)

    return _IDS
FIND_IDS()
