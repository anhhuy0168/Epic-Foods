import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminContextProvider from "./contexts/AdminContext";
import Landing from "./component/layout/Landing";
import Auth from "./views/auth/auth";
import AuthContextProvider from "./contexts/AuthContext";
import Homepage from "./views/Homepage";
import ProtectedRoute from "./component/routing/ProtectedRoute";
import ActivationEmail from "./views/ActivationEmail";
import ConfirmEmailForm from "../src/component/layout/ConfirmEmail/ConfirmEmailForm";
import ForgotPassword from "./component/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./component/auth/ResetPass/ResetPassword";
import FoodContextProvider from "./contexts/FoodsContext";
import DetailProduct from "./component/foods/DetailProduct";
import CartContextProvider from "./contexts/CartContext";
import Cart from "./component/foods/Cart_User";
import RegisterStaff from "./component/auth/admin/RegisterStaff";
import ViewUser from "./component/auth/admin/ViewUser";
function App() {
  return (
    <AuthContextProvider>
      <FoodContextProvider>
        <CartContextProvider>
          <AdminContextProvider>
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
                <ProtectedRoute
                  exact
                  path="/registerStaff"
                  component={RegisterStaff}
                />
                <ProtectedRoute
                  exact
                  path="/food/detail/:id"
                  component={DetailProduct}
                />
                <ProtectedRoute exact path="/viewUser" component={ViewUser} />
                <Route
                  path="/forgot_password"
                  component={ForgotPassword}
                  exact
                />
                <ProtectedRoute exact path="/cart_User" component={Cart} />
                <Route
                  path="/user/reset/:token"
                  component={ResetPassword}
                  exact
                />
                <Route
                  path="/forgot_password"
                  component={ForgotPassword}
                  exact
                />
                <Route
                  path="/user/reset/:token"
                  component={ResetPassword}
                  exact
                />

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
              <Toaster />
            </Router>
          </AdminContextProvider>
        </CartContextProvider>
      </FoodContextProvider>
    </AuthContextProvider>
  );
}

export default App;
