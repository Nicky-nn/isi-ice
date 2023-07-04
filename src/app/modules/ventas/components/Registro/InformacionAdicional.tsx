import '../../../../../styles/custom-datepicker.css'

import AddIcon from '@mui/icons-material/Add'
import {
  Autocomplete,
  Button,
  createFilterOptions,
  Fab,
  FormControl,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { Box, makeStyles, TextField } from '@mui/material'
import axios from 'axios'
import es from 'date-fns/locale/es'
import React, { createContext, useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import AsyncSelect from 'react-select/async'

import { FormTextField } from '../../../../base/components/Form'
import { FacturaInputProps } from '../../interfaces/factura'

interface InformacionAdicionalProps {
  form: UseFormReturn<FacturaInputProps>
}
const InformacionAdicional = (props: InformacionAdicionalProps) => {
  // const { form } = props
  const {
    form: {
      control,
      watch,
      setValue,
      getValues,
      formState: { errors },
    },
  } = props

  return (
    <>
      <Grid container spacing={1} rowSpacing={2}>
        <Grid item xs={12} lg={12} sm={12} md={12}>
          <Controller
            name="numeroDescripcionPaquetesBultos"
            control={control}
            render={({ field }) => (
              <FormTextField
                {...field}
                id="numeroDescripcionPaquetesBultos"
                name="numeroDescripcionPaquetesBultos"
                label="Número y descripción de paquetes (Bultos)"
                fullWidth
                multiline
                rows={3}
                onChange={(e) => {
                  setValue('numeroDescripcionPaquetesBultos', e.target.value)
                }}
                error={Boolean(errors.numeroDescripcionPaquetesBultos)}
                helperText={errors.numeroDescripcionPaquetesBultos?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={12} sm={12} md={12}>
          <Controller
            name="informacionAdicional"
            control={control}
            render={({ field }) => (
              <FormTextField
                id="informacionAdicional"
                label="Información adicional"
                fullWidth
                multiline
                rows={2}
                {...field}
                error={Boolean(errors.informacionAdicional)}
                helperText={errors.informacionAdicional?.message}
                onChange={(e) => {
                  setValue('informacionAdicional', e.target.value)
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} lg={12} sm={12} md={12}></Grid>
      </Grid>
    </>
  )
}

export default InformacionAdicional
