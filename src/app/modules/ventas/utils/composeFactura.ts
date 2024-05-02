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

export const composeFactura = (ice: FacturaInputProps): any => {
  const input = {
    actividadEconomica: ice.actividadEconomica!?.codigoActividad,
    cliente: {
      codigoCliente: ice.cliente!.codigoCliente,
      email: ice.cliente!.email,
    },
    codigoMetodoPago: ice.codigoMetodoPago.codigoClasificador,
    descuentoAdicional: calculoMonedaBs(ice.descuentoAdicional, ice.tipoCambio),
    codigoMoneda: ice.moneda!.codigo,
    tipoCambio: ice.tipoCambio,
    detalleExtra: ice.detalleExtra,
    codigoExcepcion: ice.codigoExcepcion,
    detalle: ice.detalle.map((item) => ({
      codigoActividad: ice.actividadEconomica!?.codigoActividad,
      codigoProductoSin: item.codigoProductoSin,
      codigoProducto: item.codigoProducto,
      descripcionProducto: item.nombre,
      cantidad: item.cantidad,
      unidadMedida: parseInt(item.unidadMedida.codigoClasificador.toString()),
      montoDescuento: calculoMonedaBs(item.montoDescuento, ice.tipoCambio),
      marcaIce: item.marcaIce,
      precioUnitario: calculoMonedaBs(item.precioUnitario, ice.tipoCambio),
      ...(item.marcaIce === 2
        ? {}
        : {
            cantidadIce: item.cantidad,
            alicuotaEspecifica: item.alicuotaEspecifica,
            alicuotaPorcentual: item.alicuotaPorcentual,
          }),
    })),
  }
  if (ice.numeroTarjeta) {
    return { ...input, numeroTarjeta: ice.numeroTarjeta }
  }
  // return { input, notificacion }
  return input
}
export const composeFacturaValidator = async (ice: any): Promise<boolean> => {
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
          precioUnitario: number().min(0).required(),
          montoDescuento: number().min(0),
        }),
      )
      .min(1, 'Debe seleccionar al menos 1 productos / servicio para el detalle'),
  })
  await schema.validate(ice)
  return true
}

