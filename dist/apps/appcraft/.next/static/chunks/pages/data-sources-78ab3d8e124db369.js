(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[338],{3978:function(r,e,t){"use strict";var a=t(1600);e.Z=void 0;var o=a(t(8671)),n=t(2322),i=(0,o.default)((0,n.jsx)("path",{d:"M4 20h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2zm0-3h2v2H4v-2zM2 6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2zm4 1H4V5h2v2zm-2 7h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2zm0-3h2v2H4v-2z"}),"StorageRounded");e.Z=i},8162:function(r,e,t){"use strict";t.d(e,{Z:function(){return j}});var a=t(1461),o=t(7896),n=t(2784),i=t(6277),s=t(9075),l=t(8165),u=t(7591),d=t(7342),c=t(7746),f=t(5992),b=t(3853),m=t(9222),v=t(5672);function h(r){return(0,v.Z)("MuiLinearProgress",r)}(0,m.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var p=t(2322);let g=["className","color","value","valueBuffer","variant"],Z=r=>r,y,C,k,P,w,$,x=(0,l.F4)(y||(y=Z`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),_=(0,l.F4)(C||(C=Z`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),z=(0,l.F4)(k||(k=Z`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),S=r=>{let{classes:e,variant:t,color:a}=r,o={root:["root",`color${(0,d.Z)(a)}`,t],dashed:["dashed",`dashedColor${(0,d.Z)(a)}`],bar1:["bar",`barColor${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,d.Z)(a)}`,"buffer"===t&&`color${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,s.Z)(o,h,e)},B=(r,e)=>"inherit"===e?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:"light"===r.palette.mode?(0,u.$n)(r.palette[e].main,.62):(0,u._j)(r.palette[e].main,.5),N=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.root,e[`color${(0,d.Z)(t.color)}`],e[t.variant]]}})(({ownerState:r,theme:e})=>(0,o.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:B(e,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"})),I=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.dashed,e[`dashedColor${(0,d.Z)(t.color)}`]]}})(({ownerState:r,theme:e})=>{let t=B(e,r.color);return(0,o.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},(0,l.iv)(P||(P=Z`
    animation: ${0} 3s infinite linear;
  `),z)),M=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})(({ownerState:r,theme:e})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(w||(w=Z`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),x)),q=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})(({ownerState:r,theme:e})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:B(e,r.color),transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)($||($=Z`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),_)),L=n.forwardRef(function(r,e){let t=(0,b.Z)({props:r,name:"MuiLinearProgress"}),{className:n,color:s="primary",value:l,valueBuffer:u,variant:d="indeterminate"}=t,f=(0,a.Z)(t,g),m=(0,o.Z)({},t,{color:s,variant:d}),v=S(m),h=(0,c.Z)(),Z={},y={bar1:{},bar2:{}};if(("determinate"===d||"buffer"===d)&&void 0!==l){Z["aria-valuenow"]=Math.round(l),Z["aria-valuemin"]=0,Z["aria-valuemax"]=100;let C=l-100;"rtl"===h.direction&&(C=-C),y.bar1.transform=`translateX(${C}%)`}if("buffer"===d&&void 0!==u){let k=(u||0)-100;"rtl"===h.direction&&(k=-k),y.bar2.transform=`translateX(${k}%)`}return(0,p.jsxs)(N,(0,o.Z)({className:(0,i.Z)(v.root,n),ownerState:m,role:"progressbar"},Z,{ref:e},f,{children:["buffer"===d?(0,p.jsx)(I,{className:v.dashed,ownerState:m}):null,(0,p.jsx)(M,{className:v.bar1,ownerState:m,style:y.bar1}),"determinate"===d?null:(0,p.jsx)(q,{className:v.bar2,ownerState:m,style:y.bar2})]}))});var j=L},5489:function(r,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/data-sources",function(){return t(5951)}])},5951:function(r,e,t){"use strict";t.r(e),t.d(e,{default:function(){return d}});var a=t(2903),o=t(8162),n=t(3978),i=t(2784),s=t(6726),l=t(9390),u=t(3091);function d(){let[r]=(0,u.DA)("nav"),[e,t]=(0,i.useState)(null);return(0,a.tZ)(i.Suspense,{fallback:(0,a.tZ)(o.Z,{}),children:(0,a.tZ)(l._z,{ContentProps:{disableGutters:!0},maxWidth:"lg",title:r("ttl-datasources"),action:(0,a.BX)(a.HY,{children:[null==e?void 0:e.search,null==e?void 0:e.addGroup,null==e?void 0:e.addItem]}),children:(0,a.tZ)(s.s5,{category:"datasources",icon:n.Z,onActionNodeSplit:r=>{let{addGroup:e,addItem:a,search:o,...n}=r;return t({addGroup:e,addItem:a,search:o}),n}})})})}}},function(r){r.O(0,[774,888,179],function(){return r(r.s=5489)}),_N_E=r.O()}]);