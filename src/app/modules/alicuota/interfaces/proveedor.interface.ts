export interface ProveedorProps {
  _id: string
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
  state: string
  createdAt: string
  updatedAt?: string
  usucre: string
  usumod?: string
}

export interface ProveedorInputProp {
  id?: string
  _id?: string
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
}
export interface ProveedorActualizarInputProp {
  _id?: string
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
}

export const PROVEEDOR_INITIAL_VALUES: ProveedorInputProp = {
  subPartidaArancelaria: '',
  descripcion: '',
  alicuotaPorcentual: 0,
  alicuotaEspecifica: 0,
}
export interface ProveedorApiInputProps {
  _id?: string
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
}
