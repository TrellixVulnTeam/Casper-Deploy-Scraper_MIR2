"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_IDS = void 0;
var PAGE_LENGTH = 4;
//const contract_hash = "989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8";
//const Account_Hash = "account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d";
// Complete.
function Request_Index(index, contract_hash) {
    return __awaiter(this, void 0, void 0, function () {
        var CONTRACT_BASE_URL, fetch, url, settings, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    CONTRACT_BASE_URL = "https://event-store-api-clarity-testnet.make.services/extended-deploys?with_amounts_in_currency_id=1&fields=entry_point,contract_package&limit=" + PAGE_LENGTH.toString() + "&contract_hash=" + contract_hash + "&page=";
                    fetch = require('node-fetch');
                    url = CONTRACT_BASE_URL + index.toString();
                    settings = { method: "Get" };
                    result = "";
                    return [4 /*yield*/, fetch(url, settings)
                            .then(function (res) { return res.json(); })
                            .then(function (json) {
                            //console.log(json['data'][0]['args']);
                            result = json;
                            // do something with JSON
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function caller(contract_hash) {
    return __awaiter(this, void 0, void 0, function () {
        var pz, pageCount, itemCount, items, ALL, p, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Request_Index(1, contract_hash)];
                case 1:
                    pz = _a.sent();
                    pageCount = parseInt(pz['pageCount']);
                    console.log('Pages: ', pageCount);
                    itemCount = pz['itemCount'];
                    console.log('Items: ', itemCount);
                    items = parseInt(itemCount);
                    ALL = [];
                    if (!(pageCount == 1)) return [3 /*break*/, 2];
                    ALL.push(pz['data']);
                    return [2 /*return*/, ALL];
                case 2:
                    p = 1;
                    _a.label = 3;
                case 3:
                    if (!(p < pageCount + 1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Request_Index(p, contract_hash)];
                case 4:
                    page = _a.sent();
                    ALL.push(page['data']);
                    _a.label = 5;
                case 5:
                    p++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, ALL];
            }
        });
    });
}
function Get_Pages(Account_Hash, contract_hash) {
    return __awaiter(this, void 0, void 0, function () {
        var pages, _IDS, _TXR, _BURNT, page, deploy, instance, error, nature, metadata_parsed, token_ids, id, _id, token_ids, id, _id, token_ids, timestamp, recipient, sender, id, tx, token_ids, id, _id, _lost, _received, tx, _tx, id, c, key, _key, key, _key, key, _key, __IDS, key, _key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, caller(contract_hash)]; //.then(pages => {
                case 1:
                    pages = _a.sent() //.then(pages => {
                    ;
                    _IDS = [];
                    _TXR = [];
                    _BURNT = [];
                    for (page in pages) {
                        for (deploy in pages[page]) {
                            instance = pages[page][deploy];
                            error = instance['error_message'];
                            if (error != null) {
                                continue;
                            }
                            nature = instance['entry_point']['name'];
                            if (nature == 'mint') {
                                metadata_parsed = instance['args']['token_metas']['parsed'];
                                token_ids = instance['args']['token_ids']['parsed'];
                                for (id in token_ids) {
                                    _id = token_ids[id];
                                    _IDS.push(_id);
                                }
                                //console.log('_IDS: ', _IDS);
                            }
                            else if (nature == 'mint_copies') {
                                token_ids = instance['args']['token_ids']['parsed'];
                                for (id in token_ids) {
                                    _id = token_ids[id];
                                    _IDS.push(_id);
                                }
                                //console.log('_IDS: ', _IDS);
                            }
                            else if (nature == 'transfer_from') {
                                token_ids = instance['args']['token_ids']['parsed'];
                                timestamp = instance['timestamp'];
                                recipient = instance['args']['recipient']['parsed']['Account'];
                                sender = instance['args']['sender']['parsed']['Account'];
                                if (sender == recipient) {
                                    continue;
                                }
                                for (id in token_ids) {
                                    _id = token_ids[id];
                                    tx = {
                                        'id': _id,
                                        'timestamp': timestamp,
                                        'sender': sender,
                                        'recipient': recipient
                                    };
                                    _TXR.push(tx);
                                }
                            }
                            else if (nature == 'burn') {
                                token_ids = instance['args']['token_ids']['parsed'];
                                for (id in token_ids) {
                                    _id = token_ids[id];
                                    _BURNT.push(_id);
                                }
                            }
                            _lost = [];
                            _received = [];
                            for (tx in _TXR) {
                                _tx = _TXR[tx];
                                if (_tx['sender'] == Account_Hash && _tx['recipient'] != Account_Hash) {
                                    // transaction from this to another account
                                    _lost.push(_tx['id']);
                                }
                                else if (_tx['sender'] != Account_Hash && _tx['recipient'] == Account_Hash) {
                                    _received.push(_tx['id']);
                                }
                            }
                            for (id in _IDS) {
                                _id = _IDS[id];
                                c = 0;
                                for (key in _lost) {
                                    _key = _lost[key];
                                    if (_key == _id) {
                                        c -= 1;
                                    }
                                }
                                for (key in _received) {
                                    _key = _received[key];
                                    if (_key == _id) {
                                        c += 1;
                                    }
                                }
                                for (key in _BURNT) {
                                    _key = _BURNT[key];
                                    if (_key == _id) {
                                        c = -1;
                                    }
                                }
                                if (c == 1) {
                                    _IDS.push(_id);
                                }
                                else if (c == -1) {
                                    __IDS = [];
                                    for (key in _IDS) {
                                        _key = _IDS[key];
                                        if (_key != _id) {
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
                    return [2 /*return*/, _IDS];
            }
        });
    });
}
//console.log(Get_Pages());
//return Get_pages();
function GET_IDS(Account_Hash, contract_hash) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Get_Pages(Account_Hash, contract_hash)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.GET_IDS = GET_IDS;
