import React, {useState,useRef, useEffect} from 'react';
import {Image,SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,TouchableOpacity,
  DrawerLayoutAndroid,TextInput
} from 'react-native';
import styled from 'styled-components/native';
import { Score_Data, Colors } from './interfaces_json';

/**
 This Function component handles the ScoreBoard infromatation of both the user and the opponent.
 Here User get th Estimated scores after the dice was rolled the user can select the respective score to
 update in the original score.
*/
const Scoreboard :React.FC<{score: Score_Data,
  originalscores : Score_Data;
  colors: Colors;
  websocket : WebSocket;
  Turn : string,
  Ok : boolean,
  oppscore : Score_Data
}>= ({score,originalscores,colors,websocket,Turn,Ok,oppscore}) => 
{
  const [count,setCount] = useState(Ok);
  /**
    This Function updates the color of the selected score of the scoreboard.
  */
  const updatecolors = (data : string) => 
  {
    if(data == "Ones" && colors.Ones == "yellow")
    {
      colors.Ones = 'red'
    }
    if(data == "Twos" && colors.Twos == "yellow")
    {
      colors.Twos = 'red'
    }
    if(data == "Threes" && colors.Threes == "yellow")
    {
      colors.Threes = 'red'
    }
    if(data == "Fours" && colors.Fours == "yellow")
    {
      colors.Fours = 'red'
    }
    if(data == "Fives" && colors.Fives == "yellow")
    {
      colors.Fives = 'red'
    }
    if(data == "Sixs" && colors.Sixs == "yellow")
    {
      colors.Sixs = 'red'
    }
    if(data == "Pair" && colors.Pair == "yellow")
    {
      colors.Pair = 'red'
    }
    if(data == "TwoPair" && colors.TwoPair == "yellow")
    {
      colors.TwoPair = 'red'
    }
    if(data == "ThreeofKind" && colors.ThreeofKind == "yellow")
    {
      colors.ThreeofKind = 'red'
    }
    if(data == "FourofKind" && colors.FourofKind == "yellow")
    {
      colors.FourofKind = 'red'
    }
    if(data == "Chance" && colors.Chance == "yellow")
    {
      colors.Chance = 'red'
    }
    if(data == "SmallStraight" && colors.SmallStraight == "yellow")
    {
      colors.SmallStraight = 'red'
    }
    if(data == "LargeStraight" && colors.LargeStraight == "yellow")
    {
      colors.LargeStraight = 'red'
    }
    if(data == "Yatzy" && colors.Yatzy == "yellow")
    {
      colors.Yatzy = 'red'
    }
    if(data == "FullHouse" && colors.FullHouse == "yellow")
    {
      colors.FullHouse = 'red'
    }
  }
  
  /**
    This Function updates the selected score and color on the UI. And sends the updated scoreboard to the server.
  */
  const update = (data : string,Value : Number) => {
    if(Turn != 'Opponent Turn' && Turn != 'Roll Dice')
    {
    if(count == true || count == false)
    {
      let temp;
       if(data != "Ones")
       {
         temp = originalscores.Ones
         score.Ones = temp
       }
       if(data != "Twos")
       {
          temp = originalscores.Twos
          score.Twos = temp
       }
       if(data != "Threes")
       {
        temp = originalscores.Threes;
        score.Threes = temp;
       }
       if(data != "Fours")
       {
        temp = originalscores.Fours;
        score.Fours = temp;
       }
       if(data != "Fives")
       {
        temp = originalscores.Fives;
        score.Fives = temp;
       }
       if(data != "Sixs")
       {
        temp =  originalscores.Sixs;
        score.Sixs = temp;
       }
      if(data != "Pair")
      {
        temp = originalscores.Pair;
        score.Pair = temp;
      }
      if(data != "TwoPair")
      {
        temp = originalscores.TwoPair;
        score.TwoPair = temp;
      }
      if(data != "ThreeofKind")
      {
        temp = originalscores.ThreeofKind;
        score.ThreeofKind = temp;
      }
      if(data != "FourofKind")
      {
        temp = originalscores.FourofKind;
        score.FourofKind = temp;
      }
      if(data != "SmallStraight")
      {
        temp = originalscores.SmallStraight;
        score.SmallStraight = temp;
      }
      if(data != "LargeStraight")
      {
        temp =  originalscores.LargeStraight;
        score.LargeStraight = temp;
      }
      if(data != "Chance")
      {
        temp = originalscores.Chance;
        score.Chance = temp;
      }
      if(data != "FullHouse")
      {
        temp = originalscores.FullHouse;
        score.FullHouse = temp;
      }
      if(data != "Yatzy")
      {
        
        temp = originalscores.Yatzy;
        score.Yatzy = temp;
      }
      updatecolors(data);
      let obj = {
        "Method": "Score_Update",
        "MyScore" : score,
        "Colors" : colors,
        "Checking" : data
      }
      websocket.send(JSON.stringify(obj));
      if(count == true)
      {setCount(false);}
      else
      {
        setCount(true);
      }
    }
  }
}
  const TextData = styled.Text`
  border-radius: 3px;
  border: 1.2px green;
  width : 60px;
  text-align: center;
  padding : 4px;
`

  return (
    <View style={[styles.container, styles.navigationContainer]}>
     <View style = {styles.highlight}>
          <Text  style = {styles.sectionTitle}>ScoreBoard</Text>
          <Text  style = {styles.sectionTitleUser}>You</Text>
          <Text  style = {styles.sectionTitleOpp}>Opponent</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle} >One's</Text>
            <TextData onPress={() => update("Ones",score.Ones)} style = {
              {
                color : colors.Ones
              }}
            >{score.Ones}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Ones}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Two's</Text>
            <TextData  style = {
              {
                color : colors.Twos
              }} onPress={() => update("Twos",score.Twos)}>
              {score.Twos}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Twos}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Three's</Text>
            <TextData  style = {
              {
                color : colors.Threes
              }}
            onPress={() => update("Threes",score.Threes)}>
              {score.Threes}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Threes}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Four's</Text>
            <TextData  style = {
              {
                color : colors.Fours
              }}
            onPress={() => update("Fours",score.Fours)}>
              {score.Fours}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Fours}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Five's</Text>
            <TextData  style = {
              {
                color : colors.Fives
              }}
            onPress={() => update("Fives",score.Fives)}>
              {score.Fives}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Fives}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Six's</Text>
            <TextData  style = {
              {
                color : colors.Sixs
              }}
            onPress={() => update("Sixs",score.Sixs)}>
              {score.Sixs}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Sixs}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Sum</Text>
            <Text  style = {styles.sectionTitleUser}>{score.Sum}</Text>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Sum}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Bonous</Text>
            <Text  style = {styles.sectionTitleUser}>{score.Bonous}</Text>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Bonous}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Pair</Text>
            <TextData  style = {
              {
                color : colors.Pair
              }}
            onPress={() => update("Pair",score.Pair)}>
              {score.Pair}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Pair}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>TwoPair</Text>
            <TextData  style = {
              {
                color : colors.TwoPair
              }}
            onPress={() => update("TwoPair",score.TwoPair)}>
              {score.TwoPair}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.TwoPair}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Three of kind</Text>
            <TextData  style = {
              {
                color : colors.ThreeofKind
              }}
            onPress={() => update("ThreeofKind",score.ThreeofKind)}>
              {score.ThreeofKind}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.ThreeofKind}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle} >Four of kind</Text>
            <TextData style = {
              {
                color : colors.FourofKind
              }}
            onPress={() => update("FourofKind",score.FourofKind)}>
              {score.FourofKind}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.FourofKind}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Full House</Text>
            <TextData  style = {
              {
                color : colors.FullHouse
              }}
            onPress={() => update("FullHouse",score.FullHouse)}>
              {score.FullHouse}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.FullHouse}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Small Straight</Text>
            <TextData style = {
              {
                color : colors.SmallStraight
              }}
            onPress={() => update("SmallStraight",score.SmallStraight)}>
              {score.SmallStraight}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.SmallStraight}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Large Straight</Text>
            <TextData style = {
              {
                color : colors.LargeStraight
              }}onPress={() => update("LargeStraight",score.LargeStraight)}>{score.LargeStraight}
            </TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.LargeStraight}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Chance</Text>
            <TextData  style = {
              {
                color : colors.Chance
              }}onPress={() => update("Chance",score.Chance)}>
              {score.Chance}</TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Chance}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Yatzy</Text>
            <TextData style = {
              {
                color : colors.Yatzy
              }}onPress={() => update("Yatzy",score.Yatzy)}>{score.Yatzy}
            </TextData>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Yatzy}</Text>
          </View>
          <View style = {styles.highlight}>
            <Text  style = {styles.sectionTitle}>Total Score</Text>
            <Text  style = {styles.sectionTitleUser}>{score.Total}</Text>
            <Text  style = {styles.sectionTitleOpp}>{oppscore.Total}</Text>
          </View> 
  </View>
  );
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height : '100%',
        padding : 10,
    
    
      },
      navigationContainer: {
        backgroundColor: "black"
      },
      paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
      },
      sectionTitle: {
        padding : 5,
        fontSize: 15, 
        fontFamily: 'Times New Roman',
        color : 'green',
        width : '40%',
        height : 35,
        borderWidth : 1,
        borderRadius : 1,
        borderColor : 'green',
      },
      sectionTitleUser: {
        padding : 5,
        fontSize: 15, 
        fontFamily: 'Times New Roman',
        color : 'yellow',
        width : '20%',
        height : 35,
        borderWidth : 1,
        borderRadius : 1,
        borderColor : 'green',
        textAlign : 'center'
      },
      sectionTitleOpp: {
        padding : 5,
        fontSize: 15, 
        fontFamily: 'Times New Roman',
        color : 'red',
        width : '32%',
        height : 35,
        borderWidth : 1,
        borderRadius : 1,
        borderColor : 'green',
        textAlign : 'center'
      },
      highlight: {
        flexDirection : 'row',
      },
      
});
export default Scoreboard;