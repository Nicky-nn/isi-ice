import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { FunctionComponent, useEffect } from 'react'

import { genRandomString } from '../../../utils/helper'
import { notSuccess } from '../../../utils/notification'
import { swalAsyncConfirmDialog, swalException } from '../../../utils/swal'
import { apiAlicuota } from '../api/alicuota.api'
import { apiProveedorActualizar } from '../api/proveedorActualizar.api'
import { apiProveedorRegistro } from '../api/XproveedorRegistro.api'
import {
  ALICUOTA_INITIAL_VALUES,
  AlicuotaInputProp,
  AlicuotaProps,
} from '../interfaces/alicuota.interface'
import { proveedorRegistroValidationSchema } from '../validator/proveedorRegistro.validator'
import ProveedorForm from './ProveedorForm'
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { actionForm } from '../../../interfaces'
import { yupResolver } from '@hookform/resolvers/yup'

interface OwnProps {
  keepMounted: boolean
  open: boolean
  codigo: string
  onClose: (value?: AlicuotaProps) => void
}

type Props = OwnProps

const ProveedorActualizar: FunctionComponent<Props> = (props) => {
  const { onClose, open, ...other } = props
  const form = useForm<AlicuotaInputProp>({
    defaultValues: {
      ...ALICUOTA_INITIAL_VALUES,
      action: actionForm.UPDATE,
    } as AlicuotaInputProp, // Add the type assertion here
    resolver: yupResolver<any>(proveedorRegistroValidationSchema),
  })
  const onSubmit: SubmitHandler<AlicuotaInputProp> = async (values) => {
    const { subPartidaArancelaria,alicuotaEspecifica, alicuotaPorcentual, ...valuesWithoutCodigo } = values // Excluir la propiedad 'codigo'

    const alicuotaEspecificaNumber = parseFloat(values.alicuotaEspecifica.toString())
    const alicuotaPorcentualNumber = parseInt(values.alicuotaPorcentual.toString())
  
    await swalAsyncConfirmDialog({
      preConfirm: () => {
        return apiProveedorActualizar(subPartidaArancelaria || '', {
          ...valuesWithoutCodigo,
          alicuotaPorcentual: alicuotaPorcentualNumber,
          alicuotaEspecifica: alicuotaEspecificaNumber,
        }).catch((err) => {
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
  }
  const onError = (error: any, e: any) => {
    console.error('Error:', error, e)
  }

  const handleCancel = () => {
    onClose()
  }

  useEffect(() => {
    if (open) {
      const obtenerDatosProveedor = async () => {
        try {
          const datosProveedor = await apiAlicuota(props.codigo) // Reemplaza apiProveedor por la función adecuada
          form.reset(datosProveedor)
        } catch (error) {
          console.log(error)
        }
      }

      obtenerDatosProveedor()
    }
  }, [open])

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 500 } }}
      maxWidth="sm"
      open={open}
      {...other}
    >
      <DialogTitle>Editar Alicuota {props.codigo}</DialogTitle>
      <DialogContent dividers>
        <ProveedorForm form={form} onSubmit={onSubmit} />
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
          Actualizar Proveedor
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProveedorActualizar

