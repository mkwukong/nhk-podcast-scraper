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
exports.__esModule = true;
exports.download = exports.reqHeader = exports.getDataLinks = void 0;
var axios_1 = require("axios");
var fs = require("fs");
var url = "https://api.nhk.or.jp/r-news/v1/newslist.js?callback=radionews";
var USER_AGENT = "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0";
var header = {
    referrer: "https://www.nhk.or.jp/radionews/",
    accept: "*/*",
    "user-agent": USER_AGENT,
    "accept-language": "en-GB,en;q=0.5"
};
function getDataLinks() {
    return __awaiter(this, void 0, void 0, function () {
        var resp, data, fileNames, apiUrl, links, _i, _a, news, obj, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(url, {
                        headers: header
                    })];
                case 1:
                    resp = _b.sent();
                    data = JSON.parse(resp.data.split("radionews(")[1].split(");")[0]);
                    fileNames = ["normal", "fast", "slow"];
                    apiUrl = "https://www.nhk.or.jp/r-news/ondemand/mp3/";
                    links = [];
                    for (_i = 0, _a = data.news; _i < _a.length; _i++) {
                        news = _a[_i];
                        obj = {};
                        for (i = 0; i < 3; ++i) {
                            obj[fileNames[i]] =
                                "" + apiUrl + news.soundlist["sound_" + fileNames[i]].filename + ".mp3";
                        }
                        links.push(obj);
                    }
                    return [2 /*return*/, links];
            }
        });
    });
}
exports.getDataLinks = getDataLinks;
// Download and save mp3 files
exports.reqHeader = {
    method: "GET",
    responseType: "stream"
};
function download(url, reqHeader, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reqHeader["url"] = url;
                    return [4 /*yield*/, axios_1["default"]
                            .request(reqHeader)
                            .then(function (res) {
                            res.data.pipe(fs.createWriteStream(filePath));
                        })["catch"](function (err) {
                            console.log(err);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.download = download;
