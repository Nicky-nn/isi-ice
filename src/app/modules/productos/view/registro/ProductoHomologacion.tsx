import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  SelectChangeEvent,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'

import AlertError from '../../../../base/components/Alert/AlertError'
import { FormTextField } from '../../../../base/components/Form'
import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { reactSelectStyles } from '../../../../base/components/MySelect/ReactSelect'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import useAuth from '../../../../base/hooks/useAuth'
import { PageInputProps } from '../../../../interfaces'
import { apiAlicuotas2 } from '../../../alicuota/api/alicuotas.api'
import { apiProveedores } from '../../../proveedor/api/proveedores.api'
import { AlicuotasProps } from '../../../proveedor/interfaces/proveedor.interface'
import { fetchSinProductoServicioPorActividad } from '../../../sin/api/sinProductoServicio.api'
import useQueryActividadesPorDocumentoSector from '../../../sin/hooks/useQueryActividadesPorDocumentoSector'
import { subPartidaArancelariaProps } from '../../../sin/interfaces/sin.interface'
import {
  SinActividadesDocumentoSectorProps,
  SinActividadesProps,
  SinProductoServicioProps,
} from '../../../sin/interfaces/sin.interface'
import { ProductoInputProps } from '../../interfaces/producto.interface'

interface OwnProps {
  form: UseFormReturn<ProductoInputProps>
}

type Props = OwnProps

