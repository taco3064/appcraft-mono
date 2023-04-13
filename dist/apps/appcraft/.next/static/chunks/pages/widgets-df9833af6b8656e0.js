(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[360],{8322:function(r,e,t){"use strict";var a=t(1600);e.Z=void 0;var n=a(t(8671)),o=t(2322),i=(0,n.default)((0,o.jsx)("path",{d:"M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"}),"ExtensionRounded");e.Z=i},8162:function(r,e,t){"use strict";t.d(e,{Z:function(){return z}});var a=t(1461),n=t(7896),o=t(2784),i=t(6277),l=t(9075),s=t(8165),u=t(7591),d=t(7342),c=t(7746),f=t(5992),b=t(3853),m=t(9222),v=t(5672);function p(r){return(0,v.Z)("MuiLinearProgress",r)}(0,m.Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var h=t(2322);let g=["className","color","value","valueBuffer","variant"],Z=r=>r,y,C,w,k,P,x,$=(0,s.F4)(y||(y=Z`
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
`)),S=(0,s.F4)(w||(w=Z`
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
`)),B=r=>{let{classes:e,variant:t,color:a}=r,n={root:["root",`color${(0,d.Z)(a)}`,t],dashed:["dashed",`dashedColor${(0,d.Z)(a)}`],bar1:["bar",`barColor${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,d.Z)(a)}`,"buffer"===t&&`color${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,l.Z)(n,p,e)},N=(r,e)=>"inherit"===e?"currentColor":r.vars?r.vars.palette.LinearProgress[`${e}Bg`]:"light"===r.palette.mode?(0,u.$n)(r.palette[e].main,.62):(0,u._j)(r.palette[e].main,.5),I=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.root,e[`color${(0,d.Z)(t.color)}`],e[t.variant]]}})(({ownerState:r,theme:e})=>(0,n.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:N(e,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"})),M=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.dashed,e[`dashedColor${(0,d.Z)(t.color)}`]]}})(({ownerState:r,theme:e})=>{let t=N(e,r.color);return(0,n.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})},(0,s.iv)(k||(k=Z`
    animation: ${0} 3s infinite linear;
  `),S)),q=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})(({ownerState:r,theme:e})=>(0,n.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,s.iv)(P||(P=Z`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),$)),L=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})(({ownerState:r,theme:e})=>(0,n.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":(e.vars||e).palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:N(e,r.color),transition:"transform .4s linear"}),({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,s.iv)(x||(x=Z`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),_)),j=o.forwardRef(function(r,e){let t=(0,b.Z)({props:r,name:"MuiLinearProgress"}),{className:o,color:l="primary",value:s,valueBuffer:u,variant:d="indeterminate"}=t,f=(0,a.Z)(t,g),m=(0,n.Z)({},t,{color:l,variant:d}),v=B(m),p=(0,c.Z)(),Z={},y={bar1:{},bar2:{}};if(("determinate"===d||"buffer"===d)&&void 0!==s){Z["aria-valuenow"]=Math.round(s),Z["aria-valuemin"]=0,Z["aria-valuemax"]=100;let C=s-100;"rtl"===p.direction&&(C=-C),y.bar1.transform=`translateX(${C}%)`}if("buffer"===d&&void 0!==u){let w=(u||0)-100;"rtl"===p.direction&&(w=-w),y.bar2.transform=`translateX(${w}%)`}return(0,h.jsxs)(I,(0,n.Z)({className:(0,i.Z)(v.root,o),ownerState:m,role:"progressbar"},Z,{ref:e},f,{children:["buffer"===d?(0,h.jsx)(M,{className:v.dashed,ownerState:m}):null,(0,h.jsx)(q,{className:v.bar1,ownerState:m,style:y.bar1}),"determinate"===d?null:(0,h.jsx)(L,{className:v.bar2,ownerState:m,style:y.bar2})]}))});var z=j},9841:function(r,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/widgets",function(){return t(6583)}])},6583:function(r,e,t){"use strict";t.r(e),t.d(e,{default:function(){return d}});var a=t(2903),n=t(8322),o=t(8162),i=t(2784),l=t(6726),s=t(9390),u=t(3091);function d(){let[r]=(0,u.DA)("nav"),[e,t]=(0,i.useState)(null);return(0,a.tZ)(i.Suspense,{fallback:(0,a.tZ)(o.Z,{}),children:(0,a.tZ)(s._z,{ContentProps:{disableGutters:!0},maxWidth:"lg",title:r("ttl-widgets"),action:(0,a.BX)(a.HY,{children:[null==e?void 0:e.search,null==e?void 0:e.addGroup,null==e?void 0:e.addItem]}),children:(0,a.tZ)(l.s5,{category:"widgets",icon:n.Z,onActionNodeSplit:r=>{let{addGroup:e,addItem:a,search:n,...o}=r;return t({addGroup:e,addItem:a,search:n}),o}})})})}}},function(r){r.O(0,[774,888,179],function(){return r(r.s=9841)}),_N_E=r.O()}]);