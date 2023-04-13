"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888,405];
exports.modules = {

/***/ 7816:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _appcraft_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9387);
/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4960);
/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_NoSsr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3534);
/* harmony import */ var _mui_material_NoSsr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_NoSsr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9752);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4083);
/* harmony import */ var _appcraft_containers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7305);
/* harmony import */ var _appcraft_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9841);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__, _index__WEBPACK_IMPORTED_MODULE_8__, _appcraft_containers__WEBPACK_IMPORTED_MODULE_9__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__, _index__WEBPACK_IMPORTED_MODULE_8__, _appcraft_containers__WEBPACK_IMPORTED_MODULE_9__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const client = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.QueryClient({
    defaultOptions: {
        queries: {
            suspense: true
        }
    }
});
function App({ Component , pageProps  }) {
    const { authorized , tokens  } = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__/* .useAuthTokens */ .Hq)();
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "Appcraft Demo"
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "stylesheet",
                        href: "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_NoSsr__WEBPACK_IMPORTED_MODULE_4___default()), {
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.QueryClientProvider, {
                    client: client,
                    children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__.ThemeProvider, {
                        theme: _appcraft_themes__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_DARK */ .L,
                        children: [
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2___default()), {}),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_containers__WEBPACK_IMPORTED_MODULE_9__/* .AppHeader */ .tf, {
                                authorized: authorized,
                                oauth2: {
                                    google: "/api/oauth2/google"
                                },
                                onMenuToggle: ()=>setOpen(true)
                            }),
                            authorized && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_containers__WEBPACK_IMPORTED_MODULE_9__/* .MenuDrawer */ ._g, {
                                open: open,
                                onClose: ()=>setOpen(false)
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .MainContainer */ .tz, {
                                maxWidth: false,
                                className: "app",
                                component: "main",
                                children: authorized ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                                    ...pageProps
                                }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_index__WEBPACK_IMPORTED_MODULE_8__["default"], {})
                            })
                        ]
                    })
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4083:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Index)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4475);
/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Container__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_appcraft_hooks__WEBPACK_IMPORTED_MODULE_3__]);
_appcraft_hooks__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function Index() {
    const [at] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_3__/* .useFixedT */ .DA)("app");
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Container__WEBPACK_IMPORTED_MODULE_1___default()), {
        maxWidth: "md",
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default()), {
                paragraph: true,
                variant: "h4",
                color: "secondary",
                children: "Welcome to Appcraft"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2___default()), {
                variant: "h6",
                color: "text.primary",
                whiteSpace: "pre-line",
                children: at("txt-introduction")
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9387:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* reexport */ DEFAULT_DARK)
});

// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
;// CONCATENATED MODULE: external "@mui/material/colors"
const colors_namespaceObject = require("@mui/material/colors");
;// CONCATENATED MODULE: ../../libs/themes/src/default-dark.tsx


