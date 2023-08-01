import {
  Delete,
  Edit,
  MenuOpen,
  Newspaper,
  RemoveRedEyeOutlined,
} from '@mui/icons-material'
import { Box, Button, Chip, IconButton, Paper, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import type {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
} from '@tanstack/react-table'
import { SortingState } from '@tanstack/react-table'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
import React, { FunctionComponent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuditIconButton from '../../../base/components/Auditoria/AuditIconButton'
import SimpleMenu, { StyledMenuItem } from '../../../base/components/MyMenu/SimpleMenu'
import StackMenuActionTable from '../../../base/components/MyMenu/StackMenuActionTable'
import { PAGE_DEFAULT, PageInputProps } from '../../../interfaces'
import { genApiQuery } from '../../../utils/helper'
import { localization } from '../../../utils/localization'
import { notSuccess } from '../../../utils/notification'
import { swalAsyncConfirmDialog, swalException } from '../../../utils/swal'
import { alicuotaRouteMap } from '../AlicuotaRoutesMap'
import { apiAlicuotas } from '../api/alicuotas.api'
import { apiProveedorEliminar } from '../api/proveedorEliminar.api'
import { AlicuotaProps } from '../interfaces/alicuota.interface'
import ProveedorActualizarDialog from '../view/ProveedorActualizarDialog'
import ProveedorRegistroDialog from '../view/ProveedorRegistroDialog'

interface OwnProps {}

type Props = OwnProps

const tableColumns: MRT_ColumnDef<AlicuotaProps>[] = [
  {
    accessorKey: 'subPartidaArancelaria',
    header: 'Sub Partida Arancelaria',
    size: 210,
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
  },
  {
    accessorKey: 'alicuotaPorcentual',
    header: 'Alicuota Porcentual',
  },
  {
    accessorKey: 'alicuotaEspecifica',
    header: 'Alicuota Específica',
  },
  {
    accessorFn: (row) => <Chip size={'small'} label={row.state} color={'success'} />,
    id: 'state',
    header: 'Estado',
    accessorKey: 'state',
  },
]

const ProveedorListado: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate()
  const [selectedProveedorCodigo, setSelectedProveedorCodigo] = useState<string | null>(
    null,
  )
  const [openNuevoProveedor, setOpenNuevoProveedor] = useState<boolean>(false)
  const [openActualizarProveedor, setOpenActualizarProveedor] = useState<boolean>(false)
  // ESTADO DATATABLE
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGE_DEFAULT.page,
    pageSize: PAGE_DEFAULT.limit,
  })
  const [rowCount, setRowCount] = useState(0)
  const [isRefetching, setIsRefetching] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  // FIN ESTADO DATATABLE
  const [issRefetching, setIssRefetching] = useState(false)

  const handleRefreshTable = async () => {
    setIssRefetching(true) // Establece el estado de "isRefetching" como verdadero para mostrar el indicador de carga

    try {
      await refetch() // Realiza la recarga de los datos utilizando la función "refetch" proporcionada por react-query
    } catch (error) {
      console.error('Error al recargar los datos:', error)
    }

    setIssRefetching(false) // Establece el estado de "isRefetching" como falso para ocultar el indicador de carga
  }
  // Modifica la función useQuery:
  // Modifica la función useQuery:
  const { data, isError, isLoading, status, refetch } = useQuery<AlicuotaProps[]>(
    [
      'alicuotasListado',
      columnFilters,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
    ],
    // @ts-ignore
    async () => {
      const query = genApiQuery(columnFilters)
      const fetchPagination = {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        reverse: sorting.length <= 0,
        query,
      }
      const docs = await apiAlicuotas(fetchPagination)

      return docs
    },
    {
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  )

  const columns = useMemo(() => tableColumns, [])

  const handleDeleteData = async (data: any) => {
    const resp = data.map((item: any) => item.original.subPartidaArancelaria).join(',')
    await swalAsyncConfirmDialog({
      text: 'Confirma que desea eliminar los registros seleccionados, esta operación no se podra revertir',
      preConfirm: () => {
        return apiProveedorEliminar(resp).catch((err) => {
          swalException(err)
          return false
        })
      },
    }).then((resp) => {
      if (resp.isConfirmed) {
        notSuccess()
        setRowSelection({})
        refetch()
      }
    })
  }
  const getCurrentPageItems = () => {
    const { pageIndex, pageSize } = pagination
    const start = pageIndex * pageSize
    // Ordenar los datos en función de 'subPartidaArancelaria' en orden descendente
    // @ts-ignore
    const sortedData = data?.sort((a, b) =>
      b.subPartidaArancelaria.localeCompare(a.subPartidaArancelaria),
    )
    // Obtener solo los elementos de la página actual después de ordenar
    return sortedData?.slice(start, start + pageSize) || []
  }

  return (
    <>
      <Paper
        elevation={0}
        variant="elevation"
        square
        sx={{ mb: 2, p: 0.5, bgcolor: '#FAFAFA' }}
        className={'asideSidebarFixed'}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          style={{ marginTop: 2 }}
          spacing={{ xs: 1, sm: 1, md: 1, xl: 1 }}
          justifyContent="flex-end"
        >
          <Button
            size={'small'}
            variant="contained"
            onClick={() => setOpenNuevoProveedor(true)}
            startIcon={<Newspaper />}
            color={'success'}
          >
            {' '}
            Nuevo Alicuota
          </Button>
        </Stack>
      </Paper>
      <Box sx={{ mb: 2, m: '1rem' }}>
        <MaterialReactTable
          columns={columns}
          // @ts-ignore
          data={getCurrentPageItems()}
          initialState={{ showColumnFilters: false }}
          manualFiltering
          manualPagination
          manualSorting
          muiToolbarAlertBannerProps={
            isError ? { color: 'error', children: 'Error loading data' } : undefined
          }
          onColumnFiltersChange={setColumnFilters}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          enableDensityToggle={false}
          enableGlobalFilter={false}
          // @ts-ignore
          rowCount={data?.length ?? 0}
          localization={localization}
          state={{
            columnFilters,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            density: 'compact',
            sorting,
            rowSelection,
          }}
          muiSearchTextFieldProps={{
            variant: 'outlined',
            placeholder: 'Busqueda',
            InputLabelProps: { shrink: true },
            size: 'small',
          }}
          enableRowActions
          positionActionsColumn={'first'}
          renderRowActions={({ row }) => (
            <div
              style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', width: 100 }}
            >
              <SimpleMenu
                menuButton={
                  <>
                    <IconButton aria-label="delete">
                      <MenuOpen />
                    </IconButton>
                  </>
                }
              >
                <StyledMenuItem
                  onClick={() => {
                    setSelectedProveedorCodigo(row.original.subPartidaArancelaria)
                    setOpenActualizarProveedor(true)
                  }}
                >
                  <Edit /> Modificar
                </StyledMenuItem>
              </SimpleMenu>
              <AuditIconButton row={row.original} />
            </div>
          )}
          muiTableHeadCellFilterTextFieldProps={{
            sx: { m: '0.5rem 0', width: '95%' },
            variant: 'outlined',
            size: 'small',
          }}
          enableRowSelection
          onRowSelectionChange={setRowSelection}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 120,
            },
          }}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
                <StackMenuActionTable
                  refetch={handleRefreshTable}
                  sx={{ flexGrow: 1 }}
                ></StackMenuActionTable>
                <Button
                  color="error"
                  onClick={() => handleDeleteData(table.getSelectedRowModel().flatRows)}
                  startIcon={<Delete />}
                  variant="contained"
                  size={'small'}
                  disabled={table.getSelectedRowModel().flatRows.length === 0}
                  sx={{
                    height: '28px',
                    top: '0.5rem',
                  }}
                >
                  Eliminar
                </Button>
              </Box>
            )
          }}
        />
      </Box>
      <ProveedorRegistroDialog
        id={'proveedorRegistroDialog'}
        keepMounted={false}
        open={openNuevoProveedor}
        onClose={(value?: AlicuotaProps) => {
          if (value) {
            refetch().then()
          }
          setOpenNuevoProveedor(false)
        }}
      />
      <ProveedorActualizarDialog
        keepMounted={false}
        open={openActualizarProveedor}
        codigo={selectedProveedorCodigo || ''} // Añade esta prop para enviar el código del proveedor
        onClose={(value?: AlicuotaProps) => {
          if (value) {
            refetch().then()
          }
          setSelectedProveedorCodigo(null) // Reinicia el estado selectedProveedorCodigo
          setOpenActualizarProveedor(false)
        }}
      />
    </>
  )
}

export default ProveedorListado
