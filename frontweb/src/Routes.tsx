import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Admin from 'pages/Admin';
import ProductDetails from 'pages/ProductDetails';
import Auth from 'pages/Admin/Auth';
import history from 'util/history';
import MoviesCatalog from 'pages/MoviesCatalog';
import Navbar from 'components/Navbar';

const Routes = () => (
  <Router history={history}>
    <Navbar /> 
    <Switch>
      <Route path="/movies" exact>
        <MoviesCatalog />
      </Route>
      <Route path="/movies/:movieId">
        <ProductDetails />
      </Route>
      <Redirect from="/" to="/admin/auth/login" exact />
      <Route path="/admin/auth">
        <Auth />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