const DEFAULT_DARK = (0,styles_.createTheme)({
    palette: {
        mode: "dark",
        divider: "rgba(245,241,227,0.12)",
        background: {
            paper: "#474448",
            default: "#2D232E"
        },
        primary: {
            light: colors_namespaceObject.deepOrange.A100,
            main: colors_namespaceObject.deepOrange.A200,
            dark: colors_namespaceObject.deepOrange.A400,
            contrastText: "#fff"
        },
        secondary: {
            light: colors_namespaceObject.orange.A200,
            main: colors_namespaceObject.orange.A400,
            dark: colors_namespaceObject.orange.A700,
            contrastText: "#fff"
        },
        info: {
            light: colors_namespaceObject.cyan[300],
            main: colors_namespaceObject.cyan[500],
            dark: colors_namespaceObject.cyan[800],
            contrastText: "#fff"
        },
        success: {
            light: colors_namespaceObject.lime[300],
            main: colors_namespaceObject.lime[500],
            dark: colors_namespaceObject.lime[800],
            contrastText: "#fff"
        },
        warning: {
            light: colors_namespaceObject.amber[300],
            main: colors_namespaceObject.amber[500],
            dark: colors_namespaceObject.amber[800],
            contrastText: "#fff"
        },
        error: {
            light: colors_namespaceObject.deepOrange[300],
            main: colors_namespaceObject.deepOrange[500],
            dark: colors_namespaceObject.deepOrange[800],
            contrastText: "#fff"
        },
        text: {
            primary: "rgb(245,241,227)",
            secondary: "rgba(245,241,227,0.7)",
            disabled: "rgba(245,241,227,0.5)"
        }
    },
    unstable_sxConfig: {
        borderColor: {
            themeKey: "palette"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedInherit: {
                    color: "#2D232E"
                },
                containedSecondary: {
                    color: "#474448"
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                margin: "none",
                variant: "filled"
            }
        },
        MuiCssBaseline: {
            styleOverrides: (theme)=>({
                    body: {
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        margin: 0,
                        padding: 0,
                        height: global.window?.innerHeight || "100vh",
                        overflow: "hidden auto",
                        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                            width: `${theme.spacing(0.5)} !important`,
                            height: `${theme.spacing(0.5)} !important`
                        },
                        "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
                            background: theme.palette.background.paper,
                            borderRadius: theme.shape.borderRadius
                        },
                        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                            background: theme.palette.primary.main,
                            borderRadius: theme.shape.borderRadius
                        },
                        "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                            background: theme.palette.secondary.main
                        }
                    }
                })
        }
    }
});

;// CONCATENATED MODULE: ../../libs/themes/src/index.ts



/***/ }),

/***/ 5193:
/***/ ((module) => {

module.exports = require("@emotion/react/jsx-runtime");

/***/ }),

/***/ 6146:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Add");

/***/ }),

/***/ 257:
/***/ ((module) => {

module.exports = require("@mui/icons-material/AutoAwesomeMosaic");

/***/ }),

/***/ 9921:
/***/ ((module) => {

module.exports = require("@mui/icons-material/BookmarkAdd");

/***/ }),

/***/ 6959:
/***/ ((module) => {

module.exports = require("@mui/icons-material/ChevronLeft");

/***/ }),

/***/ 2818:
/***/ ((module) => {

module.exports = require("@mui/icons-material/ChevronRight");

/***/ }),

/***/ 4173:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Close");

/***/ }),

/***/ 58:
/***/ ((module) => {

module.exports = require("@mui/icons-material/DeleteForeverOutlined");

/***/ }),

/***/ 2489:
/***/ ((module) => {

module.exports = require("@mui/icons-material/EditOutlined");

/***/ }),

/***/ 3866:
/***/ ((module) => {

module.exports = require("@mui/icons-material/FilterList");

/***/ }),

/***/ 4535:
/***/ ((module) => {

module.exports = require("@mui/icons-material/FilterListOff");

/***/ }),

/***/ 8421:
/***/ ((module) => {

module.exports = require("@mui/icons-material/FolderRounded");

/***/ }),

/***/ 4492:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Google");

/***/ }),

/***/ 7752:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Login");

/***/ }),

/***/ 9801:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Logout");

/***/ }),

/***/ 5649:
/***/ ((module) => {

module.exports = require("@mui/icons-material/SettingsOutlined");

/***/ }),

/***/ 3087:
/***/ ((module) => {

module.exports = require("@mui/icons-material/VisibilityOutlined");

/***/ }),

/***/ 1584:
/***/ ((module) => {

module.exports = require("@mui/lab/Masonry");

/***/ }),

/***/ 3765:
/***/ ((module) => {

module.exports = require("@mui/material/Alert");

/***/ }),

/***/ 3882:
/***/ ((module) => {

module.exports = require("@mui/material/AppBar");

/***/ }),

/***/ 2120:
/***/ ((module) => {

module.exports = require("@mui/material/Avatar");

/***/ }),

/***/ 3819:
/***/ ((module) => {

module.exports = require("@mui/material/Button");

/***/ }),

/***/ 9580:
/***/ ((module) => {

module.exports = require("@mui/material/ButtonGroup");

/***/ }),

