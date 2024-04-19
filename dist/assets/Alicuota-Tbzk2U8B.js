import{j as e,r as u}from"./react-C-yax-zd.js";import{S as se}from"./SimpleContainer-tFVAehGQ.js";import{B as ne}from"./Breadcrumb-BAVYU1BR.js";import{A as q,M as ce,m as R,s as M,a as D,b as le,j as ue,p as de}from"./index-eXxrUaeE.js";import{e as pe}from"./@tanstack-CH50zjZF.js";import{M as me}from"./material-react-table-B3_JpHKP.js";import{A as he}from"./AuditIconButton-Sfu7xKjf.js";import{S as ge,a as xe}from"./SimpleMenu-bKr1ysvp.js";import{S as fe}from"./StackMenuActionTable-DYZWaJ7j.js";import{b as Ae,P as G}from"./index-CmjSjgDW.js";import{n as $}from"./notification-CZdNX9HX.js";import{b as Pe}from"./alicuotas.api-CZZvmd9z.js";import{g as k,G as N}from"./graphql-request-rGYrdPjm.js";import{a as be}from"./alicuota.api-CuQo2mvo.js";import{s as je,c as Ce,a as S}from"./yup-DbVgGITq.js";import{e as Se}from"./yup-locales-C3yB5wWh.js";import{C as v,u as V}from"./react-hook-form-Cc6cmx_T.js";import{N as ve}from"./NumeroMask-BhIfq4lN.js";import{aJ as x,aK as E,aa as z,aZ as B,az as I,h as Ee,ah as Ie,a5 as H,a6 as K,a7 as Q,a8 as _,g as A,P as we,k as ye,bp as Fe,B as U,ae as Re,bj as ze,bo as Be,b8 as Te,$ as qe,aN as Me}from"./@mui-Cg5JgIJd.js";import{o as Z}from"./@hookform-CI7dTiWF.js";import{M as De}from"./muiTableAdvancedOptionsProps-8HbDsjdr.js";import{a as $e}from"./react-router-m6rhPc7O.js";import"./@babel-BWOPM2cf.js";import"./react-router-dom-BXf9Krd-.js";import"./react-dom-BMaWjgIA.js";import"./scheduler-CzFDRTuY.js";import"./@remix-run-DEp2-txB.js";import"./rc-input-number-DHeBSjOn.js";import"./@rc-component-BLzWySNC.js";import"./classnames-F3cnkUDL.js";import"./rc-input-CDxr26_S.js";import"./rc-util-RNQGGLoE.js";import"./react-is-DcfIKM1A.js";import"./react-toastify-Bq65RiZx.js";import"./clsx-B-dksMZM.js";import"./react-datepicker-D7PCQ8zk.js";import"./date-fns-9p2ure4y.js";import"./react-onclickoutside-vgQ6ifgl.js";import"./@floating-ui-BqRERJ-b.js";import"./perfect-scrollbar-BfaLzep3.js";import"./lodash-Dwhj6_6J.js";import"./jwt-decode-VWaDGczM.js";import"./sweetalert2-CxYvYGPM.js";import"./nanoid-CeQjyfxW.js";import"./@emotion-D9k8Qpvi.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./stylis-NkKAe6Bn.js";import"./react-transition-group-C1IEqfrK.js";import"./dom-helpers-D0mFdbeO.js";import"./prop-types-tGFuYKac.js";import"./@popperjs-BQBsAJpH.js";import"./graphql-BS3ZITc9.js";import"./cross-fetch-Ml2K_YIJ.js";import"./highlight-words-DHKmS53s.js";import"./property-expr-DEi1ZLzV.js";import"./tiny-case-BJ7jYKNY.js";import"./toposort-CW3e93qZ.js";import"./imask-JlAOpWDu.js";import"./react-imask-BXhbtwMr.js";import"./materialReactTableUtils-RKRDldrD.js";const ke=k`
  mutation ALICUOTAS_ELIMINAR($subPartidaArancelaria: String!) {
    alicuotaIceEliminar(subPartidaArancelaria: $subPartidaArancelaria)
  }
`,Ne=async t=>{const l=new N("https://sandbox.isipass.net/api"),o=localStorage.getItem(q);return l.setHeader("authorization",`Bearer ${o}`),(await l.request(ke,{subPartidaArancelaria:t})).alicuotaIceEliminar},Le=k`
  mutation ALICUOTAS_ACTUALIZACION(
    $subPartidaArancelaria: String!
    $input: AlicuotaIceInput!
  ) {
    alicuotaIceActualizar(subPartidaArancelaria: $subPartidaArancelaria, input: $input) {
      subPartidaArancelaria
      descripcion
      alicuotaEspecifica
      alicuotaPorcentual
      usucre
      usumod
    }
  }
`,Oe=async(t,l)=>{try{const o=new N("https://sandbox.isipass.net/api"),d=localStorage.getItem(q);return o.setHeader("authorization",`Bearer ${d}`),(await o.request(Le,{subPartidaArancelaria:t,input:l})).proveedorActualizar}catch(o){throw new ce(o)}},T={subPartidaArancelaria:"",descripcion:"",alicuotaPorcentual:0,alicuotaEspecifica:0};je(Se);const J=Ce({subPartidaArancelaria:S().required("Subpartida arancelaria requerida"),descripcion:S().required("Descripción requerida"),alicuotaPorcentual:S().required("Alicuota porcentual requerida"),alicuotaEspecifica:S().required("Alicuota especifica requerida")}),X=({form:t,onSubmit:l})=>{const{register:o,handleSubmit:d,formState:{errors:a}}=t;return e.jsx("form",{onSubmit:d(l),noValidate:!0,children:e.jsxs(x,{container:!0,spacing:2,children:[e.jsx(x,{item:!0,xs:12,md:6,lg:6,children:e.jsx(v,{control:t.control,name:"subPartidaArancelaria",render:({field:r})=>{var s;return e.jsxs(E,{fullWidth:!0,error:!!a.subPartidaArancelaria,children:[e.jsx(z,{children:"Sub Partidad Arancelaria"}),e.jsx(B,{...r,label:"Sub Partida Arancelaria",size:"small",value:r.value,onFocus:R,onChange:r.onChange,onBlur:r.onBlur,error:!!a.subPartidaArancelaria}),e.jsx(I,{children:((s=a.subPartidaArancelaria)==null?void 0:s.message)||""})]})}})}),e.jsx(x,{item:!0,xs:12,md:6,lg:6,children:e.jsx(v,{control:t.control,name:"alicuotaEspecifica",render:({field:r})=>{var s;return e.jsxs(E,{fullWidth:!0,error:!!a.alicuotaEspecifica,children:[e.jsx(z,{children:"Alicuota Específica"}),e.jsx(B,{...r,label:"Alicuota Específica",size:"small",value:r.value.toString(),onFocus:R,onChange:r.onChange,onBlur:r.onBlur,inputComponent:ve,inputProps:{scale:5},error:!!a.alicuotaEspecifica}),e.jsx(I,{children:((s=a.alicuotaEspecifica)==null?void 0:s.message)||""})]})}})}),e.jsx(x,{item:!0,xs:12,md:5,lg:5,children:e.jsx(v,{control:t.control,name:"alicuotaPorcentual",render:({field:r})=>{var s;return e.jsxs(E,{fullWidth:!0,error:!!a.alicuotaPorcentual,children:[e.jsx(Ee,{name:"alicuotaPorcentual",label:"Alicuota Porcentual",size:"small",type:"number",fullWidth:!0,value:t.getValues("alicuotaPorcentual"),onChange:m=>{const i=m.target.value;(i===""||/^(100(\.\d{1,5})?|\d{0,2}(\.\d{0,5})?)$/.test(i)&&parseFloat(i)>=0&&parseFloat(i)<=100)&&t.setValue("alicuotaPorcentual",parseFloat(i))},InputProps:{endAdornment:e.jsx(Ie,{position:"end",children:"%"})}}),e.jsx(I,{children:((s=a.alicuotaPorcentual)==null?void 0:s.message)||""})]})}})}),e.jsx(x,{item:!0,xs:12,md:7,lg:7,children:e.jsx(v,{control:t.control,name:"descripcion",render:({field:r})=>{var s;return e.jsxs(E,{fullWidth:!0,error:!!a.descripcion,children:[e.jsx(z,{children:"Descripción"}),e.jsx(B,{...r,label:"Descripción",size:"small",value:r.value,onFocus:R,onChange:r.onChange,onBlur:r.onBlur,error:!!a.descripcion}),e.jsx(I,{children:((s=a.descripcion)==null?void 0:s.message)||""})]})}})})]})})},We=t=>{const{onClose:l,open:o,...d}=t,a=V({defaultValues:{...T,action:Ae.UPDATE},resolver:Z(J)}),r=async i=>{const{subPartidaArancelaria:n,alicuotaEspecifica:w,alicuotaPorcentual:y,...j}=i,g=parseFloat(i.alicuotaEspecifica.toString()),P=parseInt(i.alicuotaPorcentual.toString());await M({preConfirm:()=>Oe(n||"",{...j,alicuotaPorcentual:P,alicuotaEspecifica:g}).catch(p=>(D(p),!1)),text:"Confirma que desea actualizar Alicuota?"}).then(p=>{p.isConfirmed&&($(),l(p.value))})},s=(i,n)=>{console.error("Error:",i,n)},m=()=>{l()};return u.useEffect(()=>{o&&(async()=>{try{const n=await be(t.codigo);a.reset(n)}catch(n){console.log(n)}})()},[o]),e.jsxs(H,{sx:{"& .MuiDialog-paper":{width:"100%",maxHeight:500}},maxWidth:"sm",open:o,...d,children:[e.jsxs(K,{children:["Editar Alicuota ",t.codigo]}),e.jsx(Q,{dividers:!0,children:e.jsx(X,{form:a,onSubmit:r})}),e.jsxs(_,{children:[e.jsx(A,{autoFocus:!0,color:"error",size:"small",variant:"contained",onClick:m,children:"Cancelar"}),e.jsx(A,{onClick:a.handleSubmit(r,s),size:"small",style:{marginRight:25},variant:"contained",children:"Actualizar Proveedor"})]})]})},Ge=k`
  mutation ALICUOTA_REGISTRO($subPartidaArancelaria: String!, $input: AlicuotaIceInput!) {
    alicuotaIceRegistro(subPartidaArancelaria: $subPartidaArancelaria, input: $input) {
      subPartidaArancelaria
      descripcion
      alicuotaEspecifica
      alicuotaPorcentual
      state
      createdAt
      updatedAt
      usucre
      usumod
    }
  }
`,Ue=async(t,l)=>{const o=new N("https://sandbox.isipass.net/api"),d=localStorage.getItem(q);return o.setHeader("authorization",`Bearer ${d}`),(await o.request(Ge,{subPartidaArancelaria:t,input:l})).alicuotaIceRegistro},Ve=t=>{const{onClose:l,open:o,...d}=t,a=V({defaultValues:{...T},resolver:Z(J)}),r=async i=>{console.log(i);const{subPartidaArancelaria:n,alicuotaEspecifica:w,alicuotaPorcentual:y,...j}=i,g=parseFloat(i.alicuotaEspecifica.toString()),P=parseInt(i.alicuotaPorcentual.toString());await M({preConfirm:()=>Ue(n||"",{...j,alicuotaPorcentual:P,alicuotaEspecifica:g}).catch(p=>(D(p),!1)),text:"Confirma que desea Registrar Alicuota?"}).then(p=>{p.isConfirmed&&($(),l(p.value),a.reset())})},s=(i,n)=>console.log(i,n);u.useEffect(()=>{o&&a.reset({...T})},[o]);const m=()=>{l()};return e.jsxs(H,{sx:{"& .MuiDialog-paper":{width:"100%",maxHeight:500}},maxWidth:"sm",open:o,...d,children:[e.jsx(K,{children:"Registrar Nuevo Alicuota"}),e.jsx(Q,{dividers:!0,children:e.jsx(X,{form:a,onSubmit:r})}),e.jsxs(_,{children:[e.jsx(A,{autoFocus:!0,color:"error",size:"small",variant:"contained",onClick:m,children:"Cancelar"}),e.jsx(A,{onClick:a.handleSubmit(r,s),size:"small",style:{marginRight:25},variant:"contained",children:"Registrar Alicuota"})]})]})},He=[{accessorKey:"subPartidaArancelaria",header:"Sub Partida Arancelaria",size:210},{accessorKey:"descripcion",header:"Descripción"},{accessorKey:"alicuotaPorcentual",header:"Alicuota Porcentual"},{accessorKey:"alicuotaEspecifica",header:"Alicuota Específica"},{accessorFn:t=>e.jsx(qe,{size:"small",label:t.state,color:"success"}),id:"state",header:"Estado",accessorKey:"state"}],Ke=t=>{$e();const[l,o]=u.useState(null),[d,a]=u.useState(!1),[r,s]=u.useState(!1),[m,i]=u.useState([]),[n,w]=u.useState({pageIndex:G.page,pageSize:G.limit});u.useState(0);const[y,j]=u.useState(!1),[g,P]=u.useState([]);u.useState("");const[p,L]=u.useState({}),[Qe,O]=u.useState(!1),Y=async()=>{O(!0);try{await C()}catch(c){console.error("Error al recargar los datos:",c)}O(!1)},{data:f,isError:W,isLoading:ee,status:_e,refetch:C}=pe({queryKey:["alicuotasListado",m,n.pageIndex,n.pageSize,g],queryFn:async()=>{const c=le(m);return n.pageIndex+1,n.pageSize,g.length<=0,await Pe()},refetchOnWindowFocus:!1,refetchInterval:!1}),ae=u.useMemo(()=>He,[]),re=async c=>{const b=c.map(h=>h.original.subPartidaArancelaria).join(",");await M({text:"Confirma que desea eliminar los registros seleccionados, esta operación no se podra revertir",preConfirm:()=>Ne(b).catch(h=>(D(h),!1))}).then(h=>{h.isConfirmed&&($(),L({}),C())})},te=()=>{const{pageIndex:c,pageSize:b}=n,h=c*b,F=f==null?void 0:f.sort((oe,ie)=>ie.subPartidaArancelaria.localeCompare(oe.subPartidaArancelaria));return(F==null?void 0:F.slice(h,h+b))||[]};return e.jsxs(e.Fragment,{children:[e.jsx(we,{elevation:0,variant:"elevation",square:!0,sx:{mb:2,p:.5,bgcolor:"#FAFAFA"},className:"asideSidebarFixed",children:e.jsx(ye,{direction:{xs:"column",sm:"row"},style:{marginTop:2},spacing:{xs:1,sm:1,md:1,xl:1},justifyContent:"flex-end",children:e.jsxs(A,{size:"small",variant:"contained",onClick:()=>a(!0),startIcon:e.jsx(Fe,{}),color:"success",children:[" ","Nuevo Alicuota"]})})}),e.jsx(U,{sx:{mb:2,m:"1rem"},children:e.jsx(me,{...De,columns:ae,data:te(),initialState:{showColumnFilters:!1},manualFiltering:!0,manualPagination:!0,manualSorting:!0,muiToolbarAlertBannerProps:W?{color:"error",children:"Error loading data"}:void 0,onColumnFiltersChange:i,onPaginationChange:w,onSortingChange:P,enableDensityToggle:!1,enableGlobalFilter:!1,rowCount:(f==null?void 0:f.length)??0,state:{columnFilters:m,isLoading:ee,pagination:n,showAlertBanner:W,showProgressBars:y,density:"compact",sorting:g,rowSelection:p},muiSearchTextFieldProps:{variant:"outlined",placeholder:"Busqueda",InputLabelProps:{shrink:!0},size:"small"},enableRowActions:!0,positionActionsColumn:"first",renderRowActions:({row:c})=>e.jsxs("div",{style:{display:"flex",flexWrap:"nowrap",gap:"0.5rem",width:100},children:[e.jsx(ge,{menuButton:e.jsx(e.Fragment,{children:e.jsx(Re,{"aria-label":"delete",children:e.jsx(ze,{})})}),children:e.jsxs(xe,{onClick:()=>{o(c.original.subPartidaArancelaria),s(!0)},children:[e.jsx(Be,{})," Modificar"]})}),e.jsx(he,{row:c.original})]}),enableRowSelection:!0,onRowSelectionChange:L,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"},size:120}},renderTopToolbarCustomActions:({table:c})=>e.jsxs(U,{sx:{display:"flex",gap:"1rem",p:"0.5rem",flexWrap:"wrap"},children:[e.jsx(fe,{refetch:Y,sx:{flexGrow:1}}),e.jsx(A,{color:"error",onClick:()=>re(c.getSelectedRowModel().flatRows),startIcon:e.jsx(Te,{}),variant:"contained",size:"small",disabled:c.getSelectedRowModel().flatRows.length===0,sx:{height:"28px",top:"0.5rem"},children:"Eliminar"})]})})}),e.jsx(Ve,{id:"proveedorRegistroDialog",keepMounted:!1,open:d,onClose:c=>{c&&C().then(),a(!1)}}),e.jsx(We,{keepMounted:!1,open:r,codigo:l||"",onClose:c=>{c&&C().then(),o(null),s(!1)}})]})},rr=()=>(u.useContext(ue),e.jsx(e.Fragment,{children:e.jsxs(se,{children:[e.jsx("div",{className:"breadcrumb",children:e.jsx(ne,{routeSegments:[{name:"Servicios",path:de.gestion},{name:"Alicuota"}]})}),e.jsx(x,{container:!0,spacing:2,children:e.jsx(x,{item:!0,lg:12,md:12,xs:12,children:e.jsx(Ke,{})})}),e.jsx(Me,{py:"12px"})]})}));export{rr as default};
