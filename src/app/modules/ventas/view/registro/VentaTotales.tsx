// noinspection GraphQLUnresolvedReference

import { MonetizationOn, Paid } from '@mui/icons-material'
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Switch,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import InputNumber from 'rc-input-number'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import AlertLoading from '../../../../base/components/Alert/AlertLoading'
import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { numberWithCommas } from '../../../../base/components/MyInputs/NumberInput'
import { reactSelectStyle } from '../../../../base/components/MySelect/ReactSelect'
import RepresentacionGraficaUrls from '../../../../base/components/RepresentacionGrafica/RepresentacionGraficaUrls'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import useAuth from '../../../../base/hooks/useAuth'
import { genReplaceEmpty, openInNewTab } from '../../../../utils/helper'
import { notError } from '../../../../utils/notification'
import { swalAsyncConfirmDialog, swalException } from '../../../../utils/swal'
import { genRound } from '../../../../utils/utils'
import { apiMonedas } from '../../../base/moneda/api/monedaListado.api'
import { MonedaProps } from '../../../base/moneda/interfaces/moneda'
import { fetchFacturaCreate } from '../../api/facturaCreate.api'
import { FacturaInitialValues, FacturaInputProps } from '../../interfaces/factura'
import {
  genCalculoTotalesService,
  montoSubTotal,
} from '../../services/operacionesService'
import { composeFactura, composeFacturaValidator } from '../../utils/composeFactura'
import { DescuentoAdicionalDialog } from './ventaTotales/DescuentoAdicionalDialog'
import printJS from 'print-js'

interface OwnProps {
  form: UseFormReturn<FacturaInputProps>
}

type Props = OwnProps

