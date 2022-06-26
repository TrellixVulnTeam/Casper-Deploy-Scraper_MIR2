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
exports.getAccountNamedKeyValue = exports.getAccountInfo = exports.getDeploy = exports.getKeyPairOfUserSet = exports.sleep = exports.parseTokenMeta = void 0;
var casper_js_sdk_1 = require("casper-js-sdk");
/* Metadata contains */
var parseTokenMeta = function (str) {
    return str.split(",").map(function (s) {
        var map = s.split(" ");
        console.log([map[0], map[1]]);
        return [map[0], map[1]];
    });
};
exports.parseTokenMeta = parseTokenMeta;
var sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.sleep = sleep;
/**
 * Returns a set ECC key pairs - one for each NCTL user account.
 * @param {String} pathToUsers - Path to NCTL user directories.
 * @return {Array} An array of assymmetric keys.
 */
var getKeyPairOfUserSet = function (pathToUsers) {
    return [1, 2, 3, 4, 5].map(function (userID) {
        return casper_js_sdk_1.Keys.Ed25519.parseKeyFiles("".concat(pathToUsers, "/user-").concat(userID, "/public_key.pem"), "".concat(pathToUsers, "/user-").concat(userID, "/secret_key.pem"));
    });
};
exports.getKeyPairOfUserSet = getKeyPairOfUserSet;
var getDeploy = function (NODE_URL, deployHash) { return __awaiter(void 0, void 0, void 0, function () {
    var client, i, _a, deploy, raw;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                client = new casper_js_sdk_1.CasperClient(NODE_URL);
                i = 300;
                _b.label = 1;
            case 1:
                if (!(i != 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, client.getDeploy(deployHash)];
            case 2:
                _a = _b.sent(), deploy = _a[0], raw = _a[1];
                if (!(raw.execution_results.length !== 0)) return [3 /*break*/, 3];
                // @ts-ignore
                if (raw.execution_results[0].result.Success) {
                    return [2 /*return*/, deploy];
                }
                else {
                    // @ts-ignore
                    throw Error("Contract execution: " +
                        // @ts-ignore
                        raw.execution_results[0].result.Failure.error_message);
                }
                return [3 /*break*/, 5];
            case 3:
                i--;
                return [4 /*yield*/, (0, exports.sleep)(1000)];
            case 4:
                _b.sent();
                return [3 /*break*/, 1];
            case 5: return [3 /*break*/, 1];
            case 6: throw Error("Timeout after " + i + "s. Something's wrong");
        }
    });
}); };
exports.getDeploy = getDeploy;
var getAccountInfo = function (nodeAddress, publicKey) { return __awaiter(void 0, void 0, void 0, function () {
    var client, stateRootHash, accountHash, blockState;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new casper_js_sdk_1.CasperServiceByJsonRPC(nodeAddress);
                return [4 /*yield*/, client.getStateRootHash()];
            case 1:
                stateRootHash = _a.sent();
                accountHash = publicKey.toAccountHashStr();
                return [4 /*yield*/, client.getBlockState(stateRootHash, accountHash, [])];
            case 2:
                blockState = _a.sent();
                return [2 /*return*/, blockState.Account];
        }
    });
}); };
exports.getAccountInfo = getAccountInfo;
/**
 * Returns a value under an on-chain account's storage.
 * @param accountInfo - On-chain account's info.
 * @param namedKey - A named key associated with an on-chain account.
 */
var getAccountNamedKeyValue = function (accountInfo, namedKey) {
    var found = accountInfo.namedKeys.find(function (i) { return i.name === namedKey; });
    if (found) {
        return found.key;
    }
    return undefined;
};
exports.getAccountNamedKeyValue = getAccountNamedKeyValue;
