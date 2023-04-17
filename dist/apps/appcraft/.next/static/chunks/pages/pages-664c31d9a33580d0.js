(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[158],{3285:function(r,e,t){"use strict";var a=t(1600);e.Z=void 0;var o=a(t(8671)),n=t(2322),i=(0,o.default)((0,n.jsx)("path",{d:"M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"}),"DashboardRounded");e.Z=i},8162:function(r,e,t){"use strict";t.d(e,{Z:function(){return j}});var a=t(1461),o=t(7896),n=t(2784),i=t(6277),l=t(9075),s=t(8165),u=t(7591),d=t(7342),c=t(7746),f=t(5992),b=t(3853),m=t(9222),v=t(5672);function p(r){return(0,v.Z)("MuiLinearProgress",r)}(0,m.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var h=t(2322);let g=["className","color","value","valueBuffer","variant"],Z=r=>r,y,C,k,P,w,$,x=(0,s.F4)(y||(y=Z`
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
`)),_=(0,s.F4)(C||(C=Z`
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
`)),B=(0,s.F4)(k||(k=Z`
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
`)),N=r=>{let{classes:e,variant:t,color:a}=r,o={root:["root",`color${(0,d.Z)(a)}`,t],dashed:["dashed",`dashedColor${(0,d.Z)(a)}`],bar1:["bar",`barColor${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,d.Z)(a)}`,"buffer"===t&&`color${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,l.Z)(o,p,e)},S=(r,e)=>"inherit"===e?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:"light"===r.palette.mode?(0,u.$n)(r.palette[e].main,.62):(0,u._j)(r.palette[e].main,.5),z=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.root,e[`color${(0,d.Z)(t.color)}`],e[t.variant]]}})(({ownerState:r,theme:e})=>(0,o.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:S(e,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"})),I=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.dashed,e[`dashedColor${(0,d.Z)(t.color)}`]]}})(({ownerState:r,theme:e})=>{let t=S(e,r.color);return(0,o.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},(0,s.iv)(P||(P=Z`
    animation: ${0} 3s infinite linear;
  `),B)),M=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})(({ownerState:r,theme:e})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,s.iv)(w||(w=Z`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),x)),q=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})(({ownerState:r,theme:e})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:S(e,r.color),transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,s.iv)($||($=Z`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),_)),L=n.forwardRef(function(r,e){let t=(0,b.Z)({props:r,name:"MuiLinearProgress"}),{className:n,color:l="primary",value:s,valueBuffer:u,variant:d="indeterminate"}=t,f=(0,a.Z)(t,g),m=(0,o.Z)({},t,{color:l,variant:d}),v=N(m),p=(0,c.Z)(),Z={},y={bar1:{},bar2:{}};if(("determinate"===d||"buffer"===d)&&void 0!==s){Z["aria-valuenow"]=Math.round(s),Z["aria-valuemin"]=0,Z["aria-valuemax"]=100;let C=s-100;"rtl"===p.direction&&(C=-C),y.bar1.transform=`translateX(${C}%)`}if("buffer"===d&&void 0!==u){let k=(u||0)-100;"rtl"===p.direction&&(k=-k),y.bar2.transform=`translateX(${k}%)`}return(0,h.jsxs)(z,(0,o.Z)({className:(0,i.Z)(v.root,n),ownerState:m,role:"progressbar"},Z,{ref:e},f,{children:["buffer"===d?(0,h.jsx)(I,{className:v.dashed,ownerState:m}):null,(0,h.jsx)(M,{className:v.bar1,ownerState:m,style:y.bar1}),"determinate"===d?null:(0,h.jsx)(q,{className:v.bar2,ownerState:m,style:y.bar2})]}))});var j=L},7165:function(r,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/pages",function(){return t(3115)}])},3115:function(r,e,t){"use strict";t.r(e),t.d(e,{default:function(){return d}});var a=t(2903),o=t(3285),n=t(8162),i=t(2784),l=t(1267),s=t(4798),u=t(3091);function d(){let[r]=(0,u.DA)("nav"),[e,t]=(0,i.useState)(null);return(0,a.tZ)(i.Suspense,{fallback:(0,a.tZ)(n.Z,{}),children:(0,a.tZ)(s._z,{ContentProps:{disableGutters:!0},maxWidth:"lg",title:r("ttl-pages"),action:(0,a.BX)(a.HY,{children:[null==e?void 0:e.search,null==e?void 0:e.addGroup,null==e?void 0:e.addItem]}),children:(0,a.tZ)(l.s5,{category:"pages",icon:o.Z,onActionNodeSplit:r=>{let{addGroup:e,addItem:a,search:o,...n}=r;return t({addGroup:e,addItem:a,search:o}),n}})})})}}},function(r){r.O(0,[774,888,179],function(){return r(r.s=7165)}),_N_E=r.O()}]);