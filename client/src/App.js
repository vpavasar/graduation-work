import {BrowserRouter as Router} from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { useLoacalization } from './hooks/localization.hook';
import { AuthContext } from './context/AuthContext';
import { LocalizationContext } from './context/LocalizationContext';
import {PrimarySearchAppBar} from "./components/NewNavbar";
import {Footer} from './components/Footer';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  const {token, userId, login, logout, ready} = useAuth();
  const {localization, toggleLoacalization} = useLoacalization();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <LinearProgress />
  }

  return (
    <LocalizationContext.Provider value={{
      localization, toggleLoacalization
    }}>
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <PrimarySearchAppBar/>}
        {routes}
        <Footer/>
      </Router>
    </AuthContext.Provider>
    </LocalizationContext.Provider>
  );
}

export default App;
