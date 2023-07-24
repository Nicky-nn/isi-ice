import { toast } from 'react-toastify'
import { array, boolean, mixed, number, object, setLocale, string } from 'yup'
import yup from 'yup'
import { es } from 'yup-locales'

import { ProductoInputProps } from '../interfaces/producto.interface'

export const productoRegistroValidatorResponde = async (
  alq: ProductoInputProps,
): Promise<boolean> => {
  setLocale(es)
  const schema = object({
    codigoProducto: string().required('Debe ingresar el código del producto'),
    nombre: string().required('Debe ingresar el nombre del producto'),
    codigoActividad: mixed().required('Debe seleccionar la actividad económica'),
    codigoProductoSin: mixed().required('Debe seleccionar el producto sin'),
    precio: number().min(1).required('Debe ingresar el precio del producto'),
    codigoUnidadMedida: number().required('Debe seleccionar la unidad de medida'),
    tipoProducto: mixed().required('Debe seleccionar el tipo de producto'),
    marcaIce: number().required('Debe seleccionar la marca de ice'),
    subPartidaArancelaria: string().min(3),
  })

  try {
    await schema.validate(alq, { abortEarly: false })
    return true
  } catch (e: any) {
    console.log(e)
    return false
  }
}

export const productoRegistroValidator = object({
  codigoProducto: string().required(),
  nombre: string().required(),
  codigoActividad: mixed().required(),
  codigoProductoSin: mixed().required(),
  precio: number().min(0).required(),
  codigoUnidadMedida: mixed().required(),
  marcaIce: number().required(),
  subPartidaArancelaria: string().min(3),
})
