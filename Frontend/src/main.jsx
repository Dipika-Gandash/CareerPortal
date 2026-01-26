import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import appStore from './store/AppStore'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
    <RouterProvider router={router} />
     <Toaster position="top-center" reverseOrder={false} />
     </Provider>
  </StrictMode>,
)
