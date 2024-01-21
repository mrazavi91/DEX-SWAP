import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { configureChains, mainnet, WagmiConfig, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig client={client}>

      <BrowserRouter>
      <App />
    </BrowserRouter>

    </WagmiConfig>
  </React.StrictMode>,
)