const VentaTotales: FunctionComponent<Props> = (props) => {
  const {
    user: { moneda, monedaTienda, tipoRepresentacionGrafica },
  } = useAuth()
  const {
    form: {
      control,
      reset,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
    },
  } = props
  const [openDescuentoAdicional, setOpenDescuentoAdicional] = useState(false)
  const mySwal = withReactContent(Swal)
  const inputMoneda = getValues('moneda')
  const tipoCambio = getValues('tipoCambio')

  /// Obtener los detalles del formulario usando getValues
  // Obtener los detalles del formulario usando getValues
  const detalles = getValues('detalle')
  const total = getValues('total')
  const descuentoAdd = getValues('descuentoAdicional')

  // Inicializar variables para almacenar las sumas de los montos
  let montoTotal = 0
  let montoIceEspecificoTotal = 0
  let montoIcePorcentual = 0
  let montoTotalDescuento = 0

  detalles.forEach((detalle, index) => {
    const cantidad = detalle?.cantidad || 0
    const precioUnitario = detalle?.precioUnitario || 0
    const montoDescuento = detalle?.montoDescuento || 0
    const alicuotaEspecifica = detalle?.alicuotaEspecifica || 0
    const alicuotaPorcentual = (detalle?.alicuotaPorcentual || 0) / 100 // Dividir por 100 el porcentaje
    // Calcular el monto ICE porcentual para el producto actual
    const alicuotaIva = (cantidad * precioUnitario - montoDescuento) * 0.13
    const precioNetoVentaIce = cantidad * precioUnitario - montoDescuento - alicuotaIva
    const montoIcePorcentualProducto = precioNetoVentaIce * alicuotaPorcentual

    // Sumar el monto ICE porcentual al total
    montoIcePorcentual += montoIcePorcentualProducto

    // Calcular el monto ICE específico para el producto actual
    const montoIceEspecificoProducto = cantidad * alicuotaEspecifica

    // Sumar el monto ICE específico al total
    montoIceEspecificoTotal += montoIceEspecificoProducto

    // Calcular el subtotal para el producto actual
    const subTotal =
      cantidad * precioUnitario -
      montoDescuento +
      (montoIcePorcentualProducto + montoIceEspecificoProducto)

    // Sumar el subtotal al monto total
    montoTotal += subTotal
    montoTotalDescuento += montoDescuento
  })

  // Calcular el monto total sujeto a IVA
  let calculosTotales = montoTotal - descuentoAdd

  const [checked, setChecked] = useState(false)

  const handleChange = (event: any) => {
    // console.log('event.target.checked', event.target.checked)
    setChecked(event.target.checked)
  }

  const handleFocus = (event: any) => event.target.select()

  /**
   * @description validacion, Composición y envio del formulario de factura
   * @param data
   */
  const onSubmit: SubmitHandler<FacturaInputProps> = async (data) => {
    const inputFactura = composeFactura(data)
    const notificacion = true
    const validator = await composeFacturaValidator(inputFactura).catch((err: Error) => {
      notError(err.message)
    })

    if (validator) {
      await swalAsyncConfirmDialog({
        text: '¿Confirma que desea emitir el documento fiscal?',
        preConfirm: async () => {
          return fetchFacturaCreate(notificacion, inputFactura).catch((err) => {
            swalException(err)
            return false
          })
        },
      }).then((resp) => {
        if (resp.isConfirmed) {
          const { value }: any = resp
          reset({ ...FacturaInitialValues, actividadEconomica: data.actividadEconomica })
          if (tipoRepresentacionGrafica === 'pdf') {
            // si son  pc y laptos usamos printJS y si no usamos openInNewTab
            printJS(value.representacionGrafica.pdf)
            // openInNewTab(value.representacionGrafica.pdf)
          }

          if (tipoRepresentacionGrafica === 'rollo')
            openInNewTab(value.representacionGrafica.rollo)

          mySwal.fire({
            title: `Documento generado correctamente`,
            html: (
              <RepresentacionGraficaUrls
                representacionGrafica={value.representacionGrafica}
              />
            ),
          })
        }
      })
    }
  }

  const {
    data: monedas,
    isLoading: monedaLoading,
    isError: monedasIsError,
    error: monedasError,
  } = useQuery<MonedaProps[], Error>({
    queryKey: ['apiMonedas'],
    queryFn: async () => {
      const resp = await apiMonedas()
      if (resp.length > 0) {
        // monedaUsuario
        const sessionMoneda = resp.find(
          (i) => i.codigo === genReplaceEmpty(inputMoneda?.codigo, moneda.codigo),
        )
        // montoTienda
        const mt = resp.find((i) => i.codigo === monedaTienda.codigo)
        if (sessionMoneda && mt) {
          setValue('moneda', sessionMoneda)
          setValue('tipoCambio', mt.tipoCambio)
        }
        return resp
      }
      return []
    },
  })

  const calculoMoneda = (monto: number): number => {
    try {
      return genRound((monto * tipoCambio) / genRound(inputMoneda!.tipoCambio))
    } catch (e) {
      return monto
    }
  }

  useEffect(() => {
    const totales = genCalculoTotalesService(getValues())
    setValue('montoSubTotal', totales.subTotal)
    setValue('montoPagar', totales.montoPagar)
    const inputMontoPaga = getValues('inputMontoPagar')
    setValue(
      'inputVuelto',
      montoTotal -
        descuentoAdd -
        montoIcePorcentual -
        montoIceEspecificoTotal -
        inputMontoPaga,
    )
    // setValue('total', totales.total)
  }, [
    getValues('descuentoAdicional'),
    getValues('inputMontoPagar'),
    getValues('detalle'),
    getValues('moneda'),
  ])

  return (
    <>
      <SimpleCard title="Cálculo de los totales" childIcon={<MonetizationOn />}>
        {monedaLoading ? (
          <AlertLoading />
        ) : (
          <Controller
            name="moneda"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.moneda)}>
                <MyInputLabel shrink>Moneda de venta</MyInputLabel>
                <Select<MonedaProps>
                  {...field}
                  styles={reactSelectStyle(Boolean(errors.moneda))}
                  name="moneda"
                  placeholder={'Seleccione la moneda de venta'}
                  value={field.value}
                  onChange={async (val: any) => {
                    field.onChange(val)
                  }}
                  onBlur={async (val) => {
                    field.onBlur()
                  }}
                  isSearchable={false}
                  options={monedas}
                  getOptionValue={(item) => item.codigo.toString()}
                  getOptionLabel={(item) =>
                    `${item.descripcion} (${item.sigla}) - ${numberWithCommas(
                      item.tipoCambio,
                      {},
                    )}`
                  }
                />
                {errors.moneda && (
                  <FormHelperText>{errors.moneda?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        )}

        <List dense sx={{ mt: 2 }}>
          <Divider />
          <ListItem
            style={{ padding: 0 }}
            secondaryAction={
              <Typography variant="subtitle1" gutterBottom>
                {numberWithCommas(calculoMoneda(montoTotal || 0), {})}
                <span style={{ fontSize: '0.8em' }}> {inputMoneda?.sigla || ''}</span>
              </Typography>
            }
          >
            <ListItemText primary={<strong>SUB-TOTAL</strong>} />
          </ListItem>

          <ListItem
            style={{ padding: 0 }}
            secondaryAction={
              <>
                <Link
                  href="#"
                  onClick={() => setOpenDescuentoAdicional(true)}
                  variant="subtitle1"
                  underline="hover"
                >
                  {numberWithCommas(
                    calculoMoneda(getValues('descuentoAdicional')) || 0,
                    {},
                  )}
                  <span style={{ fontSize: '0.8em' }}> {inputMoneda?.sigla || ''}</span>
                </Link>
                <DescuentoAdicionalDialog
                  id="ringtone-menu"
                  keepMounted={false}
                  open={openDescuentoAdicional}
                  onClose={(newValue) => {
                    setOpenDescuentoAdicional(false)
                    if (newValue || newValue === 0) {
                      setValue('descuentoAdicional', newValue)
                    }
                  }}
                  value={getValues('descuentoAdicional') || 0}
                />
              </>
            }
          >
            <ListItemText primary={<strong>DESCUENTO ADICIONAL</strong>} />
          </ListItem>

          <ListItem
            style={{ padding: 0 }}
            secondaryAction={
              <Typography variant="subtitle1" gutterBottom>
                {numberWithCommas(calculoMoneda(montoTotal - descuentoAdd), {
                  maximumFractionDigits: 2,
                })}
                <span style={{ fontSize: '0.8em' }}> {inputMoneda?.sigla || ''}</span>
              </Typography>
            }
          >
            <ListItemText primary={<strong>TOTAL</strong>} />
          </ListItem>

          <ListItem
            style={{ padding: 0 }}
            secondaryAction={
              <Typography variant="subtitle1" gutterBottom>
                {numberWithCommas(calculoMoneda(montoIceEspecificoTotal), {
                  maximumFractionDigits: 2,
                })}
                <span style={{ fontSize: '0.8em' }}> {inputMoneda?.sigla || ''}</span>
              </Typography>
            }
          >
            <ListItemText primary={<strong>TOTAL ICE ESPECÍFICO</strong>} />
          </ListItem>

          <ListItem
            style={{ padding: 0 }}
            secondaryAction={
              <Typography variant="subtitle1" gutterBottom>
                {numberWithCommas(calculoMoneda(montoIcePorcentual), {
                  maximumFractionDigits: 2,
                })}
                <span style={{ fontSize: '0.8em' }}> {inputMoneda?.sigla || ''}</span>
              </Typography>
            }
          >
            <ListItemText primary={<strong>TOTAL ICE PORCENTUAL</strong>} />
          </ListItem>
          <ListItem
            style={{ padding: 0 }}
            secondaryAction={
              <Typography variant="subtitle1" gutterBottom>
                {numberWithCommas(
                  calculoMoneda(
                    montoTotal -
                      descuentoAdd -
                      montoIcePorcentual -
                      montoIceEspecificoTotal,
                  ),
                  {
                    maximumFractionDigits: 2,
                  },
                )}
                <span style={{ fontSize: '0.8em' }}> {inputMoneda?.sigla || ''}</span>
              </Typography>
            }
          >
            <ListItemText primary={<strong>IMPORTE BASE CRÉDIO FISCAL</strong>} />
          </ListItem>

          <Divider
            variant="inset"
            component="li"
            style={{ marginTop: 10, marginBottom: 20 }}
          />
          <ListItem
            style={{ padding: 0 }}
            secondaryAction={
              <Typography variant="h6" gutterBottom>
                {numberWithCommas(
                  calculoMoneda(
                    montoTotal -
                      descuentoAdd -
                      montoIcePorcentual -
                      montoIceEspecificoTotal,
                  ),
                  {
                    maximumFractionDigits: 2,
                  },
                )}
                <span style={{ fontSize: '0.8em' }}> {inputMoneda?.sigla || ''}</span>
              </Typography>
            }
          >
            <ListItemText primary={<strong>MONTO A PAGAR</strong>} />
          </ListItem>
        </List>

        <Divider style={{ marginTop: 10, marginBottom: 20 }} color={'red'} />
        <Grid sx={{ flexGrow: 1 }} container spacing={3}>
          <Grid item xs={12} md={7} lg={7}>
            <Controller
              control={control}
              name={'inputMontoPagar'}
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.inputMontoPagar?.message)}>
                  <MyInputLabel shrink>Ingrese Monto</MyInputLabel>
                  <InputNumber
                    {...field}
                    min={0}
                    id={'montoPagar'}
                    className="inputMontoPagar"
                    value={field.value}
                    onFocus={handleFocus}
                    onChange={(value: number | null) => {
                      // @ts-ignore
                      field.onChange(value)
                    }}
                    formatter={numberWithCommas}
                  />
                  <FormHelperText>{errors.inputMontoPagar?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <small>Vuelto / Saldo</small>
            <Typography variant="h6" gutterBottom mr={2} align={'right'} color={'red'}>
              {numberWithCommas(calculoMoneda(getValues('inputVuelto') || 0), {})}
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              fullWidth={true}
              color="success"
              startIcon={<Paid />}
            >
              REALIZAR PAGO
            </Button>
          </Grid>
        </Grid>
      </SimpleCard>
    </>
  )
}
export default VentaTotales

