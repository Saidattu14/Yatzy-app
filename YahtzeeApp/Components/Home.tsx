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
async function onAppBootstrap() {
  // Register the device with FCM
  // await messaging().registerDeviceForRemoteMessages();
  // const token = await messaging().getToken();
  // console.log(token)
}
onAppBootstrap()

const Home = ({navigation,route}) => {
  const {MyName,OppName} = route.params;
  const { state, dispatch } = React.useContext(DataContext)
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');
  var ws = new WebSocket('ws://192.168.43.99:8085/user', 'echo-protocol');


const sendmsg = () => {
  let obj = {
    "Method" : "Connect",
    "MyName" : MyName,
    "OpponentName" : OppName,
  }
  console.log(obj)
  ws.send(JSON.stringify(obj));
}
ws.onopen = () => {
  console.log('connected')
  if(loading == true)
  {
  sendmsg();
  setLoading(false);
  }
};      
ws.onerror = (e) => {
  console.log(e.message);
};

ws.onmessage = (e) => {
  console.log("message1");
  dispatch({
    type: 'SetSocket',
    ws: ws,
    });
    const a = JSON.parse(e.data);
    navigation.navigate("Game_page", {
      paramKey: a.Method,
      paramKey1 : a.OppMethod
    })
}
ws.onclose = (e) => {
    console.log(e.code, e.reason);
};
  useEffect(() => {
    // // Assume a message-notification contains a "type" property in the data payload of the screen to open
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   navigation.navigate("Request_page", {
    //     paramKey: null,
    //   })
      
    // });

    // // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log(
    //         'Notification caused app to open from quit state:',
    //         remoteMessage.notification,
    //       );
    //     }
    //     navigation.navigate("Request_page", {
    //       paramKey: null,
    //     })
        
      //   setLoading(false);
      // });


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