import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import persistStore from 'redux-persist/es/persistStore';
import store from './app/store.js';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'; 
import { Toaster } from 'react-hot-toast';




let persistor = persistStore(store);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
