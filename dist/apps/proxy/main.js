/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/endpoints/OAuth2/OAuth2.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__("jsonwebtoken"));
const server_1 = __webpack_require__("../../libs/server/src/index.ts");
const express_1 = __webpack_require__("express");
const googleOauth2 = tslib_1.__importStar(__webpack_require__("./src/services/google-oauth2/index.ts"));
let OAuth2 = class OAuth2 {
    google(_req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.redirect(yield googleOauth2.getAuthURL());
        });
    }
    callback4Google(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { code } = req.query;
            const credentials = yield googleOauth2.initialCredentials(code);
            const cookieOpts = { expires: new Date(credentials.expiry_date) };
            res
                .cookie('id', jsonwebtoken_1.default.sign(credentials.id_token, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM"), cookieOpts)
                .cookie('access', jsonwebtoken_1.default.sign(credentials.access_token, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM"), cookieOpts)
                .redirect('/');
        });
    }
    signout(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.verify(req.query.access, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM");
            //! 目前只有使用 Google OAuth2, 若未來支援其他登入方式, 此處必須調整
            yield googleOauth2.revokeToken(accessToken);
            res.clearCookie('access').clearCookie('id').redirect('/');
        });
    }
};
tslib_1.__decorate([
    (0, server_1.Endpoint)({
        method: 'get',
        description: '跳轉至 Google 登入畫面',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OAuth2.prototype, "google", null);
tslib_1.__decorate([
    (0, server_1.Endpoint)({
        url: 'google/callback',
        method: 'get',
        description: '初始化登入',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OAuth2.prototype, "callback4Google", null);
tslib_1.__decorate([
    (0, server_1.Endpoint)({
        method: 'get',
        description: '登出',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OAuth2.prototype, "signout", null);
OAuth2 = tslib_1.__decorate([
    (0, server_1.Module)({ base: 'oauth2' })
], OAuth2);
exports["default"] = OAuth2;


/***/ }),

/***/ "./src/endpoints/OAuth2/index.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OAuth2 = void 0;
var OAuth2_1 = __webpack_require__("./src/endpoints/OAuth2/OAuth2.ts");
Object.defineProperty(exports, "OAuth2", ({ enumerable: true, get: function () { return __importDefault(OAuth2_1).default; } }));


/***/ }),

/***/ "./src/endpoints/Userinfo/Userinfo.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__("jsonwebtoken"));
const server_1 = __webpack_require__("../../libs/server/src/index.ts");
const express_1 = __webpack_require__("express");
const googleOauth2 = tslib_1.__importStar(__webpack_require__("./src/services/google-oauth2/index.ts"));
let Userinfo = class Userinfo {
    profile(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const idToken = jsonwebtoken_1.default.verify(req.cookies.id, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM");
            //! 目前只有使用 Google OAuth2, 若未來支援其他登入方式, 此處必須調整
            res.json(yield googleOauth2.verifyToken(idToken));
        });
    }
};
tslib_1.__decorate([
    (0, server_1.Endpoint)({
        method: 'get',
        description: '取得使用者資訊',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], Userinfo.prototype, "profile", null);
Userinfo = tslib_1.__decorate([
    (0, server_1.Module)({ base: 'userinfo' })
], Userinfo);
exports["default"] = Userinfo;


/***/ }),

/***/ "./src/endpoints/Userinfo/index.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Userinfo = void 0;
var Userinfo_1 = __webpack_require__("./src/endpoints/Userinfo/Userinfo.ts");
Object.defineProperty(exports, "Userinfo", ({ enumerable: true, get: function () { return __importDefault(Userinfo_1).default; } }));


/***/ }),

/***/ "./src/endpoints/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/endpoints/OAuth2/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/endpoints/Userinfo/index.ts"), exports);


/***/ }),

/***/ "./src/services/google-oauth2/google-oauth2.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifyToken = exports.revokeToken = exports.initialCredentials = exports.getAuthURL = void 0;
const tslib_1 = __webpack_require__("tslib");
const google_auth_library_1 = __webpack_require__("google-auth-library");
const client = new google_auth_library_1.OAuth2Client("461485822488-8t34kv5b9p2o8e0gt61laun5d6asp84g.apps.googleusercontent.com", "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", process.env.GOOGLE_REDIRECT_URI);
const getAuthURL = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
    });
});
exports.getAuthURL = getAuthURL;
const initialCredentials = (code) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { tokens } = yield client.getToken(code);
    client.setCredentials(tokens);
    return tokens;
});
exports.initialCredentials = initialCredentials;
const revokeToken = (accessToken) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield client.revokeToken(accessToken);
});
exports.revokeToken = revokeToken;
const verifyToken = (idToken) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
        id: payload.sub,
        username: payload.name,
        email: payload.email,
        picture: payload.picture,
        expires: payload.exp,
    };
});
exports.verifyToken = verifyToken;


/***/ }),

/***/ "./src/services/google-oauth2/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/services/google-oauth2/google-oauth2.ts"), exports);


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

/***/ "google-auth-library":
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),

/***/ "http-proxy-middleware":
/***/ ((module) => {

module.exports = require("http-proxy-middleware");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

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
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__("jsonwebtoken"));
const path_1 = tslib_1.__importDefault(__webpack_require__("path"));
const http_proxy_middleware_1 = __webpack_require__("http-proxy-middleware");
const google_oauth2_1 = __webpack_require__("./src/services/google-oauth2/index.ts");
const endpoints = tslib_1.__importStar(__webpack_require__("./src/endpoints/index.ts"));
const port = process.env.SERVICE_PROXY.replace(/^.+:/, '');
const app = (0, express_1.default)()
    .use((0, cookie_parser_1.default)())
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: true }))
    .use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')))
    .use((req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!/^\/oauth2\//.test(req.url) && '/' !== req.url) {
        try {
            const idToken = jsonwebtoken_1.default.verify(req.cookies.id, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM");
            const _a = yield (0, google_oauth2_1.verifyToken)(idToken), { expires: expiresIn } = _a, user = tslib_1.__rest(_a, ["expires"]);
            const expires = new Date(new Date().valueOf() + expiresIn);
            res.cookie('jwt', jsonwebtoken_1.default.sign(user, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4MDE1OTgzNywiaWF0IjoxNjgwMTU5ODM3fQ.2fqT5Q89AdyiyXqlMr4fJ5avNadvYQJTH1VdRWP2aeM", { expiresIn }), {
                expires,
                httpOnly: true,
            });
        }
        catch (e) {
            console.error(e);
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
    next();
}))
    .use('/data-forge', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: process.env.SERVICE_DATA_FORGE,
    changeOrigin: true,
    onProxyReq: http_proxy_middleware_1.fixRequestBody,
    pathRewrite: {
        '^/data-forge': '',
    },
}))
    .use('/ts2-props', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: process.env.SERVICE_TS2_PROPS,
    changeOrigin: true,
    onProxyReq: http_proxy_middleware_1.fixRequestBody,
    pathRewrite: {
        '^/ts2-props': '',
    },
}));
Object.values(endpoints).forEach((EndPoint) => new EndPoint(app));
app
    .get('/', (_req, res) => res
    .setHeader('Content-type', 'text/html')
    .send(`<h1>@appcraft/proxy:${port}<br/>v${"0.0.2"}</h1>`))
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