// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { PageInfoProps, PageInputProps } from '../../../interfaces'
import { ProveedorProps } from '../interfaces/proveedor.interface'

const gqlQuery = gql`
  query ALICUOTA($id: ID!) {
    alicuotaIce(id: $id) {
      _id
      subPartidaArancelaria
      descripcion
      alicuotaEspecifica
      alicuotaPorcentual
    }
  }
`

export const apiAlicuota = async (id: string): Promise<ProveedorProps> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)
  const data: any = await client.request(gqlQuery, { id })
  // console.log(data)
  return data.alicuotaIce
}
