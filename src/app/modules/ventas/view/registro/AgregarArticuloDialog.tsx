import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import InputNumber from 'rc-input-number'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Select from 'react-select'

import AlertError from '../../../../base/components/Alert/AlertError'
import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { numberWithCommas } from '../../../../base/components/MyInputs/NumberInput'
import { reactSelectStyles } from '../../../../base/components/MySelect/ReactSelect'
import useAuth from '../../../../base/hooks/useAuth'
import {
  genRandomString,
  genReplaceEmpty,
  handleFocus,
  isEmptyValue,
} from '../../../../utils/helper'
import { notError } from '../../../../utils/notification'
import { ProductoVarianteProps } from '../../../productos/interfaces/producto.interface'
import { apiProductoServicioUnidadMedida } from '../../../sin/api/sinProductosUnidadMedida.api'
import {
  SinProductoServicioProps,
  SinUnidadMedidaProps,
} from '../../../sin/interfaces/sin.interface'

interface OwnProps {
  id: string
  keepMounted: boolean
  open: boolean
  onClose: (value?: any) => void
  codigoActividad: string
}

type Props = OwnProps

const AgregarArticuloDialog: FunctionComponent<Props> = (props: Props) => {
  const { onClose, keepMounted, codigoActividad, open, ...other } = props
  const { user } = useAuth()
  const initialValues: any = {
    incluirCantidad: false,
    verificarStock: false,
    id: genRandomString(5),
    codigoProducto: genRandomString(10).toUpperCase(),
    marcaIce: 1,
    alicuotaEspecifica: '',
    alicuotaPorcentual: '',
    nombre: '',
    precio: 0,
    titulo: '',
    inventario: [
      {
        sucursal: user.sucursal,
        stock: 0,
      },
    ],
    costo: 0,
    sinProductoServicio: {} as SinProductoServicioProps,
    unidadMedida: {} as SinUnidadMedidaProps,
    precioComparacion: 0,
    disponibleParaVenta: false,
    codigoBarras: null,
  }
  const [inputForm, setInputForm] = useState<any>(initialValues)
  const [unidadesMedida, setUnidadesMedida] = useState<SinUnidadMedidaProps[]>([])
  const [productosServicios, setProductosServicios] = useState<
    SinProductoServicioProps[]
  >([])

  const [isError, setIsError] = useState(null)

  const handleCancel = () => {
    onClose()
  }

  const handleOk = () => {
    try {
      if (inputForm.titulo.trim().length === 0) {
        throw new Error('Debe ingresar título del producto')
      }
      if (inputForm.nombre.trim().length === 0) {
        throw new Error('Debe ingresar nombre del producto')
      }
      if (inputForm.precio === 0) {
        throw new Error('Precio debe ser mayor a 0')
      }
      if (isEmptyValue(inputForm.unidadMedida)) {
        throw new Error('Seleccione unidad de medida')
      }
      if (isEmptyValue(inputForm.sinProductoServicio)) {
        throw new Error('Seleccione producto para homologación')
      }
      if (isEmptyValue(inputForm.marcaIce)) {
        throw new Error('Debe ingresar marca ICE')
      } else if (
        inputForm.marcaIce === 1 &&
        (isEmptyValue(inputForm.alicuotaEspecifica) ||
          isEmptyValue(inputForm.alicuotaPorcentual))
      ) {
        throw new Error('Debe ingresar alicuota especifica y porcentual')
      }

      // Se elimino para q no marque error Funion no funcional vea doumnetacion
      const nuevoDetalle = {
        _id: inputForm.id,
        id: inputForm.id,
        sinProductoServicio: inputForm.sinProductoServicio,
        codigoProducto: inputForm.codigoProducto,
        marcaIce: parseInt(inputForm.marcaIce),
        ...(inputForm.marcaIce === 1
          ? {
              alicuotaEspecifica: parseFloat(inputForm.alicuotaEspecifica),
              alicuotaPorcentual: parseFloat(inputForm.alicuotaPorcentual),
            }
          : {}),
        titulo: inputForm.titulo,
        nombre: inputForm.nombre,
        codigoBarras: null,
        precio: inputForm.precio,
        precioComparacion: inputForm.precioComparacion!,
        costo: inputForm.costo,
        incluirCantidad: false,
        verificarStock: false,
        unidadMedida: inputForm.unidadMedida!,
        inventario: inputForm.inventario,
        usucre: user.nombres,
      }

      onClose(nuevoDetalle)
    } catch (e: any) {
      notError(e.message)
    }
  }

  // Obtenemos los datos del producto homologado y unidades de medida
  const fetchProductosServiciosUnidadesMedida = async () => {
    try {
      // const resp = await apiProductoServicioUnidadMedida(codigoActividad)
      const resp = await apiProductoServicioUnidadMedida()
      if (resp) {
        setUnidadesMedida(resp.sinUnidadMedida)
        setProductosServicios(resp.sinProductoServicioPorDocumentoSector)
      }
    } catch (e: any) {
      setIsError(e.message)
    }
  }

  useEffect(() => {
    fetchProductosServiciosUnidadesMedida().then()
  }, [])

  useEffect(() => {
    if (open) {
      setInputForm(initialValues)
    }
  }, [open])

  return (
    <>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 490 } }}
        maxWidth="sm"
        keepMounted={false}
        open={open}
        {...other}
      >
        <DialogTitle>Agregar Servicio Personalizado</DialogTitle>
        <DialogContent dividers>
          {!isError ? (
            <Grid container spacing={2.5}>
              <Grid item lg={12} md={12} xs={12}>
                <FormControl fullWidth component={'div'}>
                  <MyInputLabel shrink>Tipo de Producto Homologado</MyInputLabel>
                  <Select<SinProductoServicioProps>
                    styles={reactSelectStyles}
                    menuPosition={'fixed'}
                    name="productoServicio"
                    placeholder={'Seleccione producto para homologación'}
                    value={genReplaceEmpty(inputForm.sinProductoServicio, null)}
                    onChange={(resp) => {
                      setInputForm({
                        ...inputForm,
                        sinProductoServicio: resp || ({} as SinProductoServicioProps),
                      })
                    }}
                    options={productosServicios}
                    getOptionValue={(ps) => ps.codigoProducto}
                    getOptionLabel={(ps) =>
                      `${ps.codigoProducto} - ${ps.descripcionProducto}`
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item lg={12} md={12} xs={12}>
                <FormControl fullWidth component={'div'}>
                  <MyInputLabel shrink>Unidad Medida</MyInputLabel>
                  <Select<SinUnidadMedidaProps>
                    styles={reactSelectStyles}
                    menuPosition={'fixed'}
                    name="unidadMedida"
                    placeholder={'Seleccione la unidad de medida'}
                    value={genReplaceEmpty(inputForm.unidadMedida, null)}
                    onChange={(resp) => {
                      setInputForm({
                        ...inputForm,
                        unidadMedida: resp || ({} as SinUnidadMedidaProps),
                      })
                    }}
                    options={unidadesMedida}
                    // getOptionValue={(ps) => ps.codigoClasificador}
                    getOptionLabel={(ps) =>
                      `${ps.codigoClasificador} - ${ps.descripcion}`
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item lg={4} md={4} sm={4} xs={12}>
                <TextField
                  type="number"
                  id="marcaIce"
                  label="Marca Ice"
                  size="small"
                  fullWidth
                  value={inputForm.marcaIce}
                  onChange={(e) => {
                    const inputValue = e.target.value
                    // Validar que solo sean números entre 1 y 2 o campo vacío
                    if (inputValue === '' || /^[1-2]$/.test(inputValue)) {
                      setInputForm({
                        ...inputForm,
                        marcaIce: inputValue !== '' ? parseInt(inputValue) : '',
                      })
                    }
                  }}
                  onKeyDown={(e) => {
                    const validKeys = ['1', '2', 'Backspace', 'Delete']
                    if (!validKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                  inputProps={{
                    min: 1,
                    max: 2,
                  }}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={12}>
                <TextField
                  id="alicuotaEspecifica"
                  label="Alicuota Especifica"
                  type="number"
                  size="small"
                  fullWidth
                  value={inputForm.alicuotaEspecifica}
                  onChange={(e) => {
                    // Validar que solo sean números con hasta 5 decimales
                    const inputValue = e.target.value

                    // Si el valor está entre 0 y 100, o es una cadena vacía (borrado), se actualiza el estado
                    if (/^\d+(\.\d{0,5})?$/.test(inputValue) || inputValue === '') {
                      const numericValue = inputValue === '' ? '' : parseFloat(inputValue)
                      if (
                        numericValue === '' ||
                        (numericValue >= 0 && numericValue <= 10000)
                      ) {
                        setInputForm({
                          ...inputForm,
                          alicuotaEspecifica: numericValue,
                        })
                      }
                    }
                  }}
                  disabled={inputForm.marcaIce === 2}
                />
              </Grid>

              <Grid item lg={4} md={4} sm={4} xs={12}>
                <TextField
                  id="alicuotaPorcentual"
                  label="Alicuota Porcentual"
                  size="small"
                  fullWidth
                  type="number"
                  value={inputForm.alicuotaPorcentual}
                  onChange={(e) => {
                    // Validar que solo sean números con hasta 5 decimales
                    const inputValue = e.target.value

                    // Si el valor está entre 0 y 100, o es una cadena vacía (borrado), se actualiza el estado
                    if (/^\d+(\.\d{0,5})?$/.test(inputValue) || inputValue === '') {
                      const numericValue = inputValue === '' ? '' : parseFloat(inputValue)
                      if (
                        numericValue === '' ||
                        (numericValue >= 0 && numericValue <= 100)
                      ) {
                        setInputForm({
                          ...inputForm,
                          alicuotaPorcentual: numericValue,
                        })
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  disabled={inputForm.marcaIce === 2}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="nombre"
                  label="Nombre / Descripción Servicio"
                  multiline
                  minRows={3}
                  maxRows={6}
                  size={'small'}
                  fullWidth
                  value={inputForm.nombre}
                  onChange={(e) => {
                    setInputForm({
                      ...inputForm,
                      nombre: e.target.value,
                      titulo: e.target.value,
                    })
                  }}
                />
              </Grid>

              <Grid item lg={12} md={12} xs={12}>
                <InputLabel>Precio</InputLabel>
                <InputNumber
                  min={0}
                  value={inputForm.precio}
                  onFocus={handleFocus}
                  onChange={(precio: number | null) =>
                    setInputForm({ ...inputForm, precio: precio! })
                  }
                  formatter={numberWithCommas}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          ) : (
            <AlertError mensaje={isError} />
          )}
        </DialogContent>
        <DialogActions sx={{ mb: 1 }}>
          <Button variant={'contained'} size={'small'} onClick={handleOk}>
            Registrar
          </Button>
          <Button
            variant={'contained'}
            size={'small'}
            color={'error'}
            autoFocus
            onClick={handleCancel}
            style={{ marginRight: 18 }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AgregarArticuloDialog
