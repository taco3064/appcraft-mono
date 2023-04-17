"use strict";
exports.id = 305;
exports.ids = [305];
exports.modules = {

/***/ 1787:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CollapseKeyword)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4173);
/* harmony import */ var _mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5732);
/* harmony import */ var _mui_material_Collapse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Collapse__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_FilterListOff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4535);
/* harmony import */ var _mui_icons_material_FilterListOff__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_FilterListOff__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3103);
/* harmony import */ var _mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6042);
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5677);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common__WEBPACK_IMPORTED_MODULE_7__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_8__]);
([_common__WEBPACK_IMPORTED_MODULE_7__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const SEARCH_WIDTH = {
    xs: "100%",
    sm: "80%"
};
function CollapseKeyword({ CollapseProps , in: open , defaultValue , onCollapse , onConfirm  }) {
    const width = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_8__/* .useWidth */ .z8)();
    const keywordRef = (0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)(null);
    const [at] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_8__/* .useFixedT */ .DA)("app");
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Collapse__WEBPACK_IMPORTED_MODULE_2___default()), {
        ...CollapseProps,
        in: open,
        addEndListener: ()=>keywordRef.current?.focus(),
        component: "form",
        sx: (theme)=>({
                display: "flex",
                justifyContent: "center",
                "& > .MuiCollapse-wrapper": {
                    width: SEARCH_WIDTH[width] || "50%",
                    paddingBottom: theme.spacing(3)
                }
            }),
        onSubmit: (e)=>{
            const formdata = new FormData(e.currentTarget);
            e.preventDefault();
            onConfirm(formdata.get("keyword"));
        },
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TextField__WEBPACK_IMPORTED_MODULE_5___default()), {
            fullWidth: true,
            variant: "filled",
            color: "info",
            size: "small",
            name: "keyword",
            inputRef: keywordRef,
            placeholder: at("plh-keyword"),
            defaultValue: defaultValue,
            InputProps: {
                disableUnderline: true,
                sx: (theme)=>({
                        borderRadius: `${theme.spacing(2.5)} / 50%`,
                        "& > input": {
                            borderRadius: `${theme.spacing(2.5)} / 50%`,
                            borderTopRightRadius: "0 !important",
                            borderBottomRightRadius: "0 !important",
                            padding: theme.spacing(1.5, 2.5)
                        }
                    }),
                endAdornment: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_4___default()), {
                    position: "end",
                    children: [
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common__WEBPACK_IMPORTED_MODULE_7__/* .CommonButton */ .J, {
                            btnVariant: "icon",
                            size: "small",
                            icon: (_mui_icons_material_FilterListOff__WEBPACK_IMPORTED_MODULE_3___default()),
                            text: at("btn-filter-clear"),
                            onClick: ()=>{
                                keywordRef.current.value = "";
                                keywordRef.current.focus();
                                onConfirm("");
                            }
                        }),
                        onCollapse && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common__WEBPACK_IMPORTED_MODULE_7__/* .CommonButton */ .J, {
                            btnVariant: "icon",
                            size: "small",
                            onClick: onCollapse,
                            icon: (_mui_icons_material_Close__WEBPACK_IMPORTED_MODULE_1___default()),
                            text: at("btn-close")
                        })
                    ]
                })
            }
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5548:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* reexport safe */ _CollapseKeyword__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _CollapseKeyword__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1787);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_CollapseKeyword__WEBPACK_IMPORTED_MODULE_0__]);
_CollapseKeyword__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8128:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ HierarchyEditorButton)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6146);
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_icons_material_BookmarkAdd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9921);
/* harmony import */ var _mui_icons_material_BookmarkAdd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_BookmarkAdd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3819);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_icons_material_EditOutlined__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2489);
/* harmony import */ var _mui_icons_material_EditOutlined__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_EditOutlined__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6042);
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9752);
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3142);
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5677);
/* harmony import */ var _appcraft_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9841);
/* harmony import */ var _appcraft_services__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5686);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__, _common__WEBPACK_IMPORTED_MODULE_9__, _appcraft_services__WEBPACK_IMPORTED_MODULE_11__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__, _common__WEBPACK_IMPORTED_MODULE_9__, _appcraft_services__WEBPACK_IMPORTED_MODULE_11__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













