const PAGE_LENGTH = 100;
const CONTRACT_HASH = "989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8";



// Complete.
async function Request_Index(index){
  const CONTRACT_BASE_URL = "https://event-store-api-clarity-testnet.make.services/extended-deploys?with_amounts_in_currency_id=1&fields=entry_point,contract_package&limit=" + PAGE_LENGTH.toString() + "&contract_hash=" + CONTRACT_HASH + "&page=";
  const fetch = require('node-fetch');

  let url = CONTRACT_BASE_URL + index.toString;
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
  ALL = []
  if (pageCount == 1) {
    ALL.push(pz['data']);
    return ALL;
  }
  else{
    for (let p = 0; p < pageCount; p++) {
      let page = await Request_Index(p);
      console.log(ALL.push(page['data']));
    }
    return ALL;
  }
}

function Get_Pages(){
  let pages = caller().then(pages => {
    console.log(pages)
    //console.log(res);
    //console.log(pages);
    for (page in pages){
      //console.log(page);
      for (deploy in pages[page]){
      }
    }

  });
}

Get_Pages();
