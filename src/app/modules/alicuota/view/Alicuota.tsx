import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'

import SimpleContainer from '../../../base/components/Container/SimpleContainer'
import Breadcrumb from '../../../base/components/Template/Breadcrumb/Breadcrumb'
import AuthContext from '../../../base/contexts/JWTAuthContext'
import ClientesListado from '../../clientes/view/Listado/ClientesListado'
import { productosRouteMap } from '../../productos/ProductosRoutesMap'
import AlicuotaListado from '../components/AlicuotaListado'

const Alicuota = () => {
  const { user } = useContext(AuthContext)
  // in this case *props are stored in the state of parent component

  return (
    <>
      <SimpleContainer>
        <div className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Servicios', path: productosRouteMap.gestion },
              { name: 'Alicuota' },
            ]}
          />
        </div>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <AlicuotaListado />
          </Grid>
        </Grid>
        <Box py="12px" />
      </SimpleContainer>
    </>
  )
}

export default Alicuota
