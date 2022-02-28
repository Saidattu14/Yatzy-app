import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import { DataLayer } from './reducers/datalayer';

/**
 This sets the Context API components throghout Screens.
*/
const App_run = () => {
   
    return (
        <DataLayer>
          <App />
        </DataLayer>
  
);
}
AppRegistry.registerComponent(appName, () => App_run);
