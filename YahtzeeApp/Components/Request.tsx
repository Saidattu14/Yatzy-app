import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
export interface State {
  name: String;
  status: String;
  FCM : String,
}


const Request_page = ({navigation,route}) => {
  const {Key} = route.params
  const navigate = async() => {
    
    navigation.navigate('Home',{
      OppName: Key.data.OpponentName,
      MyName : await AsyncStorage.getItem("MyName")
    })
   
  }
  return (
    
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>{Key.notification.title} </Text>
            <Text style={styles.modalText}>{Key.notification.body} </Text>
            <Text style={styles.modalText}>Are You Interested to Play? </Text>
            <View style = {styles.buttonsstyle}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress = {() => navigate()}
            >
            <Text style={styles.textStyle}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              
            >
            <Text style={styles.textStyle}>No</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color : 'green',
    fontSize : 15,
  },
  buttonsstyle : {
    justifyContent : 'space-evenly',
    flexDirection : 'row'
  }
});

export default Request_page;