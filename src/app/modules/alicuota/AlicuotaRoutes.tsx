import { lazy } from 'react'

import { authRoles } from '../../../auth/authRoles'
import Loadable from '../../base/components/Template/Loadable/Loadable'

const AppAlicuota = Loadable(lazy(() => import('./view/Alicuota')))

const alicuotaRoutes = [
  {
    path: `/alicuota/gestion`,
    element: <AppAlicuota />,
    auth: authRoles.admin,
  },
]

export default alicuotaRoutes
