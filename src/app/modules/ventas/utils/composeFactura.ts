import { array, number, object, setLocale, string } from 'yup'
import { es } from 'yup-locales'

import { genReplaceEmpty } from '../../../utils/helper'
import { genRound } from '../../../utils/utils'
import { FacturaInputProps } from '../interfaces/factura'

const calculoMonedaBs = (monto: number, tipoCambioBs: number): number => {
  try {
    return genRound(monto * tipoCambioBs)
  } catch (e) {
    return monto
  }
}

export const composeFactura = (fcv: FacturaInputProps): any => {
  const input = {
    actividadEconomica: fcv.actividadEconomica!?.codigoActividad,
    cliente: {
      codigoCliente: fcv.cliente!.codigoCliente,
      email: fcv.cliente!.email,
    },
    codigoMetodoPago: fcv.codigoMetodoPago.codigoClasificador,
    descuentoAdicional: calculoMonedaBs(fcv.descuentoAdicional, fcv.tipoCambio),
    codigoMoneda: fcv.moneda!.codigo,
    tipoCambio: fcv.tipoCambio,
    detalleExtra: fcv.detalleExtra,
    detalle: fcv.detalle.map((item) => ({
      codigoActividad: fcv.actividadEconomica!?.codigoActividad,
      codigoProductoSin: item.codigoProductoSin,
      codigoProducto: item.codigoProducto,
      descripcionProducto: item.nombre,
      cantidad: item.cantidad,
      unidadMedida: parseInt(item.unidadMedida.codigoClasificador.toString()),
      montoDescuento: calculoMonedaBs(item.montoDescuento, fcv.tipoCambio),
      marcaIce: item.marcaIce,
      cantidadIce: item.cantidadIce,
      precioUnitario: calculoMonedaBs(item.precioUnitario, fcv.tipoCambio),
      ...(item.marcaIce === 2
        ? {}
        : {
            alicuotaEspecifica: item.alicuotaEspecifica,
            alicuotaPorcentual: item.alicuotaPorcentual,
          }),
    })),
  }
  if (fcv.numeroTarjeta) {
    return { ...input, numeroTarjeta: fcv.numeroTarjeta }
  }
  // return { input, notificacion }
  return input
}
export const composeFacturaValidator = async (fcv: any): Promise<boolean> => {
  const schema = object({
    actividadEconomica: string().required('Debe seleccionar la actividad economica'),
    cliente: object({
      codigoCliente: string().required('Debe seleccionar los datos del cliente'),
      email: string().email('Debe ingresar un correo valido'),
    }),
    codigoMetodoPago: number().integer().min(1).max(308).required(),
    detalleExtra: string().min(0).max(500),
    tipoCambio: number().min(0),
    numeroTarjeta: string().max(16),
    detalle: array()
      .of(
        object({
          codigoProductoSin: string().min(1).max(99999999).required(),
          codigoProducto: string().min(1).max(50).required(),
          descripcionProducto: string().min(1).max(500).required(),
          cantidad: number().min(0).required(),
          unidadMedida: number().integer().min(1).required(),
          cantidadIce: number().min(1).required('Debe ingresar la cantidad de ICE'),
          precioUnitario: number().min(0).required(),
          montoDescuento: number().min(0),
        }),
      )
      .min(1, 'Debe seleccionar al menos 1 productos / servicio para el detalle'),
  })
  await schema.validate(fcv)
  return true
}
