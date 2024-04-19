import { object, setLocale, string } from 'yup'
import { es } from 'yup-locales'

setLocale(es)

export const proveedorRegistroValidationSchema = object({
  subPartidaArancelaria: string().required('Subpartida arancelaria requerida'),
  descripcion: string().required('Descripción requerida'),
  alicuotaPorcentual: string().required('Alicuota porcentual requerida'),
  alicuotaEspecifica: string().required('Alicuota especifica requerida'),
})
