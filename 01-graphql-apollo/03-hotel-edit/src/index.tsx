import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HotelCollectionScene, HotelEditScene } from './scenes';
import { switchRoutes } from 'core';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route
        exact={true}
        path={[switchRoutes.root, switchRoutes.hotelCollection]}
        component={HotelCollectionScene}
      />
      <Route
        path={switchRoutes.hotelEdit}
        component={HotelEditScene}
      />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
