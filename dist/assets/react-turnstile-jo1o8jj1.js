import{h as s}from"./@babel-BWOPM2cf.js";import{r as V}from"./react-C-yax-zd.js";var b={},W=s&&s.__createBinding||(Object.create?function(e,r,l,i){i===void 0&&(i=l);var u=Object.getOwnPropertyDescriptor(r,l);(!u||("get"in u?!r.__esModule:u.writable||u.configurable))&&(u={enumerable:!0,get:function(){return r[l]}}),Object.defineProperty(e,i,u)}:function(e,r,l,i){i===void 0&&(i=l),e[i]=r[l]}),X=s&&s.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),Y=s&&s.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(e!=null)for(var l in e)l!=="default"&&Object.prototype.hasOwnProperty.call(e,l)&&W(r,e,l);return X(r,e),r};Object.defineProperty(b,"__esModule",{value:!0});b.useTurnstile=void 0;const d=Y(V),v=typeof globalThis<"u"?globalThis:window;let c=typeof v.turnstile<"u"?"ready":"unloaded",F,L;const H=new Promise((e,r)=>{L={resolve:e,reject:r},c==="ready"&&e(void 0)});{const e="cf__reactTurnstileOnLoad",r="https://challenges.cloudflare.com/turnstile/v0/api.js";F=()=>{if(c==="unloaded"){c="loading",v[e]=()=>{L.resolve(),c="ready",delete v[e]};const l=`${r}?onload=${e}&render=explicit`,i=document.createElement("script");i.src=l,i.async=!0,i.addEventListener("error",()=>{L.reject("Failed to load Turnstile."),delete v[e]}),document.head.appendChild(i)}return H}}function Z({id:e,className:r,style:l,sitekey:i,action:u,cData:P,theme:M,language:N,tabIndex:R,responseField:B,responseFieldName:C,size:p,fixedSize:J,retry:D,retryInterval:U,refreshExpired:$,appearance:A,execution:G,userRef:w,onVerify:T,onLoad:O,onError:m,onExpire:h,onTimeout:j,onAfterInteractive:y,onBeforeInteractive:x,onUnsupported:E}){const K=(0,d.useRef)(null),t=(0,d.useState)({onVerify:T,onLoad:O,onError:m,onExpire:h,onTimeout:j,onAfterInteractive:y,onBeforeInteractive:x,onUnsupported:E})[0],_=w??K;return(0,d.useEffect)(()=>{if(!_.current)return;let q=!1,f="";return(async()=>{var g,S;if(c!=="ready")try{await F()}catch(n){(g=t.onError)===null||g===void 0||g.call(t,n);return}if(q||!_.current)return;let o;const Q={sitekey:i,action:u,cData:P,theme:M,language:N,tabindex:R,"response-field":B,"response-field-name":C,size:p,retry:D,"retry-interval":U,"refresh-expired":$,appearance:A,execution:G,callback:n=>{var a;return(a=t.onVerify)===null||a===void 0?void 0:a.call(t,n,o)},"error-callback":n=>{var a;return(a=t.onError)===null||a===void 0?void 0:a.call(t,n,o)},"expired-callback":n=>{var a;return(a=t.onExpire)===null||a===void 0?void 0:a.call(t,n,o)},"timeout-callback":()=>{var n;return(n=t.onTimeout)===null||n===void 0?void 0:n.call(t,o)},"after-interactive-callback":()=>{var n;return(n=t.onAfterInteractive)===null||n===void 0?void 0:n.call(t,o)},"before-interactive-callback":()=>{var n;return(n=t.onBeforeInteractive)===null||n===void 0?void 0:n.call(t,o)},"unsupported-callback":()=>{var n;return(n=t.onUnsupported)===null||n===void 0?void 0:n.call(t,o)}};f=window.turnstile.render(_.current,Q),o=I(f),(S=t.onLoad)===null||S===void 0||S.call(t,f,o)})(),()=>{q=!0,f&&window.turnstile.remove(f)}},[i,u,P,M,N,R,B,C,p,D,U,$,A,G]),(0,d.useEffect)(()=>{t.onVerify=T,t.onLoad=O,t.onError=m,t.onExpire=h,t.onTimeout=j,t.onAfterInteractive=y,t.onBeforeInteractive=x,t.onUnsupported=E},[T,O,m,h,j,y,x,E]),d.default.createElement("div",{ref:_,id:e,className:r,style:J?{...l??{},width:p==="compact"?"130px":"300px",height:p==="compact"?"120px":"65px"}:l})}var te=b.default=Z;function I(e){return{execute:r=>window.turnstile.execute(e,r),reset:()=>window.turnstile.reset(e),getResponse:()=>window.turnstile.getResponse(e),isExpired:()=>window.turnstile.isExpired(e)}}function k(){const[e,r]=(0,d.useState)(c);return(0,d.useEffect)(()=>{c!=="ready"&&H.then(()=>r(c))},[]),v.turnstile}b.useTurnstile=k;export{te as _};