function HierarchyEditorButton({ CommonButtonProps , IconProps , btnVariant ="icon" , mode , data , onCancel , onConfirm  }) {
    const { enqueueSnackbar  } = (0,notistack__WEBPACK_IMPORTED_MODULE_8__.useSnackbar)();
    const [at] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__/* .useFixedT */ .DA)("app");
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    const mutation = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_7__.useMutation)({
        mutationFn: mode === "add" ? _appcraft_services__WEBPACK_IMPORTED_MODULE_11__/* .addHierarchy */ .sQ : _appcraft_services__WEBPACK_IMPORTED_MODULE_11__/* .updateHierarchy */ .L6,
        onSuccess: (modified)=>{
            onConfirm?.(modified);
            setOpen(false);
            enqueueSnackbar(at(`txt-succeed-${mode}`), {
                variant: "success"
            });
        }
    });
    const handleSubmit = async (e)=>{
        const formdata = new FormData(e.target);
        e.preventDefault();
        mutation.mutate({
            ...data,
            name: formdata.get("name").toString(),
            description: formdata.get("description").toString()
        });
    };
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common__WEBPACK_IMPORTED_MODULE_9__/* .CommonButton */ .J, {
                ...{
                    ...CommonButtonProps,
                    IconProps,
                    btnVariant
                },
                text: at(`btn-${mode}-${data.type}`),
                onClick: ()=>setOpen(true),
                icon: mode === "update" ? (_mui_icons_material_EditOutlined__WEBPACK_IMPORTED_MODULE_4___default()) : data.type === "item" ? (_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_1___default()) : (_mui_icons_material_BookmarkAdd__WEBPACK_IMPORTED_MODULE_2___default())
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .FlexDialog */ .u0, {
                PaperProps: {
                    component: "form",
                    onSubmit: handleSubmit
                },
                fullWidth: true,
                direction: "column",
                maxWidth: "xs",
                title: at(`btn-${mode}-${data.type}`),
                open: open,
                action: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
                            color: "inherit",
                            onClick: ()=>{
                                setOpen(false);
                                onCancel?.();
                            },
                            children: at("btn-cancel")
                        }),
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
                            type: "submit",
                            color: "primary",
                            children: at("btn-confirm")
                        })
                    ]
                }),
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TextField__WEBPACK_IMPORTED_MODULE_5___default()), {
                        autoFocus: true,
                        required: true,
                        name: "name",
                        inputProps: {
                            maxLength: 50
                        },
                        label: at(`lbl-${data.type}-name`),
                        defaultValue: data.name
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TextField__WEBPACK_IMPORTED_MODULE_5___default()), {
                        multiline: true,
                        rows: 3,
                        maxRows: 3,
                        name: "description",
                        label: at("lbl-description"),
                        defaultValue: data.description
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6063:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* reexport safe */ _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8128);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_0__]);
_HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5509:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ HierarchyItem)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3646);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_icons_material_FolderRounded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8421);
/* harmony import */ var _mui_icons_material_FolderRounded__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_FolderRounded__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_ImageListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4298);
/* harmony import */ var _mui_material_ImageListItem__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ImageListItem__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_ImageListItemBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4312);
/* harmony import */ var _mui_material_ImageListItemBar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ImageListItemBar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1011);
/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8125);
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Menu__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6952);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1598);
/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _mui_icons_material_VisibilityOutlined__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3087);
/* harmony import */ var _mui_icons_material_VisibilityOutlined__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_VisibilityOutlined__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3142);
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(notistack__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5677);
/* harmony import */ var _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6063);
/* harmony import */ var _appcraft_services__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5686);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common__WEBPACK_IMPORTED_MODULE_14__, _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_15__, _appcraft_services__WEBPACK_IMPORTED_MODULE_16__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_17__]);
([_common__WEBPACK_IMPORTED_MODULE_14__, _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_15__, _appcraft_services__WEBPACK_IMPORTED_MODULE_16__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


















function HierarchyItem({ data , icon: MuiIcon , onClick , onDataModify  }) {
    const [at] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_17__/* .useFixedT */ .DA)("app");
    const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_13__.useState)(null);
    const { enqueueSnackbar  } = (0,notistack__WEBPACK_IMPORTED_MODULE_12__.useSnackbar)();
    const { type , name , description  } = data;
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_ImageListItem__WEBPACK_IMPORTED_MODULE_4___default()), {
        component: (_mui_material_Paper__WEBPACK_IMPORTED_MODULE_9___default()),
        elevation: 4,
        children: [
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                disableGutters: true,
                color: "info",
                onClick: ()=>onClick(data),
                sx: (theme)=>({
                        justifyContent: "center",
                        padding: theme.spacing(6, 0, 2, 0)
                    }),
                children: [
                    type === "item" ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MuiIcon, {
                        color: "info",
                        style: {
                            fontSize: 160
                        }
                    }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_FolderRounded__WEBPACK_IMPORTED_MODULE_2___default()), {
                        color: "warning",
                        style: {
                            fontSize: 160
                        }
                    }),
                    (description || type === "item") && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ImageListItemBar__WEBPACK_IMPORTED_MODULE_5___default()), {
                        subtitle: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_10___default()), {
                            variant: "body1",
                            color: "text.secondary",
                            whiteSpace: "pre-line",
                            children: description
                        }),
                        actionPosition: "right",
                        actionIcon: type === "item" && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common__WEBPACK_IMPORTED_MODULE_14__/* .CommonButton */ .J, {
                            btnVariant: "icon",
                            color: "default",
                            icon: (_mui_icons_material_VisibilityOutlined__WEBPACK_IMPORTED_MODULE_11___default()),
                            text: at("btn-preview"),
                            onClick: (e)=>{
                                e.stopPropagation();
                            }
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ImageListItemBar__WEBPACK_IMPORTED_MODULE_5___default()), {
                position: "top",
                title: name,
                actionPosition: "right",
                actionIcon: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_3___default()), {
                    size: "small",
                    onClick: (e)=>setAnchorEl(e.currentTarget),
                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_8___default()), {})
                })
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Menu__WEBPACK_IMPORTED_MODULE_7___default()), {
                anchorEl: anchorEl,
                open: Boolean(anchorEl),
                onClose: ()=>setAnchorEl(null),
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_15__/* .HierarchyEditorButton */ .g, {
                        btnVariant: "menu",
                        mode: "update",
                        data: data,
                        onCancel: ()=>setAnchorEl(null),
                        onConfirm: (modified)=>{
                            onDataModify("update", modified);
                            setAnchorEl(null);
                        }
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Divider__WEBPACK_IMPORTED_MODULE_1___default()), {}),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common__WEBPACK_IMPORTED_MODULE_14__/* .RemoveButton */ .x, {
                        btnVariant: "menu",
                        onCancel: ()=>setAnchorEl(null),
                        onConfirm: async ()=>{
                            await (0,_appcraft_services__WEBPACK_IMPORTED_MODULE_16__/* .removeHierarchy */ .pG)(data);
                            onDataModify("remove", data);
                            setAnchorEl(null);
                            enqueueSnackbar(at("txt-succeed-remove"), {
                                variant: "success"
                            });
                        }
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6577:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* reexport safe */ _HierarchyItem__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _HierarchyItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5509);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_HierarchyItem__WEBPACK_IMPORTED_MODULE_0__]);
_HierarchyItem__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9324:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SigninButton)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3819);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9580);
/* harmony import */ var _mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3646);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_icons_material_Google__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4492);
/* harmony import */ var _mui_icons_material_Google__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Google__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_icons_material_Login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7752);
/* harmony import */ var _mui_icons_material_Login__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Login__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5677);
/* harmony import */ var _appcraft_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9841);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common__WEBPACK_IMPORTED_MODULE_7__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_9__]);
([_common__WEBPACK_IMPORTED_MODULE_7__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function SigninButton({ oauth2  }) {
    const [at] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_9__/* .useFixedT */ .DA)("app");
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_common__WEBPACK_IMPORTED_MODULE_7__/* .CommonButton */ .J, {
                btnVariant: "icon",
                icon: (_mui_icons_material_Login__WEBPACK_IMPORTED_MODULE_5___default()),
                text: at("btn-signin"),
                onClick: ()=>setOpen(true)
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_appcraft_styles__WEBPACK_IMPORTED_MODULE_8__/* .FlexDialog */ .u0, {
                fullWidth: true,
                maxWidth: "xs",
                direction: "column",
                icon: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Login__WEBPACK_IMPORTED_MODULE_5___default()), {}),
                title: at("ttl-signin"),
                open: open,
                onClose: ()=>setOpen(false),
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_2___default()), {
                        fullWidth: true,
                        size: "large",
                        orientation: "vertical",
                        variant: "contained",
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: oauth2.google,
                            startIcon: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Google__WEBPACK_IMPORTED_MODULE_4___default()), {}),
                            children: "Google"
                        })
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Divider__WEBPACK_IMPORTED_MODULE_3___default()), {}),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_1___default()), {
                        fullWidth: true,
                        size: "large",
                        color: "inherit",
                        variant: "outlined",
                        onClick: (e)=>setOpen(false),
                        children: at("btn-cancel")
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5422:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* reexport safe */ _SigninButton__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _SigninButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9324);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_SigninButton__WEBPACK_IMPORTED_MODULE_0__]);
_SigninButton__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5610:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ useLazyAvatar)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2120);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7229);
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9648);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_3__]);
axios__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const useLazyAvatar = (idToken)=>(0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_4__.lazy)(async ()=>{
            if (idToken) {
                const { data  } = await axios__WEBPACK_IMPORTED_MODULE_3__["default"].get("/api/userinfo/profile");
                return {
                    default: ()=>/*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_2___default()), {
                            title: data.username,
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1___default()), {
                                alt: data.username,
                                src: data.picture
                            })
                        })
                };
            }
            return {
                default: (_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_1___default())
            };
        }), [
        idToken
    ]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2716:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ UserinfoMenuToggle)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3646);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1011);
/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8315);
/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9801);
/* harmony import */ var _mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8125);
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Menu__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_SettingsOutlined__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5649);
/* harmony import */ var _mui_icons_material_SettingsOutlined__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_SettingsOutlined__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(441);
/* harmony import */ var _mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _appcraft_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9841);
/* harmony import */ var _UserinfoMenuToggle_hooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5610);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_UserinfoMenuToggle_hooks__WEBPACK_IMPORTED_MODULE_11__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__]);
([_UserinfoMenuToggle_hooks__WEBPACK_IMPORTED_MODULE_11__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













function UserinfoMenuToggle({ menuTransform , signoutURL  }) {
    const [at] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__/* .useFixedT */ .DA)("app");
    const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(null);
    const { authorized , tokens  } = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__/* .useAuthTokens */ .Hq)();
    const LazyAvatar = (0,_UserinfoMenuToggle_hooks__WEBPACK_IMPORTED_MODULE_11__/* .useLazyAvatar */ .Q)(tokens.id);
    return !authorized ? null : /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_9__.Suspense, {
        fallback: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_8___default()), {
            variant: "circular",
            width: 40,
            height: 40
        }),
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_2___default()), {
                size: "small",
                onClick: (e)=>setAnchorEl(e.currentTarget),
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LazyAvatar, {})
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Menu__WEBPACK_IMPORTED_MODULE_6___default()), {
                anchorEl: anchorEl,
                elevation: 1,
                open: Boolean(anchorEl),
                onClick: ()=>setAnchorEl(null),
                style: {
                    transform: menuTransform
                },
                children: [
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_3___default()), {
                        dense: true,
                        disableGap: true,
                        href: "/settings",
                        component: _appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .Link */ .rU,
                        children: [
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .SizedListItemIcon */ .Dh, {
                                size: "small",
                                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_SettingsOutlined__WEBPACK_IMPORTED_MODULE_7___default()), {})
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_4___default()), {
                                primary: at("btn-settings")
                            })
                        ]
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Divider__WEBPACK_IMPORTED_MODULE_1___default()), {}),
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_3___default()), {
                        dense: true,
                        href: signoutURL,
                        children: [
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .SizedListItemIcon */ .Dh, {
                                size: "small",
                                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_5___default()), {})
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_4___default()), {
                                primary: at("btn-signout")
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2514:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* reexport safe */ _UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2716);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_0__]);
_UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6754:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "J": () => (/* reexport */ CommonButton)
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
// EXTERNAL MODULE: external "@mui/material/Button"
var Button_ = __webpack_require__(3819);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);
// EXTERNAL MODULE: external "@mui/material/IconButton"
var IconButton_ = __webpack_require__(7934);
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_);
// EXTERNAL MODULE: external "@mui/material/ListItemIcon"
var ListItemIcon_ = __webpack_require__(3787);
var ListItemIcon_default = /*#__PURE__*/__webpack_require__.n(ListItemIcon_);
// EXTERNAL MODULE: external "@mui/material/ListItemText"
var ListItemText_ = __webpack_require__(8315);
var ListItemText_default = /*#__PURE__*/__webpack_require__.n(ListItemText_);
// EXTERNAL MODULE: external "@mui/material/MenuItem"
var MenuItem_ = __webpack_require__(9271);
var MenuItem_default = /*#__PURE__*/__webpack_require__.n(MenuItem_);
// EXTERNAL MODULE: external "@mui/material/Tooltip"
var Tooltip_ = __webpack_require__(7229);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip_);
;// CONCATENATED MODULE: ./src/components/common/CommonButton/CommonButton.tsx







