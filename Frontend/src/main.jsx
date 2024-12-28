import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { DarkModeProvider } from './context/DarkModeContext';
import { SocketProvider } from './context/SocketProvider.jsx';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketProvider>
      <DarkModeProvider>      
        <App />
      </DarkModeProvider>
    </SocketProvider>
  </Provider>
);
