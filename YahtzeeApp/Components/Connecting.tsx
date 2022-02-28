import React, {useState,useRef,useEffect,useContext} from 'react';
import LottieView from 'lottie-react-native';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
DrawerLayoutAndroid,TextInput
} from 'react-native';
import {DataContext} from '../reducers/datalayer'

// It is the message structure that recieved from the server.
export interface Connect_message {
  Method : string,
  OppMethod : string,
  Result : string,
}
/**
 This function component sends the user data and his opponent data. And waits for the opponent to accept
 the request to play againt. If the opponent accept It automatically navigates the user to the game page to start.
*/
const Connecting = ({navigation,route}) => {
  const {MyName,OppName} = route.params;
  const { state, dispatch } = React.useContext(DataContext)
  var socket:any;
  const sendmsg = (ws: WebSocket) => {
  let obj = {
    "Method" : "Connect",
    "MyName" : MyName,
    "OpponentName" : OppName,
    "MyScore":
          {
              "Chance": 0,
              "Fives": 0,
              "FourofKind": 0,
              "Fours": 0, 
              "FullHouse": 0, 
              "LargeStraight": 0,
              "Ones": 0, 
              "Pair": 0, 
              "Sixs": 0, 
              "SmallStraight": 0, 
              "ThreeofKind": 0, 
              "Threes": 0, 
              "TwoPair": 0,
              "Twos": 0,
              "Yatzy": 0
          },
    "Colors" : {
          "Chance": 'yellow',
          "Fives":  "yellow",
          "FourofKind":  "yellow",
          "Fours":  "yellow", 
          "FullHouse":  "yellow", 
          "LargeStraight":  "yellow",
          "Ones":  "yellow", 
          "Pair":  "yellow", 
          "Sixs":  "yellow", 
          "SmallStraight":  "yellow", 
          "ThreeofKind":  "yellow", 
          "Threes":  "yellow", 
          "TwoPair":  "yellow",
          "Twos":  "yellow",
          "Yatzy":  "yellow"
      },
  }
  
  ws.send(JSON.stringify(obj));
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
      let recieved_message : Connect_message;
      recieved_message = JSON.parse(e.data);
      console.log(recieved_message)
        navigation.navigate("Game_page", {
         MyTurn : recieved_message.Method,
         OppTurn : recieved_message.OppMethod
       })
    }
  } catch (error) {
    console.log(error)
  }
}


  useEffect(() => {
    addwebsocket();
    recieve_messages_from_server(socket);
  }, []);


  return (
    <SafeAreaView style = {[styles.main,styles.ConnBck]} >
      <LottieView
        source={require('../Assets/connecting.json')}
        // ref={animation => animation?.play(25,25)}
        style = {styles.ConnData} autoPlay = {true} loop = {true}>
      </LottieView>
    </SafeAreaView>
    )
};


const styles = StyleSheet.create({
   main : {
   height : '100%',
   width : '100%',
  },
  ConnData: {
    alignItems : 'center',
    height : '50%',
    width : '50%',
  },
  ConnBck : {
    backgroundColor : 'white',
    alignItems : 'center',
  },
  IconData: {
    height : '100%',
    width : '40%',
  },
});
export default Connecting;