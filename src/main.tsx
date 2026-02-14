import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'

// Restore accessibility preferences before first render
if (localStorage.getItem('lte-high-contrast') === 'true') {
  document.documentElement.classList.add('high-contrast')
}
if (localStorage.getItem('lte-reduced-motion') === 'true') {
  document.documentElement.classList.add('reduced-motion')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
