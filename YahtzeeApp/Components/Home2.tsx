import React,{useState} from 'react';
import LottieView from 'lottie-react-native';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  TextInput,FlatList} from 'react-native';
  import {DataContext} from '../reducers/datalayer'
import StartingPage from './Home1';
const Search = () => {
    return (
        <TouchableOpacity style = {styles.sectionDescription} onPress={()=>console.log("ok")}>
          <TextInput onSubmitEditing={()=> console.log("ok")} style = {styles.sectionTitle} placeholder="Search for Username" placeholderTextColor = 'green'/>
        </TouchableOpacity>
    );
};
const UserList : React.FC<{Name : String}> = ({Name}) => {
  return (
   <SafeAreaView  style = {styles.sectionDescription}>
    <View style = {styles.sectionList}>
             <SafeAreaView style = {styles.sectionProfile}>
                <Image
                  style = {styles.ImageData}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}>
                </Image>
              </SafeAreaView>
              <SafeAreaView style = {styles.sectionProfileData}>
                <Text style = {styles.sectionName}>Naga Sai Dattu</Text>
                <Text style = {styles.sectionStatus}>Online</Text>
              </SafeAreaView>
              <SafeAreaView style = {styles.sectionRequest}>
                <Text style = {styles.sectionRequestText}>
                  Send Request
                </Text>
              </SafeAreaView>
            </View>
   </SafeAreaView>
);
}

const HomeSearch = () => {
  const { state, dispatch } = React.useContext(DataContext)
  const [msg,SetMsg] = useState(true);
  const [name,setName] = useState('');
  const [text, setText] = useState('');
  const DATA = require('../name.json').List;
  const [list, setList] = useState(DATA);

  
  if(state.ws == null)
  {
    var ws = new WebSocket('ws://192.168.43.99:8080/', 'echo-protocol');
    ws.onopen = () => {
        console.log('connected')
        dispatch({
          type: 'SetSocket',
          ws: ws,
        });
        if(msg == true)
        {
          let obj = {
            "Method" : "UserList",
          }
          ws.send(JSON.stringify(obj));
          
          SetMsg(false);
        }
      };
  }
  else
  {
    state.ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };
    
    state.ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };
    
    state.ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }
  const renderItem = ({ item }) => (
    <UserList Name = {item} />
  );
  const TC = (text : String) => {
    
    setText(text);
    const newData = DATA.filter(function (item) {
      
      const itemData = item.Name
        ? item.Name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setList(newData);
  }
  return (
        <View style = {styles.main}>
          <SafeAreaView style = {styles.sectionDescription}>
            <TextInput onChangeText={text => TC(text)} onSubmitEditing={()=> console.log("ok")} style = {styles.sectionTitle} placeholder="Search for Username" placeholderTextColor = 'green'/>
          </SafeAreaView>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.Name}
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