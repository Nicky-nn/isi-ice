import { ncdRouteMap } from './modules/notaCreditoDebito/NotaCreditoDebitoRoutesMap'
import { productosRouteMap } from './modules/productos/ProductosRoutesMap'
import { proveedorRouteMap } from './modules/proveedor/ProveedorRoutesMap'

export interface NavigationProps {
  name: string
  path?: string
  icon?: any
  iconText?: string
  label?: string
  type?: string
  badge?: { value: string; color: string }
  children?: Array<{
    name: string
    iconText: string
    path: string
  }>
}

export const navigations: NavigationProps[] = [
  {
    name: 'Página Principal',
    path: '/Inicio',
    icon: 'home',
  },
  {
    name: 'SEGURIDAD',
    label: 'TRANSACCIONES',
    type: 'label',
  },
  {
    name: 'Facturacion ICE',
    icon: 'point_of_sale',
    children: [
      {
        name: 'Registrar ICE',
        iconText: 'ALRE',
        path: '/ventas/registro',
      },
      {
        name: 'Gestión de Facturas ICE',
        iconText: 'ALGE',
        path: '/ventas/gestion',
      },
    ],
  },

  {
    name: 'Productos / Servicios',
    icon: 'storefront_sharp',
    children: [
      {
        name: 'Gestión de Servicios',
        iconText: 'GP',
        path: productosRouteMap.gestion,
      },
      {
        name: 'Proveedores',
        iconText: 'PR',
        path: proveedorRouteMap.gestion,
      },
      {
        name: 'Gestión de Alicuotas',
        iconText: 'AL',
        path: '/alicuota/gestion',
      },
    ],
  },
  {
    name: 'Clientes',
    icon: 'person_sharp',
    badge: { value: '', color: 'secondary' },
    children: [
      {
        name: 'Gestión de clientes',
        path: '/clientes/gestion',
        iconText: 'GC',
      },
    ],
  },
  {
    name: 'Reportes',
    icon: 'trending_up',

    children: [
      {
        name: 'Echarts',
        path: '/charts/echarts',
        iconText: 'E',
      },
    ],
  },
  {
    name: 'Documentación',
    icon: 'launch',
    type: 'extLink',
    path: 'http://demos.ui-lib.com/matx-react-doc/',
  },
]
