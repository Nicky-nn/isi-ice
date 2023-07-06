import { Grid, TextField } from '@mui/material'
import { FormikProps } from 'formik'
import React, { FunctionComponent } from 'react'

import { ProveedorInputProp } from '../interfaces/proveedor.interface'

interface OwnProps {
  formik: FormikProps<ProveedorInputProp>
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
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
              required
              onBlur={formik.handleBlur}
              error={
                formik.touched.alicuotaPorcentual &&
                Boolean(formik.errors.alicuotaPorcentual)
              }
              helperText={
                formik.touched.alicuotaPorcentual && formik.errors.alicuotaPorcentual
              }
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
