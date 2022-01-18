import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
export interface State {
  name: String;
  status: String;
  FCM : String,
}


const Request_page = ({navigation,route}) => {
  const {Key} = route.params
  
  return (
    
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>{Key.notification.title} </Text>
            <Text style={styles.modalText}>{Key.notification.body} </Text>
            <View style = {styles.buttonsstyle}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              // onPress = {() => navigation.navigate('ThirdPage',{
              //   paramKey: paramKey,
              //   level : "Medium",
              // })}
            >
            <Text style={styles.textStyle}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              // onPress = {() => navigation.navigate('ThirdPage',{
              //   paramKey: paramKey,
              //   level : "Medium",
  
              // })}
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
    textAlign: "center"
  },
  buttonsstyle : {
    justifyContent : 'space-evenly',
    flexDirection : 'row'
  }
});

export default Request_page;