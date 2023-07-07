export interface ProveedorProps {
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
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
}
export interface ProveedorActualizarInputProp {
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
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
}
