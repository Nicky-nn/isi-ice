import{e as i}from"./@tanstack-CH50zjZF.js";import{g as n,G as s}from"./graphql-request-rGYrdPjm.js";import{A as d,M as u}from"./index-eXxrUaeE.js";const m=n`
  query ACTIVIDADES_POR_DOCUMENTO_SECTOR($codDocSector: Int!) {
    sinActividadesPorDocumentoSector(codigoDocumentoSector: $codDocSector) {
      codigoActividad
      codigoDocumentoSector
      tipoDocumentoSector
      actividadEconomica
      tipoActividad
    }
  }
`,S=async()=>{try{const o=new s("https://sandbox.isipass.net/api"),t=localStorage.getItem(d);o.setHeader("authorization",`Bearer ${t}`);const r=parseInt("14");return(await o.request(m,{codDocSector:r})).sinActividadesPorDocumentoSector}catch(o){throw new u(o)}},y=(o=[])=>{const{data:t,isLoading:r,isError:e,error:a}=i({queryKey:["sinActividadesPorDocumentoSector",...o],queryFn:async()=>{const c=await S();return c.length>0?c:[]}});return{actividades:t,actLoading:r,actIsError:e,actError:a}};export{y as u};
