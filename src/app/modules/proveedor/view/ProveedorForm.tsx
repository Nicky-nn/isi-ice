import { Grid, TextField } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

import { ProveedorInputProp } from '../interfaces/proveedor.interface'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'

interface OwnProps {
  form: UseFormReturn<ProveedorInputProp>
  onSubmit: (data: ProveedorInputProp) => void
}

type Props = OwnProps

const ProveedorForm: FunctionComponent<Props> = ({ form, onSubmit }) => {
  // const { form } = props
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <Controller
              name="codigo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Código"
                  size="small"
                  fullWidth
                  error={!!errors.codigo}
                  helperText={errors.codigo && errors.codigo.message?.toString()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre Proveedor"
                  size="small"
                  fullWidth
                  error={!!errors.nombre}
                  helperText={errors.nombre && errors.nombre.message?.toString()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Controller
              name="ciudad"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Ciudad / Ubicación"
                  size="small"
                  fullWidth
                  error={!!errors.ciudad}
                  helperText={errors.ciudad && errors.ciudad.message?.toString()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Controller
              name="direccion"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dirección"
                  size="small"
                  fullWidth
                  error={!!errors.direccion}
                  helperText={errors.direccion && errors.direccion.message?.toString()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Controller
              name="contacto"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre del contacto"
                  size="small"
                  fullWidth
                  error={!!errors.contacto}
                  helperText={errors.contacto && errors.contacto.message?.toString()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Controller
              name="correo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  error={!!errors.correo}
                  helperText={errors.correo && errors.correo.message?.toString()}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Controller
              name="telefono"
              control={control}
              render={({ field }) => (
                <MuiTelInput
                  {...field}
                  label="Teléfono"
                  size="small"
                  fullWidth
                  value={field.value}
                  error={!!errors.telefono}
                  helperText={errors.telefono && errors.telefono.message?.toString()}
                  defaultCountry="BO"
                  onChange={field.onChange}
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default ProveedorForm

