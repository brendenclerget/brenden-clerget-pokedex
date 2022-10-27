import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './main.scss';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='pokemon/:pokemonId' element={<h2>Test</h2>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
