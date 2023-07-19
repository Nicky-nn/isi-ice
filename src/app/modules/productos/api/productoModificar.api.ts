// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { ProductoInputApiProps, ProductoProps } from '../interfaces/producto.interface'

const gqlQuery = gql`
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
`
export const apiProductoModificar = async (
  codigoProducto: string, // Agrega el parámetro codigoProducto
  input: ProductoInputApiProps,
): Promise<ProductoProps> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)
  const data: any = await client.request(gqlQuery, {
    codigoProducto: codigoProducto,
    input: input,
  })
  return data.iceProductoActualizar
}
