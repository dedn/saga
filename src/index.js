import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {Router} from 'react-router';
import {ConnectedRouter} from 'connected-react-router'
import App from './pages/App';
import store from './redux';
import {history} from './redux/reducers';
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
          <Switch>
              <Route path='/' exact>
                  <App />
              </Route>
              <Route path='/blog' exact>
                  <Blog />
              </Route>
              <Route path='*' exact>
                  <NotFound />
              </Route>
          </Switch>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
