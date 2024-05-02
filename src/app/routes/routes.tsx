import { Navigate } from 'react-router-dom'

import AuthGuard from '../../auth/AuthGuard'
import MatxLayout from '../base/components/Template/MatxLayout/MatxLayout'
import homeRoutes, { homeRoutesMap } from '../modules/home/HomeRoutes'
import NotFound from '../base/view/sessions/NotFound'
import sessionRoutes from '../base/view/sessions/SessionRoutes'
import ventasRoutes from '../modules/ventas/VentasRoutes'
import productosRoutes from '../modules/productos/ProductosRoutes'
import clientesRoutes from '../modules/clientes/ClientesRoutes'
import proveedorRoutes from '../modules/proveedor/ProveedorRoutes'
import notaCreditoDebitoRoutes from '../modules/notaCreditoDebito/NotaCreditoDebitoRoutes'
import alicuotaRoutes from '../modules/alicuota/AlicuotaRoutes'
import cuentaRoutes from '../modules/base/cuenta/CuentaRoutes'

export const appRoutes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...homeRoutes,
      ...ventasRoutes,
      ...productosRoutes,
      ...clientesRoutes,
      ...cuentaRoutes,
      //...proveedorRoutes,
      ...alicuotaRoutes,
      ...notaCreditoDebitoRoutes,
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to={homeRoutesMap.home.path} /> },
  { path: '*', element: <NotFound /> },
]
