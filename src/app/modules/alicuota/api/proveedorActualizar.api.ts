import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'
import {
  ProveedorActualizarInputProp,
  ProveedorInputProp,
  ProveedorProps,
} from '../interfaces/alicuota.interface'

const gqlMutation = gql`
  mutation ALICUOTAS_ACTUALIZACION(
    $subPartidaArancelaria: String!
    $input: AlicuotaIceInput!
  ) {
    alicuotaIceActualizar(subPartidaArancelaria: $subPartidaArancelaria, input: $input) {
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
  subPartidaArancelaria: string,
  input: ProveedorActualizarInputProp,
): Promise<ProveedorProps> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    // Set a single header
    client.setHeader('authorization', `Bearer ${token}`)
    const data: any = await client.request(gqlMutation, { subPartidaArancelaria, input })
    return data.proveedorActualizar
  } catch (e: any) {
    throw new MyGraphQlError(e)
  }
}
