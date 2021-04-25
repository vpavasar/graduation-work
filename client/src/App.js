import {BrowserRouter} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import {Navbar} from "./components/Navbar";
import {PrimarySearchAppBar} from "./components/NewNavbar";
//import 'materialize-css'

function App() {
  const {token, userId, login, logout} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  console.log('Is auth:', !!token);

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
      <BrowserRouter>
        { isAuthenticated && <PrimarySearchAppBar/>}
        <div>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
