import { genReplaceEmpty } from '../../../utils/helper'
import {
  ProveedorApiInputProps,
  ProveedorInputProp,
} from '../interfaces/proveedor.interface'

export const proveedorActualizarComposeService = (
  input: ProveedorInputProp,
): ProveedorApiInputProps => {
  return <any>{
    _id: input.id,
    subPartidaArancelaria: genReplaceEmpty(input.subPartidaArancelaria, ''),
    descripcion: genReplaceEmpty(input.descripcion, ''),
    alicuotaEspecifica: genReplaceEmpty(input.alicuotaEspecifica, ''),
    alicuotaPorcentual: genReplaceEmpty(input.alicuotaPorcentual, ''),
  }
}