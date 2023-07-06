// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { ProveedorInputProp, ProveedorProps } from '../interfaces/proveedor.interface'

const gqlQuery = gql`
  mutation ALICUOTA_REGISTRO($input: AlicuotaIceInput!) {
    alicuotaIceRegistro(input: $input) {
      _id
      subPartidaArancelaria
      descripcion
      alicuotaEspecifica
      alicuotaPorcentual
      state
      createdAt
      updatedAt
      usucre
      usumod
    }
  }
`

export const apiProveedorRegistro = async (
  input: ProveedorInputProp,
): Promise<ProveedorProps> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)
  const data: any = await client.request(gqlQuery, { input })
  return data.alicuotaIceRegistro
}
