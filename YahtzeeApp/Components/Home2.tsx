import React from 'react';
import LottieView from 'lottie-react-native';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  TextInput
} from 'react-native';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';

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
const Search = () => {
    return (
        <TouchableOpacity style = {styles.sectionDescription} onPress={()=>console.log("ok")}>
          <TextInput  style = {styles.sectionTitle} placeholder="Search for Username" placeholderTextColor = 'green'/>
        </TouchableOpacity>
    );
};

  

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
        <View style = {styles.main}>
           <Search></Search>
           <View style = {styles.sectionDescription}>
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
            </View>
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
    fontSize: 15, 
    fontFamily: 'Times New Roman',
    color : 'green',
    width : '100%',
    height : 50,
    padding : 12,
    borderWidth : 1,
    borderRadius : 20,
    borderColor : 'green',
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
export default Home;