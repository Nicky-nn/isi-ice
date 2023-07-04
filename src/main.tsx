import './index.css'
import 'rc-input-number/assets/index.css'
import '@sweetalert2/theme-material-ui/material-ui.min.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import './styles/accordion.css'
import './styles/reactDatePicker.css'

import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import App from './App'
import AlertErrorInternet from './app/base/components/Alert/AlertErrorInternet'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertErrorInternet />
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <CssBaseline />
          <App />
          <ToastContainer limit={3} />
        </QueryClientProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>,
)
