import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput,Text,TouchableOpacity, TimePickerAndroid } from "react-native";
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import {DataContext} from '../reducers/datalayer'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
const Names = ({navigation}) => {
   var ws;
   const { state, dispatch } = React.useContext(DataContext)
   const [text, onChangeText] = React.useState("");
   const [loading,setLoading] = useState(true);
   const [loading1,setLoading1] = useState(true);
   const [result, setResult] = useState('');
   const [Data, setData] = useState([]);
   const [colors, setColor] = useState('red');
    const TC = (text : String) => {
      onChangeText(text);
      if(text != "")
      {
        const newData = Data.filter(function (item) {
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if(newData.length == 0)
        {
          setColor('black')
        }
        else
        {
          setColor('red');
        }
      }
    }
   const submit = async() => {
     try {
       
       if(text != '' && colors != 'red')
       {

       await messaging().registerDeviceForRemoteMessages();
       let token = await messaging().getToken();
       if(state.ws != null)
       {
        let obj = {
          "Method" : "AddUser",
          "MyName" : text,
          "FCMToken" : token,
        }
        await AsyncStorage.setItem("MyName", text);
        await AsyncStorage.setItem("FCMtoken",token);
        state.ws.send(JSON.stringify(obj));}

       }
     } catch (error) {
       console.log("Error")
     }
   }
   const addwebsocket = () => {
   
    if(state.ws == null)
    {
    ws = new WebSocket('ws://192.168.43.99:8085/user', 'echo-protocol');
    ws.onopen = () => {
     
     if(loading == true)
     {
       dispatch({
         type: 'SetSocket',
         ws: ws,
       });
       let obj = {
         "Method" : "Validation",
       }
       
       ws.send(JSON.stringify(obj));
       setLoading(false);
     }
     };
     return ws;
    }
    else
    {
      ws = state.ws;
    }
    return ws;
   }
   useEffect(() => {
    ws = addwebsocket();
    ws.onmessage = async(e) => {
      // a message was received
      const a = JSON.parse(e.data);
      if(a.Method == "UserValid")
      {
      
       if(a.Result == "true")
       {
        
        navigation.navigate("Search_page", {});
        
       }
      }
      else if(a.Method == "UserList")
      {
        setData(a.Data)
      }
    };
  
     return () => {
       
     }
   }, [])
    return (
    <SafeAreaView style = {styles.main}>
       <SafeAreaView style = {styles.sectionContainer}>
       <LottieView
                  source={require('../Assets/login.json')}
                  style = {styles.highlight} autoPlay = {true} loop = {true}>
                  </LottieView>
        </SafeAreaView>
        <Text>{result}</Text>
        <TextInput style = {{
          height: 50,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          width : 300,
          borderColor : 'green',
          fontSize : 18,
          color : colors
        }}
      onChangeText={text => TC(text)}
      value={text}
      placeholderTextColor = {'black'}
      placeholder="Choose a unique username"
      />
        <TouchableOpacity onPress={()=> submit()} style = {{
          height: 40,
          margin: 15,
          borderWidth: 1,
          padding: 10,
          width : 100,
          borderRadius : 7,
          backgroundColor : 'green',
          borderColor : 'white'

        }} >
          <Text   style = {{
            color : 'white',
            textAlign : 'center'
          }}>
          Submit
          </Text>
          </TouchableOpacity>
    </SafeAreaView>
    )
};

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
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width : 300,
    borderColor : 'green',
    fontSize : 18,
  },
   main : {
   
   height : '100%',
   width : '100%',
   alignItems : 'center'
  },
});
export default Names;

function stg() {
  throw new Error("Function not implemented.");
}
function time(time: any) {
  throw new Error("Function not implemented.");
}

