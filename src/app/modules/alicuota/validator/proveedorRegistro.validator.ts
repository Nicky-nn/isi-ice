import { object, setLocale, string } from 'yup'
import { es } from 'yup-locales'

setLocale(es)

export const proveedorRegistroValidationSchema = object({
  subPartidaArancelaria: string().required('Subpartida arancelaria es requerida'),
  descripcion: string().required('Descripción es requerida'),
  alicuotaPorcentual: string().required('Alicuota porcentual requerida'),
  alicuotaEspecifica: string().required('Alicuota especifica requerida'),
})

