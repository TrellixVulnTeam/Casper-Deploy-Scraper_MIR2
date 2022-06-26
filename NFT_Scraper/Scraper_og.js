// Uncompiled version of Scraper.js //
// Treat as backup //

const PAGE_LENGTH = 4;
const contract_hash = "0a8e5d0c8d7d5af3e01cde3c14713242e8d43bc44c7aefe342577e10cbebb7d9";
const Account_Hash = "account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d";

// Complete.
async function Request_Index(index, contract_hash){
  const CONTRACT_BASE_URL = "https://event-store-api-clarity-testnet.make.services/extended-deploys?with_amounts_in_currency_id=1&fields=entry_point,contract_package&limit=" + PAGE_LENGTH.toString() + "&contract_hash=" + contract_hash + "&page=";
  const fetch = require('node-fetch');

  let url = CONTRACT_BASE_URL + index.toString();
  let settings = { method: "Get" };

  let result = "";
  await fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
          //console.log(json['data'][0]['args']);
          result = json;
          // do something with JSON
      });
  return result
}

async function caller(contract_hash){
  var pz = await Request_Index(1, contract_hash);
  let pageCount = parseInt(pz['pageCount']);
  console.log('Pages: ', pageCount);
  let itemCount = pz['itemCount'];
  console.log('Items: ', itemCount);

  let items = parseInt(itemCount);
  let ALL = []
  if (pageCount == 1) {
    ALL.push(pz['data']);
    return ALL;
  }
  else{
    for (let p = 1; p < pageCount + 1; p++) {
      let page = await Request_Index(p, contract_hash)
      ALL.push(page['data']);
    }
    return ALL;
  }
}

async function Get_Pages(Account_Hash, contract_hash){
    let pages = await caller(contract_hash)//.then(pages => {
    let _IDS = [];
    let _TXR = [];
    let _BURNT = [];
    for (let page in pages){
      for (let deploy in pages[page]){
        // a single deploy.
        //console.log(pages[page][deploy]);
        let instance = pages[page][deploy];
        let error = instance['error_message'];
        if (error != null){
          continue;
        }

        let nature = instance['entry_point']['name']


        
        if (nature == 'mint'){
          let metadata_parsed = instance['args']['token_metas']['parsed'];
          let token_ids = instance['args']['token_ids']['parsed'];
          for (let id in token_ids){
            let _id = token_ids[id];
            _IDS.push(_id);
          }
          //console.log('_IDS: ', _IDS);
        }
        else if (nature == 'mint_copies'){
          let token_ids = instance['args']['token_ids']['parsed'];
          for (let id in token_ids){
            let _id = token_ids[id];
            _IDS.push(_id);
          }
          //console.log('_IDS: ', _IDS);
        }
        else if (nature == 'transfer_from'){
          let token_ids = instance['args']['token_ids']['parsed'];
          let timestamp = instance['timestamp'];
          let recipient = instance['args']['recipient']['parsed']['Account'];
          let sender = instance['args']['sender']['parsed']['Account'];
          if (sender == recipient){
            continue;
          }

          for (let id in token_ids){
            _id = token_ids[id];
            let tx = {
              'id':_id,
              'timestamp':timestamp,
              'sender':sender,
              'recipient':recipient
            }
            _TXR.push(tx);
          }
        }
        else if (nature == 'burn'){
          let token_ids = instance['args']['token_ids']['parsed'];
          for (let id in token_ids){
            let _id = token_ids[id];
            _BURNT.push(_id);
          }
        }
        /*console.log(_BURNT);
        console.log(_IDS);
        console.log(_TXR);*/
        // PROCESSING TRANSACTIONS
        let _lost = [];
        let _received = [];

        for (let tx in _TXR){
          let _tx = _TXR[tx];
          if (_tx['sender'] == Account_Hash && _tx['recipient'] != Account_Hash){
            // transaction from this to another account
            _lost.push(_tx['id']);
          }
          else if (_tx['sender'] != Account_Hash && _tx['recipient'] == Account_Hash){
            _received.push(_tx['id']);
          }
        }
        for (let id in _IDS){
          _id = _IDS[id];
          let c = 0;
          for (let key in _lost){
            let _key = _lost[key];
            if (_key == _id){
              c -= 1;
            }
          }
          for (let key in _received){
          let _key = _received[key];
            if (_key == _id){
              c += 1;
            }
          }
          for (let key in _BURNT){
            let _key = _BURNT[key];
            if (_key == _id){
              c = -1;
            }
          }
          if (c == 1){
            _IDS.push(_id);
          }
          else if (c == -1){
            let __IDS = [];
            for (let key in _IDS){
              let _key = _IDS[key];
              if (_key != _id){
                __IDS.push(_key);
              }
            }
            _IDS = __IDS;
          }
          /*
          else if (c == 0){
            pass;
          }
          else{
            pass;
            //console.log("[WARNING: ]", "invalid c value was calculated.");
          }*/
        }
      }
    }
    return _IDS;
  //});
}

//console.log(Get_Pages());
//return Get_pages();
async function GET_IDS(Account_Hash, contract_hash){
  let res = await Get_Pages(Account_Hash, contract_hash);
  console.log(res);
  //return res;
}
GET_IDS(Account_Hash, contract_hash);
