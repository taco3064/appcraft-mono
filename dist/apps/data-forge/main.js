/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/endpoints/Hierarchy/Hierarchy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__("jsonwebtoken"));
const server_1 = __webpack_require__("../../libs/server/src/index.ts");
const mongodb_1 = __webpack_require__("mongodb");
const express_1 = __webpack_require__("express");
const hierarchy = tslib_1.__importStar(__webpack_require__("./src/services/hierarchy/index.ts"));
let Hierarchy = class Hierarchy {
    search(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = jsonwebtoken_1.default.verify(req.cookies.jwt, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM");
            res.json(yield hierarchy.search(id, req.params.category, req.body));
        });
    }
    add(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = jsonwebtoken_1.default.verify(req.cookies.jwt, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM");
            res.json(yield hierarchy.add(id, req.body));
        });
    }
    update(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = jsonwebtoken_1.default.verify(req.cookies.jwt, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM");
            res.json(yield hierarchy.update(id, req.body));
        });
    }
    remove(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id } = jsonwebtoken_1.default.verify(req.cookies.jwt, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM");
            yield hierarchy.remove(id, new mongodb_1.ObjectId(req.query.id));
            res.end();
        });
    }
};
tslib_1.__decorate([
    (0, server_1.Endpoint)({
        url: 'search/:category',
        method: 'post',
        description: '查詢 Hierarchy Data',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Hierarchy.prototype, "search", null);
tslib_1.__decorate([
    (0, server_1.Endpoint)({
        method: 'post',
        description: '建立新的 Hierarchy Group / Item',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Hierarchy.prototype, "add", null);
tslib_1.__decorate([
    (0, server_1.Endpoint)({
        method: 'put',
        description: '編輯 Hierarchy Group / Item',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Hierarchy.prototype, "update", null);
tslib_1.__decorate([
    (0, server_1.Endpoint)({
        method: 'delete',
        description: '刪除 Hierarchy Group / Item',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Hierarchy.prototype, "remove", null);
Hierarchy = tslib_1.__decorate([
    (0, server_1.Module)({ base: 'hierarchy' })
], Hierarchy);
exports["default"] = Hierarchy;


/***/ }),

/***/ "./src/endpoints/Hierarchy/index.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Hierarchy = void 0;
var Hierarchy_1 = __webpack_require__("./src/endpoints/Hierarchy/Hierarchy.ts");
Object.defineProperty(exports, "Hierarchy", ({ enumerable: true, get: function () { return __importDefault(Hierarchy_1).default; } }));


/***/ }),

/***/ "./src/endpoints/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/endpoints/Hierarchy/index.ts"), exports);


/***/ }),

/***/ "./src/services/common/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/services/common/mongodb/index.ts"), exports);


/***/ }),

/***/ "./src/services/common/mongodb/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/services/common/mongodb/mongodb.ts"), exports);


/***/ }),

/***/ "./src/services/common/mongodb/mongodb.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCollection = exports.getClient = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongodb_1 = __webpack_require__("mongodb");
const clientSync = new mongodb_1.MongoClient("mongodb+srv://appcraft:CSU6yveeTlOttFgc@cluster0.wbxybba.mongodb.net/?retryWrites=true&w=majority", {
    serverApi: mongodb_1.ServerApiVersion.v1,
}).connect();
const getClient = () => clientSync;
exports.getClient = getClient;
const getCollection = ({ db, collection, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, exports.getClient)();
    return client.db(db).collection(collection);
});
exports.getCollection = getCollection;


/***/ }),

/***/ "./src/services/hierarchy/hierarchy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.remove = exports.update = exports.add = exports.search = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongodb_1 = __webpack_require__("mongodb");
const common_1 = __webpack_require__("./src/services/common/index.ts");
const search = (userid, category, { keyword, superior }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, common_1.getCollection)({
        db: 'data-forge',
        collection: 'hierarchy',
    });
    const cursor = yield collection.find(Object.assign(Object.assign({ userid: { $eq: userid }, category: { $eq: category } }, (superior && {
        superior: { $eq: superior },
    })), (keyword && {
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
        ],
    })));
    return cursor.sort(['category', 'type', 'name']).toArray();
});
exports.search = search;
const add = (userid, newData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, common_1.getCollection)({
        db: 'data-forge',
        collection: 'hierarchy',
    });
    const result = yield collection.insertOne(Object.assign(Object.assign({}, newData), { userid, _id: new mongodb_1.ObjectId() }));
    return Object.assign(Object.assign({}, newData), { _id: result.insertedId });
});
exports.add = add;
const update = (userid, _a) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var { _id } = _a, data = tslib_1.__rest(_a, ["_id"]);
    const collection = yield (0, common_1.getCollection)({
        db: 'data-forge',
        collection: 'hierarchy',
    });
    const result = yield collection.updateOne({
        userid: { $eq: userid },
        _id: { $eq: new mongodb_1.ObjectId(_id) },
    }, {
        $set: data,
    });
    return Object.assign(Object.assign({}, data), { _id: result.upsertedId });
});
exports.update = update;
const remove = (userid, dataid) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, common_1.getCollection)({
        db: 'data-forge',
        collection: 'hierarchy',
    });
    yield collection.deleteOne({
        userid: { $eq: userid },
        _id: { $eq: dataid },
    });
});
exports.remove = remove;


