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
exports.Test_Export = void 0;
// CONFIG AND ENV
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env.jnft" });
//import {IDS} from "";
var Scraper_js_1 = require("./Scraper.js");
// import Client and EventParser
var casper_cep47_js_client_1 = require("casper-cep47-js-client");
// import stuff from utils.ts
var utils_1 = require("./utils");
// import dependencies from SDK
var casper_js_sdk_1 = require("casper-js-sdk");
// Constants defined in .env.jnft
var _a = process.env, NODE_ADDRESS = _a.NODE_ADDRESS, EVENT_STREAM_ADDRESS = _a.EVENT_STREAM_ADDRESS, CHAIN_NAME = _a.CHAIN_NAME, MASTER_KEY_PAIR_PATH = _a.MASTER_KEY_PAIR_PATH, USER_KEY_PAIR_PATH = _a.USER_KEY_PAIR_PATH, TOKEN_NAME = _a.TOKEN_NAME, CONTRACT_NAME = _a.CONTRACT_NAME, TOKEN_SYMBOL = _a.TOKEN_SYMBOL, CONTRACT_HASH = _a.CONTRACT_HASH, INSTALL_PAYMENT_AMOUNT = _a.INSTALL_PAYMENT_AMOUNT, MINT_ONE_PAYMENT_AMOUNT = _a.MINT_ONE_PAYMENT_AMOUNT, MINT_COPIES_PAYMENT_AMOUNT = _a.MINT_COPIES_PAYMENT_AMOUNT, TRANSFER_ONE_PAYMENT_AMOUNT = _a.TRANSFER_ONE_PAYMENT_AMOUNT, BURN_ONE_PAYMENT_AMOUNT = _a.BURN_ONE_PAYMENT_AMOUNT, MINT_ONE_META_SIZE = _a.MINT_ONE_META_SIZE, MINT_COPIES_META_SIZE = _a.MINT_COPIES_META_SIZE, MINT_COPIES_COUNT = _a.MINT_COPIES_COUNT, MINT_MANY_META_SIZE = _a.MINT_MANY_META_SIZE, MINT_MANY_META_COUNT = _a.MINT_MANY_META_COUNT;
// nano .env.jnft
var KEYS = casper_js_sdk_1.Keys.Ed25519.parseKeyFiles("".concat(MASTER_KEY_PAIR_PATH, "/public_key.pem"), "".concat(MASTER_KEY_PAIR_PATH, "/secret_key.pem"));
var KEYS_USER = casper_js_sdk_1.Keys.Ed25519.parseKeyFiles("".concat(USER_KEY_PAIR_PATH, "/public_key.pem"), "".concat(USER_KEY_PAIR_PATH, "/secret_key.pem"));
// [ FUNCTIONS ]
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
function Test_Export() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ("Hello World")];
        });
    });
}
exports.Test_Export = Test_Export;
function Mint_Copy(id, key, value, es, cep47) {
    return __awaiter(this, void 0, void 0, function () {
        var mintCopiesDeploy, mintCopiesDeployHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cep47.mintCopies(KEYS.publicKey, [id.toString()], new Map([[key.toString(), value.toString()]]), 1, MINT_COPIES_PAYMENT_AMOUNT, KEYS.publicKey, [KEYS])];
                case 1:
                    mintCopiesDeploy = _a.sent();
                    return [4 /*yield*/, mintCopiesDeploy.send(NODE_ADDRESS)];
                case 2:
                    mintCopiesDeployHash = _a.sent();
                    console.log("...... Mint deploy hash: ", mintCopiesDeployHash);
                    return [4 /*yield*/, (0, utils_1.getDeploy)(NODE_ADDRESS, mintCopiesDeployHash)];
                case 3:
                    _a.sent();
                    console.log("...... Token minted successfully");
                    return [2 /*return*/];
            }
        });
    });
}
function Balance(es, cep47) {
    return __awaiter(this, void 0, void 0, function () {
        var _IDS, OWNED, _a, _b, _i, _id, id, tokenMeta, _owned;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, Scraper_js_1.GET_IDS)("account-hash-9213801c105b757b8dda450090c40541edcbe95db6d7f3b6b4cbb1656d5f0a9d", "989184bbbfdb6a213e4b2586cfa87d6a92e1ecff8fbf5a8b69b95086125fc9d8")];
                case 1:
                    _IDS = _c.sent();
                    OWNED = [] // append with owned nfts ( [id, metadata] )
                    ;
                    _a = [];
                    for (_b in _IDS)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    _id = _a[_i];
                    id = _IDS[_id];
                    return [4 /*yield*/, cep47.getTokenMeta(id.toString())];
                case 3:
                    tokenMeta = _c.sent();
                    _owned = [id, tokenMeta];
                    OWNED.push(_owned);
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, OWNED];
            }
        });
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
var test = function () { return __awaiter(void 0, void 0, void 0, function () {
    var cep47, accountInfo, contractHash, contractPackageHash, es, _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                cep47 = new casper_cep47_js_client_1.CEP47Client(NODE_ADDRESS, CHAIN_NAME);
                return [4 /*yield*/, (0, utils_1.getAccountInfo)(NODE_ADDRESS, KEYS.publicKey)];
            case 1:
                accountInfo = _g.sent();
                console.log("... Account Info: ");
                console.log(JSON.stringify(accountInfo, null, 2));
                return [4 /*yield*/, (0, utils_1.getAccountNamedKeyValue)(accountInfo, "".concat(CONTRACT_NAME, "_contract_hash"))];
            case 2:
                contractHash = _g.sent();
                return [4 /*yield*/, (0, utils_1.getAccountNamedKeyValue)(accountInfo, "contract_package_hash")];
            case 3:
                contractPackageHash = _g.sent();
                return [4 /*yield*/, cep47.setContractHash(contractHash, contractPackageHash)];
            case 4:
                _g.sent();
                return [4 /*yield*/, (0, utils_1.sleep)(5 * 1000)];
            case 5:
                _g.sent();
                es = new casper_js_sdk_1.EventStream(EVENT_STREAM_ADDRESS);
                es.subscribe(casper_js_sdk_1.EventName.DeployProcessed, function (event) {
                    var parsedEvents = (0, casper_cep47_js_client_1.CEP47EventParser)({
                        contractPackageHash: contractPackageHash,
                        eventNames: [
                            casper_cep47_js_client_1.CEP47Events.MintOne,
                            casper_cep47_js_client_1.CEP47Events.TransferToken,
                            casper_cep47_js_client_1.CEP47Events.BurnOne,
                            casper_cep47_js_client_1.CEP47Events.MetadataUpdate,
                            casper_cep47_js_client_1.CEP47Events.ApproveToken
                        ]
                    }, event);
                    if (parsedEvents && parsedEvents.success) {
                        console.log("*** EVENT ***");
                        console.log(parsedEvents.data);
                        console.log("*** ***");
                    }
                });
                es.start();
                _b = (_a = console).log;
                return [4 /*yield*/, Balance(es, cep47)];
            case 6:
                _b.apply(_a, [_g.sent()]);
                // last id = 10
                /*console.log(await Mint_Copy(12, es, cep47));
                console.log(await Balance(es, cep47));*/
                _d = (_c = console).log;
                return [4 /*yield*/, Mint_Copy(12, "NFT 02", "JPG 02", es, cep47)];
            case 7:
                // last id = 10
                /*console.log(await Mint_Copy(12, es, cep47));
                console.log(await Balance(es, cep47));*/
                _d.apply(_c, [_g.sent()]);
                _f = (_e = console).log;
                return [4 /*yield*/, Balance(es, cep47)];
            case 8:
                _f.apply(_e, [_g.sent()]);
                es.stop();
                return [2 /*return*/];
        }
    });
}); };
