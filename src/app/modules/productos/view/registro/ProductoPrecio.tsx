import { FormControl, FormHelperText, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import InputNumber from 'rc-input-number'
import React, { FunctionComponent } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import Select, { SingleValue } from 'react-select'

import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { numberWithCommas } from '../../../../base/components/MyInputs/NumberInput'
import { reactSelectStyles } from '../../../../base/components/MySelect/ReactSelect'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import { handleSelect } from '../../../../utils/helper'
import { apiSinUnidadMedida } from '../../../sin/api/sinUnidadMedida.api'
import { SinUnidadMedidaProps } from '../../../sin/interfaces/sin.interface'
import { ProductoInputProps } from '../../interfaces/producto.interface'

interface OwnProps {
  form: UseFormReturn<ProductoInputProps>
}

type Props = OwnProps

const ProductoPrecio: FunctionComponent<Props> = (props) => {
  const {
    form: {
      control,
      setValue,
      watch,
      formState: { errors },
    },
  } = props

  // const [variantesWatch, varianteWatch] = watch(['variantes', 'variante'])

  const { data: unidadesMedida } = useQuery<SinUnidadMedidaProps[], Error>(
    ['unidadesMedida'],
    () => {
      return apiSinUnidadMedida()
    },
  )

  return (
    <SimpleCard title={'PRECIO'}>
      <Grid container columnSpacing={3} rowSpacing={2}>
        <Grid item lg={8} md={12} xs={12}>
          <Controller
            control={control}
            name={'codigoUnidadMedida'}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={{ mb: 1 }}
                error={Boolean(errors.codigoUnidadMedida)}
              >
                <MyInputLabel shrink>Unidad Medida</MyInputLabel>
                <Select<SinUnidadMedidaProps>
                  {...field}
                  styles={reactSelectStyles}
                  menuPosition={'fixed'}
                  placeholder={'Seleccione la unidad de medida'}
                  value={field.value}
                  onChange={async (unidadMedida: SingleValue<SinUnidadMedidaProps>) => {
                    field.onChange(unidadMedida)
                    setValue('codigoUnidadMedida', unidadMedida)
                  }}
                  options={unidadesMedida}
                  getOptionValue={(item) => item.codigoClasificador.toString()}
                  getOptionLabel={(item) =>
                    `${item.codigoClasificador} - ${item.descripcion}`
                  }
                />
                <FormHelperText>{errors.codigoUnidadMedida?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Controller
            control={control}
            name={'precio'}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.precio)}>
                <MyInputLabel shrink>Precio</MyInputLabel>
                <InputNumber
                  {...field}
                  min={0}
                  placeholder={'0.00'}
                  name={'precio'}
                  value={field.value}
                  onFocus={handleSelect}
                  onChange={(precio: number | null) => {
                    // @ts-ignore
                    field.onChange(precio)
                  }}
                  onBlur={(e) => {
                    const parsedValue = parseFloat(e.target.value)
                    if (!isNaN(parsedValue)) {
                      setValue('precio', parsedValue)
                    }
                  }}
                  formatter={(value, info) => numberWithCommas(value, info, 5)}
                />
                <FormHelperText>{errors.precio?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </SimpleCard>
  )
}

export default ProductoPrecio