function CommonButton({ IconProps , btnVariant , text , icon: Icon , ...props }) {
    switch(btnVariant){
        case "text":
            return /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                ...props,
                startIcon: /*#__PURE__*/ jsx_runtime_.jsx(Icon, {
                    ...IconProps
                }),
                children: text
            });
        case "icon":
            {
                return /*#__PURE__*/ jsx_runtime_.jsx((Tooltip_default()), {
                    title: text,
                    children: /*#__PURE__*/ jsx_runtime_.jsx((IconButton_default()), {
                        ...props,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Icon, {
                            ...IconProps
                        })
                    })
                });
            }
        case "menu":
            {
                return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((MenuItem_default()), {
                    ...props,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((ListItemIcon_default()), {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Icon, {
                                ...IconProps
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((ListItemText_default()), {
                            primary: text
                        })
                    ]
                });
            }
        default:
            return null;
    }
}

;// CONCATENATED MODULE: ./src/components/common/CommonButton/index.ts



/***/ }),

/***/ 9497:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ RemoveButton)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3765);
/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3819);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_DeleteForeverOutlined__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
/* harmony import */ var _mui_icons_material_DeleteForeverOutlined__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_DeleteForeverOutlined__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8611);
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _CommonButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6754);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_appcraft_hooks__WEBPACK_IMPORTED_MODULE_7__]);
_appcraft_hooks__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








