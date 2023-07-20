import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { FormikProps, useFormik } from 'formik'
import React, { FunctionComponent, useEffect } from 'react'

import { genRandomString } from '../../../utils/helper'
import { notSuccess } from '../../../utils/notification'
import { swalAsyncConfirmDialog, swalException } from '../../../utils/swal'
import { apiProveedorRegistro } from '../api/XproveedorRegistro.api'
import {
  ALICUOTA_INITIAL_VALUES,
  AlicuotaInputProp,
  AlicuotaProps,
} from '../interfaces/alicuota.interface'
import { proveedorRegistroValidationSchema } from '../validator/proveedorRegistro.validator'
import ProveedorForm from './ProveedorForm'

interface OwnProps {
  id: string
  keepMounted: boolean
  open: boolean
  onClose: (value?: AlicuotaProps) => void
}

type Props = OwnProps

const ProveedorRegistro: FunctionComponent<Props> = (props) => {
  const { onClose, open, ...other } = props

  const formik: FormikProps<AlicuotaInputProp> = useFormik<AlicuotaInputProp>({
    initialValues: ALICUOTA_INITIAL_VALUES,
    validationSchema: proveedorRegistroValidationSchema,
    onSubmit: async (values) => {
      const { subPartidaArancelaria, ...valuesWithoutCodigo } = values
      await swalAsyncConfirmDialog({
        preConfirm: () => {
          return apiProveedorRegistro(
            subPartidaArancelaria || '',
            //@ts-ignore
            valuesWithoutCodigo,
          ).catch((err) => {
            swalException(err)
            return false
          })
        },
        text: 'Confirma que desea actualizar Alicuota?',
      }).then((resp) => {
        if (resp.isConfirmed) {
          notSuccess()
          onClose(resp.value)
        }
      })
    },
  })

  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 500 } }}
      maxWidth="sm"
      open={open}
      {...other}
    >
      <DialogTitle>Registrar Nuevo Alicuota</DialogTitle>
      <DialogContent dividers>
        <ProveedorForm formik={formik} />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color={'error'}
          size={'small'}
          variant={'contained'}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          onClick={formik.submitForm}
          size={'small'}
          style={{ marginRight: 25 }}
          variant={'contained'}
          disabled={!formik.isValid}
        >
          Registrar Alicuota
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProveedorRegistro
