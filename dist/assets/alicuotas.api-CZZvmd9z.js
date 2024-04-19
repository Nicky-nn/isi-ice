import{g as i,G as s}from"./graphql-request-rGYrdPjm.js";import{A as o}from"./index-eXxrUaeE.js";const c=i`
  query ALICUOTAS {
    alicuotaIceListado {
      subPartidaArancelaria
      descripcion
      alicuotaPorcentual
      alicuotaEspecifica
      createdAt
      state
      updatedAt
      usucre
      usumod
    }
  }
`,l=async t=>{const a=new s("https://sandbox.isipass.net/api"),e=localStorage.getItem(o);return a.setHeader("authorization",`Bearer ${e}`),(await a.request(c)).alicuotaIceListado},d=async()=>{const t=new s("https://sandbox.isipass.net/api"),a=localStorage.getItem(o);return t.setHeader("authorization",`Bearer ${a}`),(await t.request(c)).alicuotaIceListado};export{d as a,l as b};
