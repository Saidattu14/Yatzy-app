import React, {useState,useRef,useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  DrawerLayoutAndroid,TextInput,Alert
} from 'react-native';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';


  

const RequestPage = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('Home');
    useEffect(() => {
     if(loading == true)
     {
       Alert.alert(
        'Request Alert',
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
         setLoading(false);
     }
    }, []);

  return (
    <View style={[styles.container]}>
      <Text>
          hello
      </Text>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height : '100%',
        padding : 10,
        backgroundColor : 'white'
    
    },
});
export default RequestPage;