import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./component/layout/Landing";
import Auth from "./views/auth/auth";
import AuthContextProvider from "./contexts/AuthContext";
import Homepage from "./views/Homepage";
import ProtectedRoute from "./component/routing/ProtectedRoute";
import ActivationEmail from "./views/ActivationEmail";
import ConfirmEmailForm from "./component/ConfirmEmail/ConfirmEmailForm";
import ForgotPassword from "./component/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./component/auth/ResetPass/ResetPassword";
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRoute="register" />}
          />
          <ProtectedRoute exact path="/homepage" component={Homepage} />
          <Route path="/forgot_password" component={ForgotPassword} exact />
          <Route path="/user/reset/:token" component={ResetPassword} exact />
          <Route
            path="/user/activate/:activation_token"
            component={ActivationEmail}
            exact
          />

          <Route
            exact
            path="/confirmEmail"
            component={ConfirmEmailForm}
          ></Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
