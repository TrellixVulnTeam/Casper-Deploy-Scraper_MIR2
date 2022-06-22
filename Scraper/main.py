# An unoptimized skeleton Tool to get the IDs of NFTs held by a Casper Account.
# Highly Experimental at this stage.
# Configure Keys and Contract Hash in "Constants.py"
from Contract import CONTRACT
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
            if deploy['error_message'] != None:
                continue
            nature = deploy['entry_point']['name']
            print("#"*35)
            print("DEPLOY NATURE: ", nature)
            print("#"*35)
            print(deploy)
            '''

            ###################################
            #    DEPLOY NATURE:  mint         #
            ###################################
            {'deploy_hash': '129e050907a505e3d865a4c7fdb3b1beb080bcf53c8df9589a3408e3b2c82020', 'block_hash': 'c5d12ce0fec97cf7f50fa9da37506eb25d478a5b206d10c0b5425802c68e087e', 'caller_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'execution_type_id': 2, 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'cost': '555566970', 'payment_amount': '2000000000', 'error_message': None, 'timestamp': '2022-06-19T18:40:54.000Z', 'status': 'executed', 'args': {'recipient': {'parsed': {'Account': 'account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d'}, 'cl_type': 'Key'}, 'token_ids': {'parsed': ['1'], 'cl_type': {'List': 'U256'}}, 'token_metas': {'parsed': [[{'key': 'number', 'value': 'one'}]], 'cl_type': {'List': {'Map': {'key': 'String', 'value': 'String'}}}}}, 'amount': None, 'entry_point': {'id': '53469', 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'name': 'mint', 'action_type_id': None}, 'contract_package': {'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'owner_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'contract_type_id': 4, 'contract_name': None, 'contract_description': None, 'timestamp': '2022-06-19T18:34:59.000Z'}, 'currency_cost': 0.013935341865207, 'rate': 0.0250831, 'current_currency_cost': 0.014544687717903}

            '''
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

                '''
                ###################################
                DEPLOY NATURE:  transfer_from
                ###################################
                {'deploy_hash': '19dfec8101c7d15b48ce432f2a20f9765828ab151358fa9c49e10c718dcb8ccc', 'block_hash': 'cbb8ec6e75dfecf32c491d78d3b4a714561ae6f9e2903652577b19604ed90953', 'caller_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'execution_type_id': 2, 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'cost': '969756350', 'payment_amount': '2000000000', 'error_message': None, 'timestamp': '2022-06-19T18:46:07.000Z', 'status': 'executed', 'args': {'sender': {'parsed': {'Account': 'account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d'}, 'cl_type': 'Key'}, 'recipient': {'parsed': {'Account': 'account-hash-fc36989e547ec1eba1d8aea840ffabbcbe7d27fb249801870551160eaa014306'}, 'cl_type': 'Key'}, 'token_ids': {'parsed': ['5'], 'cl_type': {'List': 'U256'}}}, 'amount': None, 'entry_point': {'id': '53477', 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'name': 'transfer_from', 'action_type_id': None}, 'contract_package': {'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'owner_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'contract_type_id': 4, 'contract_name': None, 'contract_description': None, 'timestamp': '2022-06-19T18:34:59.000Z'}, 'currency_cost': 0.02433409609055, 'rate': 0.025093, 'current_currency_cost': 0.025388124267365}
                '''

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
            _IDS.append(id)
        elif c == -1:
            __IDS = []
            for key in _IDS:
                if key != id:
                    __IDS.append(key)
            _IDS = __IDS
            pass
        elif c == 0:
            pass
        else:
            print("[ERROR: ]", "invalid c value was calculated.", '\n', "! This should not happen. Waiting for Input. !")
            print('\n')
            input("[IGNORE] this critical !ERROR! BY PRESSING ANY KEY: ")

        print('ID: ' , id , ' C: ' , c)

    print('#'*100)
    print('IDS OF CURRENTLY OWNED TOKENS BY THE GIVEN ACCOUNT HASH FOR THE SELECTED NFT-CONTRACT HASH:', _IDS)

    return _IDS
    ''' EXAMPLE FOR EACH DEPLOY NATURE
    ###################################
    DEPLOY NATURE:  mint
    ###################################
    {'deploy_hash': '129e050907a505e3d865a4c7fdb3b1beb080bcf53c8df9589a3408e3b2c82020', 'block_hash': 'c5d12ce0fec97cf7f50fa9da37506eb25d478a5b206d10c0b5425802c68e087e', 'caller_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'execution_type_id': 2, 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'cost': '555566970', 'payment_amount': '2000000000', 'error_message': None, 'timestamp': '2022-06-19T18:40:54.000Z', 'status': 'executed', 'args': {'recipient': {'parsed': {'Account': 'account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d'}, 'cl_type': 'Key'}, 'token_ids': {'parsed': ['1'], 'cl_type': {'List': 'U256'}}, 'token_metas': {'parsed': [[{'key': 'number', 'value': 'one'}]], 'cl_type': {'List': {'Map': {'key': 'String', 'value': 'String'}}}}}, 'amount': None, 'entry_point': {'id': '53469', 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'name': 'mint', 'action_type_id': None}, 'contract_package': {'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'owner_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'contract_type_id': 4, 'contract_name': None, 'contract_description': None, 'timestamp': '2022-06-19T18:34:59.000Z'}, 'currency_cost': 0.013935341865207, 'rate': 0.0250831, 'current_currency_cost': 0.014544687717903}

    ###################################
    DEPLOY NATURE:  burn
    ###################################
    {'deploy_hash': '281306787b0080e300da203e49922a0974766ac7251fdf3963bcc0e92b75aa35', 'block_hash': 'f7a89f56fd0206a61300380112a213c0ccd6051a4924e333f1927badcbab283c', 'caller_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'execution_type_id': 2, 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'cost': '595374440', 'payment_amount': '2000000000', 'error_message': None, 'timestamp': '2022-06-19T18:41:46.000Z', 'status': 'executed', 'args': {'owner': {'parsed': {'Account': 'account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d'}, 'cl_type': 'Key'}, 'token_ids': {'parsed': ['1'], 'cl_type': {'List': 'U256'}}}, 'amount': None, 'entry_point': {'id': '53464', 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'name': 'burn', 'action_type_id': None}, 'contract_package': {'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'owner_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'contract_type_id': 4, 'contract_name': None, 'contract_description': None, 'timestamp': '2022-06-19T18:34:59.000Z'}, 'currency_cost': 0.0149319909552, 'rate': 0.02508, 'current_currency_cost': 0.015586843301755998}

    ###################################
    DEPLOY NATURE:  mint_copies
    ###################################
    {'deploy_hash': 'd92b8aa0d7aec3f5572e5077c14d841f975d2f62e327e6940cd2dbdf60ae8158', 'block_hash': '5f5ffab0459ee14eb30608cce466f3269984019dd5ffd55f668fedf0816e90d6', 'caller_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'execution_type_id': 2, 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'cost': '2164509910', 'payment_amount': '100000000000', 'error_message': None, 'timestamp': '2022-06-19T18:42:50.000Z', 'status': 'executed', 'args': {'count': {'parsed': 4, 'cl_type': 'U32'}, 'recipient': {'parsed': {'Account': 'account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d'}, 'cl_type': 'Key'}, 'token_ids': {'parsed': ['2', '3', '4', '5'], 'cl_type': {'List': 'U256'}}, 'token_meta': {'parsed': [{'key': 'number', 'value': 'from-series'}], 'cl_type': {'Map': {'key': 'String', 'value': 'String'}}}}, 'amount': None, 'entry_point': {'id': '53470', 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'name': 'mint_copies', 'action_type_id': None}, 'contract_package': {'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'owner_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'contract_type_id': 4, 'contract_name': None, 'contract_description': None, 'timestamp': '2022-06-19T18:34:59.000Z'}, 'currency_cost': 0.05428460983685401, 'rate': 0.0250794, 'current_currency_cost': 0.056666652992809}

    ###################################
    DEPLOY NATURE:  transfer_from
    ###################################
    {'deploy_hash': '19dfec8101c7d15b48ce432f2a20f9765828ab151358fa9c49e10c718dcb8ccc', 'block_hash': 'cbb8ec6e75dfecf32c491d78d3b4a714561ae6f9e2903652577b19604ed90953', 'caller_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'execution_type_id': 2, 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'cost': '969756350', 'payment_amount': '2000000000', 'error_message': None, 'timestamp': '2022-06-19T18:46:07.000Z', 'status': 'executed', 'args': {'sender': {'parsed': {'Account': 'account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d'}, 'cl_type': 'Key'}, 'recipient': {'parsed': {'Account': 'account-hash-fc36989e547ec1eba1d8aea840ffabbcbe7d27fb249801870551160eaa014306'}, 'cl_type': 'Key'}, 'token_ids': {'parsed': ['5'], 'cl_type': {'List': 'U256'}}}, 'amount': None, 'entry_point': {'id': '53477', 'contract_hash': '989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8', 'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'name': 'transfer_from', 'action_type_id': None}, 'contract_package': {'contract_package_hash': '9894dbbec18c2902bc08fdca09981f1dc2464a2d9b5971a74942f1cc38fe36da', 'owner_public_key': '01c597b132da1f9446e72838041c9a376214d3cdcf5c72140784905866c3a81150', 'contract_type_id': 4, 'contract_name': None, 'contract_description': None, 'timestamp': '2022-06-19T18:34:59.000Z'}, 'currency_cost': 0.02433409609055, 'rate': 0.025093, 'current_currency_cost': 0.025388124267365}






    '''

FIND_IDS()
