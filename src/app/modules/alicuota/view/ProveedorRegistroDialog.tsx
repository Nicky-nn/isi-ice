import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
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
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface OwnProps {
  id: string
  keepMounted: boolean
  open: boolean
  onClose: (value?: AlicuotaProps) => void
}

type Props = OwnProps

const ProveedorRegistro: FunctionComponent<Props> = (props) => {
  const { onClose, open, ...other } = props
  const form = useForm<AlicuotaInputProp>({
    defaultValues: { ...ALICUOTA_INITIAL_VALUES },
    resolver: yupResolver<any>(proveedorRegistroValidationSchema),
  })
  const onSubmit: SubmitHandler<AlicuotaInputProp> = async (values) => {
    //console.log(values)

    const {
      subPartidaArancelaria,
      alicuotaEspecifica,
      alicuotaPorcentual,
      ...valuesWithoutCodigo
    } = values

    const alicuotaEspecificaNumber = parseFloat(values.alicuotaEspecifica.toString())
    const alicuotaPorcentualNumber = parseInt(values.alicuotaPorcentual.toString())

    await swalAsyncConfirmDialog({
      preConfirm: () => {
        //@ts-ignore
        return apiProveedorRegistro(subPartidaArancelaria || '', {
          ...valuesWithoutCodigo,
          alicuotaPorcentual: alicuotaPorcentualNumber,
          alicuotaEspecifica: alicuotaEspecificaNumber,
        }).catch((err) => {
          swalException(err)
          return false
        })
      },
      text: 'Confirma que desea Registrar Alicuota?',
    }).then((resp) => {
      if (resp.isConfirmed) {
        notSuccess()
        onClose(resp.value)
        // lIMPIAR FORMULARIO
        form.reset()
      }
    })
  }
  const onError = (errors: any, e: any) => console.log(errors, e)
  useEffect(() => {
    if (open) {
      form.reset({
        ...ALICUOTA_INITIAL_VALUES,
      })
    }
  }, [open])
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
        <ProveedorForm form={form} onSubmit={onSubmit} handleEdit={false} />
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
          onClick={form.handleSubmit(onSubmit, onError)}
          size={'small'}
          style={{ marginRight: 25 }}
          variant={'contained'}
        >
          Registrar Alicuota
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProveedorRegistro

