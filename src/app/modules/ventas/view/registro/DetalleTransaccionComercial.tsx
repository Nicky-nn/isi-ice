import { Delete, TextIncrease } from '@mui/icons-material'
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import InputNumber from 'rc-input-number'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import AlertLoading from '../../../../base/components/Alert/AlertLoading'
import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { numberWithCommas } from '../../../../base/components/MyInputs/NumberInput'
import { reactSelectStyles } from '../../../../base/components/MySelect/ReactSelect'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import useAuth from '../../../../base/hooks/useAuth'
import { swalException } from '../../../../utils/swal'
import { apiProductosVariantesBusqueda } from '../../../productos/api/productosVariantesBusqueda.api'
import ProductoExplorarDialog from '../../../productos/components/ProductoExplorarDialog'
import { ProductoVarianteProps } from '../../../productos/interfaces/producto.interface'
import { FacturaAlquilerDetalleInput, FacturaInputProps } from '../../interfaces/factura'
import {
  genCalculoTotalesService,
  montoSubTotal,
} from '../../services/operacionesService'
import AgregarArticuloDialog from './AgregarArticuloDialog'

interface OwnProps {
  form: UseFormReturn<FacturaInputProps>
  periodoDate: string
}

type Props = OwnProps
/**
 * @description Detalle de la transaccion comercial
 * @param props
 * @constructor
 */

