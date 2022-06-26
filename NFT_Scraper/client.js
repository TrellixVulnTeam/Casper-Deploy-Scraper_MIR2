var main = require("./main");
//989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8
//account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d

jonas_account = "account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d";
jonas_collection = "989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8";

// example Endpoint
async function getAccount_forCollection(account, collection){
    balance = await main.Balance(jonas_account, jonas_collection);
    console.log("JONAS BALANCE OF COLLECTION [ ", jonas_collection, " ]: ", balance);
}

getAccount_forCollection(jonas_account, jonas_collection);
