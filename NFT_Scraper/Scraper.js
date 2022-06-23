const PAGE_LENGTH = 20;
const contract_hash = "989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8";
const Account_Hash = "account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d";

// Complete.
async function Request_Index(index){
  const CONTRACT_BASE_URL = "https://event-store-api-clarity-testnet.make.services/extended-deploys?with_amounts_in_currency_id=1&fields=entry_point,contract_package&limit=" + PAGE_LENGTH.toString() + "&contract_hash=" + contract_hash + "&page=";
  const fetch = require('node-fetch');

  let url = CONTRACT_BASE_URL + index.toString();
  let settings = { method: "Get" };

  let result = ""
  await fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
          //console.log(json['data'][0]['args']);
          result = json;
          // do something with JSON
      });
  return result
}

async function caller(){
  var pz = await Request_Index(1);
  let pageCount = parseInt(pz['pageCount']);
  console.log('Pages: ', pageCount);
  let itemCount = pz['itemCount'];
  console.log('Items: ', itemCount);

  items = parseInt(itemCount);
  let ALL = []
  if (pageCount == 1) {
    ALL.push(pz['data']);
    return ALL;
  }
  else{
    for (let p = 0; p < 16; p++) {
      let page = await Request_Index(p)
      ALL.push(page['data']);
    }
    return ALL;
  }
}

function Get_Pages(){
  let pages = caller().then(pages => {
    let _IDS = [];
    let _TXR = [];
    let _BURNT = [];
    for (page in pages){
      for (deploy in pages[page]){
        // a single deploy.
        //console.log(pages[page][deploy]);
        let instance = pages[page][deploy];
        let error = instance['error_message'];
        if (error != null){
          console.log("Failed Deploy.");
          continue;
        }
        console.log('Ok Deploy.');

        let nature = instance['entry_point']['name']
        console.log("DEPLOY NATURE: ", nature);
        if (nature == 'mint'){
          let metadata_parsed = instance['args']['token_metas']['parsed'];
          let token_ids = instance['args']['token_ids']['parsed'];
          for (id in token_ids){
            let _id = token_ids[id];
            _IDS.push(_id);
          }
          console.log('_IDS: ', _IDS);
        }
        else if (nature == 'mint_copies'){
          let token_ids = instance['args']['token_ids']['parsed'];
          for (id in token_ids){
            let _id = token_ids[id];
            _IDS.push(_id);
          }
          console.log('_IDS: ', _IDS);
        }
        else if (nature == 'transfer_from'){
          let token_ids = instance['args']['token_ids']['parsed'];
          let timestamp = instance['timestamp'];
          let recipient = instance['args']['recipient']['parsed']['Account'];
          let sender = instance['args']['sender']['parsed']['Account'];
          if (sender == recipient){
            continue;
          }

          for (id in token_ids){
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
          for (id in token_ids){
            let _id = token_ids[id];
            _BURNT.push(_id);
          }
        }
        console.log(_BURNT);
        console.log(_IDS);
        console.log(_TXR);
        // PROCESSING TRANSACTIONS
        let _lost = [];
        let _received = [];

        for (tx in _TXR){
          let _tx = _TXR[tx];
          if (_tx['sender'] == Account_Hash && _tx['recipient'] != Account_Hash){
            // transaction from this to another account
            _lost.push(_tx['id']);
          }
          else if (_tx['sender'] != Account_Hash && _tx['recipient'] == Account_Hash){
            _received.push(_tx['id']);
          }
        }
        for (id in _IDS){
          _id = _IDS[id];
          let c = 0;
          for (key in _lost){
            let _key = _lost[key];
            if (_key == _id){
              c -= 1;
            }
          }
          for (key in _received){
            let _key = _received[key];
            if (_key == _id){
              c += 1;
            }
          }
          for (key in _BURNT){
            let _key = _BURNT[key];
            if (_key == _id){
              c = -1;
            }
          }
          if (c == 1){
            console.log("| [:1] FOUND OWNED |");
            _IDS.push(_id);
          }
          else if (c == -1){
            let __IDS = [];
            for (key in _IDS){
              _key = _IDS[key];
              if (_key != _id){
                __IDS.push(_key);
              }
            }
            _IDS = __IDS;
          }
          else if (c == 0){
            console.log("| [:2] FOUND OWNED |");
          }
          else{
            console.log("[WARNING: ]", "invalid c value was calculated.");
          }
        }
      }

    }
    console.log("OWNED IDS: ", _IDS);
  });
}

//console.log(Get_Pages());
//return Get_pages();
function GET_IDS(){
  return Get_Pages();
}

GET_IDS();
