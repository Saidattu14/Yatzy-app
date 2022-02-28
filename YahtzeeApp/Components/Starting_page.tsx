/**
 * Importing the modules for the UI to display, LocalStorage, Firebase Messaging, Navigation.
 * AsyncStorage -- is the modulue that used to store data in the locally. The data stored in the app is
    presisted as long as the app is removed.
 * messaging -- This module catches the cloud messages when the app is closed on in the background State
 
*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
// React Hooks
import React ,{useState,useEffect,useContext}from 'react';
// Annimations Element
import LottieView from 'lottie-react-native';
//  Get the values in the Datalayer
import {DataContext} from '../reducers/datalayer' 
// Navigate the screen in the app with specific information and re-render of the screens.
import { CommonActions } from '@react-navigation/native';
// UI Elements
import {SafeAreaView,StyleSheet,Text,View,TouchableOpacity} from 'react-native';
/**
 This Functional Component responsible is show the user to the starting page with simple annimation of
 the lottieviews.
 Here it loads the user name from the local storage. If there is no data of the user name It shows the
 Create Account Button text. Else It shows to Start the Game.
*/

const StartingPage = ({navigation}) => {
  // Get the values in the Datalayer to do operations.
  const { state, dispatch } = useContext(DataContext)
  // Boolean value to set if the UserName Present in local Storage.
  const [isUserNamePresent,setisUserNamePresent] = useState(true)
  
/**
 This Function navigates the user to Search_page
*/

const Navigation_to_Search_Screen = () => {
  navigation.navigate("Search_page", {});       
}

/**
 This Function is used to navigate user to the Request Screen with notification data.
*/

const Navigation_to_Request_Screen = (remoteMessage : FirebaseMessagingTypes.RemoteMessage) => {
   navigation.navigate('Request_page',{
      Key : remoteMessage
    });
}
/**
 This Function navigates the user to Create Account Screen
*/
  const Navigation_to_CreateAccount_Screen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "CreateAccount" },
        ],
      })
    );
  }

/**
 This Function used to check the data in local storage. If there is a UserName Present in it. It
  sets the isUserNamePresent to true.
*/
const getUserName = async() => {
    let name = await AsyncStorage.getItem("MyName")
    
    if(name != null)
    {
      setisUserNamePresent(false);
    }
};

/**
 This Function used to handle the cloud notifications from firebase in background state and in quiet state.
*/

const Notification_handling = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    if(remoteMessage)
    {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate('Request_page',{
      Key: remoteMessage,
    });
   
   }
  });
  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
      navigation.navigate('Request_page',{
        Key: remoteMessage,
      });
    }
  });
}
/**
 This is useEffect fuction to render the data for the first time.
*/

useEffect(() => {
    getUserName();
    Notification_handling();
  }, []);

  /**
 This is the condition that sets the button whether it is create Account or Start Game.
*/

  let button;
  if (isUserNamePresent) {
    button = <TouchableOpacity  style = {styles.sectionDescription} 
              onPress={() => Navigation_to_CreateAccount_Screen()}>
                <Text  style = {styles.sectionTitle}>
                  Create Account
                </Text>
              </TouchableOpacity>;
  }
  else {
    button = <TouchableOpacity  style = {styles.sectionDescription} 
              onPress={ () => Navigation_to_Search_Screen()}>
                <Text  style = {styles.sectionTitle}>
                  Start Yahtzee
                </Text>
              </TouchableOpacity>;
  }

/**
  Renders the UI elements in the Screen
*/

  return(

         <View style = {styles.main}>
            <SafeAreaView style = {styles.sectionContainer}>
              <LottieView
                source={require('../Assets/welcome.json')}
                style = {styles.highlight} autoPlay = {true} loop = {true}>
                </LottieView>
            </SafeAreaView>
            {button}
          </View>
  );
 };
 
/**
  Styles for the UI elements
*/
 const styles = StyleSheet.create({
   sectionContainer: {
     alignContent : 'center', 
     height : '70%',
     width : '100%',
   },
   main : {
    height : '100%',
    width : '100%',
    backgroundColor : '#1c1c1c'
   },
   sectionTitle: {
    fontSize: 20, 
    fontFamily: 'Times New Roman',
     color : 'green',
     textAlign : 'center',
     width : 200,
     height : 70,
     padding : 20,
     borderWidth : 1,
     borderRadius : 20,
     borderColor : 'green',
     
   },
   sectionDescription: {
     margin : 10,
     alignItems : 'center',
     
   },
   highlight: {
     height : '100%',
     width : '100%',   
   },
 });
 
 export default StartingPage;
 