/***/ }),

/***/ "./src/services/hierarchy/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/services/hierarchy/hierarchy.ts"), exports);


/***/ }),

/***/ "../../libs/server/src/decorators/Endpoint/Endpoint.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function Endpoint({ url, method = 'get', params, }) {
    return (_target, propertyKey, descriptor) => {
        Object.defineProperty(descriptor.value, 'endpoint', {
            get: () => ({
                url: url || propertyKey || '',
                method,
                params,
            }),
        });
    };
}
exports["default"] = Endpoint;


/***/ }),

/***/ "../../libs/server/src/decorators/Endpoint/index.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Endpoint = void 0;
var Endpoint_1 = __webpack_require__("../../libs/server/src/decorators/Endpoint/Endpoint.ts");
Object.defineProperty(exports, "Endpoint", ({ enumerable: true, get: function () { return __importDefault(Endpoint_1).default; } }));


/***/ }),

/***/ "../../libs/server/src/decorators/Module/Modules.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
function Module({ base: baseURL }) {
    return (Implement) => class Endpoint extends Implement {
        constructor(...args) {
            const app = args[0];
            super();
            Object.getOwnPropertyNames(Implement.prototype).forEach((method) => {
                var _a, _b;
                if (method !== 'constructor') {
                    const { url: endpointURL, method: requestMethod, params = [], } = ((_a = this[method]) === null || _a === void 0 ? void 0 : _a.endpoint) || {};
                    const router = (_b = app[requestMethod]) === null || _b === void 0 ? void 0 : _b.bind(app);
                    router(`/${baseURL}/${endpointURL}/${params.join('/')}`, (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        var _c;
                        try {
                            yield ((_c = this[method]) === null || _c === void 0 ? void 0 : _c.call(this, req, res));
                        }
                        catch (err) {
                            console.error(`${Implement.name} Exception:`, err);
                            res.status(400).json({
                                implement: Implement.name,
                                err: `${err.toString()}`,
                            });
                        }
                    }));
                }
            });
        }
    };
}
exports["default"] = Module;


/***/ }),

/***/ "../../libs/server/src/decorators/Module/index.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Module = void 0;
var Modules_1 = __webpack_require__("../../libs/server/src/decorators/Module/Modules.ts");
Object.defineProperty(exports, "Module", ({ enumerable: true, get: function () { return __importDefault(Modules_1).default; } }));


/***/ }),

/***/ "../../libs/server/src/decorators/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/server/src/decorators/Endpoint/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/server/src/decorators/Module/index.ts"), exports);


/***/ }),

/***/ "../../libs/server/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../libs/server/src/decorators/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../libs/server/src/types/index.ts"), exports);


/***/ }),

/***/ "../../libs/server/src/types/index.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "cookie-parser":
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongodb":
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const cookie_parser_1 = tslib_1.__importDefault(__webpack_require__("cookie-parser"));
const express_1 = tslib_1.__importDefault(__webpack_require__("express"));
const endpoints = tslib_1.__importStar(__webpack_require__("./src/endpoints/index.ts"));
const port = process.env.SERVICE_DATA_FORGE.replace(/^.+:/, '');
const app = (0, express_1.default)()
    .use((0, cookie_parser_1.default)())
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: true }));
Object.values(endpoints).forEach((EndPoint) => new EndPoint(app));
app
    .get('/', (_req, res) => res
    .setHeader('Content-type', 'text/html')
    .send(`<h1>@appcraft/data-forge:${port}<br/>v${"0.0.1"}</h1>`))
    .listen(port)
    .on('error', console.error)
    .on('listening', () => console.log(`Listening at ${port}`));

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map