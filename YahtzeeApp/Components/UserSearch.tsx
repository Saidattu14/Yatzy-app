/**
 * Importing the modules for the UI to display, LocalStorage, Firebase Messaging, Navigation.
 * AsyncStorage -- is the modulue that used to store data in the locally. The data stored in the app is
    presisted as long as the app is removed.
 * messaging -- This module catches the cloud messages when the app is closed on in the background State

*/
import React,{useEffect, useState,useContext} from 'react';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  TextInput,FlatList,BackHandler} from 'react-native';
import {DataContext} from '../reducers/datalayer'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface State {
  name: String;
  status: String;
  FCM : String,
}
export interface Name {
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

const reducer1 = (state1 : any, action:any) => {
  switch (action.type) {
    case 'set_userslist':
      return {
        ...state1,
        UsersDataOriginal : action.UsersDataOriginal,
        UsersDataModify : action.UsersDataModify
      };
    case 'set_UserDataModify_text':
        return {
          ...state1,
          text : action.text,
          UsersDataModify : action.UsersDataModify
    };
    default:
      throw new Error();
  }
}
// The initial states of the text, AllUserData, Modify the list
const defaultstate = {
  text : "",
  UsersDataOriginal : Array<message_Data_details>(),
  UsersDataModify : Array<message_Data_details>(),
}
/**
 This function component renders the list of the users that matches in the text inputed by the user.

*/
const UserList : React.FC<{Value : message_Data_details, socket : any, navigation_value: any}> = 
    ({Value,socket,navigation_value}) => {
  /**
  This is function sends the opponet user an notification to play againt.
  And also navigate the user to the connecting page.
  */
  const RequestFcm = async() => {
    try {
      let my_name = await AsyncStorage.getItem("MyName")
      let obj = {
      "Method" : "RequestMsg",
      "MyName" : my_name,
      "OpponentName" : Value.name,
      "OpponentFCM" : Value.FCM,
    }
    socket.send(JSON.stringify(obj));
    navigation_value.navigate("Connect", {
      OppName: Value.name,
      MyName : await AsyncStorage.getItem("MyName")
    });
    } catch (error) {
      console.log(error)
    }
  }

  return (
   <SafeAreaView  style = {styles.sectionDescription}>
    <View style = {styles.sectionList} >
             <SafeAreaView style = {styles.sectionProfile}>
                <Image
                  style = {styles.ImageData}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}>
                </Image>
              </SafeAreaView>
              <SafeAreaView style = {styles.sectionProfileData}>
                <Text style = {styles.sectionName}>{Value.name}</Text>
                <Text style = {styles.sectionStatus}>{Value.status}</Text>
              </SafeAreaView>
              <TouchableOpacity style = {styles.sectionRequest} onPress = {() => RequestFcm()}>
                <Text style = {styles.sectionRequestText} >
                Send Request
                </Text>
              </TouchableOpacity>
            </View>
   </SafeAreaView>
);
}
/**
 This function component allows user to search for the opponent user by searching with their names.

*/
const HomeSearch = (props:any) => {
  const {navigation,route} = props;
  const { state, dispatch } = useContext(DataContext)
  const [msg,SetMsg] = useState(true);
  const [state1, dispatch1] = React.useReducer(reducer1,defaultstate);
  var socket :any;


/**
 This function sends the messages to server to get the list of all the users except his/her data.
*/
  const sendmsg = async(ws:WebSocket) => {  
    if(msg == true)
    {
      try {
        let My_name = await AsyncStorage.getItem("MyName")
        let obj = {
          "Method" : "UserList",
          "MyName" : My_name
        }
        console.log(obj)
        ws.send(JSON.stringify(obj));
        SetMsg(false);
      } catch (error) {
        console.log(error);
      }
     
    }
}
  
  /**
 This function component passes the userdata to render the list of all users. 

*/
  const renderItem = (props:any) => (
    <UserList Value = {props.item} socket = {state.ws} navigation_value = {navigation}/>
  );


  /**
 This function sets the modified list of users and text that user has entered in the search bar. 

*/
  const Text_Input_Change = (text  : string) => {
    if(state1.UsersDataModify != null)
    {
    const newData = state1.UsersDataOriginal.filter(function (item:Name) {
      const itemData = item.name
        ? item.name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toString().toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    
    dispatch1({
      type: 'set_UserDataModify_text',
      text : text,
      UsersDataModify : [...newData],
     })
  }
  }
  /**
 This function handles the back function to navigate to the starting screen. 

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
    sendmsg(socket);
   };
  } 
  catch (error) {
    console.log(error)
  }
  }
  else
  {
   socket = state.ws;
   sendmsg(socket);
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
      if(recieved_message.Method == "UserList")
      {
        dispatch1({
          type: 'set_userslist',
          UsersDataOriginal : [...recieved_message.Data],
          UsersDataModify : [...recieved_message.Data],
         })
      }
    };
  } catch (error) {
    console.log(error)
  }
}

 /**
 This is useEffect fuction calls the repective functions for the first time when the screen loads.
*/
  useEffect(() => {
    addwebsocket()
    recieve_messages_from_server(socket);
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  },[])
  /**
 Render UI elements. 

*/
  return (
        <View style = {styles.main}>
          <SafeAreaView style = {styles.sectionDescription}>
            <TextInput onChangeText={text => Text_Input_Change(text)} onSubmitEditing={()=> console.log("ok")} style = {styles.sectionTitle} placeholder="Search for Username" placeholderTextColor = 'green'/>
          </SafeAreaView>
          <FlatList
            data={state1.UsersDataModify}
            renderItem={renderItem}
            keyExtractor={item => item.index}
          />
        </View>
  );
};
/**
 Styles for the UI elements.
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
   backgroundColor : '#1c1c1c',
  },
  sectionTitle: {
    fontSize: 15, 
    fontFamily: 'Times New Roman',
    color : 'green',
    width : '100%',
    height : 50,
    padding : 12,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'white',
  },
  sectionList: {
    flexDirection : 'row',
    margin : 5,
    color : 'green',
    width : '97%',
    height : 100,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'green',
    backgroundColor : 'green'
  },
  sectionProfileData: {
  
    color : 'green',
    width : '38%',
    height : 98,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'green',
  },
  sectionRequest: {
   
    width : '34%',
    height : 100,
    textAlign : 'center'
  },
  sectionRequestText: {
    marginTop : 25,
    paddingTop : 14,
    paddingLeft : 10,
    fontSize: 15, 
    fontFamily: 'Times New Roman',
    color : 'white',
    width : '98%',
    height : 50,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'black',
    backgroundColor : 'green'
  },
  
  
  sectionProfile: {
   
    alignItems : 'center',
    color : 'green',
    width : '28%',
    height : 98,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'green',
  },
  sectionName: {
    
    fontSize: 15,
    
    paddingTop : 25,
    fontFamily: 'Times New Roman',
    color : 'white',
    width : '100%',
    height : 50,
    
  },
  sectionStatus: {
    
    fontSize: 15, 
    fontFamily: 'Times New Roman',
    color : 'white',
    width : '100%',
    height : 40,
    
  },
  sectionDescription: {
    margin : 10,
    alignItems : 'center',
  },
  highlight: {
   
    height : '100%',
    width : '100%',
  },
  ImageData: {
    margin : 15,
    height : '70%',
    width : '70%',
    borderWidth : 1,
    borderRadius : 50,
    borderColor : 'green',
  },
});
export default HomeSearch;