import './App.css';
import{BrowserRouter as Router , Route, Switch} from'react-router-dom'
import Landing from './component/layout/Landing'
import Auth from './views/auth/auth';
import AuthContextProvider from './contexts/AuthContext';
import Homepage from './views/Homepage';
function App() {
  return (
    <AuthContextProvider>
       <Router>
    <Switch>
    <Route exact path='/' component={Landing}></Route>
    <Route exact path='/homepage' component={Homepage}></Route>
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
