// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { UsuarioRestriccionProps } from '../interfaces/restriccion.interface'

const gqlQuery = gql`
  query MI_RESTRICCION {
    usuarioRestriccion {
      sucursales {
        codigo
        puntosVenta {
          codigo
        }
      }
    }
  }
`

export const apiUsuarioRestriccion = async (): Promise<UsuarioRestriccionProps> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(gqlQuery)
  return data.usuarioRestriccion
}
