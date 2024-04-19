import{g as e,G as i}from"./graphql-request-rGYrdPjm.js";import{A as c}from"./index-eXxrUaeE.js";const s=e`
  query ALICUOTA($subPartidaArancelaria: String!) {
    alicuotaIce(subPartidaArancelaria: $subPartidaArancelaria) {
      subPartidaArancelaria
      descripcion
      alicuotaEspecifica
      alicuotaPorcentual
    }
  }
`,u=async t=>{const a=new i("https://sandbox.isipass.net/api"),r=localStorage.getItem(c);return a.setHeader("authorization",`Bearer ${r}`),(await a.request(s,{subPartidaArancelaria:t})).alicuotaIce};export{u as a};
