// noinspection GraphQLUnresolvedReference

import { MonetizationOn, Paid } from '@mui/icons-material'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import InputNumber from 'rc-input-number'
import React, { createContext, FunctionComponent, useEffect, useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import AlertLoading from '../../../../base/components/Alert/AlertLoading'
import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { numberWithCommas } from '../../../../base/components/MyInputs/NumberInput'
import { reactSelectStyles } from '../../../../base/components/MySelect/ReactSelect'
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
import RangeDays from '../../components/Registro/RangeDays'
import { FacturaInitialValues, FacturaInputProps } from '../../interfaces/factura'
import {
  genCalculoTotalesService,
  montoSubTotal,
} from '../../services/operacionesService'
import { composeFactura, composeFacturaValidator } from '../../utils/composeFactura'
import { DescuentoAdicionalDialog } from './ventaTotales/DescuentoAdicionalDialog'
interface OwnProps {
  form: UseFormReturn<FacturaInputProps>
}

type Props = OwnProps

const VentaTotales: FunctionComponent<Props> = (props) => {
  const [dateStringUser, setDateStringUser] = useState('') // define la variable aquí
  const {
    user: { moneda, monedaTienda },
  } = useAuth()
  const {
    form: {
      control,
      reset,
      handleSubmit,
      setValue,
      getValues,
      watch,
      formState: { errors },
    },
  } = props
  const [openDescuentoAdicional, setOpenDescuentoAdicional] = useState(false)
  const mySwal = withReactContent(Swal)
  const inputMoneda = getValues('moneda')
  const tipoCambio = getValues('tipoCambio')

  const [open, setOpen] = useState(false)
  const [tipoCambios, setTipoCambios] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'OTRO'] // Lista de monedas disponibles

  const [selectedCurrency2, setSelectedCurrency2] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeTipoCambio = (event: any) => {
    setTipoCambios(event.target.value)
  }

  const handleGuardar = () => {
    if (selectedCurrency2 === 'BOB') {
      setValue('tipoCambio', 1)
    } else {
      setValue('tipoCambio', tipoCambios)
    }
    handleClose()
  }

  useEffect(() => {
    if (selectedCurrency2 === 'BOB') {
      setTipoCambios(1)
    } else if (selectedCurrency2 === 'USD') {
      setTipoCambios(6.96001)
    } else if (selectedCurrency2 === 'EUR') {
      setTipoCambios(8.20001)
    } else {
      setTipoCambios(1)
    }
  }, [selectedCurrency2])

  const [checked, setChecked] = useState(false)

  const handleChange = (event: any) => {
    // console.log('event.target.checked', event.target.checked)
    setChecked(event.target.checked)
    setValue('notificacion', event.target.checked)
  }

  const handleFocus = (event: any) => event.target.select()
  const onSubmit: SubmitHandler<FacturaInputProps> = async (data) => {
    const inputFactura = composeFactura(data)
    const notificacion = checked
    try {
      const validator = await composeFacturaValidator(inputFactura)
      await swalAsyncConfirmDialog({
        text: '¿Confirma que desea emitir el documento fiscal?',
        preConfirm: async () => {
          try {
            const resp = await fetchFacturaCreate(notificacion, inputFactura)
            reset()
            setChecked(false)
            return resp
          } catch (err) {
            swalException(err)
            // console.log('err', err)
            return false
          }
        },
      }).then((resp) => {
        if (resp.isConfirmed) {
          const { value }: any = resp
          reset({ ...FacturaInitialValues, actividadEconomica: data.actividadEconomica })
          setChecked(false)
          openInNewTab(value.representacionGrafica.pdf)
          mySwal.fire({
            title: `Documento Generado Correctamente`,
            html: (
              <RepresentacionGraficaUrls
                representacionGrafica={value.representacionGrafica}
              />
            ),
          })
        }
      })
    } catch (err) {
      console.log('Error submit factura', err)
      swalException(err)
    }
  }

  const {
    data: monedas,
    isLoading: monedaLoading,
    isError: monedasIsError,
    error: monedasError,
  } = useQuery<MonedaProps[], Error>(['apiMonedas'], async () => {
    // console.log('apiMonedas')
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
        // setValue('tipoCambio', mt.tipoCambio)
      }
      return resp
    }
    return []
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
    setValue('inputVuelto', totales.vuelto)
    setValue('total', totales.total)
  }, [getValues('descuentoAdicional'), getValues('inputMontoPagar')])

  return (
    <>
      <Grid>
        <div style={{ display: 'flex', alignItems: 'center' }}></div>
      </Grid>
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
                  styles={{
                    ...reactSelectStyles,
                    control: (styles) => ({
                      ...styles,
                      fontWeight: 'bold',
                      fontSize: '1.2em',
                    }),
                  }}
                  name="moneda"
                  placeholder={'Seleccione la moneda de venta'}
                  value={field.value}
                  onChange={async (val: any) => {
                    handleGuardar()
                    setSelectedCurrency2(val.sigla)
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
                {numberWithCommas(calculoMoneda(getValues('montoSubTotal') || 0), {})}
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
              <>
                <Link
                  href="#"
                  onClick={() => handleOpen()}
                  variant="subtitle1"
                  underline="hover"
                >
                  {tipoCambios} BOL
                  <span style={{ fontSize: '0.8em' }}> {''}</span>
                </Link>
              </>
            }
          >
            <ListItemText primary={<strong>Tipo de Cambio</strong>} />
          </ListItem>

          <div>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#fff',
                  padding: '16px',
                  borderRadius: '8px',
                  width: '400px',
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Tipo de Cambio {selectedCurrency} a BOB
                </Typography>
                <DialogContent dividers>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        select
                        label="Moneda"
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        fullWidth
                      >
                        {currencies.map((currency) => (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Tipo de Cambio"
                        type="number"
                        value={tipoCambios}
                        onChange={(e) => setTipoCambios(parseFloat(e.target.value))}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button onClick={handleGuardar}>Aceptar</Button>
                </DialogActions>
              </Box>
            </Modal>
          </div>

          <ListItem
            style={{ padding: 0 }}
            secondaryAction={
              <Typography variant="subtitle1" gutterBottom>
                {numberWithCommas(calculoMoneda(getValues('total') || 0), {})}
                <span style={{ fontSize: '0.8em' }}> {inputMoneda?.sigla || ''}</span>
              </Typography>
            }
          >
            <ListItemText primary={<strong>TOTAL</strong>} />
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
                {numberWithCommas(calculoMoneda(getValues('montoPagar') || 0), {})}
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

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9} md={9} lg={9}>
              <h3 style={{ paddingInlineStart: 30 }}>Notificar al Correo Electrónico</h3>
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
              <Switch
                defaultChecked={false}
                sx={{ transform: 'scale(1.5)' }}
                checked={checked}
                onChange={handleChange}
              />
            </Grid>
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
