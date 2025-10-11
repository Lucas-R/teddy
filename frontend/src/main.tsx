import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Router from '@/router'

import '@/styles/tailwind.css'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Router />
    </StrictMode>,
  )
}