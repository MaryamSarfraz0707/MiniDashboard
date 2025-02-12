import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DataProvider } from './context/DataContext';
import { AuthProvider } from "./context/authContext";
import "./App.css"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </StrictMode>,
)
