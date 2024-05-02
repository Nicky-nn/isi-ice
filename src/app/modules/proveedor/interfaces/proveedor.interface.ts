import { ActionFormProps } from "../../../interfaces"

export interface ProveedorProps {
  codigo: string
  nombre: string
  direccion: string
  ciudad: string
  contacto: string
  correo: string
  telefono: string
  state: string
  createdAt: string
  updatedAt?: string
  usucre: string
  usumod?: string
}

export interface AlicuotasProps {
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
  createdAt: string
  state: string
  updatedAt: string
  usucre: string
  usumod?: string
}

export interface ProveedorInputProp {
  codigo: string
  nombre: string
  direccion: string
  ciudad: string
  contacto: string
  correo: string
  telefono: string
  action: ActionFormProps
}
export interface ProveedorActualizarInputProp {
  nombre: string
  direccion: string
  ciudad: string
  contacto: string
  correo: string
  telefono: string
}

export const PROVEEDOR_INITIAL_VALUES: ProveedorInputProp = {
  codigo: '',
  nombre: '',
  direccion: '',
  ciudad: '',
  contacto: '',
  correo: '',
  telefono: '',
  action: 'REGISTER',
}
export interface ProveedorApiInputProps {
  codigo: string
  ciudad: string
  contacto: string
  correo: string
  direccion: string
  nombre: string
  //notas: string aqui e
  telefono: string
}