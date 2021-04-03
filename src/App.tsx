import './App.css';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserLoginPage from './pages/UserLoginPage';
import UserLoginLazyPage from './pages/UserLoginLazyPage';
import Home from './pages/Home';

const routes = [
  {
    Component: UserLoginPage,
    path: '/queries/user',
  },
  {
    Component: UserLoginLazyPage,
    path: '/queries/user/lazy',
  },
  {
    Component: Home,
    path: '/',
  },
];

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Router>
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} exact>
              <Component />
            </Route>
          ))}
        </Switch>
      </Router>
    </RelayEnvironmentProvider>
  );
}

export default App;
