import React from 'react';
import {StyleSheet } from 'react-native';
import RequestPage from './Components/Request';
import Main from './Components/Main';
import StartingPage from './Components/Starting_page';
import HomeSearch from './Components/UserSearch';
import Connecting from './Components/Connecting';
import CreateAccount from './Components/Names';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Home"
          component={Connecting}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="Start"
          component={StartingPage}
          options={{
            headerShown: false,
          }} />
          <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="Request_page"
          component={RequestPage}
          options={{
            headerShown: false,
        }} />
        <Stack.Screen
          name="Game_page"
          component={Main}
          options={{
            headerShown: false,
        }}/>
         <Stack.Screen
          name="Search_page"
          component={HomeSearch}
          options={{
            headerShown: false,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;