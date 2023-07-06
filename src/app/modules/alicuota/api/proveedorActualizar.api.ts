import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'
import {
  ProveedorActualizarInputProp,
  ProveedorInputProp,
  ProveedorProps,
} from '../interfaces/proveedor.interface'

const gqlMutation = gql`
  mutation ALICUOTAS_ACTUALIZACION($id: ID!, $input: AlicuotaIceInput!) {
    alicuotaIceActualizar(id: $id, input: $input) {
      _id
      subPartidaArancelaria
      descripcion
      alicuotaEspecifica
      alicuotaPorcentual
      usucre
      usumod
    }
  }
`

export const apiProveedorActualizar = async (
  id: string,
  input: ProveedorActualizarInputProp,
): Promise<ProveedorProps> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    // Set a single header
    client.setHeader('authorization', `Bearer ${token}`)
    const data: any = await client.request(gqlMutation, { id, input })
    return data.proveedorActualizar
  } catch (e: any) {
    throw new MyGraphQlError(e)
  }
}
