import { BrowserRouter } from 'react-router-dom'
import Router from './router/Router'
import headerConfig from './config/header';

function App() {
    document.title = headerConfig.siteName;
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
}

export default App;
