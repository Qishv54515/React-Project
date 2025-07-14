import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Path from './routes';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Path/>  
    <ToastContainer/>
  </StrictMode>
)