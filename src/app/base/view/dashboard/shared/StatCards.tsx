import { Card, Fab, Grid, Icon } from '@mui/material'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { lighten, styled } from '@mui/system'
import { Chart, registerables } from 'chart.js'
import { useEffect, useState } from 'react'
import { FC } from 'react'
import { Line } from 'react-chartjs-2'

import { fetchFacturaListado } from '../../../../../app/modules/ventas/api/factura.listado.api'

Chart.register(...registerables)

const ContentBox: any = styled('div')(({ theme }: any): any => ({
  display: 'flex',
  flexWrap: 'wra,p',
  alignItems: 'center',
}))

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}))

const H3: FC<any> = styled('h3')(({ textcolor }: any) => ({
  margin: 0,
  fontWeight: '500',
  marginLeft: '12px',
  color: textcolor,
}))

const H1: FC<any> = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}))

const IconBox = styled('div')(({ theme }) => ({
  width: 16,
  height: 16,
  overflow: 'hidden',
  borderRadius: '300px ',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}))

const Span: FC<any> = styled('span')(({ textcolor }: any) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}))

const StatCards = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [usuariosVentas, setUsuariosVentas] = useState<
    { usuario: string; ventasMensuales: number[] }[]
  >([])
  const [tablaData, setTablaData] = useState({
    nroValidadas: 0,
    nroAnulados: 0,
    totalVentaMes: 0, // Nuevo estado para el monto total de ventas del mes
  })

  useEffect(() => {
    const fetchData = async () => {
      const fetchPage = { limit: 1000, page: 1, reverse: true, query: '' }
      const response = await fetchFacturaListado(fetchPage)

      const estados = response.docs.map((factura) => factura.state)
      const nroValidadas = estados.filter((estado) => estado === 'VALIDADA').length
      const nroAnulados = estados.filter((estado) => estado === 'ANULADO').length
      setTablaData({ nroValidadas, nroAnulados, totalVentaMes: 0 })

      const ventasPorVendedor: { [usuario: string]: number[] } = {}
      let total = 0 // Variable para almacenar el monto total de ventas del mes

      response.docs.forEach((factura: any) => {
        const { usucre, fechaEmision, montoTotalMoneda } = factura
        const mes = obtenerMes(fechaEmision)

        if (!ventasPorVendedor[usucre]) {
          ventasPorVendedor[usucre] = Array(12).fill(0)
        }

        ventasPorVendedor[usucre][mes - 1] += montoTotalMoneda
        total += montoTotalMoneda // Sumar el monto total al total general
      })

      const usuariosVentas = Object.entries(ventasPorVendedor).map(
        ([usuario, ventasMensuales]) => ({
          usuario,
          ventasMensuales,
        }),
      )
      setUsuariosVentas(usuariosVentas)
      setTablaData((prevData) => ({ ...prevData, totalVentaMes: total }))
    }

    fetchData()
  }, [])

  function obtenerMes(fecha: string) {
    const partesFecha = fecha.split('/')
    const mes = parseInt(partesFecha[1], 10)
    return mes
  }

  function getMonthName(month: number) {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]
    return monthNames[month - 1]
  }

  const labels = Array.from({ length: 12 }, (_, i) => getMonthName(i + 1))
  const datasets = usuariosVentas.map((venta, index) => ({
    label: venta.usuario,
    data: venta.ventasMensuales,
    fill: false,
    borderColor: getBorderColor(index),
    tension: 0.1,
    backgroundColor: getBackgroundColor(index),
  }))

  const lineData = {
    labels: labels,
    datasets: datasets,
  }

  const { palette } = useTheme()
  const textError = palette.error.main
  const bgError = lighten(palette.error.main, 0.85)

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Nro. Validadas</TableCell>
                <TableCell align="center">Nro. Anulados</TableCell>
                <TableCell align="center">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{tablaData.nroValidadas}</TableCell>
                <TableCell align="center">{tablaData.nroAnulados}</TableCell>
                <TableCell align="center">
                  {tablaData.nroValidadas - tablaData.nroAnulados}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <h3>Ventas por Mes</h3>
        <Card elevation={3} sx={{ p: 2, height: isMobile ? 300 : 'auto' }}>
          <Line
            title="Ventas por Mes"
            data={lineData}
            width={isMobile ? 450 : 300} // Ajusta el valor de width para PC
            height={isMobile ? 350 : 100} // Ajusta el valor de height para PC
          />
        </Card>
      </Grid>
    </Grid>
  )
}

function getBorderColor(index: number) {
  const colors = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    // Add more colors if needed
  ]
  return colors[index % colors.length]
}

function getBackgroundColor(index: number) {
  const colors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    // Add more colors if needed
  ]
  return colors[index % colors.length]
}

export default StatCards
