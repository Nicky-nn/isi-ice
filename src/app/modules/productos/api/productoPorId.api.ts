// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { ProductoProps } from '../interfaces/producto.interface'

const query = gql`
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
`

export const apiProductoPorId = async (id: string): Promise<ProductoProps> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(query, { codigoProducto: id })
  return data.iceProducto
}
