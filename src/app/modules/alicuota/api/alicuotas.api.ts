// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { PageInfoProps, PageInputProps } from '../../../interfaces'
import { ProveedorProps } from '../interfaces/proveedor.interface'

const gqlQuery = gql`
  query ALICUOTAS {
    alicuotaIceListado {
      _id
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
`

interface ProveedorResponse {
  pageInfo: PageInfoProps
  docs: ProveedorProps[]
}

export const apiProveedores = async (
  pageInfo: PageInputProps,
): Promise<ProveedorResponse> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)
  const data: any = await client.request(gqlQuery)
  return data.alicuotaIceListado
}
