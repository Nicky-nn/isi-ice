import { genReplaceEmpty } from '../../../utils/helper'
import { SinActividadesProps } from '../../sin/interfaces/sin.interface'
import {
  ProductoInputApiProps,
  ProductoInputProps,
  ProductoProps,
  ProductoVarianteApiProps,
  ProductoVarianteInputProps,
} from '../interfaces/producto.interface'

/**
 * Componemos el producto para su posterior guardado
 * @param prod
 */

export const productoComposeService = (aql: ProductoInputProps): any => {
  return {
    // codigoProducto: aql.codigoProducto,
    nombre: aql.nombre,
    descripcion: aql.descripcion,
    descripcionHtml: aql.descripcionHtml,
    codigoActividad: aql.codigoActividad?.codigoActividad,
    codigoProductoSin: aql.codigoProductoSin?.codigoProducto,
    precio: aql.precio,
    codigoUnidadMedida: parseInt(
      genReplaceEmpty(aql.codigoUnidadMedida?.codigoClasificador, 0),
      10,
    ),
    tipoProductoId: aql.tipoProducto?._id,
    codigoProveedor: aql.codigoProveedor?.codigo,
    marcaIce: aql.marcaIce,
    // @ts-ignore
    subPartidaArancelaria: aql.subPartidaArancelaria?.subPartidaArancelaria,
  }
}
