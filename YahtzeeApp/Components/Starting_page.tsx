 import React ,{useState,useEffect}from 'react';
 import LottieView from 'lottie-react-native';
 import {DataContext} from '../reducers/datalayer'
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import messaging from '@react-native-firebase/messaging';
 import { CommonActions } from '@react-navigation/native';
 import {SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity
 } from 'react-native';
 
 

const StartingPage = ({navigation}) => {

  const { state, dispatch } = React.useContext(DataContext)
  const [loading,SetLoading] = useState(true);
  const [a,setA] = useState([""]);
  
const startGame = () => {
  navigation.navigate("Search_page", {});     
  
  
}
  
  const createAcc = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Name" },
        ],
      })
    );
  }
  useEffect(() => {
    
    if(loading == true)
    {
      const a1 = async() => {
        
        
        let a2 = await AsyncStorage.getItem("MyName")
        if(a2 == null)
        {

          SetLoading(false);
        }
        else
        {
          const a = []
          a.push(a2);
          setA(a)
          SetLoading(false);
        }
        return a2;
      };
      a1();
    }
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
        Key : remoteMessage
      });
     }
    });
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // console.log(
        //   'Notification caused app to open from quit state:',
        //   remoteMessage.notification,
        // );
        navigation.navigate('Request_page',{
          Key: remoteMessage,
        });
      }
    });
  }, []);
   return (
         <View style = {styles.main}>
              <SafeAreaView style = {styles.sectionContainer}>
                <LottieView
                  source={require('../Assets/welcome.json')}
                  style = {styles.highlight} autoPlay = {true} loop = {true}>
                  </LottieView>
              </SafeAreaView>
                {
                  a.map((rowData, index) => {
                    if(rowData == "")
                    {
                    return(
                        <TouchableOpacity key = {index} style = {styles.sectionDescription} onPress={()=>createAcc()}>
                          <Text  style = {styles.sectionTitle}>
                            Create Account
                          </Text>
                        </TouchableOpacity>
                    )}
                    else
                    {
                      return(
                            <TouchableOpacity key = {index}  style = {styles.sectionDescription} onPress={()=>startGame()}>
                              <Text  style = {styles.sectionTitle}>
                                Start Yahtzee
                              </Text>
                            </TouchableOpacity>
                      )
                    }
                  })
                }
      </View>
   );
 };
 
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
 