/* El código anterior es un componente funcional de React que define un formulario con una matriz de campo denominada
"detalle". Utiliza los ganchos useState y useFieldArray de la biblioteca React Hook Form para administrar
el estado del formulario y la matriz de campo. También usa el enlace useAuth para obtener la moneda del usuario.
y la función handleChange para agregar un nuevo elemento a la matriz de campo "detalle" cuando se ingresa una nueva
seleccionado. El código también define dos variables de estado, "openAddArticle" y
"openExploreProduct", que se utilizan para controlar la visibilidad de dos ventanas modales. */
export const DetalleTransaccionComercial: FC<Props> = (props) => {
  const [periodoDate, setPeriodoDate] = useState('')
  const {
    form: {
      control,
      setValue,
      getValues,
      formState: { errors },
    },
  } = props
  const { user } = useAuth()
  const monedaTienda = user.monedaTienda

  const { fields, append, prepend, remove, insert, update } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'detalle', // unique name for your Field Array
  })

  const [openAgregarArticulo, setOpenAgregarArticulo] = useState(false)
  const [openExplorarProducto, setOpenExplorarProducto] = useState(false)
  const handleFocus = (event: any) => event.target.select()

  const handleChange = async (newInput: ProductoVarianteProps) => {
    if (newInput) {
      // Verificamos si ya existe el producto (no se verifica)
      prepend({
        ...(newInput as FacturaAlquilerDetalleInput),
        codigoProductoSin: newInput.sinProductoServicio.codigoProducto,
        cantidad: 1,
        cantidadIce: 1,
        precioUnitario: newInput.precio,
        montoDescuento: 0,
        subtotal: 0,
        // descripcion: newInput.sinProductoServicio.descripcion,
      } as FacturaAlquilerDetalleInput)
      /*
      if (!producto) {

      } else {
        notDanger('El producto ya se adicionó');
      }*/
    }
  }

  // AÑADIMOS O SETEAMOS A CERO EL DETALLE EXTRA
  const handleAddDetalleExtra = (
    index: number,
    newInput: FacturaAlquilerDetalleInput,
  ) => {
    update(index, newInput)
  }

  const cargarVariantesProductos = async (inputValue: string): Promise<any[]> => {
    try {
      const productos = await apiProductosVariantesBusqueda(inputValue)
      // console.log('Actividad Economica', getValues('actividadEconomica.codigoActividad'))
      if (productos) {
        const productosFiltrados = productos.filter(
          (producto: any) =>
            producto.sinProductoServicio.codigoActividad ===
            getValues('actividadEconomica.codigoActividad'),
        )
        return productosFiltrados
      }
      return []
    } catch (e: any) {
      swalException(e)
      return []
    }
  }
  useEffect(() => {
    const totales = genCalculoTotalesService(getValues())
    setValue('montoSubTotal', totales.subTotal)
    setValue('montoPagar', totales.montoPagar)
    setValue('inputVuelto', totales.vuelto)
    setValue('total', totales.total)
  }, [fields])

  useEffect(() => {
    if (getValues('actividadEconomica')) cargarVariantesProductos('').then()
  }, [getValues('actividadEconomica')])

  if (getValues('actividadEconomica.codigoActividad')) {
    return (
      <>
        <SimpleCard title="Servicios">
          <Grid container spacing={1}>
            <Grid item xs={12} lg={7} md={7} sm={12}>
              <FormControl fullWidth>
                <MyInputLabel shrink>Búsqueda de Servicios</MyInputLabel>
                <AsyncSelect<ProductoVarianteProps>
                  cacheOptions={false}
                  defaultOptions={false}
                  styles={reactSelectStyles}
                  menuPosition={'fixed'}
                  name="productosServicios"
                  placeholder={'Seleccione Servicio'}
                  loadOptions={cargarVariantesProductos}
                  isClearable={true}
                  value={null}
                  getOptionValue={(item) => item.codigoProducto}
                  getOptionLabel={(item) => `${item.codigoProducto} - ${item.nombre}`}
                  onChange={(val: any) => handleChange(val)}
                  noOptionsMessage={() =>
                    'Ingrese referencia al Producto/Servicio deseado'
                  }
                  loadingMessage={() => 'Buscando...'}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={5} lg={5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button variant="outlined" onClick={() => setOpenExplorarProducto(true)}>
                  Explorar Servicios
                </Button>
                <Button onClick={() => setOpenAgregarArticulo(true)} variant="outlined">
                  Servicio Personalizado
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{ marginRight: '8px', fontWeight: 'bold', fontSize: '15px' }}
                ></span>
              </div>
              {periodoDate && (
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
                    Período Seleccionado:
                  </span>{' '}
                  {periodoDate}
                </div>
              )}
            </Grid>

            <Grid item xs={12}>
              <div className="responsive-table" style={{ marginTop: 20 }}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: 400 }}>
                        Producto
                      </th>
                      <th scope="col" style={{ width: 160 }}>
                        Cantidad
                      </th>
                      <th scope="col" style={{ width: 160 }}>
                        Cantidad ICE
                      </th>
                      <th scope="col" style={{ width: 160 }}>
                        Precio ({monedaTienda.sigla})
                      </th>
                      <th scope="col" style={{ width: 160 }}>
                        Descuento ({monedaTienda.sigla})
                      </th>
                      <th scope="col" style={{ width: 150 }}>
                        SUB Total ({monedaTienda.sigla})
                      </th>
                      <th scope="col" style={{ width: 100 }}>
                        Opciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.length > 0 &&
                      fields.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td data-label="Producto">
                              <List
                                dense={true}
                                sx={{
                                  width: '400%',
                                  maxWidth: 360,
                                  bgcolor: 'background.paper',
                                  padding: 0,
                                }}
                              >
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar
                                      alt="Remy Sharp"
                                      // src="..//../../../../../public//assets//images//"
                                      // src="./static/images/avatar/1.jpg"
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <>
                                        <Typography
                                          variant="subtitle2"
                                          gutterBottom={true}
                                        >
                                          {item.nombre}{' '}
                                          <span style={{ fontWeight: 'normal' }}>
                                            {item.detalleExtra || ''}
                                          </span>
                                        </Typography>
                                      </>
                                    }
                                    secondary={
                                      <Fragment>
                                        <Typography
                                          sx={{ display: 'inline' }}
                                          component="span"
                                          variant="body2"
                                          color="text.primary"
                                        >
                                          {`Código: ${item.codigoProducto}`} <br />
                                          {`Marca Ice: ${item.marcaIce}`} <br />
                                          {`Alicuota Específica: ${item.alicuotaEspecifica}`}
                                          <br />
                                          {`Alicuota Porcentual: ${item.alicuotaPorcentual}`}{' '}
                                        </Typography>{' '}
                                        <br />
                                        {`${item.unidadMedida.descripcion || ''}`}
                                      </Fragment>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </td>
                            <td data-label="CANTIDAD">
                              <InputNumber
                                min={0.1}
                                value={item.cantidad}
                                onFocus={handleFocus}
                                onChange={(cantidad: number | null) => {
                                  if (cantidad) {
                                    if (cantidad >= 0) {
                                      update(index, {
                                        ...item,
                                        cantidad,
                                      })
                                    }
                                  }
                                }}
                                formatter={(value, info) =>
                                  numberWithCommas(value, info, 5)
                                }
                              />
                            </td>
                            <td data-label="CANTIDAD ICE">
                              <InputNumber
                                min={0.1}
                                value={item.marcaIce === 2 ? 0 : item.cantidadIce}
                                onFocus={handleFocus}
                                onChange={(cantidadIce: number | null) => {
                                  if (cantidadIce !== null) {
                                    if (item.marcaIce === 2) {
                                      // Si marcaIce es 2, establecer cantidadIce en 0 y no permitir la edición.
                                      update(index, {
                                        ...item,
                                        cantidadIce: 0,
                                      })
                                    } else {
                                      // Si marcaIce no es 2, permitir la edición del valor de cantidadIce.
                                      if (cantidadIce >= 0) {
                                        update(index, {
                                          ...item,
                                          cantidadIce,
                                        })
                                      }
                                    }
                                  }
                                }}
                                formatter={(value, info) =>
                                  numberWithCommas(value, info, 5)
                                }
                                readOnly={item.marcaIce === 2} // Deshabilitar la edición si marcaIce es 2.
                              />
                            </td>

                            <td data-label={`PRECIO (${monedaTienda.sigla})`}>
                              <InputNumber
                                min={0}
                                value={item.precioUnitario}
                                onFocus={handleFocus}
                                onChange={(precio: number | null) => {
                                  if (precio) {
                                    if (precio >= 0 && precio >= item.montoDescuento) {
                                      update(index, { ...item, precioUnitario: precio })
                                    } else {
                                      toast.warn(
                                        'El precio no puede ser menor al descuento',
                                      )
                                    }
                                  }
                                }}
                                formatter={(value, info) =>
                                  numberWithCommas(value, info, 5)
                                }
                              />
                            </td>
                            <td data-label={`DESCUENTO (${monedaTienda.sigla})`}>
                              <InputNumber
                                min={0}
                                max={item.precioUnitario - 0.1}
                                value={item.montoDescuento || 0}
                                onFocus={handleFocus}
                                onChange={(montoDescuento: number | null) => {
                                  if (montoDescuento! >= 0) {
                                    if (montoDescuento! <= item.precioUnitario) {
                                      update(index, {
                                        ...item,
                                        montoDescuento: montoDescuento!,
                                      })
                                    } else {
                                      toast.warn(
                                        'El descuento no puede ser mayor al precio',
                                      )
                                    }
                                  }
                                }}
                                formatter={(value, info) =>
                                  numberWithCommas(value, info, 5)
                                }
                              />
                            </td>
                            <td
                              data-label={`SUB-TOTAL (${monedaTienda.sigla || ''})`}
                              style={{ textAlign: 'right', backgroundColor: '#fafafa' }}
                            >
                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                component="div"
                              >
                                <strong>
                                  {numberWithCommas(
                                    item.cantidad * item.precioUnitario -
                                      item.montoDescuento,
                                    {},
                                  )}
                                </strong>
                              </Typography>
                            </td>
                            <td data-label="OPCIONES" style={{ textAlign: 'right' }}>
                              <IconButton onClick={() => remove(index)}>
                                <Delete color="warning" />
                              </IconButton>
                              <IconButton
                                onClick={async () => {
                                  const { value: text } = await Swal.fire({
                                    input: 'textarea',
                                    inputLabel: 'Añadir descripción extra',
                                    inputPlaceholder: 'Ingrese su descripcion extra...',
                                    inputValue: item.detalleExtra || '',
                                    inputAttributes: {
                                      'aria-label': 'Type your message here',
                                    },
                                    showCancelButton: true,
                                    cancelButtonText: 'Cancelar',
                                    confirmButtonText: 'Agregar Descripción',
                                  })
                                  handleAddDetalleExtra(index, {
                                    ...item,
                                    detalleExtra: text || '',
                                  })
                                }}
                              >
                                <TextIncrease color="primary" />
                              </IconButton>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </Grid>
          </Grid>
        </SimpleCard>
        <>
          <AgregarArticuloDialog
            // OPCIONES A ELEGIR PARA AGREGAR PRODUCTOS
            id={'agregarArticulo'}
            keepMounted={false}
            open={openAgregarArticulo}
            codigoActividad={getValues('actividadEconomica.codigoActividad')}
            onClose={(newProduct: any) => {
              handleChange(newProduct).then()
              setOpenAgregarArticulo(false)
            }}
          />
        </>
        <>
          <ProductoExplorarDialog
            id={'explorarProductos'}
            keepMounted={false}
            open={openExplorarProducto}
            codigoActividad={getValues('actividadEconomica.codigoActividad')}
            onClose={(newProduct?: ProductoVarianteProps[]) => {
              if (newProduct) {
                for (const pvp of newProduct) {
                  handleChange(pvp).then()
                }
              }
              setOpenExplorarProducto(false)
            }}
          />
        </>
      </>
    )
  }
  return (
    <>
      <AlertLoading />
    </>
  )
}
