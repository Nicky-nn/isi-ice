import { Button, Grid, Typography } from '@mui/material'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { UseFormReturn } from 'react-hook-form'

import { FormTextField } from '../../../../base/components/Form'
import { numberWithCommas } from '../../../../base/components/MyInputs/NumberInput'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import { DetalleFacturaProps, FacturaProps } from '../../../ventas/interfaces/factura'
import { NcdInputProps } from '../../interfaces/ncdInterface'
import NcdFacturaOriginalDialog from './NcdFacturaOriginalDialog'
import {
  MRT_ColumnDef,
  MRT_RowSelectionState,
  MRT_TableOptions,
  MaterialReactTable,
} from 'material-react-table'
import { MuiTableBasicOptionsProps } from '../../../../utils/muiTable/materialReactTableUtils'
import { MRT_Localization_ES } from 'material-react-table/locales/es'

interface OwnProps {
  form: UseFormReturn<NcdInputProps>
}

type Props = OwnProps

const NcdFacturaOriginal: FunctionComponent<Props> = (props) => {
  const {
    form: {
      control,
      setValue,
      getValues,
      watch,
      formState: { errors },
    },
  } = props

  const [openDialog, setOpenDialog] = useState(false)

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({})

  const [selectedRows, setSelectedRows] = useState([])
  const columns = useMemo<MRT_ColumnDef<DetalleFacturaProps>[]>(
    //column definitions...
    () => [
      {
        id: 'Nro. Item',
        header: 'Nro. Item',
        accessorFn: (row) => row.nroItem,
        width: '100px',
      },
      {
        id: 'Cantidad',
        header: 'Cantidad',
        accessorFn: (row) => row.cantidad,
        width: '100px',
      },
      {
        id: 'Descripción',
        header: 'Descripción',
        accessorFn: (row) => row.descripcion,
        width: '100px',
      },
      {
        id: 'Descuento',
        header: 'Descuento',
        accessorFn: (row) => numberWithCommas(row.montoDescuento as number, {}),
        right: true,
        width: '160px',
      },
      {
        id: 'Precio Unitario',
        header: 'Precio Unitario',
        accessorFn: (row) => numberWithCommas(row.precioUnitario as number, {}),
        right: true,
        width: '160px',
      },
      {
        id: 'Sub Total',
        header: 'Sub Total',
        accessorFn: (row) => numberWithCommas(row.subTotal as number, {}),
        right: true,
        width: '160px',
      },
    ],
    [], //end
  )

  useEffect(() => {
    setSelectedRows([])
    setValue('detalleFactura', [])
  }, [])
  useEffect(() => {
    if (rowSelection) {
      const p = Object.keys(rowSelection)
      if (p.length > 0) {
        const pvs = getValues('detalle').filter((i) => p.includes(i.nroItem.toString()))
        if (pvs.length > 0) {
          const detalle = pvs.map((d: DetalleFacturaProps) => ({
            nroItem: d.nroItem,
            cantidadOriginal: d.cantidad,
            cantidad: d.cantidad,
            descripcion: d.descripcion,
            montoDescuento: d.montoDescuento,
            precioUnitario: d.precioUnitario,
            subTotal: d.subTotal,
          }))
          setValue('detalleFactura', detalle)
        } else {
          setValue('detalleFactura', [])
        }
      } else {
        setValue('detalleFactura', [])
      }
    }
  }, [rowSelection])
  return (
    <>
      <SimpleCard title={'DATOS DE LA FACTURA ORIGINAL'}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Button
              size={'small'}
              variant={'contained'}
              color={'info'}
              onClick={() => setOpenDialog(true)}
            >
              Seleccionar Factura
            </Button>
            <hr />
          </Grid>
          <Grid item lg={2} md={2} xs={12}>
            <FormTextField
              name="numeroFactura"
              label="Número Factura"
              value={getValues('numeroFactura')}
              autoComplete="off"
            />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <FormTextField
              name="fechaEmision"
              label="Fecha Emisión"
              value={getValues('fechaEmision')}
            />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormTextField
              name="razonSocial"
              label="Razon Social"
              value={getValues('razonSocial')}
            />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormTextField
              name="cuf"
              label="Código Control (C.U.F.)"
              value={getValues('facturaCuf')}
            />
          </Grid>
          <Grid item lg={12} md={12} xs={12} sx={{ pt: 10 }}>
            <Typography gutterBottom variant={'subtitle1'}>
              Detalle
            </Typography>
            <MaterialReactTable
              {...(MuiTableBasicOptionsProps as MRT_TableOptions<DetalleFacturaProps>)}
              columns={columns}
              data={getValues('detalle') || []}
              localization={MRT_Localization_ES}
              enableBottomToolbar={false}
              state={{
                rowSelection,
                density: 'comfortable',
              }}
              enableTopToolbar={false}
              enableRowSelection
              onRowSelectionChange={setRowSelection}
              getRowId={(row) => row.nroItem.toString()}
              muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleSelectedHandler(),
                sx: {
                  cursor: 'pointer',
                },
              })}
            />{' '}
          </Grid>
        </Grid>
      </SimpleCard>
      <>
        <NcdFacturaOriginalDialog
          id={'ncdFacturaOriginalDialogSeleccion'}
          keepMounted={false}
          open={openDialog}
          onClose={(value?: FacturaProps) => {
            setOpenDialog(false)
            if (value) {
              setValue('numeroFactura', value.numeroFactura.toString())
              setValue('fechaEmision', value.fechaEmision)
              setValue('razonSocial', value.cliente.razonSocial)
              setValue('facturaCuf', value.cuf)
              setValue('detalleFactura', [])
              setValue('detalle', value.detalle)
              setSelectedRows([])
            }
          }}
        />
      </>
    </>
  )
}

export default NcdFacturaOriginal

