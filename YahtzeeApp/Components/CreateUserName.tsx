/**
 * Importing the modules for the UI to display, LocalStorage, Firebase Messaging, Navigation.
 * AsyncStorage -- is the modulue that used to store data in the locally. The data stored in the app is
    presisted as long as the app is removed.
 * messaging -- This module catches the cloud messages when the app is closed on in the background State

*/
// React Hooks
import React, { useEffect, useState, useContext } from "react"; 
// UI Elements
import { SafeAreaView, StyleSheet, TextInput,Text,TouchableOpacity,BackHandler} from "react-native";
// Annimations Element
import LottieView from 'lottie-react-native';
import {DataContext} from '../reducers/datalayer'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Used to Dispatch navigation with specific data
import { CommonActions } from '@react-navigation/native';


// It is a used to destruture the names in the list of the users
export interface State {
  name : string,
}

// It is the message structure that recieved from the server.
export interface message {
  Method : string,
  Data : Array<message_Data_details>,
  Result : string,
}

// It is the message specific details
export interface message_Data_details {
  FCM: string, 
  index: Number, 
  name: string, 
  status: string
}

// It is reducer function that defines their initial states and updates the data
// Here It sets the color of text and onchangetext event simultaneously.
const reducer1 = (state1 : any, action:any) => {
  switch (action.type) {
    case 'set_text_color':
      return {
        ...state1,
        text : action.text,
        colors : action.colors
      };
    default:
      throw new Error();
  }
}
// The initial states of the text and color
const defaultstate = {
  text : "",
  colors : 'red',
}


/**
 This Functional Component creates a websocket connection to the server. After Connecting to the server.
 The Server sends the list of the users list with their data like FCM, name, index and other.
 Here whenever the user inputs the data in the text box it verifies with the data in the users list.
 If there is no match it allows to submit to the server and server again gets back the result.
 Success of the result navigates to the User Search Screen.
*/
const CreateAccount = (props:any) => {
  const {navigation,route} = props;
   // Stores the websocket data
  var socket : any;
   // Get the values in the Datalayer to do operations.
  const { state, dispatch } = useContext(DataContext)
  const [state1, dispatch1] = React.useReducer(reducer1,defaultstate);
   //  List of the userdata that recieved from the server
  const [UsersData, setUsersData] = useState(Array<message_Data_details>());

   
  // This function updates the text value and text color at once using the usereducer method.
  const Updating_text_color = (text: string, colors : string) => {
    dispatch1({
      type: 'set_text_color',
      text : text,
      colors : colors,
     })
  }
  // This function takes the input data of the user entered. And it looks if there is any match found or not.
  //Ex: If I inputed as "saidattu" it verifies in the users List Data if there is name with saidattu or not.
  const Text_Input_Change = (text :string) => {
    
      if(text != "")
      {
          const newData = UsersData.filter(function (item : State) {
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
          const textData = text.toString().toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if(newData.length == 0)
        {
        Updating_text_color(text,'black')
        }
        else
        {
          Updating_text_color(text,'red')
        }
      }
      else
      {
        Updating_text_color(text,'black')
      }
}

/**
 This function allows if there no such username is found the text color is black else it is red.
 Here It identifies the text color and if it is not red it sends the FCM token, Username to the server
 for Validation the server gets back the result. 

*/

const Submiting_UserName = async() => {
     
       if(state1.text != '' && state1.colors != 'red')
       {
        socket = state.ws;
        try {
          await messaging().registerDeviceForRemoteMessages();
          let token = await messaging().getToken();
          if(socket != undefined)
          {
           let obj = {
             "Method" : "AddUser",
             "MyName" :   state1.text,
             "FCMToken" : token,
           }
           await AsyncStorage.setItem("MyName", state1.text);
           await AsyncStorage.setItem("FCMtoken",token);
           socket.send(JSON.stringify(obj));
          }
        } catch (error) {
          console.log(error)
        }   
      }
  }

/**
 This Function Creates a websocket connection with the server for communication. 
*/

const addwebsocket = () => {
    if(state.ws == null)
    {
    try {
    socket =  new WebSocket('ws://192.168.43.99:8085/user', 'echo-protocol');
    socket.onopen = () => {
       dispatch({
         type : 'SetSocket',
         ws   :  socket,
      });
      let obj = {
         "Method" : "Validation",
      }
      socket.send(JSON.stringify(obj));
     };
    } 
    catch (error) {
      console.log(error)
    }
   }
   else
   {
     socket = state.ws;
   }
  }

/**
  This Function recieves the messages from the server.
*/

const recieve_messages_from_server = (socket : any) => {
      try {
          socket.onmessage = async(e:any) => {
          let recieved_message : message;
          recieved_message = JSON.parse(e.data);
          //console.log(recieved_message)
          if(recieved_message.Method == "UserValid")
          {
          
           if(recieved_message.Result == "true")
           {
            
            navigation.navigate("Search_page", {});
            
           }
          }
          else if(recieved_message.Method == "UserList")
          {
            let arr : React.SetStateAction<message_Data_details[]> = [...recieved_message.Data]
            setUsersData(arr)
          }
        };
      } catch (error) {
        console.log(error)
      }
}
 /**
  If the user press the back button this function navigates the user to the starting page.
*/

   const backAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Start" },
        ],
      })
    );
    return true;
  };

 /**
 This is useEffect fuction calls the repective function for the first time when the screen loads.
*/

useEffect(() => {
    addwebsocket();
    recieve_messages_from_server(socket);
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
    BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  }, []);

 /**
  Rendering the UI Elements Here.
*/

  return (
    <SafeAreaView style = {styles.main}>
        <SafeAreaView style = {styles.sectionContainer}>
          <LottieView
            source = {require('../Assets/login.json')}
            style = {styles.highlight} autoPlay = {true} loop = {true}>
          </LottieView>
        </SafeAreaView>
        <TextInput style = {{height: 50, margin: 12, borderWidth: 1, padding: 10, width : 300,
          borderColor : 'green', fontSize : 18, color : state1.colors }}
          onChangeText = { text => Text_Input_Change(text) } value={state1.text}
          placeholderTextColor = {'black'} placeholder="Choose a unique username"
        />
      <TouchableOpacity onPress={()=> Submiting_UserName()} style = {styles.button} >
        <Text style = {{color : 'white', textAlign : 'center'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
    )
};

/**
 Styles for the UI Elements.
*/
const styles = StyleSheet.create({
  sectionContainer: {
    height : '50%',
    width : '50%',
    alignItems : 'center',
  },
  highlight: {
    height : '100%',
    width : '100%',
   
  },
  button: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    width : 100,
    borderRadius : 7,
    backgroundColor : 'green',
    borderColor : 'white'

  },
   main : {
   height : '100%',
   width : '100%',
   alignItems : 'center'
  },
});

export default CreateAccount;
