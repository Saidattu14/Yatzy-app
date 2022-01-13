import React from "react";
import { SafeAreaView, StyleSheet, TextInput,Text,TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import {DataContext} from '../reducers/datalayer'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Names = ({navigation}) => {
  const { state, dispatch } = React.useContext(DataContext)
   const [text, onChangeText] = React.useState("");
   const submit = async() => {
  
    await AsyncStorage.setItem("MyName", text);
    
   }
    return (
    <SafeAreaView style = {styles.main}>
       <SafeAreaView style = {styles.sectionContainer}>
       <LottieView
                  source={require('../Assets/login.json')}
                  style = {styles.highlight} autoPlay = {true} loop = {true}>
                  </LottieView>
        </SafeAreaView>
        <TextInput
        style={styles.input}
        onChangeText={onChangeText}
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