import{g as T,G as I}from"./graphql-request-rGYrdPjm.js";import{A as v,M as z,g as f,n as R,c as M,s as w,a as D,i as P}from"./index-eXxrUaeE.js";import{j as e,r as q}from"./react-C-yax-zd.js";import{o as $}from"./@hookform-CI7dTiWF.js";import{C as p,u as A}from"./react-hook-form-Cc6cmx_T.js";import{a as L,n as F}from"./notification-CZdNX9HX.js";import{F as h}from"./FormTextField-DeIeSGMe.js";import{b as E}from"./index-CmjSjgDW.js";import{aJ as u,a0 as G,a1 as U,a5 as N,a6 as _,a7 as k,a8 as V,g as S,aK as O,az as H}from"./@mui-Cg5JgIJd.js";import{S as Q}from"./react-select-u2NJ9wTD.js";import{A as W}from"./AlertError-Drenn0X8.js";import{A as K}from"./AlertLoading-CGYU8vZk.js";import{M as J}from"./MyInputLabel-BamhhSIO.js";import{r as X}from"./ReactSelect-CWkwVJtW.js";import{e as Y}from"./@tanstack-CH50zjZF.js";import{s as Z,c as y,d as ee,a as x}from"./yup-DbVgGITq.js";import{e as oe}from"./yup-locales-C3yB5wWh.js";const ne=T`
  query CLIENTES_LISTADO($limit: Int!, $reverse: Boolean, $page: Int!, $query: String) {
    clientesAll(limit: $limit, reverse: $reverse, page: $page, query: $query) {
      pageInfo {
        hasNextPage
        hasPrevPage
        totalDocs
        limit
        page
        totalPages
      }
      docs {
        _id
        apellidos
        codigoCliente
        complemento
        email
        nombres
        numeroDocumento
        razonSocial
        codigoExcepcion
        tipoDocumentoIdentidad {
          codigoClasificador
          descripcion
        }
        state
        usucre
        createdAt
        usumod
        UpdatedAt
      }
    }
  }
`,Fe=async o=>{const n=new I("https://sandbox.isipass.net/api"),l=localStorage.getItem(v);return n.setHeader("authorization",`Bearer ${l}`),(await n.request(ne,{...o})).clientesAll},re=T`
  mutation CLIENTE_99001_REGISTRO($input: Cliente99001Input!) {
    cliente99001Create(input: $input) {
      _id
      razonSocial
      codigoCliente
      tipoDocumentoIdentidad {
        codigoClasificador
        descripcion
      }
      numeroDocumento
      complemento
      nombres
      apellidos
      email
    }
  }
`,ae=async o=>{try{const n=new I("https://sandbox.isipass.net/api"),l=localStorage.getItem(v);return n.setHeader("authorization",`Bearer ${l}`),(await n.request(re,{input:o})).cliente99001Create}catch(n){throw new z(n)}},te=o=>{const{form:n}=o,{control:l,getValues:i,formState:{errors:m}}=n;return e.jsx("form",{children:e.jsxs(u,{container:!0,spacing:3,children:[e.jsx(u,{item:!0,xs:12,children:e.jsxs(G,{severity:"info",children:[e.jsx(U,{children:"¿Que es un cliente 99001?"}),"Son Consulados, embajadas, organismos internacionales, patrimonios autónomos, personal diplomático y personas extranjeras sin residencia, excepto en el caso de exportación de servicios turísticos."]})}),e.jsx(u,{item:!0,lg:6,md:6,xs:12,children:e.jsx(p,{control:l,name:"codigoCliente",render:({field:t})=>{var r;return e.jsx(h,{name:"codigoCliente",label:"Codigo Cliente",value:t.value,onChange:t.onChange,onBlur:t.onBlur,error:!!m.codigoCliente,helperText:((r=m.codigoCliente)==null?void 0:r.message)||"Código aleatorio modificable",required:!0,disabled:i("action")===E.UPDATE})}})}),e.jsx(u,{item:!0,lg:12,md:12,xs:12,children:e.jsx(p,{control:l,name:"razonSocial",render:({field:t})=>{var r;return e.jsx(h,{name:"razonSocial",label:"Razón Social",value:t.value,onChange:t.onChange,onBlur:t.onBlur,error:!!m.razonSocial,helperText:(r=m.razonSocial)==null?void 0:r.message,required:!0})}})}),e.jsx(u,{item:!0,lg:12,md:12,xs:12,children:e.jsx(p,{control:l,name:"email",render:({field:t})=>{var r;return e.jsx(h,{name:"email",label:"Correo Electrónico",value:t.value,onChange:t.onChange,onBlur:t.onBlur,error:!!m.email,helperText:(r=m.email)==null?void 0:r.message,required:!0})}})})]})})},B={codigoCliente:"",razonSocial:"",email:"",action:E.REGISTER},ie={sinTipoDocumento:null,razonSocial:"",numeroDocumento:"",complemento:"",email:"",nombres:"",apellidos:"",telefono:"",action:E.REGISTER},se=o=>({apellidos:f(o.apellidos,""),codigoCliente:o.codigoCliente,email:o.email,nombres:f(o.nombres,""),razonSocial:o.razonSocial}),le=async o=>{try{return R("begin"),[]}catch(n){return[n.message]}};Z(oe);const ce=y({sinTipoDocumento:y({codigoClasificador:ee().integer().required()}).required().nullable(),razonSocial:x().required("Razon social es un campo requerido"),numeroDocumento:x().required("Número de documento es un campo obligatorio"),complemento:x(),email:x().email("Ingrese email válido").required("Email es requerido"),apellidos:x()}),me=y({razonSocial:x().required("Razon social es un campo requerido"),codigoCliente:x().required("Código Cliente es un campo obligatorio"),email:x().email("Ingrese email válido").required("Email es requerido")}),Ne=o=>{const{onClose:n,keepMounted:l,open:i,...m}=o,t=A({defaultValues:{...B},resolver:$(me)}),r=async g=>{const d=await le();if(d.length>0)L(d.join("<br>"));else{const C=se(g);await w({preConfirm:async()=>{const s=await ae(C).catch(a=>({error:a}));return s.error?(D(s.error),!1):s}}).then(s=>{s.isConfirmed&&(F(),n(s.value)),s.isDenied&&D(s.value)})}},j=(g,d)=>console.log(g,d);return q.useEffect(()=>{i&&t.reset({...B,codigoCliente:M(10).toUpperCase()})},[i]),e.jsx(e.Fragment,{children:e.jsxs(N,{sx:{"& .MuiDialog-paper":{width:"90%",maxHeight:600}},maxWidth:"sm",keepMounted:l,open:i,...m,children:[e.jsx(_,{children:"Registro Nuevo Cliente 99001"}),e.jsx(k,{dividers:!0,children:e.jsx(te,{form:t})}),e.jsxs(V,{children:[e.jsx(S,{autoFocus:!0,color:"error",variant:"contained",size:"small",onClick:()=>{n()},children:"Cancelar"}),e.jsx(S,{onClick:t.handleSubmit(r,j),style:{marginRight:15},size:"small",variant:"contained",children:"Registrar"})]})]})})},ue=T`
  mutation CLIENTE_REGISTRO($input: ClienteInput!) {
    clienteCreate(input: $input) {
      _id
      razonSocial
      codigoCliente
      tipoDocumentoIdentidad {
        codigoClasificador
        descripcion
      }
      numeroDocumento
      complemento
      nombres
      apellidos
      email
    }
  }
`,de=async o=>{try{const n=new I("https://sandbox.isipass.net/api"),l=localStorage.getItem(v);return n.setHeader("authorization",`Bearer ${l}`),(await n.request(ue,{input:o})).clienteCreate}catch(n){throw new z(n)}},ge=T`
  query TIPO_DOCUMENTO_IDENTIDAD {
    sinTipoDocumentoIdentidad {
      codigoClasificador
      descripcion
    }
  }
`,pe=async()=>{const o=new I("https://sandbox.isipass.net/api"),n=localStorage.getItem(v);return o.setHeader("authorization",`Bearer ${n}`),(await o.request(ge)).sinTipoDocumentoIdentidad},he=(o=[])=>{const{data:n,isLoading:l,isError:i,error:m,isSuccess:t}=Y({queryKey:["tipoDocumentoIdentidad",...o],queryFn:async()=>{const r=await pe();return r.length>0?r:[]}});return{tiposDocumentoIdentidad:n,tdiLoading:l,tdiIsError:i,tdiError:m,tdIsSuccess:t}},xe=o=>{const{form:n}=o,{watch:l,control:i,setValue:m,getValues:t,formState:{errors:r}}=n,{tiposDocumentoIdentidad:j,tdiLoading:g,tdiIsError:d,tdiError:C,tdIsSuccess:s}=he();return d?e.jsx(W,{mensaje:C==null?void 0:C.message}):(q.useEffect(()=>{s&&P(t("sinTipoDocumento.codigoClasificador"))&&m("sinTipoDocumento",j[0])},[s]),e.jsx("form",{children:e.jsxs(u,{container:!0,spacing:3,children:[e.jsx(u,{item:!0,lg:12,md:12,sm:12,xs:12,sx:{mt:2},children:g?e.jsx(K,{}):e.jsx(p,{render:({field:a})=>{var c;return e.jsxs(O,{fullWidth:!0,error:!!r.sinTipoDocumento,required:!0,children:[e.jsx(J,{shrink:!0,children:"Tipo Documento Identidad"}),e.jsx(Q,{menuPosition:"fixed",styles:X(!!r.sinTipoDocumento),name:"sinTipoDocumento",placeholder:"Seleccione el tipo documento identidad",value:a.value,onChange:a.onChange,onBlur:a.onBlur,isSearchable:!1,options:j,getOptionValue:b=>b.codigoClasificador.toString(),getOptionLabel:b=>`${b.descripcion}`,required:!0,isDisabled:t("action")===E.UPDATE}),e.jsx(H,{children:(c=r.sinTipoDocumento)==null?void 0:c.message})]})},name:"sinTipoDocumento",control:i})}),e.jsx(u,{item:!0,lg:12,md:12,xs:12,children:e.jsx(p,{control:i,name:"razonSocial",render:({field:a})=>{var c;return e.jsx(h,{name:"razonSocial",label:"Razón Social",value:a.value,onChange:a.onChange,onBlur:a.onBlur,error:!!r.razonSocial,helperText:(c=r.razonSocial)==null?void 0:c.message,required:!0})}})}),e.jsx(u,{item:!0,lg:7,md:7,xs:12,children:e.jsx(p,{control:i,name:"numeroDocumento",render:({field:a})=>{var c;return e.jsx(h,{name:"numeroDocumento",label:"Número Documento",value:a.value,onChange:a.onChange,onBlur:a.onBlur,error:!!r.numeroDocumento,helperText:(c=r.numeroDocumento)==null?void 0:c.message,required:!0})}})}),e.jsx(u,{item:!0,lg:5,md:5,xs:12,children:e.jsx(p,{control:i,name:"complemento",render:({field:a})=>{var c;return e.jsx(h,{name:"complemento",label:"Complemento",value:a.value,onChange:a.onChange,onBlur:a.onBlur,error:!!r.complemento,helperText:(c=r.complemento)==null?void 0:c.message})}})}),e.jsx(u,{item:!0,lg:7,md:7,xs:12,children:e.jsx(p,{control:i,name:"email",render:({field:a})=>{var c;return e.jsx(h,{name:"email",label:"Correo Electrónico",value:a.value,onChange:a.onChange,onBlur:a.onBlur,error:!!r.email,helperText:(c=r.email)==null?void 0:c.message,required:!0})}})}),e.jsx(u,{item:!0,lg:5,md:5,xs:12,children:e.jsx(p,{control:i,name:"telefono",render:({field:a})=>{var c;return e.jsx(h,{name:"telefono",label:"Teléfonos",value:a.value,onChange:a.onChange,onBlur:a.onBlur,error:!!r.telefono,helperText:(c=r.telefono)==null?void 0:c.message})}})})]})}))},Ce=o=>{var n;return{nombres:o.nombres,apellidos:f(o.apellidos,""),codigoTipoDocumentoIdentidad:(n=o.sinTipoDocumento)==null?void 0:n.codigoClasificador,numeroDocumento:o.numeroDocumento,complemento:f(o.complemento,null),email:o.email,razonSocial:o.razonSocial,telefono:f(o.telefono,null)}},je=async o=>{try{return R("BEGIN"),[]}catch(n){return[n.message]}},_e=o=>{const{onClose:n,keepMounted:l,open:i,...m}=o,t=A({defaultValues:{...ie},resolver:$(ce)}),r=async g=>{const d=await je();if(d.length>0)L(d.join("<br>"));else{const C=Ce(g);await w({preConfirm:async()=>{const s=await de(C).catch(a=>({error:a}));return s.error?(D(s.error),!1):s}}).then(s=>{s.isConfirmed&&(F(),n(s.value)),s.isDenied&&D(s.value)})}},j=(g,d)=>console.log(g,d);return q.useEffect(()=>{t.reset()},[i]),e.jsx(e.Fragment,{children:e.jsxs(N,{sx:{"& .MuiDialog-paper":{width:"80%",maxHeight:435}},maxWidth:"sm",keepMounted:l,open:i,...m,children:[e.jsx(_,{children:"Registro Nuevo Cliente"}),e.jsx(k,{dividers:!0,children:e.jsx(xe,{form:t})}),e.jsxs(V,{children:[e.jsx(S,{autoFocus:!0,color:"error",variant:"contained",size:"small",onClick:()=>{n()},children:"Cancelar"}),e.jsx(S,{onClick:t.handleSubmit(r,j),style:{marginRight:15},size:"small",variant:"contained",disabled:!t.formState.isValid,children:"Registrar"})]})]})})};export{_e as C,Ne as a,B as b,me as c,te as d,le as e,Fe as f,ie as g,ce as h,xe as i,je as j};
