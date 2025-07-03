import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Path from './routes';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Path/>  
  </StrictMode>
)