import {
  Box,
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
                  label="Nombre Servicio"
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
          <Grid item lg={12} md={12} xs={12}>
            <Controller
              control={control}
              name={'codigoProducto'}
              render={({ field }) => (
                <FormTextField
                  name="codigoProducto"
                  label="Código Servicio (SKU)"
                  value={field.value}
                  onChange={(event) => {
                    const nuevoCodigo = event.target.value
                    const esCodigoValido = /^[A-Z0-9-]*$/.test(nuevoCodigo)
                    if (esCodigoValido) {
                      field.onChange(nuevoCodigo.toUpperCase())
                      setCodigoProducto(nuevoCodigo.toUpperCase())
                    }
                  }}
                  error={
                    Boolean(errors.codigoProducto) ||
                    (field.value !== undefined && !/^[A-Z0-9-]*$/.test(field.value))
                  }
                  helperText={
                    errors.codigoProducto?.message ||
                    (field.value !== undefined &&
                      'Solo se puede utilizar letras, números y un guión, escriba en MAYÚSCULAS.')
                  }
                />
              )}
            />
          </Grid>
          <Grid item lg={3} md={12} xs={12}>
            <Controller
              control={control}
              name="marcaIce"
              render={({ field }) => (
                <FormTextField
                  type="number"
                  inputProps={{ min: 1, max: 3 }}
                  name="marcaIce"
                  label="Marca ICE"
                  value={field.value}
                  onChange={(e) => {
                    const inputValue = e.target.value
                    // Validar que solo sean números entre 1 y 2 o campo vacío
                    if (
                      inputValue === '' ||
                      (/^\d*$/.test(inputValue) &&
                        Number(inputValue) >= 1 &&
                        Number(inputValue) <= 2)
                    ) {
                      // Actualizar el valor solo si cumple las condiciones
                      // Esto también garantizará que el valor se almacene correctamente en el controlador de react-hook-form
                      field.onChange(e)
                    }
                  }}
                  onBlur={field.onBlur}
                  error={Boolean(errors.marcaIce)}
                  helperText={'Escriba la marca ICE'}
                />
              )}
            />
          </Grid>

          <Grid item lg={9} md={12} xs={12}>
            <Controller
              control={control}
              name={'subPartidaArancelaria'}
              render={({ field }) => (
                <FormControl fullWidth>
                  <MyInputLabel shrink>Sub Partida Arancelaria </MyInputLabel>
                  <Select<AlicuotasProps>
                    {...field}
                    styles={reactSelectStyles}
                    menuPosition={'fixed'}
                    name="subPartidaArancelaria"
                    placeholder={
                      field.value ? field.value : 'Seleccione Sub Partida Arancelaria...'
                    }
                    value={field.value as any}
                    onChange={(alicuota: any) => {
                      // field.onChange(alicuota)
                      setValue('subPartidaArancelaria', alicuota.subPartidaArancelaria)
                    }}
                    options={alicuota as any}
                    isClearable={true}
                    getOptionValue={(ps) => ps.subPartidaArancelaria}
                    getOptionLabel={(ps) =>
                      `${ps.subPartidaArancelaria} - ${ps.descripcion} - ${ps.alicuotaPorcentual}% - ${ps.alicuotaEspecifica}`
                    }
                  />
                  <FormHelperText style={{ color: 'red' }}>
                    {errors.subPartidaArancelaria?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </SimpleCard>
    </>
  )
}

export default ProductoHomologacion
