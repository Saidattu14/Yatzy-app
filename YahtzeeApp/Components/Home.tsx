import React, {useState,useRef,useEffect,useContext} from 'react';
import LottieView from 'lottie-react-native';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  DrawerLayoutAndroid,TextInput
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import Scoreboard from './Scoreboard';
import RequestPage from './Request';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {DataContext} from '../reducers/datalayer'


const Home = ({navigation,route}) => {
  const {MyName,OppName} = route.params;
  const { state, dispatch } = React.useContext(DataContext)
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');
  var ws;
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
const addwebsocket = () => {
    if(state.ws == null)
      {
        ws = new WebSocket('ws://192.168.43.99:8085/user', 'echo-protocol');
        ws.onopen = () => {
        console.log('connected')
        dispatch({
          type: 'SetSocket',
          ws: ws,
          });
        if(loading == true)
        {
         sendmsg(ws);
         setLoading(false);
        }
      };    
    }
  else
  {
   ws = state.ws;
   sendmsg(ws);
  }
  return ws;
}


  
  useEffect(() => {
    ws = addwebsocket();
    ws.onmessage = (e) => {
      const a = JSON.parse(e.data);
      navigation.navigate("Game_page", {
        paramKey: a.Method,
        paramKey1 : a.OppMethod
      })
    }
    ws.onerror = (e) => {
        console.log(e.message);
      };
      
    ws.onclose = (e) => {
          console.log(e.code, e.reason);
    };
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
export default Home;