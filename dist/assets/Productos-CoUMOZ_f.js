import{j as e,r as t}from"./react-C-yax-zd.js";import{L as E}from"./react-router-dom-BXf9Krd-.js";import{S as $}from"./SimpleContainer-tFVAehGQ.js";import{B as q}from"./Breadcrumb-BAVYU1BR.js";import{A as f,p as z,b as D,g as d,s as L,a as k,j as O}from"./index-eXxrUaeE.js";import{e as N}from"./@tanstack-CH50zjZF.js";import{M as G}from"./material-react-table-B3_JpHKP.js";import{B as K}from"./react-toastify-Bq65RiZx.js";import{n as _}from"./NumberInput-ChEcYOmf.js";import{P as m}from"./index-CmjSjgDW.js";import{n as H}from"./notification-CZdNX9HX.js";import{g as P,G as b}from"./graphql-request-rGYrdPjm.js";import{M as U}from"./muiTableAdvancedOptionsProps-8HbDsjdr.js";import{A as Q}from"./AuditIconButton-Sfu7xKjf.js";import{S as W,a as J}from"./SimpleMenu-bKr1ysvp.js";import{a as S}from"./react-router-m6rhPc7O.js";import{ae as V,bj as X,bo as Y,B as Z,g as C,b8 as ee,$ as oe,P as re,k as te,bp as ie,aJ as x,aN as ae}from"./@mui-Cg5JgIJd.js";import"./@babel-BWOPM2cf.js";import"./react-dom-BMaWjgIA.js";import"./scheduler-CzFDRTuY.js";import"./@remix-run-DEp2-txB.js";import"./rc-input-number-DHeBSjOn.js";import"./@rc-component-BLzWySNC.js";import"./classnames-F3cnkUDL.js";import"./rc-input-CDxr26_S.js";import"./rc-util-RNQGGLoE.js";import"./react-is-DcfIKM1A.js";import"./react-datepicker-D7PCQ8zk.js";import"./clsx-B-dksMZM.js";import"./date-fns-9p2ure4y.js";import"./react-onclickoutside-vgQ6ifgl.js";import"./@floating-ui-BqRERJ-b.js";import"./perfect-scrollbar-BfaLzep3.js";import"./lodash-Dwhj6_6J.js";import"./jwt-decode-VWaDGczM.js";import"./sweetalert2-CxYvYGPM.js";import"./nanoid-CeQjyfxW.js";import"./@emotion-D9k8Qpvi.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./stylis-NkKAe6Bn.js";import"./react-transition-group-C1IEqfrK.js";import"./dom-helpers-D0mFdbeO.js";import"./prop-types-tGFuYKac.js";import"./@popperjs-BQBsAJpH.js";import"./graphql-BS3ZITc9.js";import"./cross-fetch-Ml2K_YIJ.js";import"./highlight-words-DHKmS53s.js";import"./materialReactTableUtils-RKRDldrD.js";const se=P`
  query ICE_PRODUCTO_LISTADO(
    $limit: Int!
    $reverse: Boolean
    $page: Int!
    $query: String
  ) {
    iceProductoListado(limit: $limit, reverse: $reverse, page: $page, query: $query) {
      pageInfo {
        hasNextPage
        hasPrevPage
        limit
        page
        totalDocs
      }
      docs {
        codigoProducto
        state
        nombre
        descripcion
        actividadEconomica {
          codigoCaeb
          descripcion
          tipoActividad
        }
        descripcionHtml
        tipoProducto {
          _id
          descripcion
          codigoParent
        }
        imagen {
          altText
          url
        }
        proveedor {
          codigo
          nombre
          correo
        }
        sinProductoServicio {
          codigoActividad
          codigoProducto
          descripcionProducto
        }
        precio
        precioComparacion
        costo
        unidadMedida {
          codigoClasificador
          descripcion
        }
        marcaIce
        subPartidaArancelaria
        alicuotaDescripcion
        alicuotaEspecifica
        alicuotaPorcentual
        state
        usucre
        createdAt
        usumod
        updatedAt
      }
    }
  }
`,ne=async o=>{const r=new b("https://sandbox.isipass.net/api"),a=localStorage.getItem(f);return r.setHeader("authorization",`Bearer ${a}`),(await r.request(se,{...o})).iceProductoListado},ce=P`
  mutation expoProductoListado_PRODUCTOS_ELIMINAR($codigoProducto: String!) {
    iceProductoEliminar(codigoProducto: $codigoProducto)
  }
`,de=async o=>{const r=new b("https://sandbox.isipass.net/api"),a=localStorage.getItem(f);return r.setHeader("authorization",`Bearer ${a}`),(await r.request(ce,{codigoProducto:o})).iceProductoEliminar},le=o=>{const{row:r}=o,a=S();return e.jsxs(e.Fragment,{children:[e.jsx(W,{menuButton:e.jsx(e.Fragment,{children:e.jsx(V,{"aria-label":"menuGestionRoles",children:e.jsx(X,{})})}),children:e.jsxs(J,{onClick:()=>a(`${z.modificar}/${r.codigoProducto}`),children:[e.jsx(Y,{}),"Modificar"]})}),e.jsx(Q,{row:r})]})},pe=[{id:"codigoProducto",header:"Código Servicio",accessorFn:o=>d(o.codigoProducto,"")},{accessorKey:"nombre",header:"Producto",id:"nombre",size:150},{accessorKey:"descripcion",header:"Descripción",id:"descripcion",size:200},{accessorKey:"precio",header:"Precio",muiTableBodyCellProps:{align:"right"},accessorFn:o=>_(o.precio,{}),size:150},{accessorKey:"proveedor.nombre",header:"Proveedor",id:"proveedor",accessorFn:o=>{var r;return d((r=o.proveedor)==null?void 0:r.nombre,"-")}},{accessorKey:"unidadMedida.descripcion",header:"Unidad Medida",id:"unidadMedida",accessorFn:o=>{var r;return d((r=o.unidadMedida)==null?void 0:r.descripcion,"")}},{accessorKey:"precioComparacion",header:"Precio Comparación",id:"precioComparacion",size:135,accessorFn:o=>d(o.precioComparacion,"")},{accessorFn:o=>e.jsx(oe,{size:"small",label:o.state,color:"success"}),id:"state",header:"Estado"}],me=o=>{S();const[r,a]=t.useState([]),[s,v]=t.useState({pageIndex:m.page,pageSize:m.limit}),[y,j]=t.useState(0),[w,ue]=t.useState(!1),[l,A]=t.useState([]);t.useState("");const[F,u]=t.useState({}),[ge,I]=t.useState(!1),{data:R,isError:g,isFetching:he,isLoading:M,status:xe,refetch:h}=N({queryKey:["table-data",r,s.pageIndex,s.pageSize,l],queryFn:async()=>{const i=D(r),c={...m,page:s.pageIndex+1,limit:s.pageSize,reverse:l.length<=0,query:i},{pageInfo:p,docs:n}=await ne(c);return j(p.totalDocs),I(!1),n},refetchInterval:!1,refetchOnWindowFocus:!1}),T=t.useMemo(()=>pe,[]),B=async i=>{const c=i.flat();if(c.length!==1){K.error("Solo se puede seleccionar un elemento para eliminar.");return}const p=c[0].original.codigoProducto;await L({text:"Confirma que desea eliminar el registro seleccionado y sus respectivas variantes, esta operación no se podrá revertir",preConfirm:()=>de(p).catch(n=>(k(n),!1))}).then(n=>{n.isConfirmed&&(H(),u({}),h())})};return e.jsx(e.Fragment,{children:e.jsx(G,{...U,columns:T,data:R??[],initialState:{showColumnFilters:!0,columnVisibility:{descripcion:!1,proveedor:!1,precioComparacion:!1}},manualFiltering:!0,manualPagination:!0,manualSorting:!0,muiToolbarAlertBannerProps:g?{color:"error",children:"Error loading data"}:void 0,onColumnFiltersChange:a,onPaginationChange:v,onSortingChange:A,enableDensityToggle:!1,enableGlobalFilter:!1,rowCount:y,state:{isLoading:M,columnFilters:r,pagination:s,showAlertBanner:g,showProgressBars:w,density:"compact",sorting:l,rowSelection:F},muiSearchTextFieldProps:{variant:"outlined",placeholder:"Busqueda",InputLabelProps:{shrink:!0},size:"small"},enableRowActions:!0,positionActionsColumn:"first",renderRowActions:({row:i})=>e.jsx(le,{row:i.original,refetch:h}),enableRowSelection:!0,onRowSelectionChange:u,renderTopToolbarCustomActions:({table:i})=>e.jsx(Z,{sx:{display:"flex",gap:"1rem",p:"0.5rem",flexWrap:"wrap"},children:e.jsx(C,{color:"error",onClick:()=>B(i.getSelectedRowModel().flatRows),startIcon:e.jsx(ee,{}),variant:"contained",size:"small",sx:{height:"28px",top:"0.5rem"},disabled:i.getSelectedRowModel().flatRows.length===0,children:"Eliminar"})}),muiTableProps:{sx:{tableLayout:"fixed"}},displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"},size:120}}})})},mo=()=>(t.useContext(O),e.jsxs($,{children:[e.jsx("div",{className:"breadcrumb",children:e.jsx(q,{routeSegments:[{name:"Servicio",path:"/productos/gestión"},{name:"Gestión de servicios"}]})}),e.jsx(re,{elevation:0,variant:"elevation",square:!0,sx:{mb:2,p:.5,bgcolor:"#FAFAFA"},className:"asideSidebarFixed",children:e.jsx(te,{direction:{xs:"column",sm:"row"},style:{marginTop:2},spacing:{xs:1,sm:1,md:1,xl:1},justifyContent:"flex-end",children:e.jsx(C,{size:"small",variant:"contained",component:E,to:"/productos/nuevo",startIcon:e.jsx(ie,{}),color:"success",children:"Nuevo Servicio"})})}),e.jsx(x,{container:!0,spacing:2,children:e.jsx(x,{item:!0,lg:12,md:12,xs:12,children:e.jsx(me,{})})}),e.jsx(ae,{py:"12px"})]}));export{mo as default};
