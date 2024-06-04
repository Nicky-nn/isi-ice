import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import React, { FunctionComponent } from 'react'
import { Controller, useForm, UseFormReturn } from 'react-hook-form'

import { AlicuotaInputProp } from '../interfaces/alicuota.interface'
import { NumeroMask } from '../../../base/components/Mask/NumeroMask'
import { handleSelect } from '../../../utils/helper'

interface OwnProps {
  form: UseFormReturn<AlicuotaInputProp>
  handleEdit: boolean
  onSubmit: (data: AlicuotaInputProp) => void
}

type Props = OwnProps

const ProveedorForm: FunctionComponent<Props> = ({ form, handleEdit, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Controller
            control={form.control}
            name={'subPartidaArancelaria'}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.subPartidaArancelaria)}>
                <InputLabel size="small">Sub Partida Arancelaria</InputLabel>
                <OutlinedInput
                  {...field}
                  label={'Sub Partida Arancelaria'}
                  size={'small'}
                  value={field.value}
                  onFocus={handleSelect}
                  disabled={handleEdit}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={Boolean(errors.subPartidaArancelaria)}
                  inputProps={{ maxLength: 20 }}
                />
                <FormHelperText>
                  {errors.subPartidaArancelaria?.message || ''}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controller
            control={form.control}
            name={'alicuotaEspecifica'}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.alicuotaEspecifica)}>
                <InputLabel>Alicuota Específica</InputLabel>
                <OutlinedInput
                  {...field}
                  label={'Alicuota Específica'}
                  size={'small'}
                  value={field.value.toString()}
                  onFocus={handleSelect}
                  onChange={(e) => {
                    const inputValue = e.target.value
                    if (
                      inputValue === '' || // Permite borrar el campo
                      (/^(100000(\.\d{1,5})?|\d{0,5}(\.\d{0,5})?)$/.test(inputValue) &&
                        parseFloat(inputValue) >= 0 &&
                        parseFloat(inputValue) <= 100000)
                    ) {
                      form.setValue('alicuotaEspecifica', parseFloat(inputValue))
                    }
                  }}
                  onBlur={field.onBlur}
                  inputComponent={NumeroMask as any}
                  inputProps={{
                    scale: 5,
                  }}
                  error={Boolean(errors.alicuotaEspecifica)}
                />
                <FormHelperText>
                  {errors.alicuotaEspecifica?.message || ''}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
          <Controller
            control={form.control}
            name={'alicuotaPorcentual'}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.alicuotaPorcentual)}>
                <InputLabel>Alicuota Porcentual</InputLabel>
                <OutlinedInput
                  {...field}
                  name="alicuotaPorcentual"
                  label="Alicuota Porcentual"
                  size="small"
                  type="number"
                  fullWidth
                  value={field.value.toString()}
                  onChange={(e) => {
                    let inputValuee = e.target.value
                    if (isNaN(parseFloat(inputValuee))) {
                      inputValuee = '0'
                    }

                    if (
                      inputValuee === '' || // Permite borrar el campo
                      (/^(100(\.\d{1,5})?|\d{0,2}(\.\d{0,5})?)$/.test(inputValuee) &&
                        parseFloat(inputValuee) >= 0 &&
                        parseFloat(inputValuee) <= 100)
                    ) {
                      form.setValue('alicuotaPorcentual', parseFloat(inputValuee))
                    }
                  }}
                  endAdornment={'%'}
                />
                <FormHelperText>
                  {errors.alicuotaPorcentual?.message || ''}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <Controller
            control={form.control}
            name={'descripcion'}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.descripcion)}>
                <InputLabel size="small">Descripción</InputLabel>
                <OutlinedInput
                  {...field}
                  label={'Descripción'}
                  size={'small'}
                  value={field.value}
                  onFocus={handleSelect}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={Boolean(errors.descripcion)}
                  inputProps={{ maxLength: 100 }}
                />
                <FormHelperText>{errors.descripcion?.message || ''}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default ProveedorForm

