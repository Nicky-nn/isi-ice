import{r as A,j as o}from"./react-C-yax-zd.js";import{o as C}from"./@hookform-CI7dTiWF.js";import{u as w}from"./react-hook-form-Cc6cmx_T.js";import{B as y}from"./react-toastify-Bq65RiZx.js";import{S as I}from"./SimpleContainer-tFVAehGQ.js";import{B as V}from"./Breadcrumb-BAVYU1BR.js";import{A as P,i as E,p as q,s as R,a as g,k as D,l as $}from"./index-eXxrUaeE.js";import{b,n as k}from"./notification-CZdNX9HX.js";import{a as T}from"./alicuota.api-CuQo2mvo.js";import{g as x,G as f}from"./graphql-request-rGYrdPjm.js";import{P as B,a as O,b as M,c as z,d as L,p as N,e as U,f as _}from"./ProductoProveedor-kBxaSeD9.js";import{g as H,a as G}from"./react-router-m6rhPc7O.js";import{aF as F,P as Q,k as J,g as S,br as X,bq as Z,aJ as c}from"./@mui-Cg5JgIJd.js";import"./@babel-BWOPM2cf.js";import"./clsx-B-dksMZM.js";import"./react-router-dom-BXf9Krd-.js";import"./react-dom-BMaWjgIA.js";import"./scheduler-CzFDRTuY.js";import"./@remix-run-DEp2-txB.js";import"./rc-input-number-DHeBSjOn.js";import"./@rc-component-BLzWySNC.js";import"./classnames-F3cnkUDL.js";import"./rc-input-CDxr26_S.js";import"./rc-util-RNQGGLoE.js";import"./react-is-DcfIKM1A.js";import"./react-datepicker-D7PCQ8zk.js";import"./date-fns-9p2ure4y.js";import"./react-onclickoutside-vgQ6ifgl.js";import"./@floating-ui-BqRERJ-b.js";import"./perfect-scrollbar-BfaLzep3.js";import"./@tanstack-CH50zjZF.js";import"./lodash-Dwhj6_6J.js";import"./jwt-decode-VWaDGczM.js";import"./sweetalert2-CxYvYGPM.js";import"./nanoid-CeQjyfxW.js";import"./@emotion-D9k8Qpvi.js";import"./hoist-non-react-statics-DQogQWOa.js";import"./stylis-NkKAe6Bn.js";import"./react-transition-group-C1IEqfrK.js";import"./dom-helpers-D0mFdbeO.js";import"./prop-types-tGFuYKac.js";import"./@popperjs-BQBsAJpH.js";import"./graphql-BS3ZITc9.js";import"./cross-fetch-Ml2K_YIJ.js";import"./yup-DbVgGITq.js";import"./property-expr-DEi1ZLzV.js";import"./tiny-case-BJ7jYKNY.js";import"./toposort-CW3e93qZ.js";import"./yup-locales-C3yB5wWh.js";import"./react-select-u2NJ9wTD.js";import"./use-isomorphic-layout-effect-CqeZr6kb.js";import"./memoize-one-BdPwpGay.js";import"./AlertLoading-CGYU8vZk.js";import"./Typography-SNySdv6H.js";import"./MyInputLabel-BamhhSIO.js";import"./ReactSelect-CWkwVJtW.js";import"./SimpleCard-Cf1MrNuW.js";import"./AlertError-Drenn0X8.js";import"./FormTextField-DeIeSGMe.js";import"./alicuotas.api-CZZvmd9z.js";import"./useQueryActividadesPorDocumentoSector-CljpSRED.js";import"./NumeroMask-BhIfq4lN.js";import"./imask-JlAOpWDu.js";import"./react-imask-BXhbtwMr.js";import"./ProveedorRegistroDialog-Ce0LZXWf.js";const K=x`
  query ALQ_PARAMETROS {
    sinActividades {
      codigoCaeb
      descripcion
      tipoActividad
    }
  }
`,W=async()=>{const s=new f("https://sandbox.isipass.net/api"),a=localStorage.getItem(P);return s.setHeader("authorization",`Bearer ${a}`),(await s.request(K)).sinActividades||[]},Y=x`
  mutation PRODUCTOS_ACTUALIZAR($codigoProducto: String!, $input: IceProductoInput!) {
    iceProductoActualizar(codigoProducto: $codigoProducto, input: $input) {
      codigoProducto
      descripcion
      marcaIce
      subPartidaArancelaria
      alicuotaDescripcion
      alicuotaEspecifica
      alicuotaPorcentual
      usucre
      usumod
    }
  }
`,oo=async(s,a)=>{const e=new f("https://sandbox.isipass.net/api"),u=localStorage.getItem(P);return e.setHeader("authorization",`Bearer ${u}`),(await e.request(Y,{codigoProducto:s,input:a})).iceProductoActualizar},io=x`
  query EXPO_PRODUCTO($codigoProducto: ID!) {
    iceProducto(codigoProducto: $codigoProducto) {
      codigoProducto
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
      usumod
      updatedAt
      createdAt
    }
  }
`,to=async s=>{const a=new f("https://sandbox.isipass.net/api"),e=localStorage.getItem(P);return a.setHeader("authorization",`Bearer ${e}`),(await a.request(io,{codigoProducto:s})).iceProducto},Pi=s=>{const{id:a}=H(),e=G(),[u,v]=A.useState(void 0),i=w({defaultValues:{...L},resolver:C(_)}),h=async n=>{await N(n);const t=n.codigoProducto,p=U(n);await R({preConfirm:async()=>{const r=await oo(t,p).catch(m=>({error:m}));return r.error?(y.error("Error"),g(r.error),!1):r}}).then(r=>{r.isConfirmed&&k(),r.isDenied&&g(r.value)})},j=async n=>{D();try{const t=await to(n);if(t){v(t[0]);const p=await W(),r=t.subPartidaArancelaria;if(r!==null){const l=await T(r);i.setValue("subPartidaArancelaria",l||"0")}else i.setValue("subPartidaArancelaria",r);const m=t.sinProductoServicio,d=p.find(l=>l.codigoCaeb===m.codigoActividad);i.setValue("codigoActividad",t.sinProductoServicio),i.setValue("codigoActividad.tipoActividad",(d==null?void 0:d.tipoActividad)||""),i.setValue("codigoActividad.actividadEconomica",(d==null?void 0:d.descripcion)||""),i.setValue("codigoProductoSin",t.sinProductoServicio),i.setValue("codigoUnidadMedida",t.unidadMedida),i.setValue("codigoProveedor",t.proveedor),i.setValue("nombre",t.nombre),i.setValue("codigoProducto",t.codigoProducto),i.setValue("descripcion",t.descripcion),i.setValue("precio",t.precio),i.setValue("marcaIce",t.marcaIce)}else b("No se encontró el producto"),e(-1);$()}catch(t){g(t)}};return A.useEffect(()=>{(async()=>E(a)?(b("Se requiere el código del producto"),e(-1)):await j(a).then())()},[]),o.jsxs(I,{children:[o.jsx("div",{className:"breadcrumb",children:o.jsx(V,{routeSegments:[{name:"Servicios",path:"/productos/gestion"},{name:"Modificar Servicio"}]})}),o.jsx(F,{}),o.jsx(Q,{elevation:0,variant:"elevation",square:!0,sx:{mb:2,p:.5},className:"asideSidebarFixed",children:o.jsxs(J,{direction:{xs:"column",sm:"row"},style:{marginTop:2},spacing:{xs:-2,sm:0,md:1,xl:0},justifyContent:"flex-end",children:[o.jsx(S,{color:"primary",startIcon:o.jsx(X,{}),variant:"contained",onClick:()=>{e(q.nuevo)},children:"Nuevo Servicio"})," ",o.jsx(S,{color:"success",startIcon:o.jsx(Z,{}),variant:"contained",onClick:i.handleSubmit(h),children:"Guardar Cambios"})]})}),o.jsxs(c,{container:!0,spacing:2,children:[o.jsx(c,{item:!0,lg:8,md:8,xs:12,children:o.jsxs(c,{container:!0,spacing:1,children:[o.jsx(c,{item:!0,lg:12,md:12,xs:12,children:o.jsx(B,{form:i})}),o.jsx(c,{item:!0,lg:12,md:12,xs:12,children:o.jsx(O,{form:i})})]})}),o.jsx(c,{item:!0,lg:4,md:4,xs:12,children:o.jsxs(c,{container:!0,spacing:1,children:[o.jsx(c,{item:!0,lg:12,md:12,xs:12,children:o.jsx(M,{form:i})}),o.jsx(c,{item:!0,lg:12,md:12,xs:12,children:o.jsx(z,{form:i})})]})})]})]})};export{Pi as default};
