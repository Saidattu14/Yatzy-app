 import React ,{useState}from 'react';
 import LottieView from 'lottie-react-native';
 import {DataContext} from '../reducers/datalayer'
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 

const StartingPage = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext)
   const a = [state.MyName]
   const startGame = () => {
    navigation.navigate("Home", {
      MyName : text,
      OppName : number
  });
  const createAcc = () => {
    
  }
   }
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
                    if(rowData == "String")
                    {
                    return(
                        <TouchableOpacity key = {index} style = {styles.sectionDescription} onPress={()=>console.log("ok")}>
                          <Text  style = {styles.sectionTitle}>
                              Create Account
                          </Text>
                        </TouchableOpacity>
                    )}
                    else
                    {
                      return(
                            <TouchableOpacity style = {styles.sectionDescription} onPress={()=>console.log("ok")}>
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
 