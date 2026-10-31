import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource-variable/inter'
import './index.css'
import App from './App.jsx'
import { CalculatorProvider } from './context/CalculatorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalculatorProvider>
      <App />
    </CalculatorProvider>
  </StrictMode>,
)