function RemoveButton({ icon , text , onCancel , onConfirm , ...props }) {
    const [at] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_7__/* .useFixedT */ .DA)("app");
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_CommonButton__WEBPACK_IMPORTED_MODULE_6__/* .CommonButton */ .J, {
                ...props,
                icon: icon || (_mui_icons_material_DeleteForeverOutlined__WEBPACK_IMPORTED_MODULE_3___default()),
                text: text || at("btn-remove"),
                onClick: ()=>setOpen(true)
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_4___default()), {
                fullWidth: true,
                maxWidth: "xs",
                open: open,
                onClose: ()=>{
                    setOpen(false);
                    onCancel?.();
                },
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Alert__WEBPACK_IMPORTED_MODULE_1___default()), {
                    variant: "filled",
                    severity: "warning",
                    action: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Button__WEBPACK_IMPORTED_MODULE_2___default()), {
                        color: "inherit",
                        size: "small",
                        variant: "text",
                        onClick: ()=>onConfirm().finally(()=>setOpen(false)),
                        children: at("btn-confirm")
                    }),
                    children: at("txt-remove-content")
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2953:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* reexport safe */ _RemoveButton__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _RemoveButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9497);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_RemoveButton__WEBPACK_IMPORTED_MODULE_0__]);
_RemoveButton__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5677:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* reexport safe */ _CommonButton__WEBPACK_IMPORTED_MODULE_0__.J),
/* harmony export */   "x": () => (/* reexport safe */ _RemoveButton__WEBPACK_IMPORTED_MODULE_1__.x)
/* harmony export */ });
/* harmony import */ var _CommonButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6754);
/* harmony import */ var _RemoveButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2953);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_RemoveButton__WEBPACK_IMPORTED_MODULE_1__]);
_RemoveButton__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4811:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$C": () => (/* reexport safe */ _HierarchyItem__WEBPACK_IMPORTED_MODULE_2__.$),
/* harmony export */   "eB": () => (/* reexport safe */ _CollapseKeyword__WEBPACK_IMPORTED_MODULE_0__.e),
/* harmony export */   "gA": () => (/* reexport safe */ _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_1__.g)
/* harmony export */ });
/* harmony import */ var _CollapseKeyword__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5548);
/* harmony import */ var _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6063);
/* harmony import */ var _HierarchyItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6577);
/* harmony import */ var _SigninButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5422);
/* harmony import */ var _UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2514);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_CollapseKeyword__WEBPACK_IMPORTED_MODULE_0__, _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_1__, _HierarchyItem__WEBPACK_IMPORTED_MODULE_2__, _SigninButton__WEBPACK_IMPORTED_MODULE_3__, _UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_4__]);
([_CollapseKeyword__WEBPACK_IMPORTED_MODULE_0__, _HierarchyEditorButton__WEBPACK_IMPORTED_MODULE_1__, _HierarchyItem__WEBPACK_IMPORTED_MODULE_2__, _SigninButton__WEBPACK_IMPORTED_MODULE_3__, _UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1733:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ AppHeader)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3882);
/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_icons_material_AutoAwesomeMosaic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(257);
/* harmony import */ var _mui_icons_material_AutoAwesomeMosaic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_AutoAwesomeMosaic__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2818);
/* harmony import */ var _mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3646);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _appcraft_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9841);
/* harmony import */ var _appcraft_components_SigninButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5422);
/* harmony import */ var _appcraft_components_UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2514);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_appcraft_components_SigninButton__WEBPACK_IMPORTED_MODULE_7__, _appcraft_components_UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_8__]);
([_appcraft_components_SigninButton__WEBPACK_IMPORTED_MODULE_7__, _appcraft_components_UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









function AppHeader({ authorized , oauth2 , signoutURL , onMenuToggle  }) {
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_1___default()), {
        position: "sticky",
        color: "default",
        elevation: 0,
        children: [
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_appcraft_styles__WEBPACK_IMPORTED_MODULE_6__/* .GapToolbar */ .M8, {
                variant: "regular",
                children: [
                    authorized && onMenuToggle && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default()), {
                        onClick: onMenuToggle,
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_ChevronRight__WEBPACK_IMPORTED_MODULE_3___default()), {})
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_styles__WEBPACK_IMPORTED_MODULE_6__/* .Link */ .rU, {
                        underline: "hover",
                        variant: "h5",
                        href: "/",
                        icon: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_AutoAwesomeMosaic__WEBPACK_IMPORTED_MODULE_2___default()), {}),
                        style: {
                            marginRight: "auto"
                        },
                        children: "Appcraft"
                    }),
                    authorized ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_components_UserinfoMenuToggle__WEBPACK_IMPORTED_MODULE_8__/* .UserinfoMenuToggle */ .m, {
                        signoutURL: signoutURL,
                        menuTransform: "translate(12px, 10px)"
                    }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_components_SigninButton__WEBPACK_IMPORTED_MODULE_7__/* .SigninButton */ .$, {
                        oauth2: oauth2
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Divider__WEBPACK_IMPORTED_MODULE_4___default()), {})
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5329:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* reexport safe */ _AppHeader__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _AppHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1733);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AppHeader__WEBPACK_IMPORTED_MODULE_0__]);
_AppHeader__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9380:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ HierarchyList)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Fade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5634);
/* harmony import */ var _mui_material_Fade__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Fade__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_icons_material_FilterList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3866);
/* harmony import */ var _mui_icons_material_FilterList__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_FilterList__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_ImageList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4287);
/* harmony import */ var _mui_material_ImageList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ImageList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1431);
/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9752);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _appcraft_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4811);
/* harmony import */ var _appcraft_components_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5677);
/* harmony import */ var _appcraft_services__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5686);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__, _appcraft_components__WEBPACK_IMPORTED_MODULE_8__, _appcraft_components_common__WEBPACK_IMPORTED_MODULE_9__, _appcraft_services__WEBPACK_IMPORTED_MODULE_10__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__]);
([_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__, _appcraft_components__WEBPACK_IMPORTED_MODULE_8__, _appcraft_components_common__WEBPACK_IMPORTED_MODULE_9__, _appcraft_services__WEBPACK_IMPORTED_MODULE_10__, _appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const DEFAULT_ACTION_NODE_SPLIT = (e)=>e;
function HierarchyList({ category , icon , onActionNodeSplit =DEFAULT_ACTION_NODE_SPLIT  }) {
    const { pathname , push , query  } = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const superiors = query.superiors?.split("-") || [];
    const width = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__/* .useWidth */ .z8)();
    const [at] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_11__/* .useFixedT */ .DA)("app");
    const [collapsed, setCollapsed] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(true);
    const [keyword, setKeyword] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)("");
    const { data: hierarchies , refetch  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.useQuery)({
        queryKey: [
            category,
            {
                keyword,
                superior: superiors[superiors.length - 1] || ""
            }
        ],
        queryFn: _appcraft_services__WEBPACK_IMPORTED_MODULE_10__/* .searchHierarchy */ .vW,
        refetchOnWindowFocus: false
    });
    const { data: action  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.useQuery)({
        suspense: false,
        queryKey: [
            collapsed,
            superiors[superiors.length - 1] || ""
        ],
        queryFn: ({ queryKey: [collapsed, superior]  })=>onActionNodeSplit({
                addGroup: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_components__WEBPACK_IMPORTED_MODULE_8__/* .HierarchyEditorButton */ .gA, {
                    IconProps: {
                        color: "warning",
                        fontSize: "large"
                    },
                    mode: "add",
                    data: {
                        category,
                        type: "group",
                        ...typeof superior === "string" && {
                            superior
                        }
                    },
                    onConfirm: ()=>refetch()
                }),
                addItem: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_components__WEBPACK_IMPORTED_MODULE_8__/* .HierarchyEditorButton */ .gA, {
                    IconProps: {
                        color: "info",
                        fontSize: "large"
                    },
                    mode: "add",
                    data: {
                        category,
                        type: "item",
                        ...typeof superior === "string" && {
                            superior
                        }
                    },
                    onConfirm: ()=>refetch()
                }),
                search: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Fade__WEBPACK_IMPORTED_MODULE_1___default()), {
                    in: collapsed,
                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_components_common__WEBPACK_IMPORTED_MODULE_9__/* .CommonButton */ .J, {
                            IconProps: {
                                fontSize: "large"
                            },
                            btnVariant: "icon",
                            icon: (_mui_icons_material_FilterList__WEBPACK_IMPORTED_MODULE_2___default()),
                            text: at("btn-filter"),
                            onClick: ()=>setCollapsed(false)
                        })
                    })
                })
            })
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            Object.keys(action || {}).length > 0 && /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4___default()), {
                disableGutters: true,
                variant: "dense",
                style: {
                    justifyContent: "flex-end"
                },
                children: [
                    action.search,
                    action.addGroup,
                    action.addItem
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_components__WEBPACK_IMPORTED_MODULE_8__/* .CollapseKeyword */ .eB, {
                in: !collapsed,
                defaultValue: keyword,
                onCollapse: ()=>setCollapsed(true),
                onConfirm: setKeyword
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ImageList__WEBPACK_IMPORTED_MODULE_3___default()), {
                gap: 24,
                cols: width === "xs" ? 1 : width === "sm" ? 2 : 3,
                children: hierarchies.map((data)=>/*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_components__WEBPACK_IMPORTED_MODULE_8__/* .HierarchyItem */ .$C, {
                        data: data,
                        icon: icon,
                        onClick: ({ type , _id: superior  })=>{
                            if (type === "group") {
                                push({
                                    pathname,
                                    query: {
                                        superiors: [
                                            ...superiors,
                                            superior
                                        ].join("-")
                                    }
                                });
                            }
                        },
                        onDataModify: ()=>refetch()
                    }, data._id))
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6742:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* reexport safe */ _HierarchyList__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _HierarchyList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9380);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_HierarchyList__WEBPACK_IMPORTED_MODULE_0__]);
_HierarchyList__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 546:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ MenuDrawer)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material_AutoAwesomeMosaic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(257);
/* harmony import */ var _mui_icons_material_AutoAwesomeMosaic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_AutoAwesomeMosaic__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_icons_material_ChevronLeft__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6959);
/* harmony import */ var _mui_icons_material_ChevronLeft__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ChevronLeft__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3646);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3843);
/* harmony import */ var _mui_material_Icon__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Icon__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4192);
/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_List__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1011);
/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8315);
/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_ListSubheader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9685);
/* harmony import */ var _mui_material_ListSubheader__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_ListSubheader__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _appcraft_styles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9841);
/* harmony import */ var _appcraft_assets_json_navs_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8632);
/* harmony import */ var _appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8686);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__]);
_appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];