/***/ 8167:
/***/ ((module) => {

module.exports = require("@mui/material/Card");

/***/ }),

/***/ 3691:
/***/ ((module) => {

module.exports = require("@mui/material/CardActions");

/***/ }),

/***/ 8455:
/***/ ((module) => {

module.exports = require("@mui/material/CardContent");

/***/ }),

/***/ 9361:
/***/ ((module) => {

module.exports = require("@mui/material/CardHeader");

/***/ }),

/***/ 5732:
/***/ ((module) => {

module.exports = require("@mui/material/Collapse");

/***/ }),

/***/ 4475:
/***/ ((module) => {

module.exports = require("@mui/material/Container");

/***/ }),

/***/ 4960:
/***/ ((module) => {

module.exports = require("@mui/material/CssBaseline");

/***/ }),

/***/ 8611:
/***/ ((module) => {

module.exports = require("@mui/material/Dialog");

/***/ }),

/***/ 9404:
/***/ ((module) => {

module.exports = require("@mui/material/DialogActions");

/***/ }),

/***/ 1094:
/***/ ((module) => {

module.exports = require("@mui/material/DialogContent");

/***/ }),

/***/ 2468:
/***/ ((module) => {

module.exports = require("@mui/material/DialogTitle");

/***/ }),

/***/ 3646:
/***/ ((module) => {

module.exports = require("@mui/material/Divider");

/***/ }),

/***/ 7898:
/***/ ((module) => {

module.exports = require("@mui/material/Drawer");

/***/ }),

/***/ 3843:
/***/ ((module) => {

module.exports = require("@mui/material/Icon");

/***/ }),

/***/ 7934:
/***/ ((module) => {

module.exports = require("@mui/material/IconButton");

/***/ }),

/***/ 3103:
/***/ ((module) => {

module.exports = require("@mui/material/InputAdornment");

/***/ }),

/***/ 5246:
/***/ ((module) => {

module.exports = require("@mui/material/Link");

/***/ }),

/***/ 4192:
/***/ ((module) => {

module.exports = require("@mui/material/List");

/***/ }),

/***/ 1011:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemButton");

/***/ }),

/***/ 3787:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemIcon");

/***/ }),

/***/ 8315:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemText");

/***/ }),

/***/ 9685:
/***/ ((module) => {

module.exports = require("@mui/material/ListSubheader");

/***/ }),

/***/ 8125:
/***/ ((module) => {

module.exports = require("@mui/material/Menu");

/***/ }),

/***/ 3534:
/***/ ((module) => {

module.exports = require("@mui/material/NoSsr");

/***/ }),

/***/ 1598:
/***/ ((module) => {

module.exports = require("@mui/material/Paper");

/***/ }),

/***/ 441:
/***/ ((module) => {

module.exports = require("@mui/material/Skeleton");

/***/ }),

/***/ 6042:
/***/ ((module) => {

module.exports = require("@mui/material/TextField");

/***/ }),

/***/ 1431:
/***/ ((module) => {

module.exports = require("@mui/material/Toolbar");

/***/ }),

/***/ 7229:
/***/ ((module) => {

module.exports = require("@mui/material/Tooltip");

/***/ }),

/***/ 7163:
/***/ ((module) => {

module.exports = require("@mui/material/Typography");

/***/ }),

/***/ 8442:
/***/ ((module) => {

module.exports = require("@mui/material/styles");

/***/ }),

/***/ 9868:
/***/ ((module) => {

module.exports = require("@mui/material/useMediaQuery");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 6508:
/***/ ((module) => {

module.exports = require("tss-react/mui");

/***/ }),

/***/ 9752:
/***/ ((module) => {

module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 2021:
/***/ ((module) => {

module.exports = import("i18next");;

/***/ }),

/***/ 6912:
/***/ ((module) => {

module.exports = import("zustand");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [867,274,97,686,841,305], () => (__webpack_exec__(7816)));
module.exports = __webpack_exports__;

})();