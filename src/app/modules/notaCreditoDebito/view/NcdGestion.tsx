import {
  DocumentScanner,
  FileOpen,
  LayersClear,
  MenuOpen,
  PictureAsPdf,
} from '@mui/icons-material'
import { Button, Chip, Grid, IconButton, Paper, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_TableOptions,
} from 'material-react-table'
import React, { FC, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import AuditIconButton from '../../../base/components/Auditoria/AuditIconButton'
import SimpleContainer from '../../../base/components/Container/SimpleContainer'
import { SimpleItem } from '../../../base/components/Container/SimpleItem'
import SimpleRowMenu from '../../../base/components/Container/SimpleRow'
import { numberWithCommas } from '../../../base/components/MyInputs/NumberInput'
import SimpleMenu, { SimpleMenuItem } from '../../../base/components/MyMenu/SimpleMenu'
import StackMenuActionTable from '../../../base/components/MyMenu/StackMenuActionTable'
import Breadcrumb from '../../../base/components/Template/Breadcrumb/Breadcrumb'
import { apiEstado, PAGE_DEFAULT, PageProps } from '../../../interfaces'
import { genApiQuery, openInNewTab } from '../../../utils/helper'
import { localization } from '../../../utils/localization'
/*import {
  muiTableApiEstado,
  muiTableHeadCellFilterTextFieldProps,
} from '../../../utils/materialReactTableUtils'*/
import { apiNotasCreditoDebito } from '../api/ncd.api'
import { NcdProps } from '../interfaces/ncdInterface'
import { ncdRouteMap } from '../NotaCreditoDebitoRoutesMap'
import { muiTableApiEstado } from '../../../utils/muiTable/materialReactTableUtils'
import { MuiTableAdvancedOptionsProps } from '../../../utils/muiTable/muiTableAdvancedOptionsProps'

const tableColumns: MRT_ColumnDef<NcdProps>[] = [
  {
    header: 'Nro.',
    accessorKey: 'numeroFactura',
    size: 140,
  },
  {
    accessorKey: 'fechaEmisionFactura',
    header: 'Fecha FCV',
    id: 'fechaEmisionFactura',
    size: 180,
  },
  {
    accessorKey: 'fechaEmision',
    header: 'Fecha NCD',
    id: 'fechaEmision',
    size: 180,
  },
  {
    header: 'Número NCD',
    accessorKey: 'numeroNotaCreditoDebito',
    size: 140,
  },
  {
    header: 'Razon Social',
    id: 'cliente.razonSocial',
    accessorKey: 'cliente.razonSocial',
    maxSize: 250,
    minSize: 200,
  },
  {
    id: 'cliente.numeroDocumento',
    header: 'Nro. Documento',
    accessorFn: (row) => (
      <span>
        {row.cliente.numeroDocumento}{' '}
        {row.cliente.complemento ? `-${row.cliente.complemento}` : ''}
      </span>
    ),
    filterFn: (row, id, filterValue) =>
      row.original.cliente.numeroDocumento.startsWith(filterValue),
    size: 155,
  },
  {
    accessorKey: 'cuf',
    id: 'cuf',
    header: 'C.U.F.',
  },
  {
    accessorKey: 'montoTotalOriginal',
    header: 'Monto.Original',
    Cell: ({ cell }) => <span>{numberWithCommas(cell.getValue() as number, {})}</span>,
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
  {
    accessorKey: 'montoTotalDevuelto',
    header: 'Monto.Devuelto',
    Cell: ({ cell }) => <span>{numberWithCommas(cell.getValue() as number, {})}</span>,
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
  {
    accessorKey: 'state',
    header: 'Estado',
    accessorFn: (row) => (
      <Chip
        color={
          row.state === apiEstado.validada
            ? 'success'
            : row.state === apiEstado.pendiente
              ? 'warning'
              : 'error'
        }
        label={row.state}
        size={'small'}
      />
    ),
    filterVariant: 'select',
    filterSelectOptions: muiTableApiEstado,
    filterFn: (row, id, filterValue) =>
      row.original.state.toLowerCase().startsWith(filterValue.toLowerCase()),
  },
]

const NcdGestion: FC<any> = () => {
  const [openAnularNcd, setOpenAnularNcd] = useState(false)

  const [openExport, setOpenExport] = useState(false)
  // DATA TABLE
  const [rowCount, setRowCount] = useState(0)
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: PAGE_DEFAULT.page,
    pageSize: PAGE_DEFAULT.limit,
  })
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({})
  // FIN DATA TABLE
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
  const {
    data: gestionProductos,
    isError,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<NcdProps[]>({
    queryKey: [
      'gestionNotas',
      columnFilters,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
    ],
    queryFn: async () => {
      try {
        const query = genApiQuery(columnFilters)
        const fetchPagination: PageProps = {
          ...PAGE_DEFAULT,
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          reverse: sorting.length <= 0,
          query,
        }
        const response = await apiNotasCreditoDebito(fetchPagination)
        if (response) {
          const { pageInfo, docs } = await apiNotasCreditoDebito(fetchPagination)
          setRowCount(pageInfo.totalDocs)
          return docs
        } else {
          return []
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  })
  const columns = useMemo(() => tableColumns, [])
  return (
    <>
      <SimpleContainer>
        <div className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Notas de crédito debito', path: ncdRouteMap.gestion },
              { name: 'Gestión de Notas' },
            ]}
          />
        </div>

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
              startIcon={<DocumentScanner />}
              variant={'contained'}
              color={'success'}
              component={RouterLink}
              to={ncdRouteMap.nuevo}
            >
              Nueva Nota de Crédito Debito
            </Button>
          </Stack>
        </Paper>

        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <MaterialReactTable
              {...(MuiTableAdvancedOptionsProps as MRT_TableOptions<NcdProps>)}
              columns={columns} //must be memoized
              data={gestionProductos ?? []} //must be memoized
              initialState={{
                showColumnFilters: true,
                columnVisibility: {
                  cuf: false,
                  fechaEmisionFactura: false,
                  fechaEmision: false,
                },
              }}
              manualFiltering
              manualPagination
              manualSorting
              muiToolbarAlertBannerProps={
                isError
                  ? {
                      color: 'error',
                      children: 'Error Cargando Datos',
                    }
                  : undefined
              }
              onColumnFiltersChange={setColumnFilters}
              onPaginationChange={setPagination}
              onSortingChange={setSorting}
              enableDensityToggle={false}
              enableGlobalFilter={false}
              rowCount={rowCount}
              state={{
                isLoading,
                columnFilters,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isRefetching,
                sorting,
                density: 'compact',
                columnPinning: { right: ['actions'] },
                rowSelection,
              }}
              enableRowActions
              positionActionsColumn="first"
              displayColumnDefOptions={{
                'mrt-row-actions': {
                  header: 'Acciones', //change header text
                  size: 110, //make actions column wider
                },
              }}
              renderRowActions={({ row }) => (
                <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
                  <SimpleMenu
                    menuButton={
                      <>
                        <IconButton aria-label="delete">
                          <MenuOpen />
                        </IconButton>
                      </>
                    }
                  >
                    <SimpleMenuItem
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <LayersClear /> Anular Documento
                    </SimpleMenuItem>

                    <SimpleMenuItem
                      onClick={() => {
                        openInNewTab(row.original.representacionGrafica.pdf)
                      }}
                    >
                      <PictureAsPdf /> Pdf Medio Oficio
                    </SimpleMenuItem>

                    <SimpleMenuItem
                      onClick={() => {
                        openInNewTab(row.original.representacionGrafica.xml)
                      }}
                    >
                      <FileOpen /> Xml
                    </SimpleMenuItem>

                    <SimpleMenuItem
                      onClick={() => {
                        openInNewTab(row.original.representacionGrafica.sin)
                      }}
                    >
                      <FileOpen /> Url S.I.N.
                    </SimpleMenuItem>
                  </SimpleMenu>
                  <AuditIconButton row={row.original} />
                </div>
              )}
              /*muiTableHeadCellFilterTextFieldProps={{
                ...muiTableHeadCellFilterTextFieldProps,
              }}*/
              renderTopToolbarCustomActions={({ table }) => {
                return (
                  <StackMenuActionTable
                    refetch={handleRefreshTable}
                    sx={{ flexGrow: 1 }}
                    justifyContent={'flex-start'}
                  ></StackMenuActionTable>
                )
              }}
            />
          </Grid>
        </Grid>
        <Box py="12px" />
      </SimpleContainer>
    </>
  )
}

export default NcdGestion

