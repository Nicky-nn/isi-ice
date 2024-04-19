import{g as f,G as j}from"./graphql-request-rGYrdPjm.js";import{A as b,c as q,s as C,a as x}from"./index-eXxrUaeE.js";import{j as e,r as E}from"./react-C-yax-zd.js";import{o as P}from"./@hookform-CI7dTiWF.js";import{C as d,u as y}from"./react-hook-form-Cc6cmx_T.js";import{a as $,n as T}from"./notification-CZdNX9HX.js";import{s as D,c as I,a as l}from"./yup-DbVgGITq.js";import{e as z}from"./yup-locales-C3yB5wWh.js";import{aJ as c,h as m,a5 as w,a6 as A,a7 as W,a8 as O,g as h}from"./@mui-Cg5JgIJd.js";const V=f`
  query PROVEEDORES($limit: Int!, $reverse: Boolean, $page: Int!, $query: String) {
    proveedores(limit: $limit, reverse: $reverse, page: $page, query: $query) {
      pageInfo {
        hasNextPage
        hasPrevPage
        totalDocs
        limit
        page
        totalPages
      }
      docs {
        codigo
        nombre
        direccion
        ciudad
        contacto
        correo
        telefono
        state
        createdAt
        updatedAt
        usucre
        usumod
      }
    }
  }
`,Z=async s=>{const i=new j("https://sandbox.isipass.net/api"),a=localStorage.getItem(b);return i.setHeader("authorization",`Bearer ${a}`),(await i.request(V,{...s})).proveedores},N=f`
  mutation PROVEEDOR_REGISTRO($input: ProveedorInput!) {
    proveedorRegistro(input: $input) {
      codigo
      nombre
      direccion
      ciudad
      contacto
      correo
      telefono
      state
      createdAt
      updatedAt
      usucre
      usumod
    }
  }
`,k=async s=>{const i=new j("https://sandbox.isipass.net/api"),a=localStorage.getItem(b);return i.setHeader("authorization",`Bearer ${a}`),(await i.request(N,{input:s})).proveedorRegistro},p={codigo:"",nombre:"",direccion:"",ciudad:"",contacto:"",correo:"",telefono:"",action:"REGISTER"},F=s=>({codigo:s.codigo,ciudad:s.ciudad,contacto:s.contacto,correo:s.correo,direccion:s.direccion,nombre:s.nombre,telefono:s.telefono}),G=async s=>{try{return[]}catch(i){return[i.message]}};D(z);const B=I({codigo:l().required("Código es requerido"),nombre:l().required("Nombre Proveedor es requerido"),direccion:l().required("Dirección es requerido"),ciudad:l().required("Ciudad / Ubicación es requerido"),contacto:l().required("Nombre de contacto es requerido"),correo:l().email("Ingrese Correo válido").required("Correo es requerido"),telefono:l()}),L=s=>{const{form:i}=s,{control:a,formState:{errors:r}}=i;return e.jsx(e.Fragment,{children:e.jsx("form",{children:e.jsxs(c,{container:!0,spacing:2,children:[e.jsx(c,{item:!0,xs:12,md:4,lg:4,children:e.jsx(d,{name:"codigo",control:a,render:({field:t})=>{var o;return e.jsx(m,{...t,label:"Código",size:"small",fullWidth:!0,error:!!r.codigo,helperText:r.codigo&&((o=r.codigo.message)==null?void 0:o.toString())})}})}),e.jsx(c,{item:!0,xs:12,md:8,lg:8,children:e.jsx(d,{name:"nombre",control:a,render:({field:t})=>{var o;return e.jsx(m,{...t,label:"Nombre Proveedor",size:"small",fullWidth:!0,error:!!r.nombre,helperText:r.nombre&&((o=r.nombre.message)==null?void 0:o.toString())})}})}),e.jsx(c,{item:!0,xs:12,md:12,lg:12,children:e.jsx(d,{name:"ciudad",control:a,render:({field:t})=>{var o;return e.jsx(m,{...t,label:"Ciudad / Ubicación",size:"small",fullWidth:!0,error:!!r.ciudad,helperText:r.ciudad&&((o=r.ciudad.message)==null?void 0:o.toString())})}})}),e.jsx(c,{item:!0,xs:12,md:12,lg:12,children:e.jsx(d,{name:"direccion",control:a,render:({field:t})=>{var o;return e.jsx(m,{...t,label:"Dirección",size:"small",fullWidth:!0,error:!!r.direccion,helperText:r.direccion&&((o=r.direccion.message)==null?void 0:o.toString())})}})}),e.jsx(c,{item:!0,xs:12,md:12,lg:12,children:e.jsx(d,{name:"contacto",control:a,render:({field:t})=>{var o;return e.jsx(m,{...t,label:"Nombre del contacto",size:"small",fullWidth:!0,error:!!r.contacto,helperText:r.contacto&&((o=r.contacto.message)==null?void 0:o.toString())})}})}),e.jsx(c,{item:!0,xs:12,md:6,lg:6,children:e.jsx(d,{name:"correo",control:a,render:({field:t})=>{var o;return e.jsx(m,{...t,label:"Correo Electrónico",size:"small",fullWidth:!0,error:!!r.correo,helperText:r.correo&&((o=r.correo.message)==null?void 0:o.toString())})}})}),e.jsx(c,{item:!0,xs:12,md:6,lg:6,children:e.jsx(d,{name:"telefono",control:a,render:({field:t})=>{var o;return e.jsx(m,{...t,label:"Teléfono",size:"small",fullWidth:!0,error:!!r.telefono,helperText:r.telefono&&((o=r.telefono.message)==null?void 0:o.toString())})}})})]})})})},ee=s=>{const{onClose:i,open:a,...r}=s,t=y({defaultValues:{...p},resolver:P(B)}),o=async g=>{const u=await G();if(u.length>0)$(u.join("<br>"));else{const S=F(g);await C({preConfirm:async()=>{try{const n=await k(S).catch(R=>({error:R}));return n.error?(x(n.error),!1):n}catch(n){return x(n),!1}}}).then(n=>{n&&n.isConfirmed?(T(),i(n.value)):n&&n.isDenied&&x(n.value)})}},v=(g,u)=>console.log(g,u);return E.useEffect(()=>{a&&t.reset({...p,codigo:q().toUpperCase()})},[a]),e.jsxs(w,{sx:{"& .MuiDialog-paper":{width:"100%",maxHeight:500}},maxWidth:"sm",open:a,...r,children:[e.jsx(A,{children:"Registrar nuevo Proveedor"}),e.jsx(W,{dividers:!0,children:e.jsx(L,{form:t})}),e.jsxs(O,{children:[e.jsx(h,{autoFocus:!0,color:"error",size:"small",variant:"contained",onClick:()=>i(),children:"Cancelar"}),e.jsx(h,{onClick:t.handleSubmit(o,v),size:"small",style:{marginRight:25},variant:"contained",disabled:t.formState.isSubmitting,children:"Registrar Proveedor"})]})]})};export{ee as P,Z as a,p as b,L as c,G as d,B as p};
