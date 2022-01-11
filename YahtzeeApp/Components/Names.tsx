import React from "react";
import { SafeAreaView, StyleSheet, TextInput,Text } from "react-native";


const Names = ({navigation}) => {
  

   const a1 = () => {
    navigation.navigate("Home", {
        MyName : text,
        OppName : number
      });
   }
   const [text, onChangeText] = React.useState(null);
   const [number, onChangeNumber] = React.useState(null);
   
 
    return (
    <SafeAreaView >
    
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
      />
    
       
       <Text onPress={() => a1()}>
           Submit
       </Text>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
   main : {
   height : '100%',
   width : '100%',
  },
  ConnData: {
    alignItems : 'center',
    height : '50%',
    width : '50%',
  },
  ConnBck : {
    backgroundColor : 'white',
    alignItems : 'center',
  },
  IconData: {
    
    height : '100%',
    width : '40%',
  },
});
export default Names;