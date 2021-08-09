import { Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';

import './styles.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/movies">
            <h1>Movies</h1>
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
