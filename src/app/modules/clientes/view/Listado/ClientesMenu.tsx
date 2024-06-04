import { Delete, Edit, MenuOpen } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { FunctionComponent, useState } from 'react'

import AuditIconButton from '../../../../base/components/Auditoria/AuditIconButton'
import SimpleMenu, { SimpleMenuItem } from '../../../../base/components/MyMenu/SimpleMenu'
import { ClienteProps } from '../../interfaces/cliente'
import Cliente99001ActualizarDialog from '../actualizar/Cliente99001ActualizarDialog'
import ClienteActualizarDialog from '../actualizar/ClienteActualizarDialog'
import { swalAsyncConfirmDialog, swalException } from '../../../../utils/swal'
import { apiClientesEliminar } from '../../api/clientesEliminar.api'
import { notSuccess } from '../../../../utils/notification'

interface OwnProps {
  row: ClienteProps
  refetch: () => any
}

type Props = OwnProps

const ClientesMenu: FunctionComponent<Props> = (props) => {
  const { row, refetch } = props
  const [openClienteActualizar, setOpenClienteActualizar] = useState(false)
  const [openCliente99001Actualizar, setOpenCliente99001Actualizar] = useState(false)
  const handleDeleteSingleRow = async (row: ClienteProps) => {
    await swalAsyncConfirmDialog({
      text: 'Confirma que desea eliminar el registro seleccionado, esta operación no se podrá revertir',
      preConfirm: () => {
        return apiClientesEliminar([row.codigoCliente]).catch((err) => {
          swalException(err)
          return false
        })
      },
    }).then((resp) => {
      if (resp.isConfirmed) {
        notSuccess()
        refetch().then()
      }
    })
  }
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', width: 100 }}>
        <IconButton
          onClick={() => {
            if (row.numeroDocumento === '99001') {
              setOpenCliente99001Actualizar(true)
            } else setOpenClienteActualizar(true)
          }}
          color="primary"
        >
          <Edit />
        </IconButton>
        <AuditIconButton row={row} />
        <IconButton color="error" onClick={() => handleDeleteSingleRow(row)}>
          <Delete />
        </IconButton>
      </div>
      <ClienteActualizarDialog
        id={'clienteActualizarDialgo'}
        keepMounted={false}
        open={openClienteActualizar}
        cliente={row}
        onClose={(value?: ClienteProps) => {
          setOpenClienteActualizar(false)
          if (value) refetch().then()
        }}
      />
      <Cliente99001ActualizarDialog
        id={'cliente99001ActualizarDialgo'}
        keepMounted={false}
        open={openCliente99001Actualizar}
        cliente={row}
        onClose={(value?: ClienteProps) => {
          setOpenCliente99001Actualizar(false)
          if (value) refetch().then()
        }}
      />
    </>
  )
}

export default ClientesMenu

