export interface AlicuotaProps {
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

export interface AlicuotaInputProp {
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
}
export interface AlicuotaActualizarInputProp {
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
}

export const ALICUOTA_INITIAL_VALUES: AlicuotaInputProp = {
  subPartidaArancelaria: '',
  descripcion: '',
  alicuotaPorcentual: 0,
  alicuotaEspecifica: 0,
}
export interface AlicuotaApiInputProps {
  subPartidaArancelaria: string
  descripcion: string
  alicuotaPorcentual: number
  alicuotaEspecifica: number
}
