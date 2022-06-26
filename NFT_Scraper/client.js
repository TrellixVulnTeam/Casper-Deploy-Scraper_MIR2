// This client is intended to be integrated with node.js backend(s)

var main = require("./main");
//989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8
//account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d

// account hash of any account on the casper blockchain
jonas_account = "account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d";
// contract hash of any non fungible token on the casper blockchain 
jonas_collection = "989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8";

// Get Ids and Metadata of owned NFts for given Collection
async function collectionBalance(account, collection){
    balance = await main.Balance(jonas_account, jonas_collection);
    // Print for testing, to be removed.
    console.log("JONAS BALANCE OF COLLECTION [ ", jonas_collection, " ]: ", balance);
    // Return the result to the server for further processing.
    return balance;
}

collectionBalance(jonas_account, jonas_collection);
