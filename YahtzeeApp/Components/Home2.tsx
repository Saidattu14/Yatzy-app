import React,{useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  TextInput,FlatList,BackHandler} from 'react-native';
  import {DataContext} from '../reducers/datalayer'
import StartingPage from './Home1';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface State {
  name: String;
  status: String;
  FCM : String,
}

const UserList : React.FC<{Value : State, ws : WebSocket, nv: any}> = ({Value,ws,nv}) => {

  const RequestFcm = async() => {
    let a2 = await AsyncStorage.getItem("MyName")
    let obj = {
      "Method" : "RequestMsg",
      "MyName" : a2,
      "OpponentName" : Value.name,
      "OpponentFCM" : Value.FCM,
    }
    ws.send(JSON.stringify(obj));
    nv.navigate("Home", {
      OppName: Value.name,
      MyName : await AsyncStorage.getItem("MyName")
    });
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
const HomeSearch = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext)
  const [msg,SetMsg] = useState(true);
  const [name,setName] = useState('');
  const [text, setText] = useState('');
  const [Data,setData] = useState([]);
  const [list, setList] = useState([]);
  var ws = new WebSocket('ws://192.168.43.99:8085/user', 'echo-protocol');
  const sendmsg = async(ws:WebSocket,nw:any) => {
    
    if(msg == true)
    {
      
      let a2 = await AsyncStorage.getItem("MyName")
      let obj = {
        "Method" : "UserList",
        "MyName" : a2
      }
      console.log(obj)
      ws.send(JSON.stringify(obj));
      SetMsg(false);
    }
  }
  if(state.ws == null)
  {
    ws.onopen = async() => {
        console.log('connected')
        dispatch({
          type: 'SetSocket',
          ws: ws,
        });
    };
    
  }
  else
  {
  
   ws = state.ws;
   sendmsg(state.ws,2);
  }
 
  const renderItem = ({ item }) => (
    
    <UserList Value = {item} ws = {ws} nv = {navigation}/>
  );
  const TC = (text : String) => {
    
    setText(text);
    if(list != null)
    {
    const newData = Data.filter(function (item) {
      const itemData = item.name
        ? item.name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setList(newData)
    }
  }
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
  useEffect(() => {
    try {
      ws.onmessage = (e) => {
        // a message was received
        const a = JSON.parse(e.data);
        setData(a.Data)
        setList(a.Data)
      }
    } catch (error) {
      console.log("NotConnected")
    }
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
  },[])
  return (
        <View style = {styles.main}>
          <SafeAreaView style = {styles.sectionDescription}>
            <TextInput onChangeText={text => TC(text)} onSubmitEditing={()=> console.log("ok")} style = {styles.sectionTitle} placeholder="Search for Username" placeholderTextColor = 'green'/>
          </SafeAreaView>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.index}
          />
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