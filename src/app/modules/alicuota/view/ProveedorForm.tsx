import { Grid, InputAdornment, TextField } from '@mui/material'
import { FormikProps } from 'formik'
import React, { FunctionComponent } from 'react'

import { AlicuotaInputProp } from '../interfaces/alicuota.interface'

interface OwnProps {
  formik: FormikProps<AlicuotaInputProp>
}

type Props = OwnProps

const ProveedorForm: FunctionComponent<Props> = (props) => {
  const { formik } = props
  return (
    <>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              name="subPartidaArancelaria"
              label="Sub Partida Arancelaria"
              size="small"
              fullWidth
              value={formik.values.subPartidaArancelaria}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.subPartidaArancelaria &&
                Boolean(formik.errors.subPartidaArancelaria)
              }
              helperText={
                formik.touched.subPartidaArancelaria &&
                formik.errors.subPartidaArancelaria
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              name="alicuotaEspecifica"
              label="Alicuota Específica"
              size="small"
              type="number"
              fullWidth
              value={formik.values.alicuotaEspecifica}
              onChange={(e) => {
                const inputValue = e.target.value
                if (
                  inputValue === '' || // Permite borrar el campo
                  (/^(100000(\.\d{1,5})?|\d{0,5}(\.\d{0,5})?)$/.test(inputValue) &&
                    parseFloat(inputValue) >= 0 &&
                    parseFloat(inputValue) <= 100000)
                ) {
                  formik.setFieldValue('alicuotaEspecifica', inputValue)
                }
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.alicuotaEspecifica &&
                Boolean(formik.errors.alicuotaEspecifica)
              }
              helperText={
                formik.touched.alicuotaEspecifica && formik.errors.alicuotaEspecifica
              }
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <TextField
              name="alicuotaPorcentual"
              label="Alicuota Porcentual"
              size="small"
              type="number"
              fullWidth
              value={formik.values.alicuotaPorcentual}
              onChange={(e) => {
                const inputValue = e.target.value
                if (
                  inputValue === '' || // Permite borrar el campo
                  (/^(100(\.\d{1,5})?|\d{0,2}(\.\d{0,5})?)$/.test(inputValue) &&
                    parseFloat(inputValue) >= 0 &&
                    parseFloat(inputValue) <= 100)
                ) {
                  formik.setFieldValue('alicuotaPorcentual', parseFloat(inputValue))
                }
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.alicuotaPorcentual &&
                Boolean(formik.errors.alicuotaPorcentual)
              }
              helperText={
                formik.touched.alicuotaPorcentual && formik.errors.alicuotaPorcentual
              }
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <TextField
              name="descripcion"
              label="Descripción"
              size="small"
              fullWidth
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
              helperText={formik.touched.descripcion && formik.errors.descripcion}
            />
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default ProveedorForm
