import './App.css';
import{BrowserRouter as Router , Route, Switch} from'react-router-dom'
import Landing from './component/layout/Landing'
import Auth from './views/auth/auth';
import AuthContextProvider from './contexts/AuthContext';
import Homepage from './views/Homepage';
import ProtectedRoute from './component/routing/ProtectedRoute';
function App() {
  return (
    <AuthContextProvider>
       <Router>
    <Switch>
    <Route exact path='/' component={Landing}></Route>
    <ProtectedRoute exact path='/homepage' component={Homepage}/>
    <Route
							exact
							path='/login'
							render={props => <Auth {...props} authRoute='login' />}
						/>
						<Route
							exact
							path='/register'
							render={props => <Auth {...props} authRoute='register' />}
						/>
    </Switch>
  </Router>
    </AuthContextProvider>
   
  );
}

export default App;
