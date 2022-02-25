import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import React, {useEffect,useContext,useReducer,} from 'react';


import { DataLayer } from './reducers/datalayer';



  const App_run = () => {
   
    return (
    <DataLayer>
      <App />
    </DataLayer>
  
);
}
AppRegistry.registerComponent(appName, () => App_run);
