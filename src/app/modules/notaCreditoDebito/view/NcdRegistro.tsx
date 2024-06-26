import { yupResolver } from '@hookform/resolvers/yup'
import { Save } from '@mui/icons-material'
import { Button, Grid, Paper, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import SimpleContainer from '../../../base/components/Container/SimpleContainer'
import RepresentacionGraficaUrls from '../../../base/components/RepresentacionGrafica/RepresentacionGraficaUrls'
import Breadcrumb from '../../../base/components/Template/Breadcrumb/Breadcrumb'
import useAuth from '../../../base/hooks/useAuth'
import { openInNewTab } from '../../../utils/helper'
import { notSuccess } from '../../../utils/notification'
import { swalAsyncConfirmDialog, swalException } from '../../../utils/swal'
import { apiNcdRegistro } from '../api/ncdRegistroApi'
import { NcdInputProps } from '../interfaces/ncdInterface'
import { ncdRouteMap } from '../NotaCreditoDebitoRoutesMap'
import { ncdInputCompose } from '../services/ncdInputCompose'
import { ncdRegistroValidationSchema } from '../validator/ncdRegistroValidator'
import NcdFacturaDevolucion from './registro/NcdFacturaDevolucion'
import NcdFacturaOriginal from './registro/NcdFacturaOriginal'

const NcdRegistro = () => {
  const { user } = useAuth()
  const mySwal = withReactContent(Swal)

  const form = useForm<NcdInputProps>({
    defaultValues: {
      numeroFactura: '',
      fechaEmision: '',
      razonSocial: '',
      facturaCuf: '',
      detalleFactura: [],
      detalle: [],
    },
    resolver: yupResolver(ncdRegistroValidationSchema),
  })

  const onSubmit: SubmitHandler<NcdInputProps> = async (values) => {
    const apiInput = ncdInputCompose(values)
    await swalAsyncConfirmDialog({
      preConfirm: async () => {
        const resp: any = await apiNcdRegistro(apiInput).catch((err) => ({
          error: err,
        }))
        if (resp?.error) {
          const fieldName =
            resp.error?.response?.data?.data?.[0]?.field ?? 'unknown field'
          const message = `El campo es requerido.`
          toast.error(message)
          form.setError(fieldName, { message })
          return false
        }
        return resp
      },
    }).then((resp) => {
      if (resp.isConfirmed) {
        const { value } = resp
        const { representacionGrafica } = value
        mySwal.fire({
          title: `Documento Generado Correctamente`,
          html: (
            <RepresentacionGraficaUrls representacionGrafica={representacionGrafica} />
          ),
        })
        form.reset({
          numeroFactura: '',
          fechaEmision: '',
          razonSocial: '',
          facturaCuf: '',
          detalleFactura: [],
        })
        notSuccess()
        openInNewTab(representacionGrafica.pdf)
      }
      if (resp.isDenied) {
        swalException(resp.value)
      }
      return
    })
  }

  return (
    <SimpleContainer>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Notas Crédito Debito', path: ncdRouteMap.gestion },
            { name: 'Registrar Nota' },
          ]}
        />
      </div>
      <Paper
        elevation={0}
        variant="elevation"
        square
        sx={{ mb: 2, p: 0.5 }}
        className={'asideSidebarFixed'}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          style={{ marginTop: 2 }}
          spacing={{ xs: 1, sm: 1, md: 1, xl: 1 }}
          justifyContent="flex-end"
        >
          <Button
            color={'success'}
            startIcon={<Save />}
            variant={'contained'}
            onClick={form.handleSubmit(onSubmit)}
          >
            Registrar Nota
          </Button>
        </Stack>
      </Paper>
      <form>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <NcdFacturaOriginal form={form} />
          </Grid>
          <Grid item lg={12}>
            <NcdFacturaDevolucion form={form} />
          </Grid>
        </Grid>
      </form>
      <Box py="12px" />
    </SimpleContainer>
  )
}

export default NcdRegistro
