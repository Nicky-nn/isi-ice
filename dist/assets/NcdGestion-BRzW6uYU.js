import{r as a,j as e}from"./react-C-yax-zd.js";import{e as I}from"./@tanstack-CH50zjZF.js";import{M as w}from"./material-react-table-B3_JpHKP.js";import{L as q}from"./react-router-dom-BXf9Krd-.js";import{A as B}from"./AuditIconButton-Sfu7xKjf.js";import{S as M}from"./SimpleContainer-tFVAehGQ.js";import{n as f}from"./NumberInput-ChEcYOmf.js";import{S as R,a as c}from"./SimpleMenu-bKr1ysvp.js";import{S as G}from"./StackMenuActionTable-DYZWaJ7j.js";import{B as k}from"./Breadcrumb-BAVYU1BR.js";import{P as m,a as h}from"./index-CmjSjgDW.js";import{A as L,b as $,q as x,o as d}from"./index-eXxrUaeE.js";import{g as K,G as O}from"./graphql-request-rGYrdPjm.js";import{m as V}from"./materialReactTableUtils-RKRDldrD.js";import{M as U}from"./muiTableAdvancedOptionsProps-8HbDsjdr.js";import{P as W,k as Q,g as _,bt as H,aJ as C,ae as J,bj as X,bk as Y,bl as Z,bm as b,aN as ee,$ as oe}from"./@mui-Cg5JgIJd.js";import"./@babel-BWOPM2cf.js";import"./react-dom-BMaWjgIA.js";import"./scheduler-CzFDRTuY.js";import"./highlight-words-DHKmS53s.js";import"./react-router-m6rhPc7O.js";import"./@remix-run-DEp2-txB.js";import"./rc-input-number-DHeBSjOn.js";import"./@rc-component-BLzWySNC.js";import"./classnames-F3cnkUDL.js";import"./rc-input-CDxr26_S.js";import"./rc-util-RNQGGLoE.js";import"./react-is-DcfIKM1A.js";import"./react-toastify-Bq65RiZx.js";import"./clsx-B-dksMZM.js";import"./react-datepicker-D7PCQ8zk.js";import"./date-fns-9p2ure4y.js";import"./react-onclickoutside-vgQ6ifgl.js";import"./@floating-ui-BqRERJ-b.js";import"./perfect-scrollbar-BfaLzep3.js";import"./lodash-Dwhj6_6J.js";import"./jwt-decode-VWaDGczM.js";import"./sweetalert2-CxYvYGPM.js";import"./nanoid-CeQjyfxW.js";import"./@emotion-D9k8Qpvi.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./stylis-NkKAe6Bn.js";import"./react-transition-group-C1IEqfrK.js";import"./dom-helpers-D0mFdbeO.js";import"./prop-types-tGFuYKac.js";import"./@popperjs-BQBsAJpH.js";import"./graphql-BS3ZITc9.js";import"./cross-fetch-Ml2K_YIJ.js";const te=K`
  query NCD_LISTADO($limit: Int!, $reverse: Boolean, $page: Int!, $query: String) {
    notaCreditoDebitoAlqListado(
      limit: $limit
      reverse: $reverse
      page: $page
      query: $query
    ) {
      pageInfo {
        hasNextPage
        hasPrevPage
        limit
        page
        totalDocs
        totalPages
      }
      docs {
        nitEmisor
        razonSocialEmisor
        numeroNotaCreditoDebito
        numeroFactura
        cuf
        cufd {
          codigo
          codigoControl
        }
        cuis {
          codigo
        }
        sucursal {
          codigo
        }
        puntoVenta {
          codigo
        }
        fechaEmision

        cliente {
          razonSocial
          codigoCliente
          numeroDocumento
          tipoDocumentoIdentidad {
            codigoClasificador
            descripcion
          }
          complemento
        }
        numeroAutorizacionCuf
        fechaEmisionFactura
        montoTotalOriginal
        montoTotalDevuelto
        montoDescuentoCreditoDebito
        montoEfectivoCreditoDebito
        usuario
        detalle {
          nroItem
          nroItemFactura
          productoServicio {
            codigoActividad
            codigoProducto
            descripcionProducto
          }
          producto
          descripcion
          cantidad
          unidadMedida {
            descripcion
          }
          precioUnitario
        }
        codigoRecepcion
        motivoAnulacion {
          descripcion
        }
        representacionGrafica {
          pdf
          rollo
          xml
          sin
        }
        usucre
        createdAt
        updatedAt
        state
      }
    }
  }
`,S=async o=>{const r=new O("https://sandbox.isipass.net/api"),i=localStorage.getItem(L);return r.setHeader("authorization",`Bearer ${i}`),(await r.request(te,{...o})).notaCreditoDebitoAlqListado},ie=[{header:"Nro.",accessorKey:"numeroFactura",size:140},{accessorKey:"fechaEmisionFactura",header:"Fecha FCV",id:"fechaEmisionFactura",size:180},{accessorKey:"fechaEmision",header:"Fecha NCD",id:"fechaEmision",size:180},{header:"Número NCD",accessorKey:"numeroNotaCreditoDebito",size:140},{header:"Razon Social",id:"cliente.razonSocial",accessorKey:"cliente.razonSocial",maxSize:250,minSize:200},{id:"cliente.numeroDocumento",header:"Nro. Documento",accessorFn:o=>e.jsxs("span",{children:[o.cliente.numeroDocumento," ",o.cliente.complemento?`-${o.cliente.complemento}`:""]}),filterFn:(o,r,i)=>o.original.cliente.numeroDocumento.startsWith(i),size:155},{accessorKey:"cuf",id:"cuf",header:"C.U.F."},{accessorKey:"montoTotalOriginal",header:"Monto.Original",Cell:({cell:o})=>e.jsx("span",{children:f(o.getValue(),{})}),muiTableBodyCellProps:{align:"right"}},{accessorKey:"montoTotalDevuelto",header:"Monto.Devuelto",Cell:({cell:o})=>e.jsx("span",{children:f(o.getValue(),{})}),muiTableBodyCellProps:{align:"right"}},{accessorKey:"state",header:"Estado",accessorFn:o=>e.jsx(oe,{color:o.state===h.validada?"success":o.state===h.pendiente?"warning":"error",label:o.state,size:"small"}),filterVariant:"select",filterSelectOptions:V,filterFn:(o,r,i)=>o.original.state.toLowerCase().startsWith(i.toLowerCase())}],oo=()=>{a.useState(!1),a.useState(!1);const[o,r]=a.useState(0),[i,u]=a.useState([]),[l,y]=a.useState([]),[s,j]=a.useState({pageIndex:m.page,pageSize:m.limit}),[D,ae]=a.useState({}),[re,p]=a.useState(!1),A=async()=>{p(!0);try{await P()}catch(t){console.error("Error al recargar los datos:",t)}p(!1)},{data:F,isError:g,isLoading:v,refetch:P,isRefetching:E}=I({queryKey:["gestionNotas",i,s.pageIndex,s.pageSize,l],queryFn:async()=>{try{const t=$(i),n={...m,page:s.pageIndex+1,limit:s.pageSize,reverse:l.length<=0,query:t};if(await S(n)){const{pageInfo:z,docs:T}=await S(n);return r(z.totalDocs),T}else return[]}catch(t){throw console.log(t),t}}}),N=a.useMemo(()=>ie,[]);return e.jsx(e.Fragment,{children:e.jsxs(M,{children:[e.jsx("div",{className:"breadcrumb",children:e.jsx(k,{routeSegments:[{name:"Notas de crédito debito",path:x.gestion},{name:"Gestión de Notas"}]})}),e.jsx(W,{elevation:0,variant:"elevation",square:!0,sx:{mb:2,p:.5,bgcolor:"#FAFAFA"},className:"asideSidebarFixed",children:e.jsx(Q,{direction:{xs:"column",sm:"row"},style:{marginTop:2},spacing:{xs:1,sm:1,md:1,xl:1},justifyContent:"flex-end",children:e.jsx(_,{size:"small",startIcon:e.jsx(H,{}),variant:"contained",color:"success",component:q,to:x.nuevo,children:"Nueva Nota de Crédito Debito"})})}),e.jsx(C,{container:!0,spacing:2,children:e.jsx(C,{item:!0,lg:12,md:12,xs:12,children:e.jsx(w,{...U,columns:N,data:F??[],initialState:{showColumnFilters:!0,columnVisibility:{cuf:!1,fechaEmisionFactura:!1,fechaEmision:!1}},manualFiltering:!0,manualPagination:!0,manualSorting:!0,muiToolbarAlertBannerProps:g?{color:"error",children:"Error Cargando Datos"}:void 0,onColumnFiltersChange:u,onPaginationChange:j,onSortingChange:y,enableDensityToggle:!1,enableGlobalFilter:!1,rowCount:o,state:{isLoading:v,columnFilters:i,pagination:s,showAlertBanner:g,showProgressBars:E,sorting:l,density:"compact",columnPinning:{right:["actions"]},rowSelection:D},enableRowActions:!0,positionActionsColumn:"first",displayColumnDefOptions:{"mrt-row-actions":{header:"Acciones",size:110}},renderRowActions:({row:t})=>e.jsxs("div",{style:{display:"flex",flexWrap:"nowrap",gap:"0.5rem"},children:[e.jsxs(R,{menuButton:e.jsx(e.Fragment,{children:e.jsx(J,{"aria-label":"delete",children:e.jsx(X,{})})}),children:[e.jsxs(c,{onClick:n=>{n.preventDefault()},children:[e.jsx(Y,{})," Anular Documento"]}),e.jsxs(c,{onClick:()=>{d(t.original.representacionGrafica.pdf)},children:[e.jsx(Z,{})," Pdf Medio Oficio"]}),e.jsxs(c,{onClick:()=>{d(t.original.representacionGrafica.xml)},children:[e.jsx(b,{})," Xml"]}),e.jsxs(c,{onClick:()=>{d(t.original.representacionGrafica.sin)},children:[e.jsx(b,{})," Url S.I.N."]})]}),e.jsx(B,{row:t.original})]}),renderTopToolbarCustomActions:({table:t})=>e.jsx(G,{refetch:A,sx:{flexGrow:1},justifyContent:"flex-start"})})})}),e.jsx(ee,{py:"12px"})]})})};export{oo as default};