function MenuDrawer({ open , onClose , ...props }) {
    const [nt] = (0,_appcraft_hooks__WEBPACK_IMPORTED_MODULE_12__/* .useFixedT */ .DA)("nav");
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .SizedDrawer */ .DK, {
        ...props,
        maxWidth: "xs",
        anchor: "left",
        open: open,
        onClose: onClose,
        children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_List__WEBPACK_IMPORTED_MODULE_6___default()), {
            subheader: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_ListSubheader__WEBPACK_IMPORTED_MODULE_9___default()), {
                component: _appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .GapToolbar */ .M8,
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .IconTypograph */ .C$, {
                        variant: "h5",
                        color: "primary",
                        icon: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_AutoAwesomeMosaic__WEBPACK_IMPORTED_MODULE_1___default()), {}),
                        style: {
                            marginRight: "auto"
                        },
                        children: "Appcraft"
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5___default()), {
                        onClick: (e)=>onClose(e, "escapeKeyDown"),
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_ChevronLeft__WEBPACK_IMPORTED_MODULE_2___default()), {})
                    })
                ]
            }),
            children: [
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Divider__WEBPACK_IMPORTED_MODULE_3___default()), {}),
                _appcraft_assets_json_navs_json__WEBPACK_IMPORTED_MODULE_11__.map(({ title , description , icon , url  })=>/*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_7___default()), {
                        disableGap: true,
                        href: url,
                        component: _appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .Link */ .rU,
                        onClick: (e)=>onClose(e, "escapeKeyDown"),
                        children: [
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_appcraft_styles__WEBPACK_IMPORTED_MODULE_10__/* .SizedListItemIcon */ .Dh, {
                                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Icon__WEBPACK_IMPORTED_MODULE_4___default()), {
                                    color: "info",
                                    fontSize: "large",
                                    baseClassName: "material-icons-outlined",
                                    children: icon
                                })
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_8___default()), {
                                primaryTypographyProps: {
                                    variant: "subtitle1",
                                    fontWeight: "bolder"
                                },
                                primary: nt(title),
                                secondary: nt(description)
                            })
                        ]
                    }, url))
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4088:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* reexport safe */ _MenuDrawer__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var _MenuDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(546);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_MenuDrawer__WEBPACK_IMPORTED_MODULE_0__]);
_MenuDrawer__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7305:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_g": () => (/* reexport safe */ _MenuDrawer__WEBPACK_IMPORTED_MODULE_2__._),
/* harmony export */   "s5": () => (/* reexport safe */ _HierarchyList__WEBPACK_IMPORTED_MODULE_1__.s),
/* harmony export */   "tf": () => (/* reexport safe */ _AppHeader__WEBPACK_IMPORTED_MODULE_0__.t)
/* harmony export */ });
/* harmony import */ var _AppHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5329);
/* harmony import */ var _HierarchyList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6742);
/* harmony import */ var _MenuDrawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4088);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AppHeader__WEBPACK_IMPORTED_MODULE_0__, _HierarchyList__WEBPACK_IMPORTED_MODULE_1__, _MenuDrawer__WEBPACK_IMPORTED_MODULE_2__]);
([_AppHeader__WEBPACK_IMPORTED_MODULE_0__, _HierarchyList__WEBPACK_IMPORTED_MODULE_1__, _MenuDrawer__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5145:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L6": () => (/* binding */ updateHierarchy),
/* harmony export */   "pG": () => (/* binding */ removeHierarchy),
/* harmony export */   "sQ": () => (/* binding */ addHierarchy),
/* harmony export */   "vW": () => (/* binding */ searchHierarchy)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const searchHierarchy = async ({ queryKey: [category, params]  })=>{
    const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`/api/data-forge/hierarchy/search/${category}`, params);
    return data;
};
const addHierarchy = async (hierarchy)=>{
    const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post("/api/data-forge/hierarchy/add", hierarchy);
    return data;
};
const updateHierarchy = async (hierarchy)=>{
    const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].put("/api/data-forge/hierarchy/update", hierarchy);
    return data;
};
const removeHierarchy = async (hierarchy)=>{
    await axios__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"](`/api/data-forge/hierarchy/remove?id=${hierarchy._id}`);
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 462:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L6": () => (/* reexport safe */ _hierarchy__WEBPACK_IMPORTED_MODULE_0__.L6),
/* harmony export */   "pG": () => (/* reexport safe */ _hierarchy__WEBPACK_IMPORTED_MODULE_0__.pG),
/* harmony export */   "sQ": () => (/* reexport safe */ _hierarchy__WEBPACK_IMPORTED_MODULE_0__.sQ),
/* harmony export */   "vW": () => (/* reexport safe */ _hierarchy__WEBPACK_IMPORTED_MODULE_0__.vW)
/* harmony export */ });
/* harmony import */ var _hierarchy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5145);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hierarchy__WEBPACK_IMPORTED_MODULE_0__]);
_hierarchy__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5686:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L6": () => (/* reexport safe */ _hierarchy__WEBPACK_IMPORTED_MODULE_0__.L6),
/* harmony export */   "pG": () => (/* reexport safe */ _hierarchy__WEBPACK_IMPORTED_MODULE_0__.pG),
/* harmony export */   "sQ": () => (/* reexport safe */ _hierarchy__WEBPACK_IMPORTED_MODULE_0__.sQ),
/* harmony export */   "vW": () => (/* reexport safe */ _hierarchy__WEBPACK_IMPORTED_MODULE_0__.vW)
/* harmony export */ });
/* harmony import */ var _hierarchy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(462);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hierarchy__WEBPACK_IMPORTED_MODULE_0__]);
_hierarchy__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8632:
/***/ ((module) => {

module.exports = JSON.parse('[{"title":"ttl-datasources","description":"dsc-datasources","icon":"storage","url":"/data-sources"},{"title":"ttl-themes","description":"dsc-themes","icon":"palette","url":"/themes"},{"title":"ttl-widgets","description":"dsc-widgets","icon":"extension","url":"/widgets"},{"title":"ttl-pages","description":"dsc-pages","icon":"dashboard","url":"/pages"},{"title":"ttl-websites","description":"dsc-websites","icon":"language","url":"/websites"}]');

/***/ })

};
;