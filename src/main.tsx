import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import ThemeProvider from './contexts/Theme/ThemeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
