 import React from 'react';
 import LottieView from 'lottie-react-native';
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
 
 const Section: React.FC<{
   title: string;
 }> = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 
 const Home = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
         <View style = {styles.main}>
              <SafeAreaView style = {styles.sectionContainer}>
                <LottieView
                  source={require('../Assets/welcome.json')}
                  style = {styles.highlight} autoPlay = {true} loop = {true}>
                  </LottieView>
              </SafeAreaView>
              <TouchableOpacity style = {styles.sectionDescription} onPress={()=>console.log("ok")}>
                  <Text  style = {styles.sectionTitle}>
                   Start Yahtzee
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.sectionDescription} onPress={()=>console.log("ok")}>
                  <Text  style = {styles.sectionTitle}>
                    Create Account
                  </Text>
                </TouchableOpacity>
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
 
 export default Home;
 