const ProductoHomologacion: FunctionComponent<Props> = (props) => {
  const {
    form: {
      control,
      setValue,
      getValues,
      watch,
      formState: { errors, isSubmitting },
    },
  } = props

  const codigoActividadWatch = watch('codigoActividad')

  const [codigoProducto, setCodigoProducto] = useState('')

  const generarCodigoProducto = (nombreProducto: string): string => {
    const palabras = nombreProducto
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, '') // Eliminar caracteres especiales
      .split(' ')
      .map((palabra) => palabra.substring(0, 5)) // Limitar a 3 caracteres por palabra

    let palabrasValidas: string[]
    if (palabras.length > 3) {
      palabrasValidas = [...palabras.slice(0, 5), ...palabras.slice(-2)]
    } else {
      palabrasValidas = palabras
    }

    const codigo = palabrasValidas.join('')

    let numeroAleatorio = Math.floor(Math.random() * 100)
    // Asegurarse de que el número aleatorio tenga al menos 2 dígitos
    if (numeroAleatorio < 10) {
      numeroAleatorio += 10
    }

    const codigoFinal = `${codigo}-${numeroAleatorio}`.slice(
      0,
      Math.min(13, codigo.length + 4),
    ) // Limitar a máximo 13 caracteres
    // console.log('codigoFinal', codigoFinal)
    if (nombreProducto.length > 0) {
      // setValue('codigoProducto', codigoFinal)
      return codigoFinal
    } else {
      // setValue('codigoProducto', '')
      return ''
    }
  }

  useEffect(() => {
    const nombreProducto = getValues('nombre')

    // Verificar si el campo de codigoProducto ya tiene un valor
    const codigoProductoExistente = getValues('codigoProducto')
    const codigoProductoActualizado =
      codigoProductoExistente || generarCodigoProducto(nombreProducto)

    setCodigoProducto(codigoProductoActualizado)
    setValue('codigoProducto', codigoProductoActualizado)
  }, [getValues, setValue, watch('nombre') ? watch('nombre') : ''])

  // const {values, setFieldValue} = formik
  const { user } = useAuth()

  // CARGA DATOS DE ACTIVIDADES
  const { actividades, actIsError, actError, actLoading } =
    useQueryActividadesPorDocumentoSector()

  // CARGA DE DATOS DE PRODUCTOS SERVICIOS
  const { data: productosServicios, error: prodServError } = useQuery<
    SinProductoServicioProps[],
    Error
  >(
    ['productosServicios', codigoActividadWatch],
    async () => {
      return await fetchSinProductoServicioPorActividad(
        getValues('codigoActividad.codigoActividad'),
      )
    },
    {
      keepPreviousData: false,
    },
  )

  useEffect(() => {
    if (!actLoading && actividades && actividades.length > 0) {
      const actE = actividades.find(
        (act) => act.codigoActividad === user.actividadEconomica.codigoCaeb,
      )
      if (actE) {
        setValue('codigoActividad', actE)
      } else {
        setValue('codigoActividad', null)
      }
    }
  }, [actLoading, actividades])

  const [openDialog, setOpenDialog] = useState(false)
  const [cambioValor, setcambioValor] = useState('')

  const { data: alicuota, refetch } = useQuery<AlicuotasProps[], Error>(
    ['alicuotaData', openDialog],
    // @ts-ignore
    async () => {
      const response = await apiAlicuotas2()
      return response
    },
  )

  const [ice, setIce] = React.useState('')
  const handleChange = (selectedOption: any) => {
    setIce(selectedOption.value)
  }
  const marcaIceValue = watch('marcaIce')
  useEffect(() => {
    if (marcaIceValue === 2) {
      // @ts-ignore
      const firstSubPartidaArancelaria = alicuota[0] || null // Asegúrate de que sea null si no hay datos disponibles
      setValue('subPartidaArancelaria', firstSubPartidaArancelaria)
    }
  }, [marcaIceValue, setValue])

  return (
    <>
      <SimpleCard title={'HOMOLOGACIÓN'}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            {actError ? (
              <AlertError mensaje={actError.message} />
            ) : (
              <Controller
                name="codigoActividad"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.codigoActividad)}>
                    <MyInputLabel shrink>Actividad Económica</MyInputLabel>
                    <Select<SinActividadesDocumentoSectorProps>
                      {...field}
                      styles={reactSelectStyles}
                      name="codigoActividad"
                      placeholder={'Seleccione la actividad económica'}
                      menuPosition={'fixed'}
                      value={getValues('codigoActividad')}
                      onChange={async (codigoActividad: any) => {
                        field.onChange(codigoActividad)
                        setValue('codigoProductoSin', null)
                      }}
                      onBlur={async (val) => {
                        field.onBlur()
                      }}
                      isSearchable={false}
                      options={actividades}
                      getOptionValue={(item) => item.codigoActividad}
                      getOptionLabel={(item) =>
                        `${item.tipoActividad} - ${item.codigoActividad} - ${item.actividadEconomica}`
                      }
                    />
                  </FormControl>
                )}
              />
            )}
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            {prodServError ? (
              <AlertError mensaje={prodServError.message} />
            ) : (
              <Controller
                name={'codigoProductoSin'}
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    component={'div'}
                    error={Boolean(errors.codigoProductoSin)}
                  >
                    <MyInputLabel shrink>Servicio Homologado</MyInputLabel>
                    <Select<SinProductoServicioProps>
                      {...field}
                      styles={reactSelectStyles}
                      menuPosition={'fixed'}
                      name="codigoProductoSin"
                      placeholder={'Seleccione Servicio para homolgación'}
                      value={field.value || null}
                      onChange={(codigoProductoSin) => {
                        field.onChange(codigoProductoSin)
                      }}
                      options={productosServicios}
                      getOptionValue={(ps) => ps.codigoProducto}
                      getOptionLabel={(ps) =>
                        `${ps.codigoProducto} - ${ps.descripcionProducto}`
                      }
                    />
                    <FormHelperText>{errors.codigoProductoSin?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            )}
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Controller
              control={control}
              name={'nombre'}
              render={({ field }) => (
                <FormTextField
                  name="nombre"
                  label="Nombre Producto / Servicio"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={() => {
                    const nombreProducto = field.value
                    const nuevoCodigoProducto = generarCodigoProducto(nombreProducto)
                    setCodigoProducto(nuevoCodigoProducto)
                    field.onBlur()
                  }}
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre?.message}
                />
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Controller
              name={'descripcion'}
              control={control}
              render={({ field }) => (
                <FormTextField
                  name="descripcion"
                  label="Descripcion"
                  multiline
                  minRows={3}
                  maxRows={5}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </Grid>
          <Grid item lg={3} md={4} xs={12} sm={6}>
            <Controller
              control={control}
              name={'codigoProducto'}
              render={({ field }) => (
                <FormTextField
                  name="codigoProducto"
                  label="Código Producto (SKU)"
                  value={field.value}
                  onChange={(event) => {
                    const nuevoCodigo = event.target.value.toUpperCase() // Convertir a mayúsculas antes de guardar
                    const esCodigoValido = /^[A-Z0-9-]*$/.test(nuevoCodigo)
                    if (esCodigoValido) {
                      field.onChange(nuevoCodigo)
                      setCodigoProducto(nuevoCodigo)
                    }
                  }}
                  onBlur={(event) => {
                    const nuevoCodigo = event.target.value // Mantener el valor en minúsculas
                    const esCodigoValido = /^[A-Z0-9-]*$/.test(nuevoCodigo)
                    if (esCodigoValido) {
                      field.value = nuevoCodigo.toUpperCase() // Convertir a mayúsculas antes de guardar
                      field.onBlur()
                      setCodigoProducto(nuevoCodigo.toUpperCase()) // Opcional: Actualizar el estado local si es necesario
                    }
                  }}
                  error={
                    Boolean(errors.codigoProducto) ||
                    (field.value !== undefined && !/^[A-Z0-9-]*$/.test(field.value))
                  }
                  helperText={errors.codigoProducto?.message}
                />
              )}
            />
          </Grid>
          <Grid item lg={2} md={4} xs={12}>
            <Controller
              control={control}
              name="marcaIce"
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value === 1} // Si el valor es 1, el Checkbox estará marcado (true)
                      onChange={(e) => {
                        const isChecked = e.target.checked
                        // Establecer el valor según si está marcado o no
                        const value = isChecked ? 1 : 2 // 1 representa "true", 2 representa "false"
                        field.onChange(value)
                      }}
                      color="primary"
                    />
                  }
                  label="Marca ICE"
                />
              )}
            />
          </Grid>
          {/* Renderizar subPartidaArancelaria solo si marcaIceValue no es igual a 2 */}
          {marcaIceValue !== 2 && (
            <Grid item lg={7} md={4} xs={12}>
              <Controller
                control={control}
                name={'subPartidaArancelaria'}
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.subPartidaArancelaria)}>
                    <MyInputLabel shrink>Sub Partida Arancelaria</MyInputLabel>
                    <Select
                      styles={reactSelectStyles}
                      menuPosition={'fixed'}
                      name="subPartidaArancelaria"
                      placeholder={
                        field.value
                          ? field.value
                          : 'Seleccione la sub partida arancelaria '
                      }
                      value={field.value}
                      onChange={(selectedOption) => {
                        setValue('subPartidaArancelaria', selectedOption)
                      }}
                      options={alicuota as any}
                      isClearable={true}
                      getOptionValue={(ps) => ps.subPartidaArancelaria} // Especificar el campo que representa el valor de cada opción
                      getOptionLabel={(ps) =>
                        `${ps.descripcion} - ${ps.alicuotaPorcentual}% - ${ps.alicuotaEspecifica} - ${ps.subPartidaArancelaria}`
                      }
                    />
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.subPartidaArancelaria?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          )}
        </Grid>
      </SimpleCard>
    </>
  )
}

export default ProductoHomologacion
