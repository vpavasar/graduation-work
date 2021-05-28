import {BrowserRouter as Router} from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import {PrimarySearchAppBar} from "./components/NewNavbar";
import {Footer} from './components/Footer';
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  const {token, userId, login, logout, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <LinearProgress />
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <PrimarySearchAppBar/>}
        {routes}
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
