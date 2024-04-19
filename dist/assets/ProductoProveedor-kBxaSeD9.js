import{c as re,g as ie,A as M,s as ae,a as N,u as te,m as ce}from"./index-eXxrUaeE.js";import{c as _,a as E,f as A,d as O,s as G}from"./yup-DbVgGITq.js";import{e as Z}from"./yup-locales-C3yB5wWh.js";import{j as e,r as b,a as ne}from"./react-C-yax-zd.js";import{C as v,u as se}from"./react-hook-form-Cc6cmx_T.js";import{S as D}from"./react-select-u2NJ9wTD.js";import{A as J}from"./AlertLoading-CGYU8vZk.js";import{M as y}from"./MyInputLabel-BamhhSIO.js";import{r as I}from"./ReactSelect-CWkwVJtW.js";import{S as T}from"./SimpleCard-Cf1MrNuW.js";import{e as $}from"./@tanstack-CH50zjZF.js";import{g as q,G as k}from"./graphql-request-rGYrdPjm.js";import{o as de}from"./@hookform-CI7dTiWF.js";import{n as K}from"./notification-CZdNX9HX.js";import{A as F}from"./AlertError-Drenn0X8.js";import{aJ as p,aK as C,h as le,a5 as ue,a6 as ge,a7 as pe,a8 as me,g as V,az as U,ao as he,ak as xe,aa as Pe,aZ as ve}from"./@mui-Cg5JgIJd.js";import{F as L}from"./FormTextField-DeIeSGMe.js";import{a as je}from"./alicuotas.api-CZZvmd9z.js";import{u as be}from"./useQueryActividadesPorDocumentoSector-CljpSRED.js";import{N as fe}from"./NumeroMask-BhIfq4lN.js";import{P as Se,a as Ce}from"./ProveedorRegistroDialog-Ce0LZXWf.js";re(10);const ao={codigoProducto:"",nombre:"",descripcion:"",descripcionHtml:"",codigoActividad:null,codigoProductoSin:null,precio:0,codigoUnidadMedida:null,tipoProducto:null,codigoProveedor:null,state:"",marcaIce:1,subPartidaArancelaria:""},to=r=>{var i,a,m,d,n,s;return{nombre:r.nombre,descripcion:r.descripcion,descripcionHtml:r.descripcionHtml,codigoActividad:(i=r.codigoActividad)==null?void 0:i.codigoActividad,codigoProductoSin:(a=r.codigoProductoSin)==null?void 0:a.codigoProducto,precio:r.precio,codigoUnidadMedida:parseInt(ie((m=r.codigoUnidadMedida)==null?void 0:m.codigoClasificador,0),10),tipoProductoId:(d=r.tipoProducto)==null?void 0:d._id,codigoProveedor:(n=r.codigoProveedor)==null?void 0:n.codigo,marcaIce:r.marcaIce,subPartidaArancelaria:(s=r.subPartidaArancelaria)==null?void 0:s.subPartidaArancelaria}},co=async r=>{G(Z);const i=_({codigoProducto:E().required("Debe ingresar el código del producto"),nombre:E().required("Debe ingresar el nombre del producto"),codigoActividad:A().required("Debe seleccionar la actividad económica"),codigoProductoSin:A().required("Debe seleccionar el producto sin"),precio:O().min(1).required("Debe ingresar el precio del producto"),codigoUnidadMedida:O().required("Debe seleccionar la unidad de medida"),tipoProducto:A().required("Debe seleccionar el tipo de producto"),marcaIce:O().required("Debe seleccionar la marca de ice"),subPartidaArancelaria:A().required("Debe seleccionar la sub partida arancelaria")});try{return await i.validate(r,{abortEarly:!1}),!0}catch(a){return console.log(a),!1}},no=_({codigoProducto:E().required("Debe ingresar el código del producto"),nombre:E().required("Debe ingresar el nombre del producto"),codigoActividad:A().required("Debe seleccionar la actividad económica"),codigoProductoSin:A().required("Debe seleccionar el producto sin"),precio:O().min(1).required("Debe ingresar el precio del producto"),codigoUnidadMedida:O().required("Debe seleccionar la unidad de medida"),tipoProducto:A().required("Debe seleccionar el tipo de producto"),marcaIce:O().required("Debe seleccionar la marca de ice"),subPartidaArancelaria:A().required("Debe seleccionar la sub partida arancelaria")}),Ae=q`
  query TIPOS_PRODUCTO {
    tiposProductos {
      _id
      descripcion
      codigoParent
      parientes
      state
      usucre
      createdAt
      usumod
      UpdatedAt
    }
  }
`,ye=async()=>{const r=new k("https://sandbox.isipass.net/api"),i=localStorage.getItem(M);return r.setHeader("authorization",`Bearer ${i}`),(await r.request(Ae)).tiposProductos||[]},X=(r=[])=>{const{data:i,isLoading:a,isError:m,error:d,refetch:n}=$({queryKey:["tiposProducto",...r],queryFn:async()=>{const s=await ye();return s.length>0?s:[]}});return{tiposProducto:i,tpLoading:a,tpIsError:m,tpError:d,tpRefetch:n}},De=q`
  mutation TIPO_PRODUCTO_REGISTRO($input: TipoProductoInput!) {
    tipoProductoRegistro(input: $input) {
      _id
      descripcion
      codigoParent
      parientes
      state
      usucre
      createdAt
      usumod
      UpdatedAt
    }
  }
`,Ie=async r=>{const i=new k("https://sandbox.isipass.net/api"),a=localStorage.getItem(M);return i.setHeader("authorization",`Bearer ${a}`),(await i.request(De,{input:r})).tipoProductoRegistro},Oe={codigoParent:null,descripcion:""};G(Z);const Q=_({codigoParent:E().nullable(),descripcion:E().required()}),Ee=r=>{const{form:i}=r,{control:a,getValues:m,setValue:d,formState:{errors:n}}=i,{tiposProducto:s,tpLoading:h,tpError:g,tpIsError:u}=X();return u?e.jsx(F,{mensaje:g.message}):e.jsx(e.Fragment,{children:e.jsx("form",{noValidate:!0,children:e.jsxs(p,{container:!0,spacing:2,children:[e.jsx(p,{item:!0,xs:12,md:12,lg:12,children:h?e.jsx(J,{}):e.jsx(v,{control:a,name:"codigoParent",render:({field:j})=>e.jsxs(C,{fullWidth:!0,children:[e.jsx(y,{shrink:!0,children:"Tipo Producto"}),e.jsx(D,{...j,menuPosition:"fixed",name:"codigoParent",placeholder:"Seleccione...",styles:I(!!n.codigoParent),value:s==null?void 0:s.find(l=>l._id===m("codigoParent")),onChange:l=>{j.onChange(l),d("codigoParent",(l==null?void 0:l._id)??null)},isSearchable:!1,options:s,isClearable:!0,getOptionValue:l=>l._id,getOptionLabel:l=>`${l.parientes}`})]})})}),e.jsx(p,{item:!0,xs:12,md:12,lg:12,children:e.jsx(v,{control:a,name:"descripcion",render:({field:j})=>{var l;return e.jsxs(C,{fullWidth:!0,children:[e.jsx(y,{shrink:!0,children:"Descripción"}),e.jsx(le,{...j,size:"small",fullWidth:!0,error:!!n.descripcion,helperText:(l=n.descripcion)==null?void 0:l.message})]})}})})]})})})},Re=r=>{const{onClose:i,open:a,...m}=r,d=se({defaultValues:{...Oe},resolver:de(Q)}),n=async h=>{const g=await Q.validate(h).catch(u=>u.errors);g.length>0?K(g.join("<br>")):await ae({preConfirm:async()=>{const u=await Ie(h).catch(j=>({error:j}));return u&&u.error?(N(u.error),!1):u}}).then(u=>{u.isConfirmed&&(K(),i(u.value)),u.isDenied&&N(u.value)})},s=(h,g)=>console.log(h,g);return b.useEffect(()=>{d.reset()},[a]),e.jsx(e.Fragment,{children:e.jsxs(ue,{sx:{"& .MuiDialog-paper":{width:"100%",maxHeight:500}},maxWidth:"sm",open:a,...m,children:[e.jsx(ge,{children:"Registrar nuevo clasificador de productos"}),e.jsx(pe,{dividers:!0,children:e.jsx(Ee,{form:d})}),e.jsxs(me,{children:[e.jsx(V,{autoFocus:!0,color:"error",size:"small",variant:"contained",onClick:()=>{i()},children:"Cancelar"}),e.jsx(V,{onClick:d.handleSubmit(n,s),style:{marginRight:25},size:"small",variant:"contained",children:"Registrar Clasificador"})]})]})})},so=r=>{const{form:{control:i,setValue:a,formState:{errors:m}}}=r,[d,n]=b.useState(null),[s,h]=b.useState(!1),{tiposProducto:g,tpRefetch:u,tpLoading:j}=X([s]);return e.jsx(T,{title:"Clasificador de Servicios",children:e.jsxs(p,{container:!0,spacing:1,children:[e.jsx(p,{item:!0,lg:12,md:12,xs:12,children:j?e.jsx(J,{}):e.jsx(v,{control:i,name:"tipoProducto",render:({field:l})=>e.jsxs(C,{fullWidth:!0,children:[e.jsx(y,{shrink:!0,children:"Tipo Sercicio"}),e.jsx(D,{...l,styles:I(!!d),menuPosition:"fixed",name:"tipoProducto",placeholder:"Seleccione...",value:l.value,onChange:x=>{l.onChange(x)},options:g,isClearable:!0,getOptionValue:x=>x._id,getOptionLabel:x=>`${x.parientes}`})]})})}),e.jsxs(p,{item:!0,lg:12,md:12,xs:12,textAlign:"right",children:[e.jsx(V,{variant:"outlined",onClick:()=>h(!0),size:"small",children:"Nuevo Clasificador"}),e.jsx(Re,{id:"tipoProductoDialogRegistro",keepMounted:!1,open:s,onClose:l=>{h(!1),l&&(a("tipoProducto",l),u().then())}})]})]})})};q`
  query PRODUCTO_SERVICIO {
    sinProductoServicio {
      codigoActividad
      codigoProducto
      descripcionProducto
    }
  }
`;const $e=q`
  query PRODUCTO_SERVICIO_POR_ACTIVIDAD($codigoActividad: String!) {
    sinProductoServicioPorActividad(codigoActividad: $codigoActividad) {
      codigoActividad
      codigoProducto
      descripcionProducto
    }
  }
`,qe=async r=>{const i=new k("https://sandbox.isipass.net/api"),a=localStorage.getItem(M);return i.setHeader("authorization",`Bearer ${a}`),(await i.request($e,{codigoActividad:r||""})).sinProductoServicioPorActividad},lo=r=>{const{form:{control:i,setValue:a,getValues:m,watch:d,formState:{errors:n,isSubmitting:s}}}=r,h=d("codigoActividad"),[g,u]=b.useState(""),j=o=>{const t=o.toUpperCase().replace(/[^A-Z0-9 ]/g,"").split(" ").map(oe=>oe.substring(0,5));let c;t.length>3?c=[...t.slice(0,5),...t.slice(-2)]:c=t;const P=c.join("");let R=Math.floor(Math.random()*100);R<10&&(R+=10);const ee=`${P}-${R}`.slice(0,Math.min(13,P.length+4));return o.length>0?ee:""};b.useEffect(()=>{const o=m("nombre"),c=m("codigoProducto")||j(o);u(c),a("codigoProducto",c)},[m,a,d("nombre")?d("nombre"):""]);const{user:l}=te(),{actividades:x,actIsError:W,actError:B,actLoading:f}=be(),{data:S,error:z}=$({queryKey:["productosServicios",h],queryFn:async()=>await qe(m("codigoActividad.codigoActividad")),refetchOnWindowFocus:!1,refetchInterval:!1});b.useEffect(()=>{if(!f&&x&&x.length>0){const o=x.find(t=>t.codigoActividad===l.actividadEconomica.codigoCaeb);o?a("codigoActividad",o):a("codigoActividad",null)}},[f,x]);const[Y,Ue]=b.useState(!1);b.useState("");const{data:H,refetch:Me}=$({queryKey:["alicuotaData",Y],queryFn:async()=>await je()});ne.useState("");const w=d("marcaIce");return b.useEffect(()=>{if(w===2){const o=H[0]||null;a("subPartidaArancelaria",o)}},[w,a]),e.jsx(e.Fragment,{children:e.jsx(T,{title:"HOMOLOGACIÓN",children:e.jsxs(p,{container:!0,spacing:3,children:[e.jsx(p,{item:!0,lg:12,md:12,xs:12,children:B?e.jsx(F,{mensaje:B.message}):e.jsx(v,{name:"codigoActividad",control:i,render:({field:o})=>e.jsxs(C,{fullWidth:!0,error:!!n.codigoActividad,children:[e.jsx(y,{shrink:!0,children:"Actividad Económica"}),e.jsx(D,{...o,styles:I(!!n.codigoActividad),name:"codigoActividad",placeholder:"Seleccione la actividad económica",menuPosition:"fixed",value:m("codigoActividad"),onChange:async t=>{o.onChange(t),a("codigoProductoSin",null)},onBlur:async t=>{o.onBlur()},isSearchable:!1,options:x,getOptionValue:t=>t.codigoActividad,getOptionLabel:t=>`${t.tipoActividad} - ${t.codigoActividad} - ${t.actividadEconomica}`})]})})}),e.jsx(p,{item:!0,lg:12,md:12,xs:12,children:z?e.jsx(F,{mensaje:z.message}):e.jsx(v,{name:"codigoProductoSin",control:i,render:({field:o})=>{var t;return e.jsxs(C,{fullWidth:!0,component:"div",error:!!n.codigoProductoSin,children:[e.jsx(y,{shrink:!0,children:"Servicio Homologado"}),e.jsx(D,{...o,styles:I(!!n.codigoProductoSin),menuPosition:"fixed",name:"codigoProductoSin",placeholder:"Seleccione Servicio para homologación",value:o.value||null,onChange:c=>{o.onChange(c)},options:S,getOptionValue:c=>c.codigoProducto,getOptionLabel:c=>`${c.codigoProducto} - ${c.descripcionProducto}`}),e.jsx(U,{children:(t=n.codigoProductoSin)==null?void 0:t.message})]})}})}),e.jsx(p,{item:!0,lg:12,md:12,xs:12,children:e.jsx(v,{control:i,name:"nombre",render:({field:o})=>{var t;return e.jsx(L,{name:"nombre",label:"Nombre Producto / Servicio",value:o.value,onChange:o.onChange,onBlur:()=>{const c=o.value,P=j(c);u(P),o.onBlur()},error:!!n.nombre,helperText:(t=n.nombre)==null?void 0:t.message})}})}),e.jsx(p,{item:!0,lg:12,md:12,xs:12,children:e.jsx(v,{name:"descripcion",control:i,render:({field:o})=>e.jsx(L,{name:"descripcion",label:"Descripcion",multiline:!0,minRows:3,maxRows:5,value:o.value,onChange:o.onChange,onBlur:o.onBlur})})}),e.jsx(p,{item:!0,lg:3,md:4,xs:12,sm:6,children:e.jsx(v,{control:i,name:"codigoProducto",render:({field:o})=>{var t;return e.jsx(L,{name:"codigoProducto",label:"Código Producto (SKU)",value:o.value,onChange:c=>{const P=c.target.value.toUpperCase();/^[A-Z0-9-]*$/.test(P)&&(o.onChange(P),u(P))},onBlur:c=>{const P=c.target.value;/^[A-Z0-9-]*$/.test(P)&&(o.value=P.toUpperCase(),o.onBlur(),u(P.toUpperCase()))},error:!!n.codigoProducto||o.value!==void 0&&!/^[A-Z0-9-]*$/.test(o.value),helperText:(t=n.codigoProducto)==null?void 0:t.message})}})}),e.jsx(p,{item:!0,lg:2,md:4,xs:12,children:e.jsx(v,{control:i,name:"marcaIce",render:({field:o})=>e.jsx(he,{control:e.jsx(xe,{checked:o.value===1,onChange:t=>{const P=t.target.checked?1:2;o.onChange(P)},color:"primary"}),label:"Marca ICE"})})}),w!==2&&e.jsx(p,{item:!0,lg:7,md:4,xs:12,children:e.jsx(v,{control:i,name:"subPartidaArancelaria",render:({field:o})=>{var t;return e.jsxs(C,{fullWidth:!0,error:!!n.subPartidaArancelaria,children:[e.jsx(y,{shrink:!0,children:"Sub Partida Arancelaria"}),e.jsx(D,{styles:I(!!n.subPartidaArancelaria),menuPosition:"fixed",name:"subPartidaArancelaria",placeholder:o.value?o.value:"Seleccione la sub partida arancelaria ",value:o.value,onChange:c=>{a("subPartidaArancelaria",c)},options:H,isClearable:!0,getOptionValue:c=>c.subPartidaArancelaria,getOptionLabel:c=>`${c.descripcion} - ${c.alicuotaPorcentual}% - ${c.alicuotaEspecifica} - ${c.subPartidaArancelaria}`}),e.jsx(U,{style:{color:"red"},children:(t=n.subPartidaArancelaria)==null?void 0:t.message})]})}})})]})})})},Be=q`
  query UNIDAD_MEDIDA {
    sinUnidadMedida {
      codigoClasificador
      descripcion
    }
  }
`,Ve=async()=>{const r=new k("https://sandbox.isipass.net/api"),i=localStorage.getItem(M);return r.setHeader("authorization",`Bearer ${i}`),(await r.request(Be)).sinUnidadMedida},uo=r=>{const{form:{control:i,setValue:a,watch:m,formState:{errors:d}}}=r;b.useState(null);const{data:n}=$({queryKey:["unidadesMedida"],queryFn:()=>Ve()});return e.jsx(T,{title:"PRECIO",children:e.jsxs(p,{container:!0,columnSpacing:3,rowSpacing:2,children:[e.jsx(p,{item:!0,lg:7,md:8,xs:12,children:e.jsx(v,{control:i,name:"codigoUnidadMedida",render:({field:s})=>{var h;return e.jsxs(C,{fullWidth:!0,sx:{mb:1},error:!!d.codigoUnidadMedida,children:[e.jsx(y,{shrink:!0,children:"Unidad Medida"}),e.jsx(D,{...s,styles:I(!!d.codigoUnidadMedida),menuPosition:"fixed",placeholder:"Seleccione la Unidad de Medida",value:s.value,onChange:async g=>{s.onChange(g),a("codigoUnidadMedida",g)},options:n,getOptionValue:g=>g.codigoClasificador.toString(),getOptionLabel:g=>`${g.codigoClasificador} - ${g.descripcion}`}),e.jsx(U,{children:(h=d.codigoUnidadMedida)==null?void 0:h.message})]})}})}),e.jsx(p,{item:!0,lg:4,md:4,xs:12,children:e.jsx(v,{control:i,name:"precio",render:({field:s})=>{var h,g;return e.jsxs(C,{fullWidth:!0,error:!!d.precio,children:[e.jsx(Pe,{children:"Precio"}),e.jsx(ve,{...s,label:"Precio",id:"precio",size:"small",value:s.value!==null?s.value.toString():"",onFocus:ce,onChange:s.onChange,onBlur:s.onBlur,inputComponent:fe,inputProps:{},error:!!((h=d.precio)!=null&&h.message)}),e.jsx(U,{children:((g=d.precio)==null?void 0:g.message)||""})]})}})})]})})},go=r=>{const{form:{control:i,setValue:a,reset:m,getValues:d,watch:n,formState:{errors:s,isSubmitted:h,isSubmitSuccessful:g}}}=r,[u,j]=b.useState(null),[l,x]=b.useState(!1),{data:W,refetch:B}=$({queryKey:["productoProveedores",l],queryFn:async()=>{const f={page:1,limit:1e3,reverse:!0},{docs:S}=await Ce(f);return S}});return e.jsx(T,{title:"Proveedor",children:e.jsxs(p,{container:!0,spacing:1,children:[e.jsx(p,{item:!0,lg:12,md:12,xs:12,children:e.jsx(v,{control:i,name:"codigoProveedor",render:({field:f})=>e.jsxs(C,{fullWidth:!0,children:[e.jsx(y,{shrink:!0,children:"Seleccione su proveedor"}),e.jsx(D,{...f,styles:I(!!u),menuPosition:"fixed",name:"codigoProveedor",placeholder:"Seleccione proveedor...",value:f.value,onChange:S=>{f.onChange(S)},options:W,isClearable:!0,getOptionValue:S=>S.codigo,getOptionLabel:S=>`${S.codigo} - ${S.nombre}`})]})})}),e.jsxs(p,{item:!0,lg:12,md:12,xs:12,textAlign:"right",children:[e.jsx(V,{variant:"outlined",onClick:()=>x(!0),size:"small",children:"Nuevo Proveedor"}),e.jsx(Se,{id:"proveedorRegistroDialog",keepMounted:!1,open:l,onClose:f=>{f&&(a("codigoProveedor",f),B().then()),x(!1)}})]})]})})};export{lo as P,uo as a,so as b,go as c,ao as d,to as e,no as f,co as p};
